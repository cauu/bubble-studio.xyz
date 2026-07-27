import type { ChipColor } from '@/components/ui/Chip';

export type Category = 'ai' | 'cardano' | 'engineering' | 'weekly' | 'essay';

export const CATEGORIES: Category[] = ['ai', 'cardano', 'engineering', 'weekly', 'essay'];

/** Prototype mapping: AI=sky, Cardano=mint, 软件工程=lavender, 随笔=grass, 周报=plain */
export const CATEGORY_CHIP: Record<Category, ChipColor> = {
  ai: 'sky',
  cardano: 'mint',
  engineering: 'lavender',
  weekly: 'card',
  essay: 'grass'
};

/** Fallback for posts without a `category:` frontmatter field */
export const deriveCategory = (tags: string[] = [], title = ''): Category => {
  const lower = tags.map((tag) => tag.toLowerCase());
  if (lower.some((tag) => tag.includes('软件工程') || tag.includes('engineering'))) return 'engineering';
  if (/周报|週報|weekly/i.test(title) || lower.some((tag) => /周报|週報|weekly/.test(tag))) return 'weekly';
  if (lower.some((tag) => tag.includes('cardano') || tag.includes('治理'))) return 'cardano';
  if (lower.some((tag) => tag === 'ai' || tag.includes('人工智能'))) return 'ai';
  return 'essay';
};
