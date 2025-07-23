import { Card } from '@/components/ui/card';

// Import type icons
import { SpriteProvider } from '@/lib/SpriteProvider';
import { PokemonType } from '@/types/PokemonType';

export const typeColorMap = {
  fire: 'fire',
  water: 'water',
  grass: 'grass',
  electric: 'electric',
};

interface PokemonCardProps {
  pokemon: {
    id: string;
    name: string;
    type: PokemonType;
    sprite: string;
  };
  isAttacker?: boolean;
  className?: string;
}

const PokemonCard = ({ pokemon, isAttacker = false, className = '' }: PokemonCardProps) => {
  const typeColor = typeColorMap[pokemon.type as keyof typeof typeColorMap];
  // Use SpriteProvider to get the correct sprite URL
  const spriteUrl = SpriteProvider.getPokemonModernSprite(pokemon.name, isAttacker);
  return (
    <Card className={`p-6 text-center shadow-card hover:shadow-pokemon-glow transition-all duration-500 border-0 ${isAttacker ? 'animate-slide-in' : ''} ${className}`}>
      <div className="relative mb-6">
        <div className="bg-gradient-to-br from-background to-muted rounded-2xl p-2 shadow-card-inset overflow-hidden w-32 h-32 mx-auto flex items-end justify-center">
          <img
            src={spriteUrl}
            alt={pokemon.name}
            className={`w-full h-full object-contain scale-140${isAttacker ? ' -scale-x-100' : ''}`}
            style={{ objectPosition: 'center bottom', transform: `scale(1.4)${isAttacker ? ' scaleX(-1)' : ''}`, animationDelay: isAttacker ? '0.2s' : '0.4s' }}
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
            src={SpriteProvider.getTypeSpriteWithWord(pokemon.type)}
            alt={`${pokemon.type} type`}
            className="h-8 w-auto object-contain"
          />
        </div>
      </div>
    </Card>
  );
};

export default PokemonCard;