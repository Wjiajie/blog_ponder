import React, { useState, useEffect, useRef, useMemo } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface BlogPlanet {
  id: number;
  title: string;
  url: string;
  description: string;
  tags: string[];
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
}

interface Galaxy {
  id: string;
  name: string;
  planets: BlogPlanet[];
  position: [number, number, number];
  color: string;
  scale: number;
  shape: 'spiral' | 'ring' | 'sphere' | 'cluster' | 'disc' | 'binary';
}

const PLANET_COLORS = [
  '#7eb8da', '#f4a261', '#e76f51', '#2a9d8f', '#e9c46a',
  '#9b5de5', '#f15bb5', '#00bbf9', '#00f5d4', '#fee440'
];

const GALAXY_COLORS = [
  '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7',
  '#dfe6e9', '#a29bfe', '#fd79a8', '#00b894', '#e17055'
];

type GalaxyShape = 'spiral' | 'ring' | 'sphere' | 'cluster' | 'disc' | 'binary';

function generatePlanetsForGalaxy(blogs: BlogPlanet[], centerX: number, centerY: number, centerZ: number, scale: number, shape: GalaxyShape): BlogPlanet[] {
  return blogs.map((blog, index) => {
    let x = 0, y = 0, z = 0;
    const baseScale = 3 * scale;

    switch (shape) {
      case 'spiral':
        // Spiral arm distribution
        const spiralAngle = (index / blogs.length) * Math.PI * 4 + (index * 0.5);
        const spiralRadius = (1 + index / blogs.length * 2) * baseScale;
        x = centerX + Math.cos(spiralAngle) * spiralRadius + (Math.random() - 0.5) * baseScale * 0.3;
        y = centerY + (Math.random() - 0.5) * baseScale * 0.5;
        z = centerZ + Math.sin(spiralAngle) * spiralRadius + (Math.random() - 0.5) * baseScale * 0.3;
        break;

      case 'ring':
        // Ring/disc distribution
        const ringAngle = (index / blogs.length) * Math.PI * 2;
        const ringRadius = (1.5 + Math.random() * 1.5) * baseScale;
        x = centerX + Math.cos(ringAngle) * ringRadius;
        y = centerY + (Math.random() - 0.5) * baseScale * 0.2;
        z = centerZ + Math.sin(ringAngle) * ringRadius;
        break;

      case 'sphere':
        // Spherical cluster
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const sphereRadius = Math.random() * baseScale * 1.5;
        x = centerX + sphereRadius * Math.sin(phi) * Math.cos(theta);
        y = centerY + sphereRadius * Math.sin(phi) * Math.sin(theta);
        z = centerZ + sphereRadius * Math.cos(phi);
        break;

      case 'cluster':
        // Random cluster with some structure
        const clusterAngle = Math.random() * Math.PI * 2;
        const clusterDist = Math.pow(Math.random(), 0.5) * baseScale * 1.2;
        x = centerX + Math.cos(clusterAngle) * clusterDist;
        y = centerY + (Math.random() - 0.5) * baseScale;
        z = centerZ + Math.sin(clusterAngle) * clusterDist;
        break;

      case 'disc':
        // Flat disc distribution
        const discAngle = (index / blogs.length) * Math.PI * 2 + Math.random() * 0.3;
        const discRadius = (0.5 + Math.random() * 2) * baseScale;
        x = centerX + Math.cos(discAngle) * discRadius;
        y = centerY + (Math.random() - 0.5) * baseScale * 0.1;
        z = centerZ + Math.sin(discAngle) * discRadius;
        break;

      case 'binary':
        // Two cluster centers
        const binaryIndex = index % 2;
        const binaryOffset = binaryIndex === 0 ? -baseScale * 0.8 : baseScale * 0.8;
        const binaryAngle = Math.random() * Math.PI * 2;
        const binaryDist = Math.random() * baseScale * 0.5;
        x = centerX + binaryOffset + Math.cos(binaryAngle) * binaryDist;
        y = centerY + (Math.random() - 0.5) * baseScale * 0.8;
        z = centerZ + Math.sin(binaryAngle) * binaryDist;
        break;

      default:
        x = centerX + (Math.random() - 0.5) * baseScale * 2;
        y = centerY + (Math.random() - 0.5) * baseScale;
        z = centerZ + (Math.random() - 0.5) * baseScale * 2;
    }

    return {
      ...blog,
      x,
      y,
      z,
      size: (0.25 + Math.random() * 0.3) * scale,
      color: PLANET_COLORS[index % PLANET_COLORS.length]
    };
  });
}

