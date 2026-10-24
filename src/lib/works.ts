/** Works shown on the home page and /projects. Descriptions live in messages under `projects.items`. */
export type WorkColor = 'cy' | 'mag' | 'yel' | 'grn' | 'pur';

export type Work = {
  key: 'voda' | 'ouroPass' | 'utxray' | 'ouroOps' | 'lottery';
  name: string;
  href: string;
  githubHref?: string;
  screenshot: string;
  color: WorkColor;
  group: 'infrastructure' | 'applications';
  /** Short mono tag, e.g. OSS */
  tag: string;
};

export const COIL = {
  href: 'https://coil.win/',
  version: 'v0.3.0',
  platform: 'macOS · Apple Silicon',
  sleep: '/images/projects/coil-sleep.png',
  awake: '/images/projects/coil-awake.png'
};

export const VODA_URL = 'https://voda.paopao.studio/';

export const WORKS: Work[] = [
  {
    key: 'voda',
    name: 'voda',
    href: VODA_URL,
    screenshot: '/images/projects/voda.jpg',
    color: 'yel',
    group: 'applications',
    tag: 'AI · APP'
  },
  {
    key: 'ouroPass',
    name: 'ouro-pass',
    href: 'https://ouro-pass.paopao.studio/',
    githubHref: 'https://github.com/cauu/ouro-pass',
    screenshot: '/images/projects/ouro-pass.jpg',
    color: 'cy',
    group: 'infrastructure',
    tag: 'OSS'
  },
  {
    key: 'utxray',
    name: 'utxray',
    href: 'https://utxray.paopao.studio/',
    githubHref: 'https://github.com/cauu/utxray',
    screenshot: '/images/projects/utxray.jpg',
    color: 'mag',
    group: 'infrastructure',
    tag: 'OSS'
  },
  {
    key: 'ouroOps',
    name: 'ouro-ops',
    href: 'https://ouro-ops.paopao.studio/',
    githubHref: 'https://github.com/cauu/ouro-ops',
    screenshot: '/images/projects/ouro-ops.jpg',
    color: 'grn',
    group: 'infrastructure',
    tag: 'OSS'
  },
  {
    key: 'lottery',
    name: 'lottery',
    href: 'https://lottery.paopao.studio/',
    screenshot: '/images/projects/cardano-lottery.jpg',
    color: 'pur',
    group: 'applications',
    tag: 'APP'
  }
];
