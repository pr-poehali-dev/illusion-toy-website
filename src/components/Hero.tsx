import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
    }> = [];

    const colors = ['#8B5CF6', '#D946EF', '#0EA5E9', '#F97316'];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(26, 31, 44, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        particles.forEach((otherParticle, j) => {
          if (i === j) return;
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = particle.color + '20';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      <div className="relative z-10 text-center px-4 space-y-8">
        <div className="space-y-4">
          <h1 className="text-7xl md:text-9xl font-black animate-float">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              ILLUSION
            </span>
          </h1>
          <h2 className="text-5xl md:text-7xl font-black animate-float" style={{ animationDelay: '0.2s' }}>
            <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
              LAB
            </span>
          </h2>
        </div>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Погрузитесь в мир оптических иллюзий, психоделических эффектов и интерактивных визуальных экспериментов
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <Button size="lg" className="gap-2 text-lg px-8 animate-pulse-color">
            <Icon name="Play" size={24} />
            Начать исследование
          </Button>
          <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
            <Icon name="Rocket" size={24} />
            Смотреть демо
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={48} className="text-primary" />
      </div>
    </div>
  );
};

export default Hero;