function groupBlogsIntoGalaxies(blogs: BlogPlanet[]): Galaxy[] {
  // First, collect all unique tags and their planets
  const tagGroups: Record<string, BlogPlanet[]> = {};

  blogs.forEach(blog => {
    blog.tags.forEach(tag => {
      if (!tagGroups[tag]) {
        tagGroups[tag] = [];
      }
      if (!tagGroups[tag].find(p => p.id === blog.id)) {
        tagGroups[tag].push(blog);
      }
    });

    if (blog.tags.length === 0) {
      if (!tagGroups['uncategorized']) {
        tagGroups['uncategorized'] = [];
      }
      tagGroups['uncategorized'].push(blog);
    }
  });

  const tagNames = Object.keys(tagGroups);
  const shapes: GalaxyShape[] = ['spiral', 'ring', 'sphere', 'cluster', 'disc', 'binary'];

  const galaxies: Galaxy[] = tagNames.map((name, index) => {
    const planets = tagGroups[name];
    const totalGalaxies = tagNames.length;

    // Spherical distribution with golden angle
    const phi = Math.PI * (3 - Math.sqrt(5));
    const y = 1 - (index / Math.max(totalGalaxies - 1, 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = phi * index;

    const baseRadius = 20 + Math.random() * 10;
    const x = Math.cos(theta) * radiusAtY * baseRadius;
    const z = Math.sin(theta) * radiusAtY * baseRadius;

    const noise = 5;
    const position: [number, number, number] = [
      x + (Math.random() - 0.5) * noise,
      y * baseRadius * 0.5 + (Math.random() - 0.5) * noise,
      z + (Math.random() - 0.5) * noise
    ];

    const scale = Math.max(0.6, Math.min(1.5, 1 / Math.sqrt(planets.length)));
    const shape = shapes[index % shapes.length];

    return {
      id: name,
      name,
      planets,
      position,
      color: GALAXY_COLORS[index % GALAXY_COLORS.length],
      scale,
      shape
    };
  });

  return galaxies;
}

// Planet type styles
type PlanetStyle = 'rocky' | 'gas' | 'ice' | 'volcanic' | 'ocean' | 'desert';

function getPlanetStyle(color: string): PlanetStyle {
  const styles: PlanetStyle[] = ['rocky', 'gas', 'ice', 'volcanic', 'ocean', 'desert'];
  const index = color.charCodeAt(1) % styles.length;
  return styles[index];
}

// 3D Planet with rich visuals
function Planet({ planet, onClick, isNear }: { planet: BlogPlanet; onClick: () => void; isNear: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const planetStyle = getPlanetStyle(planet.color);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.001;
    }
  });

  const renderPlanetDetails = () => {
    switch (planetStyle) {
      case 'gas':
        return (
          <mesh position={[0, 0, 0]} scale={[0.95, 1, 0.95]}>
            <torusGeometry args={[planet.size * 0.7, planet.size * 0.15, 2, 32]} />
            <meshStandardMaterial
              color={planet.color}
              emissive={planet.color}
              emissiveIntensity={0.1}
              transparent
              opacity={0.6}
            />
          </mesh>
        );
      case 'ice':
        return (
          <mesh rotation={[Math.PI / 2.5, 0, 0]}>
            <ringGeometry args={[planet.size * 1.2, planet.size * 1.5, 32]} />
            <meshStandardMaterial
              color={planet.color}
              emissive={planet.color}
              emissiveIntensity={0.2}
              side={THREE.DoubleSide}
              transparent
              opacity={0.5}
            />
          </mesh>
        );
      case 'volcanic':
        return (
          <pointLight
            position={[planet.size * 0.8, planet.size * 0.5, 0]}
            color="#ff4400"
            intensity={isNear ? 1 : 0.3}
            distance={2}
          />
        );
      case 'ocean':
        return (
          <pointLight
            position={[0, planet.size + 0.5, 0]}
            color="#00ffff"
            intensity={isNear ? 0.8 : 0.2}
            distance={3}
          />
        );
      default:
        return null;
    }
  };

  return (
    <group position={[planet.x, planet.y, planet.z]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh ref={atmosphereRef}>
          <sphereGeometry args={[planet.size * 1.15, 16, 16]} />
          <meshStandardMaterial
            color={planet.color}
            transparent
            opacity={0.2}
            side={THREE.BackSide}
          />
        </mesh>

        <mesh
          ref={meshRef}
          onClick={onClick}
          onPointerOver={() => document.body.style.cursor = 'pointer'}
          onPointerOut={() => document.body.style.cursor = 'auto'}
        >
          <sphereGeometry args={[planet.size, 24, 24]} />
          <meshStandardMaterial
            color={planet.color}
            emissive={planet.color}
            emissiveIntensity={isNear ? 0.6 : 0.25}
            roughness={planetStyle === 'ice' ? 0.2 : 0.7}
            metalness={planetStyle === 'gas' ? 0.3 : 0.1}
          />
        </mesh>

        {renderPlanetDetails()}

        {isNear && (
          <pointLight
            color={planet.color}
            intensity={2}
            distance={5}
          />
        )}
      </Float>

      <Text
        position={[0, -planet.size - 0.25, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.015}
        outlineColor="#000000"
      >
        {planet.title}
      </Text>
    </group>
  );
}

// Galaxy visualization (central marker)
function GalaxyMarker({ galaxy, onClick, isSelected }: { galaxy: Galaxy; onClick: () => void; isSelected: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group
      ref={groupRef}
      position={galaxy.position}
      onClick={onClick}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'auto'}
    >
      {/* Central glow */}
      <mesh>
        <sphereGeometry args={[1.5 * galaxy.scale, 16, 16]} />
        <meshStandardMaterial
          color={galaxy.color}
          emissive={galaxy.color}
          emissiveIntensity={isSelected ? 1 : 0.5}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Core */}
      <mesh>
        <sphereGeometry args={[0.5 * galaxy.scale, 16, 16]} />
        <meshStandardMaterial
          color={galaxy.color}
          emissive={galaxy.color}
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Orbiting particles */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const orbitRadius = 2 * galaxy.scale;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * orbitRadius,
              0,
              Math.sin(angle) * orbitRadius
            ]}
          >
            <sphereGeometry args={[0.1 * galaxy.scale, 8, 8]} />
            <meshStandardMaterial
              color={galaxy.color}
              emissive={galaxy.color}
              emissiveIntensity={0.5}
            />
          </mesh>
        );
      })}

      <Text
        position={[0, 2 * galaxy.scale, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#000000"
      >
        {galaxy.name}
      </Text>

      <Text
        position={[0, -2.5 * galaxy.scale, 0]}
        fontSize={0.3}
        color="#aaaaaa"
        anchorX="center"
        anchorY="middle"
      >
        {galaxy.planets.length} planets
      </Text>
    </group>
  );
}

