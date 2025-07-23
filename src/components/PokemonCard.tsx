import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Import Pokemon sprites
import charmanderSprite from '@/assets/charmander.png';
import squirtleSprite from '@/assets/squirtle.png';
import chikoritaSprite from '@/assets/chikorita.png';
import pikachuSprite from '@/assets/pikachu.png';

// Import type icons
import fireTypeIcon from '@/assets/fire-type.png';
import waterTypeIcon from '@/assets/water-type.png';
import grassTypeIcon from '@/assets/grass-type.png';
import electricTypeIcon from '@/assets/electric-type.png';

const spriteMap = {
  charmander: charmanderSprite,
  squirtle: squirtleSprite,
  chikorita: chikoritaSprite,
  pikachu: pikachuSprite,
};

const typeIconMap = {
  fire: fireTypeIcon,
  water: waterTypeIcon,
  grass: grassTypeIcon,
  electric: electricTypeIcon,
};

const typeColorMap = {
  fire: 'fire',
  water: 'water',
  grass: 'grass',
  electric: 'electric',
};

interface PokemonCardProps {
  pokemon: {
    id: string;
    name: string;
    type: string;
    sprite: string;
  };
  isAttacker?: boolean;
  className?: string;
}

const PokemonCard = ({ pokemon, isAttacker = false, className = '' }: PokemonCardProps) => {
  const typeColor = typeColorMap[pokemon.type as keyof typeof typeColorMap];
  
  return (
    <Card className={`p-6 text-center shadow-card hover:shadow-pokemon-glow transition-all duration-500 border-0 ${isAttacker ? 'animate-slide-in' : ''} ${className}`}>
      <div className="relative mb-6">
        <div className="bg-gradient-to-br from-background to-muted rounded-2xl p-4 shadow-card-inset">
          <img
            src={spriteMap[pokemon.id as keyof typeof spriteMap]}
            alt={pokemon.name}
            className="w-20 h-20 mx-auto object-contain animate-bounce-in"
            style={{ animationDelay: isAttacker ? '0.2s' : '0.4s' }}
          />
        </div>
        {isAttacker && (
          <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-bold shadow-button">
            ATK
          </div>
        )}
      </div>
      
      <h3 className="text-xl font-bold mb-4 text-foreground">{pokemon.name}</h3>
      
      <div className="flex flex-col items-center gap-3">
        <div className="bg-gradient-to-r from-background to-muted p-2 rounded-xl shadow-card-inset">
          <img
            src={typeIconMap[pokemon.type as keyof typeof typeIconMap]}
            alt={`${pokemon.type} type`}
            className="h-8 w-auto object-contain"
          />
        </div>
      </div>
    </Card>
  );
};

export default PokemonCard;