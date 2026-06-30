'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
}

interface Node {
  x: number;
  y: number;
  connections: number[];
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const nodesRef = useRef<Node[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = ['#38BDF8', '#06B6D4', '#22C55E', '#818CF8'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      const count = Math.min(Math.floor(window.innerWidth / 8), 120);
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
      }));

      // Infrastructure nodes
      const nodeCount = 8;
      nodesRef.current = Array.from({ length: nodeCount }, (_, i) => ({
        x: (canvas.width / (nodeCount + 1)) * (i + 1),
        y: canvas.height * (0.3 + Math.random() * 0.4),
        connections: [],
      }));
      nodesRef.current.forEach((node, i) => {
        const maxConns = 2;
        let conns = 0;
        nodesRef.current.forEach((other, j) => {
          if (i !== j && conns < maxConns && Math.abs(i - j) <= 2) {
            node.connections.push(j);
            conns++;
          }
        });
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          p.vx += (dx / dist) * force * 0.05;
          p.vy += (dy / dist) * force * 0.05;
        }

        // Dampen velocity
        p.vx *= 0.99;
        p.vy *= 0.99;

        const pulsedOpacity = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));
        const pulsedSize = p.size * (0.8 + 0.2 * Math.sin(p.pulse));

        ctx.beginPath();
        ctx.arc(p.x, p.y, pulsedSize, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(pulsedOpacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });

      // Draw connections between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56,189,248,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw infrastructure nodes
      nodes.forEach((node, i) => {
        const time = Date.now() * 0.001;
        const floatY = Math.sin(time + i) * 15;

        // Node connections
        node.connections.forEach((j) => {
          const other = nodes[j];
          const gradient = ctx.createLinearGradient(
            node.x, node.y + floatY,
            other.x, other.y + Math.sin(time + j) * 15
          );
          gradient.addColorStop(0, 'rgba(56,189,248,0.2)');
          gradient.addColorStop(1, 'rgba(6,182,212,0.1)');

          ctx.beginPath();
          ctx.moveTo(node.x, node.y + floatY);
          ctx.lineTo(other.x, other.y + Math.sin(time + j) * 15);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 8]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Traveling data packet
          const progress = (Math.sin(time * 0.5 + i * 0.5) + 1) / 2;
          const px = node.x + (other.x - node.x) * progress;
          const py = (node.y + floatY) + ((other.y + Math.sin(time + j) * 15) - (node.y + floatY)) * progress;
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(56,189,248,0.8)';
          ctx.fill();
        });

        // Node circle
        const pulse = (Math.sin(time * 2 + i) + 1) / 2;
        ctx.beginPath();
        ctx.arc(node.x, node.y + floatY, 6 + pulse * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56,189,248,${0.6 + pulse * 0.4})`;
        ctx.fill();

        // Outer ring
        ctx.beginPath();
        ctx.arc(node.x, node.y + floatY, 12, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56,189,248,${0.15 + pulse * 0.15})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
}
