// Locality Discovery flow — mocked data + matching only (no real backend).
// Signals kept strictly to: budget, distance from anchors, infra, lifestyle
// tags, demand/trending tier. Never religion/caste/community.

export const BHK_OPTIONS = ["1 RK", "1 BHK", "2 BHK", "3 BHK", "4+ BHK"];
export const PROPERTY_TYPE_OPTIONS = ["Apartment", "Villa", "Builder floor", "Plot"];

export const ANCHOR_TYPES = [
  { id: "workplace", label: "Near my workplace", needsInput: "map" },
  { id: "school", label: "Near my child's school", needsInput: "map" },
  { id: "family", label: "Near family", needsInput: "map" },
  { id: "liked_area", label: "An area I already like", needsInput: "locality" },
  { id: "none", label: "No strong anchor, open to explore", exclusive: true },
];

export const COMMUTE_OPTIONS = [
  { id: "15", label: "Under 15 min" },
  { id: "30", label: "15 to 30 min" },
  { id: "45", label: "30 to 45 min" },
  { id: "flexible", label: "Flexible" },
];

export const INTENT_OPTIONS = [
  { id: "live_in", label: "To live in" },
  { id: "investment", label: "Primarily an investment" },
];

export const LIFESTYLE_TAGS = [
  { id: "transit", label: "Metro / transit connectivity" },
  { id: "low_traffic", label: "Low traffic" },
  { id: "social_infra", label: "Social infra (malls, hospitals, restaurants)" },
  { id: "green", label: "Parks and green cover" },
  { id: "safety", label: "Safety" },
  { id: "new_dev", label: "New developments" },
];

/** Rough city centers for map framing (mock — not geocoded). */
export const CITY_CENTERS = {
  Mumbai: [19.076, 72.8777],
  Delhi: [28.6139, 77.209],
  Bengaluru: [12.9716, 77.5946],
  Noida: [28.5355, 77.391],
  Gurgaon: [28.4595, 77.0266],
  Hyderabad: [17.385, 78.4867],
};
const DEFAULT_CENTER = CITY_CENTERS.Mumbai;

export function cityCenter(city) {
  return CITY_CENTERS[city] || DEFAULT_CENTER;
}

/** Mock locality pool. Coordinates are jittered around a city center below,
 * not real geocoding. lifestyle_tags used only for matched_signals text. */
const LOCALITY_POOL = [
  { name: "Sector 21", offset: [0.03, -0.04], demand_tier: "high", trending_score: 0.86, lifestyle_tags: ["transit", "social_infra"], price_index: 0.62 },
  { name: "Green Meadows", offset: [-0.05, 0.02], demand_tier: "medium", trending_score: 0.52, lifestyle_tags: ["green", "low_traffic"], price_index: 0.48 },
  { name: "Central Heights", offset: [0.015, 0.06], demand_tier: "high", trending_score: 0.91, lifestyle_tags: ["transit", "new_dev"], price_index: 0.74 },
  { name: "Riverside Enclave", offset: [-0.02, -0.07], demand_tier: "medium", trending_score: 0.44, lifestyle_tags: ["green", "safety"], price_index: 0.55 },
  { name: "Old Town", offset: [0.06, 0.01], demand_tier: "low", trending_score: 0.21, lifestyle_tags: ["social_infra"], price_index: 0.33 },
  { name: "Lakeview Residency", offset: [-0.04, 0.05], demand_tier: "medium", trending_score: 0.6, lifestyle_tags: ["safety", "green"], price_index: 0.58 },
  { name: "Tech Park North", offset: [0.02, -0.02], demand_tier: "high", trending_score: 0.78, lifestyle_tags: ["transit", "new_dev"], price_index: 0.7 },
  { name: "Silver Oaks", offset: [-0.06, -0.03], demand_tier: "low", trending_score: 0.3, lifestyle_tags: ["low_traffic"], price_index: 0.4 },
];

