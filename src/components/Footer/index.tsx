import { Github } from 'lucide-react';
import { GlobalConfig } from '@/constants';

export const Footer = () => {
  return (
    <footer className="border-t border-hairline bg-canvas">
      <div className="mx-auto flex min-h-[76px] max-w-wrap items-center justify-between gap-6 px-6 max-[600px]:min-h-[68px] max-[600px]:px-[18px]">
        <span className="text-sm text-muted tnum max-[600px]:text-xs">© 2024–2026 Pao Studio</span>

        <div className="flex items-center gap-5 max-[600px]:gap-3">
          <a
            href={GlobalConfig.CARDANOSCAN_POOL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-body transition-colors hover:text-ink max-[480px]:hidden"
          >
            Cardano · PAO
          </a>
          <a
            href={GlobalConfig.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-9 w-9 place-items-center rounded-full text-xl text-body transition-colors hover:bg-black/5 hover:text-ink"
            aria-label="X / Twitter"
          >
            <span aria-hidden="true">𝕏</span>
          </a>
          <a
            href={GlobalConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-9 w-9 place-items-center rounded-full text-body transition-colors hover:bg-black/5 hover:text-ink"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
};
