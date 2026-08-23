import { NotFoundGame } from './notFound/NotFoundGame';
import { NotFoundPlain } from './notFound/NotFoundPlain';
import { usePlainMode } from '@/hooks/usePlainMode';

export function NotFoundPage() {
  const { plain, toggle } = usePlainMode();
  return plain
    ? <NotFoundPlain onTogglePlain={toggle} />
    : <NotFoundGame onTogglePlain={toggle} />;
}
