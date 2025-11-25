import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const About = () => {
  const features = [
    {
      icon: 'Palette',
      title: 'Психоделический дизайн',
      description: 'Яркие цвета и необычные формы для незабываемых визуальных впечатлений'
    },
    {
      icon: 'Cpu',
      title: 'Реальное время',
      description: 'Все эффекты рендерятся на лету с использованием Canvas API и WebGL'
    },
    {
      icon: 'MousePointer2',
      title: 'Интерактивность',
      description: 'Каждый элемент реагирует на действия пользователя'
    },
    {
      icon: 'Gauge',
      title: 'Производительность',
      description: 'Оптимизированный код для плавных 60 FPS'
    }
  ];

  return (
    <div className="min-h-screen py-24 px-4 bg-gradient-to-b from-background via-purple-900/10 to-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-destructive to-secondary bg-clip-text text-transparent">
            О проекте
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            ILLUSION LAB — экспериментальная площадка для исследования визуальных эффектов, 
            оптических иллюзий и интерактивных 3D-композиций
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 bg-card/30 backdrop-blur-sm border-primary/20 hover:border-primary transition-all hover:scale-105"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent">
                  <Icon name={feature.icon as any} size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-lg">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-12 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 backdrop-blur-sm border-primary/30">
          <div className="text-center space-y-6">
            <h3 className="text-4xl font-black">Готовы к путешествию?</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Исследуйте границы визуального восприятия и создавайте собственные иллюзии
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="gap-2 text-lg px-8">
                <Icon name="Rocket" size={24} />
                Начать создавать
              </Button>
              <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
                <Icon name="Github" size={24} />
                Посмотреть код
              </Button>
            </div>
          </div>
        </Card>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-card/50 backdrop-blur-sm border border-primary/20">
            <Icon name="Code2" size={24} className="text-primary" />
            <p className="text-muted-foreground">
              Сделано с использованием React, TypeScript и Canvas API
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
