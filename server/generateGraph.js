const fs = require('fs');
const path = require('path');
const glob = require('glob');
const matter = require('gray-matter');

// Configuration
const BLOG_DIR = path.join(__dirname, '..', 'blog');
const SKELETON_PATH = path.join(__dirname, '..', 'static', 'graph-skeleton.json');
const OUTPUT_PATH = path.join(__dirname, '..', 'static', 'graph.json');

// Helper: Normalize tag to ID (e.g., "Software Architecture" -> "software-architecture")
// However, the user's skeleton uses specific k-v pairs. 
// We will try to match Tag Name (exact or case-insensitive) to Node Name or Node ID.
function findCategoryNode(tag, nodes) {
  const normalize = s => s.toLowerCase().trim().replace(/\s+/g, '-');
  const tagNorm = normalize(tag);

  return nodes.find(n =>
    // 1. Match by ID
    n.id === tag ||
    // 2. Match by Name
    n.name === tag ||
    // 3. Match by ID (normalized)
    n.id === tagNorm
  );
}

function generateGraph() {
  console.log('🔄 Starting Knowledge Graph generation...');

  // 1. Load Skeleton
  let graph = { nodes: [], links: [] };
  if (fs.existsSync(SKELETON_PATH)) {
    const skeleton = JSON.parse(fs.readFileSync(SKELETON_PATH, 'utf8'));
    graph.nodes = [...skeleton.nodes];
    graph.links = [...skeleton.links];
    console.log(`✅ Loaded skeleton with ${graph.nodes.length} nodes.`);
  } else {
    console.error('❌ Skeleton file not found at:', SKELETON_PATH);
    process.exit(1);
  }

  // 2. Scan Blog Posts
  const blogFiles = glob.sync('**/*.{md,mdx}', { cwd: BLOG_DIR });
  console.log(`📂 Found ${blogFiles.length} blog posts.`);

  let blogNodes = [];
  let blogLinks = [];

  blogFiles.forEach(file => {
    const filePath = path.join(BLOG_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontMatter } = matter(fileContent);

    // Skip drafts
    if (frontMatter.draft) return;

    // Use slug or filename as ID
    const slug = frontMatter.slug || path.basename(file, path.extname(file));
    const nodeId = slug;

    // 3. Generate Links based on Tags and Determine Group
    let potentialParents = [];

    if (frontMatter.tags && Array.isArray(frontMatter.tags)) {
      frontMatter.tags.forEach(tag => {
        const categoryNode = findCategoryNode(tag, graph.nodes);
        if (categoryNode) {
          potentialParents.push(categoryNode);
        }
      });
    }

    // 3.1 Calculate dynamic group and Prune links
    // Strategy: Only connect to the DEEPEST parents to avoid cross-level (jump) links.
    // e.g. If tags are [Universal Values (Gp1), Decision (Gp2)], we only connect to Decision.
    // Child becomes Gp3. Link is Gp2 -> Gp3. (Clean N -> N+1)

    let calculatedGroup = 4; // Default baseline
    let parentsToConnect = [];

    if (potentialParents.length > 0) {
      // Find deepest parent group
      const maxPGroup = Math.max(...potentialParents.map(n => n.group || 0));
      calculatedGroup = maxPGroup + 1;

      // Filter: Keep only parents that are at the deepest level
      parentsToConnect = potentialParents.filter(n => (n.group || 0) === maxPGroup);

      // Optional log for pruning
      // if (parentsToConnect.length < potentialParents.length) {
      //     console.log(`✂️ Pruned links for "${frontMatter.title}". Kept only Group ${maxPGroup} parents.`);
      // }
    }

    // Create Links
    parentsToConnect.forEach(parent => {
      blogLinks.push({
        source: parent.id,
        target: nodeId,
        value: 1
      });
    });

    // Create Blog Node
    const blogNode = {
      id: nodeId,
      name: frontMatter.title || slug,
      description: frontMatter.description || '',
      type: 'blog',
      group: calculatedGroup
    };
    blogNodes.push(blogNode);
  });

  // 4. Merge Data
  // Avoid duplicate nodes if skeleton already had some (though we should trust skeleton + new blogs)
  // Actually, we append new blog nodes. 
  // Check for duplicates just in case
  const existingIds = new Set(graph.nodes.map(n => n.id));
  blogNodes.forEach(n => {
    if (!existingIds.has(n.id)) {
      graph.nodes.push(n);
    } else {
      console.warn(`   ⚠️ Node "${n.id}" already exists in skeleton, skipping dynamic generation.`);
    }
  });

  // Add Links
  graph.links.push(...blogLinks);

  // 5. Write Output
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(graph, null, 2));
  console.log(`🎉 Graph generated! Total Nodes: ${graph.nodes.length}, Links: ${graph.links.length}`);
  console.log(`💾 Saved to ${OUTPUT_PATH}`);
}

if (require.main === module) {
  generateGraph();
}

module.exports = generateGraph;
