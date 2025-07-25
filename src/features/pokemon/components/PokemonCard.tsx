import { Card } from '@/shared/components/ui/card';
import { useState } from 'react';

// Import type icons
import { SpriteService } from '@/features/pokemon/services/SpriteService';
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
  const [sex, setSex] = useState<'male' | 'female'>(() => (Math.random() < 0.7 ? 'female' : 'male'));
  const typeColor = typeColorMap[pokemon.type as keyof typeof typeColorMap];
  // Use SpriteProvider to get the correct sprite URL
  const spriteUrl = SpriteService.getPokemonHomeSprite(pokemon.name, sex);
  const isLeftFacing = SpriteService.isLeftFacing(pokemon.name);
  const shouldFlip = isLeftFacing ? !isAttacker : isAttacker;
  return (
    <Card className={`p-2 text-center shadow-card hover:shadow-pokemon-glow transition-all duration-500 border-0 ${isAttacker ? 'animate-slide-in' : 'animate-shake'} ${className}`}>
      <h3 className="text-xl font-bold text-foreground">{pokemon.name}</h3>
      
      <div className="relative mb-2">
        <div className="bg-gradient-to-br from-background to-muted rounded-2xl p-2 shadow-card-inset overflow-hidden w-32 h-32 mx-auto relative">
          <img
            src={spriteUrl}
            alt={pokemon.name}
            className={`absolute left-0 right-0 mx-auto object-contain${shouldFlip ? ' -scale-x-100' : ''}`}
            style={{ width: '100%', bottom: 0, objectPosition: 'center bottom', transform: `scale(1.0)${shouldFlip ? ' scaleX(-1)' : ''}`, transformOrigin: 'center bottom', animationDelay: isAttacker ? '0.2s' : '0.4s', position: 'absolute' }}
            onError={e => {
                setSex('male');
                e.currentTarget.onerror = null;
                e.currentTarget.src = SpriteService.getPokemonHomeSprite(pokemon.name, 'male');
            }}
          />
        </div>
        {isAttacker && (
          <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-bold shadow-button">
            ATK
          </div>
        )}
      </div>
      
      
      <div className="flex flex-col items-center gap-3">
        <div className="bg-gradient-to-r from-background to-muted p-2 rounded-xl shadow-card-inset">
          <img
            src={SpriteService.getTypeSpriteWithWord(pokemon.type)}
            alt={`${pokemon.type} type`}
            className="h-8 w-auto object-contain"
          />
        </div>
      </div>
    </Card>
  );
};

export default PokemonCard;