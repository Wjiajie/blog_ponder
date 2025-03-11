import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkReferenceNotes from './src/plugins/remark-reference-notes';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'ponder',
  tagline: 'keep thinking, keep simple.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://www.jiajiewu.top',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Wjiajie', // Usually your GitHub org/user name.
  projectName: 'blog_ponder', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  markdown: {
    mermaid: true,
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
    {
      href: 'https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;700&family=Linden+Hill:wght@400&family=Noto+Serif+SC:wght@300;400;500;700&display=swap',
      type: 'text/css',
      crossorigin: 'anonymous',
    },
    {
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
      type: 'text/css',
      crossorigin: 'anonymous',
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: {
          path: 'blog',
          blogTitle: 'Blog',
          showReadingTime: true,
          remarkPlugins: [remarkMath, remarkReferenceNotes],
          rehypePlugins: [rehypeKatex],
          postsPerPage: 20,
          blogSidebarCount: 'ALL',
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc.`,
            createFeedItems: async (params) => {
              const {blogPosts, defaultCreateFeedItems, ...rest} = params;
              return defaultCreateFeedItems({
                // keep only the 10 most recent blog posts in the feed
                blogPosts: blogPosts.filter((item, index) => index < 10),
                ...rest,
              });
            },
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-JF1XWR8SWM', // 替换为您的Google Analytics 4测量ID
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],
  themes: [
    '@docusaurus/theme-live-codeblock',
    '@docusaurus/theme-mermaid',
  ],
  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        language: ["zh", "en"],
        indexDocs: false,
        indexBlog: true,
        indexPages: true,
        searchResultLimits: 8,
        highlightSearchTermsOnTargetPage: true,
        searchBarPosition: "right",
        searchBarShortcut: true,
        searchBarShortcutHint: true,
      }),
    ],
    '@docusaurus/plugin-ideal-image',
  ],
  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    comments: {
      utterances: {
        enabled: true,
        repo: 'Wjiajie/meme-blog-comments',
        label: '💬 comments',
        theme: {
          light: 'github-light',
          dark: 'github-dark',
        },
      },
    },
    navbar: {
      title: 'Ponder',
      items: [
        {to: '/index', label: ' Index', position: 'left', className: 'navbar-icon-item'},
        {to: '/blog', label: ' Blog', position: 'left', className: 'navbar-icon-item'},
        {to: '/editor', label: ' Write', position: 'left', className: 'navbar-icon-item'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Social',
          items: [
            {
              label: 'Jike',
              href: 'https://jike.city/jiajiewu_ponder',
            },
            {
              label: 'Github',
              href: 'https://github.com/Wjiajie',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ponder, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.oneDark,
    },
  } satisfies Preset.ThemeConfig,
  customFields: {
    isProduction: process.env.NODE_ENV === 'production',
    githubToken: process.env.GITHUB_TOKEN || '',
    editorPassword: process.env.EDITOR_PASSWORD,
  },
  staticDirectories: ['static'],
};

export default config;
