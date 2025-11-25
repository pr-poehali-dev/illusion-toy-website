import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ExperimentCanvas from '@/components/ExperimentCanvas';

const Experiments = () => {
  const [activeExperiment, setActiveExperiment] = useState<number | null>(null);

  const experiments = [
    {
      id: 1,
      title: 'Гипнотическая спираль',
      description: 'Вращающаяся спираль создаёт иллюзию движения к центру',
      type: 'spiral',
      icon: 'CircleDot'
    },
    {
      id: 2,
      title: 'Волновые паттерны',
      description: 'Синусоидальные волны создают эффект объёмной поверхности',
      type: 'wave',
      icon: 'Waves'
    },
    {
      id: 3,
      title: 'Морфинг форм',
      description: 'Геометрические фигуры трансформируются в пространстве',
      type: 'morph',
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
              className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon name={exp.icon as any} size={32} className="text-primary" />
                <h3 className="text-2xl font-bold">{exp.title}</h3>
              </div>
              
              <div className="mb-4 rounded-lg overflow-hidden bg-background">
                <ExperimentCanvas type={exp.type as 'spiral' | 'wave' | 'morph'} size={300} />
              </div>
              
              <p className="text-muted-foreground mb-4">
                {exp.description}
              </p>
              
              <Button 
                className="w-full gap-2"
                onClick={() => setActiveExperiment(exp.id)}
              >
                <Icon name="Maximize" size={18} />
                Открыть в полном размере
              </Button>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={activeExperiment !== null} onOpenChange={() => setActiveExperiment(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-3xl">
              {experiments.find(e => e.id === activeExperiment)?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center bg-background rounded-lg">
            {activeExperiment && (
              <ExperimentCanvas 
                type={experiments.find(e => e.id === activeExperiment)?.type as 'spiral' | 'wave' | 'morph'} 
                size={600}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Experiments;
