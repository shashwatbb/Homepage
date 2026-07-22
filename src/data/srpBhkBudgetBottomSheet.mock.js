import {
  getBhkResultCount,
  getBudgetOption,
  SRP_BUDGET_BHK_GUIDANCE_MOCK,
} from "./srpBudgetBhkGuidance.mock.js";

/** Discrete budget steps for iOS-style min/max pickers (INR). */
export const SRP_BUDGET_SHEET_STEPS = [
  { value: 2_500_000, label: "₹25 L" },
  { value: 5_000_000, label: "₹50 L" },
  { value: 7_500_000, label: "₹75 L" },
  { value: 10_000_000, label: "₹1 Cr" },
  { value: 15_000_000, label: "₹1.5 Cr" },
  { value: 20_000_000, label: "₹2 Cr" },
  { value: 25_000_000, label: "₹2.5 Cr" },
  { value: 30_000_000, label: "₹3 Cr" },
  { value: 35_000_000, label: "₹3.5 Cr" },
  { value: 40_000_000, label: "₹4 Cr" },
  { value: 50_000_000, label: "₹5 Cr" },
  { value: 70_000_000, label: "₹7 Cr" },
  { value: 100_000_000, label: "₹10 Cr" },
];

export const SRP_BHK_STEPPER_MIN = 1;
export const SRP_BHK_STEPPER_MAX = 5;
export const SRP_BHK_STEPPER_DEFAULT = 2;

/** Maps stepper value to mock inventory bucket id (4+ for 4 and 5). */
export function bhkValueToMockId(value) {
  if (value >= 4) return "4-plus-bhk";
  return `${value}-bhk`;
}

export function getBhkLabelFromValue(value) {
  return `${value} BHK`;
}

export function formatBudgetRangeLabel(minValue, maxValue) {
  const minStep = SRP_BUDGET_SHEET_STEPS.find((step) => step.value === minValue);
  const maxStep = SRP_BUDGET_SHEET_STEPS.find((step) => step.value === maxValue);
  if (!minStep || !maxStep) return "Budget";
  if (minValue === maxValue) return minStep.label;
  return `${minStep.label} – ${maxStep.label}`;
}

function budgetBucketIdForMax(maxValue) {
  if (maxValue <= 20_000_000) return "under-2cr";
  if (maxValue <= 35_000_000) return "2-3.5cr";
  return "3.5cr-plus";
}

export function getSheetResultCount(bhkId, minValue, maxValue) {
  if (!bhkId || minValue == null || maxValue == null) {
    return SRP_BUDGET_BHK_GUIDANCE_MOCK.defaultResultCount;
  }

  const bucketId = budgetBucketIdForMax(maxValue);
  const option = getBudgetOption(bhkId, bucketId);
  if (option) return option.count;

  return getBhkResultCount(bucketId, bhkId);
}
