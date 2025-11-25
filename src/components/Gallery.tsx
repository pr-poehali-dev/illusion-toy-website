import { useState } from 'react';
import { Card } from '@/components/ui/card';

const Gallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const galleryItems = [
    { id: 1, color: 'from-purple-500 to-pink-500', rotation: 0 },
    { id: 2, color: 'from-blue-500 to-cyan-500', rotation: 45 },
    { id: 3, color: 'from-orange-500 to-red-500', rotation: 90 },
    { id: 4, color: 'from-green-500 to-emerald-500', rotation: 135 },
    { id: 5, color: 'from-pink-500 to-purple-500', rotation: 180 },
    { id: 6, color: 'from-cyan-500 to-blue-500', rotation: 225 },
    { id: 7, color: 'from-red-500 to-orange-500', rotation: 270 },
    { id: 8, color: 'from-emerald-500 to-green-500', rotation: 315 },
    { id: 9, color: 'from-purple-500 to-blue-500', rotation: 360 }
  ];

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Галерея
          </h2>
          <p className="text-xl text-muted-foreground">
            Интерактивная коллекция визуальных композиций
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <Card
              key={item.id}
              className="relative aspect-square overflow-hidden bg-card/30 backdrop-blur-sm border-primary/20 hover:border-primary transition-all cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`w-full h-full bg-gradient-to-br ${item.color} transition-all duration-700 ${
                    hoveredIndex === index ? 'scale-150 rotate-180' : 'scale-100'
                  }`}
                  style={{
                    transform: `rotate(${item.rotation}deg)`,
                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                  }}
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Композиция {item.id}</h3>
                  <p className="text-muted-foreground">
                    Интерактивный градиент с вращением
                  </p>
                </div>
              </div>

              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-4 border-white/50 transition-all duration-500 ${
                  hoveredIndex === index ? 'scale-0' : 'scale-100'
                }`}
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
