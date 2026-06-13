import React, { useEffect, useRef } from 'react';

const MeshBackground = () => {
  const containerRef = useRef(null);
  const starsCanvasRef = useRef(null);

  // Handle mouse spotlight positioning
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      container.style.setProperty('--mouse-x', `${x}px`);
      container.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Handle background stars/particles animation
  useEffect(() => {
    const canvas = starsCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let stars = [];
    const numStars = 75;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      initStars(rect.width, rect.height);
    };

    const initStars = (width, height) => {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.1 + 0.3,
          alpha: Math.random() * 0.45 + 0.08,
          speed: Math.random() * 0.006 + 0.002,
          dir: Math.random() > 0.5 ? 1 : -1,
          color: Math.random() > 0.5 ? 'rgba(124, 58, 237,' : 'rgba(6, 182, 212,', // purple or cyan tint
          driftY: -(Math.random() * 0.12 + 0.03), // slow upward drift
        });
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        // Slow upward drift
        star.y += star.driftY;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        // Star glow breathe
        star.alpha += star.speed * star.dir;
        if (star.alpha > 0.6) {
          star.alpha = 0.6;
          star.dir = -1;
        } else if (star.alpha < 0.05) {
          star.alpha = 0.05;
          star.dir = 1;
        }

        ctx.fillStyle = `${star.color}${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-50 overflow-hidden bg-light-bg dark:bg-dark-bg transition-colors duration-500"
      style={{
        '--mouse-x': '-500px',
        '--mouse-y': '-500px',
      }}
    >
      {/* Background Gradient Mesh Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 dark:opacity-65">
        {/* Purple Blob (Left) */}
        <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] min-w-[350px] min-h-[350px] rounded-full bg-primary/20 blur-[120px] md:blur-[160px] animate-float-purple" />
        
        {/* Cyan Blob (Right) */}
        <div className="absolute bottom-[10%] right-[-10%] w-[50vw] h-[50vw] min-w-[350px] min-h-[350px] rounded-full bg-secondary/15 blur-[120px] md:blur-[160px] animate-float-cyan" />
        
        {/* Extra subtle central blending blob */}
        <div className="absolute top-[35%] left-[25%] w-[40vw] h-[40vw] rounded-full bg-primary/10 dark:bg-primary/5 blur-[100px] md:blur-[140px] animate-pulse duration-[10000ms]" />
      </div>

      {/* Floating Canvas Stars / Particle Layer */}
      <canvas
        ref={starsCanvasRef}
        className="absolute inset-0 pointer-events-none opacity-35 dark:opacity-55"
      />

      {/* Interactive Mouse Spotlight Glow */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 400px at var(--mouse-x) var(--mouse-y), rgba(124, 58, 237, 0.08) 0%, rgba(6, 182, 212, 0.05) 50%, transparent 100%)`,
        }}
      />
      
      {/* Grid overlay for a premium Apple/Linear feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70" />
    </div>
  );
};

export default MeshBackground;
