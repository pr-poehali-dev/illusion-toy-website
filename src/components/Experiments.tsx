import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Experiments = () => {
  const [activeExperiment, setActiveExperiment] = useState<number | null>(null);
  const spiralRef = useRef<HTMLCanvasElement>(null);
  const waveRef = useRef<HTMLCanvasElement>(null);
  const morphRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const spiral = spiralRef.current;
    if (!spiral) return;
    const ctx = spiral.getContext('2d');
    if (!ctx) return;

    spiral.width = 400;
    spiral.height = 400;

    let rotation = 0;
    const drawSpiral = () => {
      ctx.clearRect(0, 0, spiral.width, spiral.height);
      ctx.save();
      ctx.translate(spiral.width / 2, spiral.height / 2);
      ctx.rotate(rotation);

      const colors = ['#8B5CF6', '#D946EF', '#0EA5E9'];
      for (let i = 0; i < 360; i += 10) {
        const angle = (i * Math.PI) / 180;
        const radius = i / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fillStyle = colors[Math.floor(i / 120) % colors.length];
        ctx.fill();
      }

      ctx.restore();
      rotation += 0.02;
      requestAnimationFrame(drawSpiral);
    };

    drawSpiral();
  }, []);

  useEffect(() => {
    const wave = waveRef.current;
    if (!wave) return;
    const ctx = wave.getContext('2d');
    if (!ctx) return;

    wave.width = 400;
    wave.height = 400;

    let offset = 0;
    const drawWave = () => {
      ctx.clearRect(0, 0, wave.width, wave.height);

      for (let y = 0; y < wave.height; y += 10) {
        ctx.beginPath();
        for (let x = 0; x < wave.width; x++) {
          const amplitude = 30;
          const frequency = 0.02;
          const yPos = y + Math.sin(x * frequency + offset + y * 0.05) * amplitude;
          
          if (x === 0) {
            ctx.moveTo(x, yPos);
          } else {
            ctx.lineTo(x, yPos);
          }
        }
        
        const hue = (y / wave.height * 360 + offset * 50) % 360;
        ctx.strokeStyle = `hsl(${hue}, 80%, 60%)`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      offset += 0.05;
      requestAnimationFrame(drawWave);
    };

    drawWave();
  }, []);

  useEffect(() => {
    const morph = morphRef.current;
    if (!morph) return;
    const ctx = morph.getContext('2d');
    if (!ctx) return;

    morph.width = 400;
    morph.height = 400;

    let time = 0;
    const drawMorph = () => {
      ctx.clearRect(0, 0, morph.width, morph.height);
      ctx.save();
      ctx.translate(morph.width / 2, morph.height / 2);

      const shapes = 6;
      for (let i = 0; i < shapes; i++) {
        ctx.save();
        ctx.rotate((Math.PI * 2 * i) / shapes + time);
        
        const scale = Math.sin(time * 2 + i) * 0.5 + 1;
        ctx.scale(scale, scale);

        ctx.beginPath();
        ctx.rect(-50, -50, 100, 100);
        
        const colors = ['#8B5CF6', '#D946EF', '#0EA5E9', '#F97316'];
        ctx.fillStyle = colors[i % colors.length] + '80';
        ctx.fill();
        
        ctx.restore();
      }

      ctx.restore();
      time += 0.02;
      requestAnimationFrame(drawMorph);
    };

    drawMorph();
  }, []);

  const experiments = [
    {
      id: 1,
      title: 'Гипнотическая спираль',
      description: 'Вращающаяся спираль создаёт иллюзию движения к центру',
      ref: spiralRef,
      icon: 'CircleDot'
    },
    {
      id: 2,
      title: 'Волновые паттерны',
      description: 'Синусоидальные волны создают эффект объёмной поверхности',
      ref: waveRef,
      icon: 'Waves'
    },
    {
      id: 3,
      title: 'Морфинг форм',
      description: 'Геометрические фигуры трансформируются в пространстве',
      ref: morphRef,
      icon: 'Box'
    }
  ];

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Эксперименты
          </h2>
          <p className="text-xl text-muted-foreground">
            Интерактивные визуальные эксперименты в реальном времени
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiments.map((exp) => (
            <Card
              key={exp.id}
              className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all hover:scale-105 cursor-pointer"
              onClick={() => setActiveExperiment(exp.id)}
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon name={exp.icon as any} size={32} className="text-primary" />
                <h3 className="text-2xl font-bold">{exp.title}</h3>
              </div>
              
              <div className="mb-4 rounded-lg overflow-hidden bg-background">
                <canvas ref={exp.ref} className="w-full h-auto" />
              </div>
              
              <p className="text-muted-foreground mb-4">
                {exp.description}
              </p>
              
              <Button className="w-full gap-2">
                <Icon name="Maximize" size={18} />
                Открыть в полном размере
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experiments;