function haversineKm([lat1, lon1], [lat2, lon2]) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Mock: 3-4x drive-minutes-per-km, deterministic (no traffic API). */
function mockCommuteMinutes(km) {
  return Math.round(km * 2.6 + 4);
}

function priceBandMatch(priceIndex, budgetMin, budgetMax, budgetCeilingIndex) {
  // budgetMin/Max are in the user's chosen unit; budgetCeilingIndex normalizes
  // the mock price_index (0..1) against the top of the visible range so the
  // comparison stays in relative terms without real per-locality pricing data.
  const localityBudget = priceIndex * budgetCeilingIndex;
  if (localityBudget <= budgetMax && localityBudget >= budgetMin * 0.7) return "within_budget";
  if (localityBudget < budgetMin * 0.7) return "below_budget";
  return "above_budget";
}

/**
 * Score + rank mock localities against collected discovery state.
 * Returns { center, anchors, ranked } where ranked[].matched_signals /
 * appreciation_signals / distance_from_anchors follow the shape described
 * in the flow's data contract.
 */
export function getRecommendedLocalities(state) {
  const center = cityCenter(state.city);
  const hasAnchors = state.anchors.length > 0;
  const budgetCeilingIndex = state.budgetMax || 1;

  const candidates = LOCALITY_POOL.map((base, i) => {
    const coords = [center[0] + base.offset[0], center[1] + base.offset[1]];
    const distance_from_anchors = state.anchors.map((anchor) => {
      const km = haversineKm(coords, anchor.coords || center);
      return { anchor_label: anchor.label, km: Math.round(km * 10) / 10, minutes: mockCommuteMinutes(km) };
    });

    const price_band_match = priceBandMatch(base.price_index, state.budgetMin, state.budgetMax, budgetCeilingIndex);

    const matched_signals = [];
    if (hasAnchors) {
      distance_from_anchors.forEach((d) => matched_signals.push(`${d.minutes} min from ${d.anchor_label}`));
    } else if (base.trending_score >= 0.7) {
      matched_signals.push("Trending in " + (state.service === "rent" ? "Rent" : "Buy"));
    }
    if (price_band_match === "within_budget") matched_signals.push("Within budget");
    if (base.demand_tier === "high") matched_signals.push("High demand tier");
    state.lifestyleTags.forEach((tagId) => {
      if (base.lifestyle_tags.includes(tagId)) {
        const tag = LIFESTYLE_TAGS.find((t) => t.id === tagId);
        if (tag) matched_signals.push(tag.label);
      }
    });

    const appreciation_signals =
      state.intent === "investment"
        ? [
            base.trending_score >= 0.6 ? "Strong appreciation trend" : "Stable price trend",
            base.demand_tier === "high" ? "High buyer demand" : "Moderate buyer demand",
          ]
        : [];

    // Composite score: closer + within-budget + demand/trending + lifestyle overlap.
    let score = 0;
    if (hasAnchors) {
      const maxMinutes = Math.max(...distance_from_anchors.map((d) => d.minutes), 1);
      score += Math.max(0, 60 - maxMinutes);
    } else {
      score += base.trending_score * 60;
    }
    score += price_band_match === "within_budget" ? 25 : price_band_match === "below_budget" ? 10 : -10;
    score += base.demand_tier === "high" ? 15 : base.demand_tier === "medium" ? 8 : 0;
    score += state.lifestyleTags.filter((t) => base.lifestyle_tags.includes(t)).length * 6;

    return {
      id: `loc-${i}`,
      name: base.name,
      coordinates: coords,
      distance_from_anchors,
      price_band_match,
      demand_tier: base.demand_tier,
      trending_score: base.trending_score,
      matched_signals: matched_signals.slice(0, 3),
      appreciation_signals,
      score,
    };
  });

  candidates.sort((a, b) => b.score - a.score);
  return { center, ranked: candidates };
}
