import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useState, useRef, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ScoreDisplayProps {
  round: number;
  score: number;
  totalRounds: number;
  gameMode: 'normal' | 'eevee';
  onGameModeChange: (mode: 'normal' | 'eevee') => void;
}

const ScoreDisplay = ({ round, score, totalRounds, gameMode, onGameModeChange }: ScoreDisplayProps) => {
  const progressValue = ((round - 1) / totalRounds) * 100;
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState<{left: number, top: number} | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleMenuToggle = () => {
    setMenuOpen((open) => {
      if (!open && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setDropdownPos({ left: rect.left, top: rect.bottom });
      }
      return !open;
    });
  };

  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <div className="bg-background/90 shadow-lg px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-4 relative z-40">
      {/* Burger Menu */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 md:static md:translate-y-0 flex items-center">
        <button
          ref={buttonRef}
          className="p-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Open game mode menu"
          onClick={handleMenuToggle}
        >
          <Menu className="w-6 h-6" />
        </button>
        {/* Dropdown rendered via portal */}
        {menuOpen && dropdownPos && createPortal(
          <div
            ref={menuRef}
            className="fixed z-[9999] w-48 bg-background border border-border rounded-lg shadow-lg animate-bounce-in"
            style={{ left: dropdownPos.left, top: dropdownPos.top }}
          >
            <ul className="py-2">
              <li>
                <button
                  className={`w-full text-left px-4 py-2 font-semibold ${gameMode === 'normal' ? 'text-primary hover:bg-muted' : 'text-foreground'}`}
                  onClick={() => { onGameModeChange('normal'); setMenuOpen(false); }}
                  disabled={gameMode === 'normal'}
                >
                  Single type <span className="ml-2 text-xs text-accent">(default)</span>
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-4 py-2 ${gameMode === 'eevee' ? 'text-primary hover:bg-muted' : 'text-foreground'}`}
                  onClick={() => { onGameModeChange('eevee'); setMenuOpen(false); }}
                  disabled={gameMode === 'eevee'}
                >
                  Eevee mode
                </button>
              </li>
            </ul>
          </div>,
          document.body
        )}
      </div>
      <div className="flex-1 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Pokemon Type Quiz
          </h1>
          <p className="text-muted-foreground mt-1 hidden md:block">
            Test your knowledge of type effectiveness!
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-xl font-bold text-primary">
              Round {round}/{totalRounds}
            </div>
            <Progress value={progressValue} className="w-24 mt-2" />
          </div>

          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1 hidden md:block">Score</div>
            <Badge variant="secondary" className="text-xl font-bold px-4 py-2">
              {score}/{round}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;