// Pixel-style spaceship
function Spaceship({ position, rotation }: { position: [number, number, number]; rotation: number }) {
  return (
    <group position={position} rotation={[0, rotation * (Math.PI / 180), 0]}>
      <Float speed={3} rotationIntensity={0.1} floatIntensity={0.1}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.2, 0.15, 0.4]} />
          <meshStandardMaterial color="#e0e0e0" />
        </mesh>
        <mesh position={[0.2, 0, 0]}>
          <boxGeometry args={[0.15, 0.05, 0.2]} />
          <meshStandardMaterial color="#ff6b6b" />
        </mesh>
        <mesh position={[-0.2, 0, 0]}>
          <boxGeometry args={[0.15, 0.05, 0.2]} />
          <meshStandardMaterial color="#ff6b6b" />
        </mesh>
        <mesh position={[0, 0, 0.25]}>
          <boxGeometry args={[0.08, 0.08, 0.1]} />
          <meshStandardMaterial color="#ffeb3b" emissive="#ffeb3b" emissiveIntensity={1} />
        </mesh>
        <mesh position={[0, 0.1, -0.05]}>
          <boxGeometry args={[0.1, 0.08, 0.15]} />
          <meshStandardMaterial color="#87ceeb" emissive="#87ceeb" emissiveIntensity={0.3} />
        </mesh>
      </Float>
    </group>
  );
}

