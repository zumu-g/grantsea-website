'use client';

import { useEffect, useRef } from 'react';

export default function Canvas3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
      color: string;
    }> = [];
    
    const particleCount = 100;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width - centerX,
        y: Math.random() * canvas.height - centerY,
        z: Math.random() * 1000 - 500,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        color: `hsla(${200 + Math.random() * 60}, 70%, 50%, 0.8)`
      });
    }
    
    // Mouse position
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX - centerX;
      mouseY = e.clientY - centerY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Update particle position
        particle.x += particle.vx + (mouseX - particle.x) * 0.00005;
        particle.y += particle.vy + (mouseY - particle.y) * 0.00005;
        particle.z += particle.vz;
        
        // Wrap particles around
        if (particle.z > 500) particle.z = -500;
        if (particle.z < -500) particle.z = 500;
        
        // 3D projection
        const scale = 1000 / (1000 + particle.z);
        const x2d = particle.x * scale + centerX;
        const y2d = particle.y * scale + centerY;
        const size = particle.size * scale;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Draw connections
        particles.forEach(other => {
          const distance = Math.sqrt(
            Math.pow(particle.x - other.x, 2) +
            Math.pow(particle.y - other.y, 2) +
            Math.pow(particle.z - other.z, 2)
          );
          
          if (distance < 150) {
            const otherScale = 1000 / (1000 + other.z);
            const otherX2d = other.x * otherScale + centerX;
            const otherY2d = other.y * otherScale + centerY;
            
            ctx.beginPath();
            ctx.moveTo(x2d, y2d);
            ctx.lineTo(otherX2d, otherY2d);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 - distance / 1500})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}