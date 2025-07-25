import { ChevronRight } from 'lucide-react';
import { PokemonType } from '@/features/pokemon/types/PokemonType';
import PokemonCard from '@/features/pokemon/components/PokemonCard';
import { Card } from '@/shared/components/ui/ui/card';
import { typeColorMap } from '@/features/pokemon/components/PokemonCard';
import { SpriteProvider } from '@/features/pokemon/services/SpriteProvider';

interface BattleArenaProps {
  attacker: {
    id: string;
    name: string;
    type: PokemonType;
    sprite: string;
  };
  defender: {
    id: string;
    name: string;
    type: PokemonType;
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
    <Card className="p-2 shadow-card border-0">
       {/* Battle Description */}
       <div className="text-center p-2 bg-gradient-to-r from-muted/40 to-muted/60 rounded-2xl shadow-card-inset">
        <p className="text-lg leading-relaxed">
          <span className="font-bold text-primary">{attacker.name}</span>
          <span className="mx-2 text-muted-foreground">uses a</span>
          <span className={`font-bold capitalize bg-gradient-to-r from-black to-${attacker.type} bg-clip-text text-${attacker.type}/80`}>
            {attacker.type}-type attack
          </span>
          <span className="mx-2 text-muted-foreground">on</span>
          <span className="font-bold text-primary">{defender.name}</span>
        </p>
      </div>
      <div className="relative">
        {/* Mobile floater attack - only on mobile, floating above cards */}
        <div className="flex items-center sm:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          {typeSymbol && (
            <img src={typeSymbol} alt={`${attacker.type} type`} className="w-8 h-8" />
          )}
          <div className={`w-1 h-1 bg-${attacker.type} rounded-full animate-ping`}></div>
          <div className={`w-2 h-2 bg-${attacker.type} rounded-full animate-ping`} style={{ animationDelay: '0.15s' }}></div>
          <div className={`w-3 h-3 bg-${attacker.type} rounded-full animate-ping`} style={{ animationDelay: '0.2s' }}></div>
        </div>
        <div className="flex flex-row items-center justify-center gap-2 sm:gap-8 flex-nowrap mt-2">
        {/* Attacker Pokemon */}
        <div className="flex-1 min-w-0 max-w-[300px] w-1/2">
          <PokemonCard key={attacker.id + '-' + attacker.name} pokemon={attacker} isAttacker />
        </div>

        {/* Battle Arrow - hidden on mobile, visible on sm+ */}
        <div className="hidden sm:flex flex-col items-center gap-4 min-w-[140px]">
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
        {/* Mobile floater attack (old location) */}

        {/* Defender Pokemon */}
        <div className="flex-1 min-w-0 max-w-[300px] w-1/2">
          <PokemonCard key={defender.id + '-' + defender.name} pokemon={defender} />
        </div>
      </div> {/* close flex row */}
      </div> {/* close relative wrapper */}

     
    </Card>
  );
};

export default BattleArena;