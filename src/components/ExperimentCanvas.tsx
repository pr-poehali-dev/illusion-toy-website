import { useEffect, useRef } from 'react';

interface ExperimentCanvasProps {
  type: 'spiral' | 'wave' | 'morph';
  size: number;
}

const ExperimentCanvas = ({ type, size }: ExperimentCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;

    let animationId: number;

    if (type === 'spiral') {
      let rotation = 0;
      const drawSpiral = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(rotation);

        const colors = ['#8B5CF6', '#D946EF', '#0EA5E9'];
        for (let i = 0; i < 180; i += 20) {
          const angle = (i * Math.PI) / 180;
          const radius = i / 1.5;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          ctx.beginPath();
          ctx.arc(x, y, 15, 0, Math.PI * 2);
          ctx.fillStyle = colors[Math.floor(i / 60) % colors.length];
          ctx.fill();
        }

        ctx.restore();
        rotation += 0.01;
        animationId = requestAnimationFrame(drawSpiral);
      };
      drawSpiral();
    }

    if (type === 'wave') {
      let offset = 0;
      const drawWave = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let y = 0; y < canvas.height; y += 20) {
          ctx.beginPath();
          for (let x = 0; x < canvas.width; x += 5) {
            const amplitude = 20;
            const frequency = 0.02;
            const yPos = y + Math.sin(x * frequency + offset + y * 0.05) * amplitude;
            
            if (x === 0) {
              ctx.moveTo(x, yPos);
            } else {
              ctx.lineTo(x, yPos);
            }
          }
          
          const hue = (y / canvas.height * 360 + offset * 30) % 360;
          ctx.strokeStyle = `hsl(${hue}, 80%, 60%)`;
          ctx.lineWidth = 3;
          ctx.stroke();
        }

        offset += 0.03;
        animationId = requestAnimationFrame(drawWave);
      };
      drawWave();
    }

    if (type === 'morph') {
      let time = 0;
      const drawMorph = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);

        const shapes = 4;
        for (let i = 0; i < shapes; i++) {
          ctx.save();
          ctx.rotate((Math.PI * 2 * i) / shapes + time);
          
          const scale = Math.sin(time * 2 + i) * 0.3 + 0.8;
          ctx.scale(scale, scale);

          ctx.beginPath();
          ctx.rect(-40, -40, 80, 80);
          
          const colors = ['#8B5CF6', '#D946EF', '#0EA5E9', '#F97316'];
          ctx.fillStyle = colors[i % colors.length] + '99';
          ctx.fill();
          
          ctx.restore();
        }

        ctx.restore();
        time += 0.015;
        animationId = requestAnimationFrame(drawMorph);
      };
      drawMorph();
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [type, size]);

  return <canvas ref={canvasRef} className="w-full h-auto" />;
};

export default ExperimentCanvas;
