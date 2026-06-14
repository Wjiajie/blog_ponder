// Small text helpers shared across the site.
//
// Lives here (not in a component) so both .astro templates and MDX
// pages can import the same implementation. Centralising the
// truncation rule means a "cut description at N chars" change is a
// one-file edit, not a 12-file refactor.

/**
 * Truncate a description to a soft length so bullet lists stay
 * compact. We cut on a Chinese / English full stop, falling back to
 * a hard cut at `maxLen` if no terminator is found. ASCII space is
 * preferred over mid-word breaks.
 *
 * @example
 *   truncate("搞 Agent 评测：四本账一起算...", 30)
 *   // "搞 Agent 评测：四本账…"
 *   truncate("a very long English sentence without terminator", 20)
 *   // "a very long English…"
 */
export function truncate(text: string, maxLen = 80): string {
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (cleaned.length <= maxLen) return cleaned;
  const slice = cleaned.slice(0, maxLen);
  const lastTerminator = Math.max(
    slice.lastIndexOf('。'),
    slice.lastIndexOf('. '),
    slice.lastIndexOf(' '),
  );
  return (lastTerminator > maxLen * 0.4 ? slice.slice(0, lastTerminator) : slice) + '…';
}