// Camera controller
function CameraController({ target, enabled, shipPos, showGalaxyView, isNavigating }: { target: [number, number, number]; enabled: boolean; shipPos?: { x: number; y: number; z: number }; showGalaxyView?: boolean; isNavigating?: boolean }) {
  const { camera } = useThree();

  // Set initial camera for galaxy view only once
  useEffect(() => {
    if (showGalaxyView) {
      camera.position.set(0, 30, 60);
      camera.lookAt(0, 0, 0);
    }
  }, [camera, showGalaxyView]);

  // Smooth camera animation when NOT using orbit controls
  useFrame(() => {
    if (showGalaxyView) {
      // Galaxy view - stay at overview
      camera.position.lerp(new THREE.Vector3(0, 30, 60), 0.05);
      camera.lookAt(0, 0, 0);
    } else if (!enabled && shipPos && isNavigating) {
      // Follow ship when navigating - only when controls are disabled
      camera.position.lerp(new THREE.Vector3(shipPos.x, shipPos.y + 8, shipPos.z + 12), 0.05);
      camera.lookAt(shipPos.x, shipPos.y, shipPos.z);
    }
    // When enabled (orbit controls active), don't override camera
  });

  return null;
}

// Scene content
function Scene({
  galaxies,
  currentGalaxy,
  shipPos,
  shipAngle,
  targetPlanet,
  nearestPlanet,
  onPlanetClick,
  onGalaxyClick,
  isNavigating,
  targetPos,
  showGalaxyView,
  cameraTarget,
  enableControls
}: {
  galaxies: Galaxy[];
  currentGalaxy: Galaxy | null;
  shipPos: { x: number; y: number; z: number };
  shipAngle: number;
  targetPlanet: BlogPlanet | null;
  nearestPlanet: number | null;
  onPlanetClick: (planet: BlogPlanet) => void;
  onGalaxyClick: (galaxy: Galaxy) => void;
  isNavigating: boolean;
  targetPos: { x: number; y: number; z: number } | null;
  showGalaxyView: boolean;
  cameraTarget: [number, number, number];
  enableControls: boolean;
}) {
  return (
    <>
      <CameraController target={cameraTarget} enabled={enableControls} shipPos={shipPos} showGalaxyView={showGalaxyView} isNavigating={isNavigating} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4444ff" />

      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />

      {/* Galaxy markers (only show in galaxy view) */}
      {showGalaxyView && galaxies.map((galaxy) => (
        <GalaxyMarker
          key={galaxy.id}
          galaxy={galaxy}
          onClick={() => onGalaxyClick(galaxy)}
          isSelected={currentGalaxy?.id === galaxy.id}
        />
      ))}

      {/* Planets (only show for current galaxy) */}
      {!showGalaxyView && currentGalaxy && currentGalaxy.planets.map((planet, index) => (
        <Planet
          key={planet.id}
          planet={planet}
          onClick={() => onPlanetClick(planet)}
          isNear={nearestPlanet !== null && currentGalaxy.planets[nearestPlanet]?.id === planet.id}
        />
      ))}

      <Spaceship
        position={[shipPos.x, shipPos.y, shipPos.z]}
        rotation={shipAngle}
      />

      {(enableControls || showGalaxyView) && (
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={showGalaxyView ? 15 : 3}
          maxDistance={showGalaxyView ? 150 : 60}
          target={showGalaxyView ? [0, 0, 0] : cameraTarget}
        />
      )}
    </>
  );
}

