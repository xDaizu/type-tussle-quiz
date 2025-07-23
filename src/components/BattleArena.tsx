import { ChevronRight, Zap } from 'lucide-react';
import PokemonCard from './PokemonCard';
import { Card } from '@/components/ui/card';

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
  return (
    <Card className="p-8 shadow-card">
      <div className="flex items-center justify-center gap-8 flex-wrap">
        {/* Attacker Pokemon */}
        <div className="flex-1 min-w-[200px] max-w-[280px]">
          <PokemonCard pokemon={attacker} isAttacker className="border-2 border-primary/20" />
        </div>

        {/* Battle Arrow */}
        <div className="flex flex-col items-center gap-3 min-w-[120px]">
          <div className="text-lg font-bold text-muted-foreground uppercase tracking-wider">
            Attacks
          </div>
          <div className={`flex items-center justify-center p-4 rounded-full transition-all duration-500 ${
            showResult 
              ? showResult.correct 
                ? 'bg-super-effective shadow-lg animate-pulse-glow' 
                : 'bg-not-very-effective shadow-lg'
              : 'bg-accent hover:bg-accent/80'
          }`}>
            <ChevronRight className="w-8 h-8 text-white" />
          </div>
          <Zap className="w-6 h-6 text-accent animate-pulse" />
        </div>

        {/* Defender Pokemon */}
        <div className="flex-1 min-w-[200px] max-w-[280px]">
          <PokemonCard pokemon={defender} className="border-2 border-muted/20" />
        </div>
      </div>

      {/* Battle Description */}
      <div className="text-center mt-6 p-4 bg-muted/30 rounded-lg">
        <p className="text-lg">
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