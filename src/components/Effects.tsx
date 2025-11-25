import { useState } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Effects = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const effects = [
    {
      id: 1,
      title: 'Параллакс',
      description: 'Многослойный эффект глубины при движении',
      icon: 'Layers',
      gradient: 'from-primary to-secondary'
    },
    {
      id: 2,
      title: 'Глитч',
      description: 'Цифровое искажение в стиле киберпанк',
      icon: 'Zap',
      gradient: 'from-secondary to-accent'
    },
    {
      id: 3,
      title: 'Калейдоскоп',
      description: 'Симметричные паттерны в реальном времени',
      icon: 'Sparkles',
      gradient: 'from-accent to-destructive'
    },
    {
      id: 4,
      title: 'Частицы',
      description: 'Интерактивная система частиц',
      icon: 'Snowflake',
      gradient: 'from-destructive to-primary'
    },
    {
      id: 5,
      title: 'Жидкость',
      description: 'Симуляция текучих жидкостей',
      icon: 'Droplet',
      gradient: 'from-primary to-accent'
    },
    {
      id: 6,
      title: 'Искажение',
      description: 'Волновое искажение пространства',
      icon: 'Wind',
      gradient: 'from-secondary to-destructive'
    }
  ];

  return (
    <div className="min-h-screen py-24 px-4 bg-gradient-to-b from-background to-purple-900/10">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-secondary to-destructive bg-clip-text text-transparent">
            Эффекты
          </h2>
          <p className="text-xl text-muted-foreground">
            Коллекция визуальных эффектов и анимаций
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {effects.map((effect) => (
            <Card
              key={effect.id}
              className="relative p-8 bg-card/30 backdrop-blur-sm border-primary/20 hover:border-primary transition-all overflow-hidden group"
              onMouseEnter={() => setHoveredCard(effect.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${effect.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
              />
              
              <div className="relative z-10">
                <div
                  className={`mb-6 inline-flex p-4 rounded-full bg-gradient-to-br ${effect.gradient} transform transition-transform duration-300 ${
                    hoveredCard === effect.id ? 'scale-110 rotate-12' : ''
                  }`}
                >
                  <Icon name={effect.icon as any} size={40} className="text-white" />
                </div>
                
                <h3 className="text-3xl font-bold mb-3">{effect.title}</h3>
                <p className="text-muted-foreground text-lg">
                  {effect.description}
                </p>
              </div>
              
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/20 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Effects;