function UniverseContent() {
  const [allBlogs, setAllBlogs] = useState<BlogPlanet[]>([]);
  const [galaxies, setGalaxies] = useState<Galaxy[]>([]);
  const [currentGalaxy, setCurrentGalaxy] = useState<Galaxy | null>(null);
  const [showGalaxyView, setShowGalaxyView] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shipPos, setShipPos] = useState({ x: 0, y: 0, z: 0 });
  const [shipAngle, setShipAngle] = useState(0);
  const [targetPlanet, setTargetPlanet] = useState<BlogPlanet | null>(null);
  const [showCard, setShowCard] = useState(false);
  const [nearestPlanet, setNearestPlanet] = useState<number | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [targetPos, setTargetPos] = useState<{ x: number; y: number; z: number } | null>(null);
  const [cameraTarget, setCameraTarget] = useState<[number, number, number]>([0, 0, 0]);
  const [enableControls, setEnableControls] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const driftAngleRef = useRef(Math.random() * Math.PI * 2);
  const animationRef = useRef<number>();

  // Fetch reviewed blogs from API
  useEffect(() => {
    async function fetchReviewedBlogs() {
      try {
        // Determine API base URL based on environment
        const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
        const isLocalDev = hostname === 'localhost' || hostname === '127.0.0.1';
        const API_BASE = isLocalDev ? 'http://localhost:3001' : '/api';

        const response = await fetch(`${API_BASE}/universe-blogs`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch blogs');
        }

        const data = await response.json();
        const blogs = data.blogs || [];

        const blogData: BlogPlanet[] = blogs.map((blog: any) => ({
          id: blog.id,
          title: blog.title,
          url: blog.url,
          description: blog.description,
          tags: blog.tags ? blog.tags.split(',').map((t: string) => t.trim()) : [],
          x: 0,
          y: 0,
          z: 0,
          size: 0,
          color: '',
        }));

        setAllBlogs(blogData);

        // Group into galaxies
        const galaxyData = groupBlogsIntoGalaxies(blogData);
        setGalaxies(galaxyData);

        if (galaxyData.length > 0) {
          // Keep showGalaxyView true initially to show the galaxy overview
          // User can click on a galaxy to enter it
        }
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
    if (currentGalaxy && !showGalaxyView) {
      const centerX = currentGalaxy.position[0];
      const centerZ = currentGalaxy.position[2];
      setShipPos({
        x: centerX,
        y: 2,
        z: centerZ + 8
      });
    }
  }, [currentGalaxy, showGalaxyView]);

  // Update planets when galaxy changes
  useEffect(() => {
    if (currentGalaxy && !showGalaxyView) {
      const updatedPlanets = generatePlanetsForGalaxy(
        currentGalaxy.planets,
        currentGalaxy.position[0],
        currentGalaxy.position[1],
        currentGalaxy.position[2],
        currentGalaxy.scale,
        currentGalaxy.shape
      );
      setCurrentGalaxy({
        ...currentGalaxy,
        planets: updatedPlanets
      });

      // Set camera to view entire galaxy
      const distance = Math.max(15, currentGalaxy.planets.length * 0.5);
      setCameraTarget([currentGalaxy.position[0], 0, currentGalaxy.position[2]]);
    }
  }, [currentGalaxy?.name]);

  // Animation loop
  useEffect(() => {
    if (galaxies.length === 0) return;

    const animate = () => {
      // In galaxy view and not navigating, ship stays at center
      if (showGalaxyView && !isNavigating) {
        setShipPos({ x: 0, y: 0, z: 0 });
      } else if (currentGalaxy) {
        // Navigation mode
        if (isNavigating && targetPos) {
          const dx = targetPos.x - shipPos.x;
          const dy = targetPos.y - shipPos.y;
          const dz = targetPos.z - shipPos.z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance > 0.3) {
            // Different speed for different distances
            const speed = distance > 10 ? 0.3 : 0.15;
            const newAngle = Math.atan2(dx, dz) * (180 / Math.PI);
            setShipAngle(newAngle + 180);

            setShipPos((prev) => ({
              x: prev.x + (dx / distance) * speed,
              y: prev.y + (dy / distance) * speed,
              z: prev.z + (dz / distance) * speed,
            }));
          } else {
            // Arrived at target
            setShipPos({
              x: targetPos.x,
              y: targetPos.y,
              z: targetPos.z,
            });
            if (!showCard && targetPlanet) {
              setShowCard(true);
              setEnableControls(true);
            }
          }
        } else {
          // Explore mode within galaxy
          const speed = 0.03;
          driftAngleRef.current += (Math.random() - 0.5) * 0.02;

          const centerX = currentGalaxy.position[0];
          const centerZ = currentGalaxy.position[2];
          const boundary = 8 * currentGalaxy.scale;

          const relativeX = shipPos.x - centerX;
          const relativeZ = shipPos.z - centerZ;

          if (Math.abs(relativeX) > boundary) {
            driftAngleRef.current = Math.PI - driftAngleRef.current;
          }
          if (Math.abs(relativeZ) > boundary) {
            driftAngleRef.current = -driftAngleRef.current;
          }

          setShipAngle(driftAngleRef.current * (180 / Math.PI) + 180);

          setShipPos((prev) => ({
            x: prev.x + Math.cos(driftAngleRef.current) * speed,
            y: prev.y + Math.sin(driftAngleRef.current * 0.5) * speed * 0.3,
            z: prev.z + Math.sin(driftAngleRef.current) * speed,
          }));
        }

        // Check nearest planet
        let nearest = -1;
        let minDist = Infinity;
        currentGalaxy.planets.forEach((planet, index) => {
          const dist = Math.sqrt(
            Math.pow(planet.x - shipPos.x, 2) +
            Math.pow(planet.y - shipPos.y, 2) +
            Math.pow(planet.z - shipPos.z, 2)
          );
          if (dist < minDist) {
            minDist = dist;
            nearest = index;
          }
        });
        setNearestPlanet(nearest);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [galaxies, currentGalaxy, showGalaxyView, isNavigating, targetPos, shipPos.x, shipPos.y, shipPos.z, showCard, targetPlanet]);

  const handleGalaxyClick = (galaxy: Galaxy) => {
    // Save current galaxy position for ship to fly to
    const targetX = galaxy.position[0];
    const targetY = galaxy.position[1];
    const targetZ = galaxy.position[2];

    setCurrentGalaxy(galaxy);
    setShowGalaxyView(false);
    setShowCard(false);
    setIsNavigating(true); // Start navigating
    setTargetPos({ x: targetX, y: targetY, z: targetZ });
    setTargetPlanet(null);
    setEnableControls(false);
    setIsTransitioning(true);

    // After arriving at galaxy, enable controls
    setTimeout(() => {
      setIsNavigating(false);
      setTargetPos(null);
      setEnableControls(true); // Enable mouse controls
      setIsTransitioning(false);
      setCameraTarget([galaxy.position[0], galaxy.position[1], galaxy.position[2]]);
    }, 2500);
  };

  const handlePlanetClick = (planet: BlogPlanet) => {
    setTargetPos({ x: planet.x, y: planet.y, z: planet.z });
    setTargetPlanet(planet);
    setIsNavigating(true);
    setEnableControls(false);
  };

  const handleCloseCard = () => {
    setShowCard(false);
    setIsNavigating(false);
    setTargetPos(null);
    setTargetPlanet(null);
    setEnableControls(true);
  };

  const handleBackToGalaxy = () => {
    setIsTransitioning(true);
    setShowGalaxyView(true);
    setShowCard(false);
    setIsNavigating(false);
    setTargetPos(null);
    setTargetPlanet(null);
    setEnableControls(false);
    setShipPos({ x: 0, y: 0, z: 0 });
    setShipAngle(0);

    // End transition after animation
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
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
      </div>
    );
  }

  if (galaxies.length === 0) {
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
    <div style={{ position: 'relative', width: '100%', height: 'calc(100vh - 100px)' }}>
      <Canvas
        camera={{ position: [0, 15, 30], fov: 60 }}
        style={{ background: '#0a0a1a' }}
      >
        <Scene
          galaxies={galaxies}
          currentGalaxy={currentGalaxy}
          shipPos={shipPos}
          shipAngle={shipAngle}
          targetPlanet={targetPlanet}
          nearestPlanet={nearestPlanet}
          onPlanetClick={handlePlanetClick}
          onGalaxyClick={handleGalaxyClick}
          isNavigating={isNavigating}
          targetPos={targetPos}
          showGalaxyView={showGalaxyView}
          cameraTarget={cameraTarget}
          enableControls={enableControls}
        />
      </Canvas>

      {/* Galaxy selector */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        zIndex: 100
      }}>
        {/* Home button - always visible */}
        <a
          href="/"
          style={{
            padding: '8px 16px',
            background: 'rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '4px',
            color: 'white',
            textDecoration: 'none',
            fontSize: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          🏠 Home
        </a>
        {!showGalaxyView && (
          <button
            onClick={handleBackToGalaxy}
            style={{
              padding: '8px 16px',
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '4px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            ← Back to Galaxies
          </button>
        )}
        <div style={{
          padding: '8px 12px',
          background: 'rgba(0,0,0,0.6)',
          borderRadius: '4px',
          color: 'white',
          fontSize: '12px',
        }}>
          {showGalaxyView ? 'Select a Galaxy' : `Galaxy: ${currentGalaxy?.name}`}
        </div>
      </div>

      {/* Galaxy list */}
      {showGalaxyView && (
        <div style={{
          position: 'absolute',
          bottom: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxWidth: '80%',
          zIndex: 100
        }}>
          {galaxies.map((galaxy) => (
            <button
              key={galaxy.id}
              onClick={() => handleGalaxyClick(galaxy)}
              style={{
                padding: '10px 20px',
                background: `${galaxy.color}33`,
                border: `2px solid ${galaxy.color}`,
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: '100px',
              }}
            >
              <span style={{ fontWeight: 'bold' }}>{galaxy.name}</span>
              <span style={{ fontSize: '11px', opacity: 0.7 }}>{galaxy.planets.length} planets</span>
            </button>
          ))}
        </div>
      )}

      {/* Planet card */}
      {showCard && targetPlanet && (
        <>
          <div
            onClick={handleCloseCard}
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
          <PlanetCard planet={targetPlanet} onClose={handleCloseCard} />
        </>
      )}

      {/* Controls hint */}
      {!showGalaxyView && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            opacity: 0.6,
            fontSize: '12px',
            color: 'white',
          }}
        >
          {enableControls ? (
            <span>Drag to rotate • Scroll to zoom • Click planet to visit</span>
          ) : (
            <span>Click on a planet to visit • Back to Galaxies above</span>
          )}
        </div>
      )}

      {/* Submit link */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          fontSize: '12px',
        }}
      >
        <a href="/universe/submit" style={{ color: 'rgba(255,255,255,0.5)' }}>
          + Submit Your Blog
        </a>
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
        OnBoard →
      </a>
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
