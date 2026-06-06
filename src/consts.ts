// Site-wide constants
export const SITE = {
  title: 'FDE Journey',
  description: 'A log of becoming a Forward Deployed Engineer.',
  author: 'You',
  url: 'https://fde-journey.vercel.app',
  locale: 'en',
} as const;

export const NAV = [
  { href: '/', label: 'home' },
  { href: '/journey/', label: 'journey' },
  { href: '/projects/', label: 'projects' },
  { href: '/blog/', label: 'thoughts' },
  { href: '/about/', label: 'about' },
] as const;

export const SOCIAL = [
  { label: 'GitHub', href: 'https://github.com/' },
  { label: 'X', href: 'https://x.com/' },
  { label: 'LinkedIn', href: 'https://linkedin.com/' },
  { label: 'Email', href: 'mailto:hi@example.com' },
] as const;
