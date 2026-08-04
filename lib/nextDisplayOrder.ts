/**
 * Suggests the next `display_order` for a new collection item: one more than
 * the current maximum, so new items land at the END of the list instead of
 * colliding at 0 (which sorted them above all seeded content and tied every
 * new item together).
 */
export function nextDisplayOrder(rows: { display_order: number }[]): number {
  return rows.reduce((max, r) => Math.max(max, r.display_order), 0) + 1;
}
