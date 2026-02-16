const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const BLOG_OWNER = 'Wjiajie';
const BLOG_REPO = 'blog_ponder';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-CORS', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!GITHUB_TOKEN) {
      return res.status(500).json({ error: 'GitHub token not configured' });
    }

    // Fetch all issues with pagination
    let allIssues = [];
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      const response = await fetch(
        `https://api.github.com/repos/${BLOG_OWNER}/${BLOG_REPO}/issues?state=all&per_page=100&page=${page}`,
        {
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const issues = await response.json();

      if (issues.length > 0) {
        allIssues = [...allIssues, ...issues];
        page++;
        const linkHeader = response.headers.get('Link');
        hasNextPage = linkHeader && linkHeader.includes('rel="next"');
      } else {
        hasNextPage = false;
      }
    }

    // Filter for Blog Universe issues
    const blogUniverseIssues = allIssues.filter((issue) =>
      issue.title.includes('[Blog Universe]')
    );

    // Process each issue and check for reviewed comments
    const blogData = [];
    for (const issue of blogUniverseIssues) {
      const commentsResponse = await fetch(
        `https://api.github.com/repos/${BLOG_OWNER}/${BLOG_REPO}/issues/${issue.number}/comments`,
        {
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (commentsResponse.ok) {
        const comments = await commentsResponse.json();
        const hasReviewedComment = comments.some((comment) =>
          comment.body.toLowerCase().includes('reviewed')
        );

        if (hasReviewedComment) {
          const body = issue.body || '';
          const urlMatch = body.match(/URL: (.+)/);
          const descMatch = body.match(/Description: (.+)/);
          const tagsMatch = body.match(/Tags: (.+)/);

          blogData.push({
            id: issue.number,
            title: issue.title.replace('[Blog Universe] ', ''),
            url: urlMatch ? urlMatch[1].trim() : '',
            description: descMatch ? descMatch[1].trim() : '',
            tags: tagsMatch ? tagsMatch[1].trim() : '',
          });
        }
      }
    }

    res.status(200).json({ blogs: blogData });
  } catch (error) {
    console.error('获取 Universe 博客失败:', error);
    res.status(500).json({ error: error.message });
  }
}
