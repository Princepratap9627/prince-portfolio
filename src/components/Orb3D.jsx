import React, { useEffect, useRef } from 'react';

const Orb3D = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovering: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let time = 0;

    // Handle high DPI displays with safety checks
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse positioning relative to canvas center
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Normalize coordinate offsets (-1 to 1)
      mouseRef.current.targetX = (e.clientX - centerX) / (rect.width / 2);
      mouseRef.current.targetY = (e.clientY - centerY) / (rect.height / 2);
      mouseRef.current.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      mouseRef.current.isHovering = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Render loop
    const render = () => {
      time += 0.01;
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const radius = Math.min(width, height) * 0.38;

      // Safety check: if canvas has no size, wait for next frame
      if (radius < 5 || !isFinite(radius)) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation with finite safety guards
      const mouse = mouseRef.current;
      if (!isFinite(mouse.targetX)) mouse.targetX = 0;
      if (!isFinite(mouse.targetY)) mouse.targetY = 0;
      if (!isFinite(mouse.x)) mouse.x = 0;
      if (!isFinite(mouse.y)) mouse.y = 0;

      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Gentle vertical float animation
      const floatY = Math.sin(time * 1.5) * 12;
      const currentCy = cy + floatY;

      // 1. BACKGLOWS (Drawn outside the orb for lighting dispersion)
      ctx.save();
      
      // Purple glow (left-ish)
      const purpleGlow = ctx.createRadialGradient(
        cx - radius * 0.4 + mouse.x * 20, 
        currentCy - radius * 0.2 + mouse.y * 20, 
        0, 
        cx - radius * 0.4 + mouse.x * 20, 
        currentCy - radius * 0.2 + mouse.y * 20, 
        radius * 2.2
      );
      purpleGlow.addColorStop(0, 'rgba(124, 58, 237, 0.25)');
      purpleGlow.addColorStop(0.5, 'rgba(124, 58, 237, 0.05)');
      purpleGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = purpleGlow;
      ctx.beginPath();
      ctx.arc(cx + mouse.x * 10, currentCy + mouse.y * 10, radius * 2.2, 0, Math.PI * 2);
      ctx.fill();

      // Cyan glow (right-ish)
      const cyanGlow = ctx.createRadialGradient(
        cx + radius * 0.4 + mouse.x * 20, 
        currentCy + radius * 0.4 + mouse.y * 20, 
        0, 
        cx + radius * 0.4 + mouse.x * 20, 
        currentCy + radius * 0.4 + mouse.y * 20, 
        radius * 2.2
      );
      cyanGlow.addColorStop(0, 'rgba(6, 182, 212, 0.2)');
      cyanGlow.addColorStop(0.5, 'rgba(6, 182, 212, 0.05)');
      cyanGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = cyanGlow;
      ctx.beginPath();
      ctx.arc(cx + mouse.x * 15, currentCy + mouse.y * 15, radius * 2.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // 2. ORB CORE (With glass clipping path)
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, currentCy, radius, 0, Math.PI * 2);
      ctx.clip();

      // Deep base sphere gradient
      const sphereBase = ctx.createRadialGradient(
        cx - radius * 0.2 + mouse.x * 15, 
        currentCy - radius * 0.2 + mouse.y * 15, 
        radius * 0.1, 
        cx, 
        currentCy, 
        radius
      );
      sphereBase.addColorStop(0, 'rgba(30, 27, 75, 0.8)'); // Deep Indigo
      sphereBase.addColorStop(0.5, 'rgba(9, 9, 11, 0.95)'); // Zinc 950
      sphereBase.addColorStop(1, 'rgba(3, 7, 18, 1)'); // Black
      ctx.fillStyle = sphereBase;
      ctx.beginPath();
      ctx.arc(cx, currentCy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Inner liquid mesh gradient simulation (moving sine waves)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      
      // Wave 1: Purple
      const w1X = cx + Math.sin(time) * 15 + mouse.x * 30;
      const w1Y = currentCy + Math.cos(time * 0.8) * 15 + mouse.y * 30;
      const wavePurple = ctx.createRadialGradient(w1X, w1Y, 0, w1X, w1Y, radius * 1.3);
      wavePurple.addColorStop(0, 'rgba(124, 58, 237, 0.45)');
      wavePurple.addColorStop(0.6, 'rgba(124, 58, 237, 0.05)');
      wavePurple.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = wavePurple;
      ctx.beginPath();
      ctx.arc(cx, currentCy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Wave 2: Cyan
      const w2X = cx + Math.cos(time * 1.2) * 20 + mouse.x * 25;
      const w2Y = currentCy + Math.sin(time * 1.4) * 20 + mouse.y * 25;
      const waveCyan = ctx.createRadialGradient(w2X, w2Y, 0, w2X, w2Y, radius * 1.2);
      waveCyan.addColorStop(0, 'rgba(6, 182, 212, 0.35)');
      waveCyan.addColorStop(0.6, 'rgba(6, 182, 212, 0.03)');
      waveCyan.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = waveCyan;
      ctx.beginPath();
      ctx.arc(cx, currentCy, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // 3. INTERNAL REFLECTIONS & GLASS DEPTH
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      
      // Soft center light
      const centerLight = ctx.createRadialGradient(
        cx + mouse.x * 40,
        currentCy + mouse.y * 40,
        0,
        cx,
        currentCy,
        radius
      );
      centerLight.addColorStop(0, 'rgba(255, 255, 255, 0.07)');
      centerLight.addColorStop(0.8, 'rgba(255, 255, 255, 0.01)');
      centerLight.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = centerLight;
      ctx.beginPath();
      ctx.arc(cx, currentCy, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // End Core clipping
      ctx.restore();

      // 4. OVERLAY SPECULAR HIGHLIGHTS & OUTSIDE RIM (For realistic 3D glass shine)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // Outer glass rim light
      const rim = ctx.createRadialGradient(cx, currentCy, radius * 0.96, cx, currentCy, radius);
      rim.addColorStop(0, 'rgba(255, 255, 255, 0)');
      rim.addColorStop(0.5, 'rgba(255, 255, 255, 0.12)');
      rim.addColorStop(0.9, 'rgba(255, 255, 255, 0.28)');
      rim.addColorStop(1, 'rgba(255, 255, 255, 0.08)');
      ctx.fillStyle = rim;
      ctx.beginPath();
      ctx.arc(cx, currentCy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Primary light source reflection (Top Left)
      const specX = cx - radius * 0.42 + mouse.x * 8;
      const specY = currentCy - radius * 0.42 + mouse.y * 8;
      const specRadius = radius * 0.3;
      const specularGrad = ctx.createRadialGradient(
        specX, 
        specY, 
        0, 
        specX, 
        specY, 
        specRadius
      );
      specularGrad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
      specularGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.15)');
      specularGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = specularGrad;
      ctx.beginPath();
      // Draw tilted oval highlight
      ctx.ellipse(specX, specY, specRadius, specRadius * 0.6, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();

      // Secondary soft reflection (Bottom Right)
      const spec2X = cx + radius * 0.45 + mouse.x * 5;
      const spec2Y = currentCy + radius * 0.45 + mouse.y * 5;
      const spec2Radius = radius * 0.22;
      const specular2Grad = ctx.createRadialGradient(
        spec2X,
        spec2Y,
        0,
        spec2X,
        spec2Y,
        spec2Radius
      );
      specular2Grad.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
      specular2Grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = specular2Grad;
      ctx.beginPath();
      ctx.ellipse(spec2X, spec2Y, spec2Radius, spec2Radius * 0.5, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[340px] sm:max-w-[420px] md:max-w-[480px] mx-auto flex items-center justify-center pointer-events-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-full select-none cursor-grab active:cursor-grabbing"
      />
    </div>
  );
};

export default Orb3D;
