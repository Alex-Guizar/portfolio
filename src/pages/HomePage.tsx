import { TacticsGame } from './homePage/TacticsGame';
import { TacticsPlain } from './homePage/TacticsPlain';
import { usePlainMode } from '@/hooks/usePlainMode';

export function HomePage() {
  const { plain, toggle } = usePlainMode();
  return plain
    ? <TacticsPlain onTogglePlain={toggle} />
    : <TacticsGame onTogglePlain={toggle} />;
}
