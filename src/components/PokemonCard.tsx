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
    <Card className={`p-6 text-center shadow-card hover:shadow-pokemon-glow transition-all duration-300 ${isAttacker ? 'animate-slide-in' : ''} ${className}`}>
      <div className="relative">
        <img
          src={spriteMap[pokemon.id as keyof typeof spriteMap]}
          alt={pokemon.name}
          className="w-24 h-24 mx-auto mb-4 object-contain animate-bounce-in"
          style={{ animationDelay: isAttacker ? '0.2s' : '0.4s' }}
        />
        {isAttacker && (
          <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-semibold">
            ATK
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-bold mb-2">{pokemon.name}</h3>
      
      <div className="flex items-center justify-center gap-2">
        <img
          src={typeIconMap[pokemon.type as keyof typeof typeIconMap]}
          alt={`${pokemon.type} type`}
          className="w-6 h-6 object-contain"
        />
        <Badge 
          className={`bg-${typeColor} text-white font-semibold capitalize`}
        >
          {pokemon.type}
        </Badge>
      </div>
    </Card>
  );
};

export default PokemonCard;