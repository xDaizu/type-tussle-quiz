import { Card } from '@/components/ui/card';

// Import type icons
import { SpriteProvider } from '@/lib/SpriteProvider';

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
  // Use SpriteProvider to get the correct sprite URL
  const spriteUrl = SpriteProvider.getPokemonSprite(pokemon.id, isAttacker);
  return (
    <Card className={`p-6 text-center shadow-card hover:shadow-pokemon-glow transition-all duration-500 border-0 ${isAttacker ? 'animate-slide-in' : ''} ${className}`}>
      <div className="relative mb-6">
        <div className="bg-gradient-to-br from-background to-muted rounded-2xl p-4 shadow-card-inset">
          <img
            src={spriteUrl}
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