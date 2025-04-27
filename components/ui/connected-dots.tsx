import React, { useEffect, useRef } from 'react';

const ConnectedDotsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Set canvas to full width
    const resizeCanvas = (): void => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = 150; // Height of the dots section at bottom
      }
    };
    
    // Initial resize
    resizeCanvas();
    
    // Handle window resize
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      
      constructor() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = Math.random() * (canvas?.height || 0);
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
      }
      
      update(): void {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x > (canvas?.width || 0) || this.x < 0) {
          this.speedX *= -1;
        }
        
        if (this.y > (canvas?.height || 0) || this.y < 0) {
          this.speedY *= -1;
        }
      }
      
      draw(): void {
        if (!ctx) return;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100, 100, 100, 0.7)';
        ctx.fill();
      }
    }
    
    // Initialize particles
    const initParticles = (): void => {
      // Calculate number of particles based on screen width
      const particleCount = Math.floor((canvas?.width || 0) / 25); // Approx 1 particle per 25px width
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };
    
    // Connect nearby particles with lines
    const connectParticles = (): void => {
      if (!ctx) return;
      
      const maxDistance = 150; // Maximum distance for connection
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            // Calculate opacity based on distance
            const opacity = 1 - (distance / maxDistance);
            
            // Get scroll position to create color variations
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            const hue = (scrollY / 20) % 360; // Change hue based on scroll
            
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(210, 80%, 80%, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };
    
    // Animation loop
    const animate = (): void => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Initialize and start animation
    initParticles();
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="absolute bottom-20 left-0 w-full"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ConnectedDotsBackground;