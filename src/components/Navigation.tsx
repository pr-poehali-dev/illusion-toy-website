import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const Navigation = ({ activeSection, onNavigate }: NavigationProps) => {
  const navItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'experiments', label: 'Эксперименты', icon: 'FlaskConical' },
    { id: 'effects', label: 'Эффекты', icon: 'Sparkles' },
    { id: 'gallery', label: 'Галерея', icon: 'Image' },
    { id: 'about', label: 'О проекте', icon: 'Info' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-primary/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            ILLUSION LAB
          </div>
          
          <div className="hidden md:flex gap-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? 'default' : 'ghost'}
                onClick={() => onNavigate(item.id)}
                className="gap-2"
              >
                <Icon name={item.icon as any} size={18} />
                {item.label}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
          >
            <Icon name="Menu" size={24} />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
