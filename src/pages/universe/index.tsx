import React, { useState, useEffect, useRef, useCallback } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useColorMode } from '@docusaurus/theme-common';

interface BlogPlanet {
  id: number;
  title: string;
  url: string;
  description: string;
  tags: string[];
  x: number;
  y: number;
  size: number;
  color: string;
}

const PLANET_COLORS = [
  '#7eb8da', '#f4a261', '#e76f51', '#2a9d8f', '#e9c46a',
  '#9b5de5', '#f15bb5', '#00bbf9', '#00f5d4', '#fee440'
];

function generatePlanets(blogs: BlogPlanet[]): BlogPlanet[] {
  const canvasWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const canvasHeight = typeof window !== 'undefined' ? window.innerHeight - 100 : 800;

  return blogs.map((blog, index) => {
    const angle = (index / blogs.length) * Math.PI * 2;
    const radius = Math.min(canvasWidth, canvasHeight) * 0.3;
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    return {
      ...blog,
      x: centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 50,
      y: centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 50,
      size: 20 + Math.random() * 30,
      color: PLANET_COLORS[index % PLANET_COLORS.length]
    };
  });
}

function PixelSpaceship({ x, y, angle }: { x: number; y: number; angle: number }) {
  return (
    <svg
      width="32"
      height="32"
      style={{
        position: 'absolute',
        left: x - 16,
        top: y - 16,
        transform: `rotate(${angle}deg)`,
        transition: 'all 0.1s ease-out',
        zIndex: 100,
        filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))'
      }}
      viewBox="0 0 16 16"
    >
      <rect x="6" y="2" width="4" height="2" fill="#fff" />
      <rect x="7" y="4" width="2" height="8" fill="#e0e0e0" />
      <rect x="4" y="6" width="2" height="4" fill="#ff6b6b" />
      <rect x="10" y="6" width="2" height="4" fill="#ff6b6b" />
      <rect x="5" y="12" width="2" height="2" fill="#ffeb3b" />
      <rect x="9" y="12" width="2" height="2" fill="#ffeb3b" />
    </svg>
  );
}

