declare module '@docusaurus/useDocusaurusContext' {
  import type { ThemeConfig } from '@docusaurus/theme-common';
  
  export interface DocusaurusContext {
    siteConfig: {
      themeConfig: ThemeConfig & {
        comments?: {
          utterances?: {
            enabled: boolean;
            repo: string;
            label: string;
            theme: {
              light: string;
              dark: string;
            };
          };
        };
      };
    };
  }
} 