import Vditor from 'vditor';

declare module 'vditor' {
  interface IPreviewOptions {
    mermaid?: {
      enable: boolean;
      theme?: string;
    };
    echarts?: {
      enable: boolean;
    };
    graphviz?: {
      enable: boolean;
    };
    plantuml?: {
      enable: boolean;
      server?: string;
    };
    mindmap?: {
      enable: boolean;
    };
    gantt?: {
      enable: boolean;
    };
    speech?: {
      enable: boolean;
    };
  }
} 