/** Mock inventory guidance for SRP budget/BHK experiment — swap with API later. */
export const SRP_BUDGET_BHK_GUIDANCE_MOCK = {
  defaultResultCount: 44,
  budgetBuckets: [
    { id: "under-2cr", label: "Under ₹2 Cr", count: 11 },
    { id: "2-3.5cr", label: "₹2–3.5 Cr", count: 19 },
    { id: "3.5cr-plus", label: "₹3.5 Cr+", count: 14 },
  ],
  bhkByBudget: {
    "under-2cr": [
      { id: "1-bhk", label: "1 BHK", count: 6 },
      { id: "2-bhk", label: "2 BHK", count: 5 },
    ],
    "2-3.5cr": [
      { id: "2-bhk", label: "2 BHK", count: 9 },
      { id: "3-bhk", label: "3 BHK", count: 10 },
    ],
    "3.5cr-plus": [
      { id: "3-bhk", label: "3 BHK", count: 8 },
      { id: "4-plus-bhk", label: "4+ BHK", count: 6 },
    ],
  },
};

export function getBudgetBucket(bucketId) {
  return SRP_BUDGET_BHK_GUIDANCE_MOCK.budgetBuckets.find((bucket) => bucket.id === bucketId) ?? null;
}

export function getBhkOption(budgetId, bhkId) {
  return SRP_BUDGET_BHK_GUIDANCE_MOCK.bhkByBudget[budgetId]?.find((option) => option.id === bhkId) ?? null;
}

export function getBudgetResultCount(budgetId) {
  const bucket = getBudgetBucket(budgetId);
  if (!bucket) return SRP_BUDGET_BHK_GUIDANCE_MOCK.defaultResultCount;
  return bucket.count;
}

export function getBhkResultCount(budgetId, bhkId) {
  const option = getBhkOption(budgetId, bhkId);
  if (!option) return getBudgetResultCount(budgetId);
  return option.count;
}
