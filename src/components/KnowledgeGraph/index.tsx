import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import * as d3 from 'd3';
import styles from './styles.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';

// 图谱数据接口
interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: 'note' | 'blog';
  group: number;
  x?: number;
  y?: number;
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
  value: number;
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

interface KnowledgeGraphProps {
  data?: GraphData;
  width?: number;
  height?: number;
  noteItems?: any[];
}

export default function KnowledgeGraph({
  data,
  width = 600,
  height = 800,
  noteItems
}: KnowledgeGraphProps): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null);
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const graphJsonUrl = useBaseUrl('/graph.json');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [dimensions, setDimensions] = useState({ width, height });

  // 切换全屏模式
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // 响应窗口大小变化
  useLayoutEffect(() => {
    function updateSize() {
      if (isFullscreen) {
        setDimensions({
          width: window.innerWidth * 0.9,
          height: window.innerHeight - 150
        });
      } else {
        // 在非全屏模式下，使宽度自适应容器
        const containerWidth = svgRef.current?.parentElement?.clientWidth || width;
        setDimensions({ 
          width: Math.min(containerWidth * 0.95, width), 
          height 
        });
      }
    }
    
    window.addEventListener('resize', updateSize);
    updateSize();
    
    return () => window.removeEventListener('resize', updateSize);
  }, [isFullscreen, width, height]);

  // 加载图谱数据
  useEffect(() => {
    async function loadData() {
      if (data) {
        setGraphData(data);
        return;
      }

      try {
        const response = await fetch(graphJsonUrl);
        if (response.ok) {
          const jsonData = await response.json();
          setGraphData(jsonData);
        } else {
          console.error('Failed to load graph data');
        }
      } catch (error) {
        console.error('Error loading graph data:', error);
      }
    }

    loadData();
  }, [data, graphJsonUrl]);

  // 渲染力导向图
  useEffect(() => {
    if (!graphData || !svgRef.current) return;

    // 清除之前的内容
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current);
    const container = svg.append('g');
    
    // 初始化缩放级别和位置
    const initialScale = 0.8;

    // 颜色比例尺
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // 设置力导向模拟
    const simulation = d3.forceSimulation<GraphNode, GraphLink>(graphData.nodes)
      .force('link', d3.forceLink<GraphNode, GraphLink>(graphData.links)
        .id(d => d.id)
        .distance(link => 100 / (link.value || 1))
      )
      .force('charge', d3.forceManyBody().strength(-150))
      .force('center', d3.forceCenter(0, 0)) // 使用相对坐标原点
      .force('collision', d3.forceCollide().radius(30));

    // 创建连接线
    const link = container.append('g')
      .selectAll('line')
      .data(graphData.links)
      .enter()
      .append('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', d => Math.sqrt(d.value));

    // 创建节点
    const node = container.append('g')
      .selectAll('.node')
      .data(graphData.nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .call(d3.drag<SVGGElement, GraphNode>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // 添加节点圆圈
    node.append('circle')
      .attr('r', d => (d.type === 'note' ? 10 : 7))
      .attr('fill', d => colorScale(d.group.toString()))
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5);

    // 添加节点标签
    node.append('text')
      .attr('dx', 12)
      .attr('dy', '.35em')
      .text(d => d.name)
      .style('font-size', '10px')
      .style('fill', '#333');

    // 添加交互事件
    node
      .on('mouseover', (event, d) => {
        setHoveredNode(d);
        highlightConnections(d, true);
      })
      .on('mouseout', (event, d) => {
        setHoveredNode(null);
        highlightConnections(d, false);
      })
      .on('click', (event, d) => {
        event.stopPropagation();
        setSelectedNode(d);
        highlightConnections(d, true, true);
      });

    svg.on('click', () => {
      if (selectedNode) {
        highlightConnections(selectedNode, false, true);
        setSelectedNode(null);
      }
    });

    // 高亮连接的函数
    function highlightConnections(node: GraphNode, highlight: boolean, isSelected = false) {
      // 找到与节点连接的所有链接和节点
      const connectedNodeIds = new Set<string>();
      const connectedLinks = graphData.links.filter(link => {
        const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
        const targetId = typeof link.target === 'string' ? link.target : link.target.id;
        
        if (sourceId === node.id) {
          connectedNodeIds.add(targetId);
          return true;
        }
        if (targetId === node.id) {
          connectedNodeIds.add(sourceId);
          return true;
        }
        return false;
      });

      // 更新链接样式
      link
        .transition()
        .duration(200)
        .attr('stroke-opacity', l => {
          if (!highlight && !isSelected) return 0.6;
          const sourceId = typeof l.source === 'string' ? l.source : l.source.id;
          const targetId = typeof l.target === 'string' ? l.target : l.target.id;
          return (sourceId === node.id || targetId === node.id) ? 1 : 0.1;
        })
        .attr('stroke-width', l => {
          if (!highlight && !isSelected) return Math.sqrt(l.value);
          const sourceId = typeof l.source === 'string' ? l.source : l.source.id;
          const targetId = typeof l.target === 'string' ? l.target : l.target.id;
          return (sourceId === node.id || targetId === node.id) ? Math.sqrt(l.value) * 2 : Math.sqrt(l.value) * 0.5;
        });

      // 更新节点样式
      d3.selectAll('circle')
        .transition()
        .duration(200)
        .attr('r', d => {
          const currentNode = d as unknown as GraphNode;
          if (!highlight && !isSelected) return (currentNode.type === 'note' ? 10 : 7);
          if (currentNode.id === node.id) return (currentNode.type === 'note' ? 14 : 10);
          return connectedNodeIds.has(currentNode.id) ? (currentNode.type === 'note' ? 12 : 9) : (currentNode.type === 'note' ? 8 : 5);
        })
        .attr('fill-opacity', d => {
          const currentNode = d as unknown as GraphNode;
          if (!highlight && !isSelected) return 1;
          return currentNode.id === node.id || connectedNodeIds.has(currentNode.id) ? 1 : 0.3;
        });

      // 更新文本样式
      d3.selectAll('text')
        .transition()
        .duration(200)
        .style('font-size', d => {
          const currentNode = d as unknown as GraphNode;
          if (!highlight && !isSelected) return '10px';
          return currentNode.id === node.id ? '12px' : (connectedNodeIds.has(currentNode.id) ? '11px' : '9px');
        })
        .style('font-weight', d => {
          const currentNode = d as unknown as GraphNode;
          if (!highlight && !isSelected) return 'normal';
          return currentNode.id === node.id ? 'bold' : 'normal';
        })
        .style('fill-opacity', d => {
          const currentNode = d as unknown as GraphNode;
          if (!highlight && !isSelected) return 1;
          return currentNode.id === node.id || connectedNodeIds.has(currentNode.id) ? 1 : 0.3;
        });
    }

    // 模拟更新
    simulation.on('tick', () => {
      link
        .attr('x1', d => {
          const source = d.source as GraphNode;
          return source.x || 0;
        })
        .attr('y1', d => {
          const source = d.source as GraphNode;
          return source.y || 0;
        })
        .attr('x2', d => {
          const target = d.target as GraphNode;
          return target.x || 0;
        })
        .attr('y2', d => {
          const target = d.target as GraphNode;
          return target.y || 0;
        });

      node.attr('transform', d => `translate(${d.x || 0},${d.y || 0})`);
    });

    // 添加缩放功能
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        container.attr('transform', event.transform.toString());
      });

    svg.call(zoom);
    
    // 初始缩放设置，使图表居中
    setTimeout(() => {
      zoom.transform(
        svg, 
        d3.zoomIdentity.translate(dimensions.width / 2, dimensions.height / 2).scale(initialScale)
      );
    }, 100);

    // 拖拽函数
    function dragstarted(event: d3.D3DragEvent<SVGGElement, GraphNode, GraphNode>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, GraphNode, GraphNode>) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGGElement, GraphNode, GraphNode>) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [graphData, dimensions]);

  // 获取节点的链接URL
  const getNodeUrl = (node: GraphNode | null) => {
    if (!node) return '#';
    return node.type === 'note' ? `/notes/${node.id}` : `/blog/${node.id}`;
  };

  return (
    <div className={`${styles.graphContainer} ${isFullscreen ? styles.fullscreen : ''}`}>
      <div className={styles.graphHeader}>
        <h3>知识图谱</h3>
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.note}`}></span>
            <span>笔记页面</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.blog}`}></span>
            <span>博客文章</span>
          </div>
        </div>
      </div>
      
      <button 
        className={styles.fullscreenButton}
        onClick={toggleFullscreen}
        title={isFullscreen ? "退出全屏" : "全屏查看"}
      >
        <i className={`fas ${isFullscreen ? 'fa-compress-alt' : 'fa-expand-alt'}`}></i>
      </button>
      
      <svg 
        ref={svgRef} 
        width={dimensions.width} 
        height={dimensions.height} 
        className={styles.graph}
      />
      
      {hoveredNode && (
        <div className={styles.tooltip}>
          <div className={styles.tooltipTitle}>
            {hoveredNode.name}
          </div>
          <div className={styles.tooltipType}>
            类型: {hoveredNode.type === 'note' ? '笔记页面' : '博客文章'}
          </div>
          <Link to={getNodeUrl(hoveredNode)} className={styles.tooltipLink}>
            查看详情
          </Link>
        </div>
      )}
      
      {selectedNode && (
        <div className={styles.nodeDetails}>
          <h4>{selectedNode.name}</h4>
          <p>类型: {selectedNode.type === 'note' ? '笔记页面' : '博客文章'}</p>
          <Link to={getNodeUrl(selectedNode)} className={styles.nodeLink}>
            打开页面
          </Link>
        </div>
      )}
    </div>
  );
} 