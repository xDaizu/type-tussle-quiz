import { ChevronRight } from 'lucide-react';
import PokemonCard from './PokemonCard';
import { Card } from '@/components/ui/card';
import { typeColorMap } from './PokemonCard';
import { SpriteProvider } from '@/lib/SpriteProvider';

interface BattleArenaProps {
  attacker: {
    id: string;
    name: string;
    type: string;
    sprite: string;
  };
  defender: {
    id: string;
    name: string;
    type: string;
    sprite: string;
  };
  showResult?: {
    correct: boolean;
    effectiveness: number;
  } | null;
}

const BattleArena = ({ attacker, defender, showResult }: BattleArenaProps) => {
  const arrowColor = typeColorMap[attacker.type as keyof typeof typeColorMap] || 'primary';
  const typeSymbol = SpriteProvider.getTypeSpriteSymbol(attacker.type);
  return (
    <Card className="p-8 shadow-card border-0">
      <div className="flex items-center justify-center gap-8 flex-wrap">
        {/* Attacker Pokemon */}
        <div className="flex-1 min-w-[220px] max-w-[300px]">
          <PokemonCard pokemon={attacker} isAttacker />
        </div>

        {/* Battle Arrow */}
        <div className="flex flex-col items-center gap-4 min-w-[140px]">
          <div className="text-lg font-bold text-muted-foreground uppercase tracking-wider">
            Attacks
          </div>
          <div className={`flex items-center justify-center p-6 rounded-2xl transition-all duration-500 shadow-button bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100 ${
            showResult 
              ? showResult.correct 
                ? 'bg-super-effective shadow-button-pressed animate-pulse-glow' 
                : 'bg-not-very-effective shadow-button-pressed'
              : `bg-gradient-to-br from-${attacker.type} to-${attacker.type}/30 hover:from-${attacker.type}/30 hover:to-${attacker.type}`
          }`}>
            <ChevronRight className={`w-10 h-10 drop-shadow-sm text-white`} />
          </div>
          <div className="flex items-center gap-2">
          {typeSymbol && (
              <img src={typeSymbol} alt={`${attacker.type} type`} className="w-8 h-8" />
            )}
            <div className={`w-2 h-2 bg-${attacker.type} rounded-full animate-ping`}></div>
            <div className={`w-2 h-2 bg-${attacker.type} rounded-full animate-ping`} style={{ animationDelay: '0.15s' }}></div>
            <div className={`w-2 h-2 bg-${attacker.type} rounded-full animate-ping`} style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>

        {/* Defender Pokemon */}
        <div className="flex-1 min-w-[220px] max-w-[300px]">
          <PokemonCard pokemon={defender} />
        </div>
      </div>

      {/* Battle Description */}
      <div className="text-center mt-8 p-6 bg-gradient-to-r from-muted/40 to-muted/60 rounded-2xl shadow-card-inset">
        <p className="text-lg leading-relaxed">
          <span className="font-bold text-primary">{attacker.name}</span>
          <span className="mx-2 text-muted-foreground">uses a</span>
          <span className="font-bold capitalize bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {attacker.type}-type attack
          </span>
          <span className="mx-2 text-muted-foreground">on</span>
          <span className="font-bold text-primary">{defender.name}</span>
        </p>
      </div>
    </Card>
  );
};

export default BattleArena;