function Planet({ planet, onClick, isNear }: { planet: BlogPlanet; onClick: () => void; isNear: boolean }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        left: planet.x,
        top: planet.y,
        width: planet.size,
        height: planet.size,
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer',
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}88)`,
          boxShadow: isNear
            ? `0 0 20px ${planet.color}, 0 0 40px ${planet.color}66`
            : `0 0 10px ${planet.color}66`,
          transition: 'all 0.3s ease',
          imageRendering: 'pixelated',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -20,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '10px',
          color: 'var(--ifm-font-color-base)',
          whiteSpace: 'nowrap',
          opacity: isNear ? 1 : 0.7,
          fontFamily: 'monospace',
        }}
      >
        {planet.title.substring(0, 10)}
      </div>
    </div>
  );
}

function PlanetCard({ planet, onClose }: { planet: BlogPlanet; onClose: () => void }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'var(--ifm-background-color)',
        border: '2px solid var(--ifm-color-primary)',
        borderRadius: '8px',
        padding: '24px',
        maxWidth: '400px',
        width: '90%',
        zIndex: 1000,
        boxShadow: '0 0 40px rgba(0,0,0,0.3)',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          fontSize: '20px',
          cursor: 'pointer',
          color: 'var(--ifm-font-color-base)',
        }}
      >
        ×
      </button>
      <h3 style={{ marginTop: 0, fontFamily: 'var(--font-family-title)' }}>{planet.title}</h3>
      <p style={{ color: 'var(--ifm-color-emphasis-700)' }}>{planet.description}</p>
      <div style={{ marginBottom: '16px' }}>
        {planet.tags.map((tag) => (
          <span
            key={tag}
            style={{
              display: 'inline-block',
              background: 'var(--ifm-color-primary-lightest)',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              marginRight: '6px',
              marginBottom: '6px',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      <a
        href={planet.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          padding: '8px 16px',
          background: 'var(--ifm-color-primary)',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '14px',
        }}
      >
        Visit Blog →
      </a>
    </div>
  );
}

function UniverseContent() {
  const { colorMode } = useColorMode();
  const [blogs, setBlogs] = useState<BlogPlanet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shipPos, setShipPos] = useState({ x: 0, y: 0, angle: 0 });
  const [targetPlanet, setTargetPlanet] = useState<BlogPlanet | null>(null);
  const [showCard, setShowCard] = useState(false);
  const [nearestPlanet, setNearestPlanet] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const targetRef = useRef<{ x: number; y: number } | null>(null);

  // Fetch reviewed blogs from GitHub API
  // Issues that have a comment containing "reviewed" are considered approved
  useEffect(() => {
    async function fetchReviewedBlogs() {
      try {
        // First, get all open issues with "Blog Universe" in title
        const response = await fetch(
          'https://api.github.com/repos/Wjiajie/blog_ponder/issues?state=open&per_page=100'
        );
        if (!response.ok) throw new Error('Failed to fetch blogs');
        const issues = await response.json();

        // Filter to only include issues with "Blog Universe" in title
        const blogUniverseIssues = issues.filter((issue: any) =>
          issue.title.includes('[Blog Universe]')
        );

        // For each issue, check if it has a comment containing "reviewed"
        const blogData: BlogPlanet[] = [];
        for (const issue of blogUniverseIssues) {
          const commentsResponse = await fetch(
            `https://api.github.com/repos/Wjiajie/blog_ponder/issues/${issue.number}/comments`
          );
          if (commentsResponse.ok) {
            const comments = await commentsResponse.json();
            const hasReviewedComment = comments.some((comment: any) =>
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
                url: urlMatch ? urlMatch[1].trim() : '#',
                description: descMatch ? descMatch[1].trim() : '',
                tags: tagsMatch ? tagsMatch[1].split(',').map((t: string) => t.trim()) : [],
                x: 0,
                y: 0,
                size: 0,
                color: '',
              });
            }
          }
        }

        setBlogs(generatePlanets(blogData));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    fetchReviewedBlogs();
  }, []);

  // Initialize spaceship position
  useEffect(() => {
    if (blogs.length > 0 && typeof window !== 'undefined') {
      setShipPos({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        angle: 0,
      });
    }
  }, [blogs]);

  // Animation loop
  useEffect(() => {
    if (blogs.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const stars: { x: number; y: number; size: number; brightness: number }[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        brightness: Math.random(),
      });
    }

    let currentTargetIndex = Math.floor(Math.random() * blogs.length);
    targetRef.current = { x: blogs[currentTargetIndex].x, y: blogs[currentTargetIndex].y };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach((star) => {
        const flicker = 0.5 + Math.sin(Date.now() * 0.001 + star.brightness * 10) * 0.5;
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness * flicker * 0.8})`;
        ctx.fillRect(star.x, star.y, star.size, star.size);
      });

      // Update spaceship position
      if (targetRef.current) {
        const dx = targetRef.current.x - shipPos.x;
        const dy = targetRef.current.y - shipPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 5) {
          const speed = 1.5;
          const newAngle = Math.atan2(dy, dx) * (180 / Math.PI);
          setShipPos((prev) => ({
            x: prev.x + (dx / distance) * speed,
            y: prev.y + (dy / distance) * speed,
            angle: newAngle + 90,
          }));
        } else {
          // Reached target, pick new target after delay
          setTimeout(() => {
            currentTargetIndex = Math.floor(Math.random() * blogs.length);
            targetRef.current = {
              x: blogs[currentTargetIndex].x,
              y: blogs[currentTargetIndex].y,
            };
          }, 2000 + Math.random() * 3000);
        }
      }

      // Check nearest planet
      let nearest = -1;
      let minDist = Infinity;
      blogs.forEach((planet, index) => {
        const dist = Math.sqrt(
          Math.pow(planet.x - shipPos.x, 2) + Math.pow(planet.y - shipPos.y, 2)
        );
        if (dist < minDist) {
          minDist = dist;
          nearest = index;
        }
      });
      setNearestPlanet(nearest);

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - 100;
      // Regenerate stars on resize
      stars.length = 0;
      for (let i = 0; i < 200; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          brightness: Math.random(),
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [blogs, shipPos.x, shipPos.y]);

  const handlePlanetClick = (planet: BlogPlanet) => {
    setTargetPlanet(planet);
    setShowCard(true);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <div style={{ fontSize: '24px', marginBottom: '20px' }}>Loading Universe...</div>
        <p style={{ opacity: 0.6 }}>Fetching reviewed blogs from the cosmos</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: '#e76f51' }}>
        <div style={{ fontSize: '24px', marginBottom: '20px' }}>Failed to load universe</div>
        <p>{error}</p>
        <p style={{ opacity: 0.6, marginTop: '20px' }}>
          Make sure the blog has been reviewed and labeled with "reviewed"
        </p>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <div style={{ fontSize: '24px', marginBottom: '20px' }}>The Universe is Empty</div>
        <p style={{ opacity: 0.6, marginBottom: '30px' }}>
          No blogs have been reviewed yet. Be the first to join the universe!
        </p>
        <a
          href="/universe/submit"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: 'var(--ifm-color-primary)',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '4px',
          }}
        >
          Submit Your Blog →
        </a>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: 'calc(100vh - 100px)', overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />

      {blogs.map((planet) => (
        <Planet
          key={planet.id}
          planet={planet}
          onClick={() => handlePlanetClick(planet)}
          isNear={nearestPlanet !== null && blogs[nearestPlanet]?.id === planet.id}
        />
      ))}

      <PixelSpaceship x={shipPos.x} y={shipPos.y} angle={shipPos.angle} />

      {showCard && targetPlanet && (
        <>
          <div
            onClick={() => setShowCard(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 999,
            }}
          />
          <PlanetCard planet={targetPlanet} onClose={() => setShowCard(false)} />
        </>
      )}

      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          opacity: 0.6,
          fontSize: '12px',
        }}
      >
        <a href="/universe/submit" style={{ color: 'var(--ifm-font-color-base)', marginRight: '20px' }}>
          + Submit Your Blog
        </a>
        <span>Spaceship visits planets automatically • Click to explore</span>
      </div>
    </div>
  );
}

export default function UniversePage() {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => <UniverseContent />}
    </BrowserOnly>
  );
}
