// Locality Discovery flow — mocked data + matching only (no real backend).
// Signals kept strictly to: budget, distance from anchors, infra, lifestyle
// tags, demand/trending tier. Never religion/caste/community.

export const BHK_OPTIONS = ["1 RK", "1 BHK", "2 BHK", "3 BHK", "4+ BHK"];
export const PROPERTY_TYPE_OPTIONS = ["Apartment", "Villa", "Builder floor", "Plot"];

/** Plus/minus budget stepper tables — fixed, non-uniform rungs (same style
 * ladder as the homepage SRP budget experiment). Buy is in ₹ Cr, rent in ₹
 * thousands/month. Index-based, no min/max formula. */
export const BUDGET_STEPS_BUY = [
  { value: 0.25, label: "₹25 L" },
  { value: 0.5, label: "₹50 L" },
  { value: 0.75, label: "₹75 L" },
  { value: 0.9, label: "₹90 L" },
  { value: 1, label: "₹1 Cr" },
  { value: 1.5, label: "₹1.5 Cr" },
  { value: 2, label: "₹2 Cr" },
  { value: 2.25, label: "₹2.25 Cr" },
  { value: 2.5, label: "₹2.5 Cr" },
  { value: 3, label: "₹3 Cr" },
  { value: 3.5, label: "₹3.5 Cr" },
  { value: 4, label: "₹4 Cr" },
  { value: 5, label: "₹5 Cr" },
  { value: 7, label: "₹7 Cr" },
  { value: 10, label: "₹10 Cr" },
];
export const BUDGET_STEPS_RENT = [
  { value: 8, label: "₹8 k/mo" },
  { value: 12, label: "₹12 k/mo" },
  { value: 15, label: "₹15 k/mo" },
  { value: 18, label: "₹18 k/mo" },
  { value: 20, label: "₹20 k/mo" },
  { value: 25, label: "₹25 k/mo" },
  { value: 30, label: "₹30 k/mo" },
  { value: 35, label: "₹35 k/mo" },
  { value: 40, label: "₹40 k/mo" },
  { value: 50, label: "₹50 k/mo" },
  { value: 60, label: "₹60 k/mo" },
  { value: 75, label: "₹75 k/mo" },
  { value: 90, label: "₹90 k/mo" },
  { value: 120, label: "₹1.2 L/mo" },
  { value: 150, label: "₹1.5 L/mo" },
];
export const BUDGET_STEPS_DEFAULT_INDEX = 6;

/** Landmark search dataset — mocked POIs per supported city, no real
 * geocoding. Offsets are small deterministic jitters around the city center. */
export const LANDMARKS_BY_CITY = {
  Mumbai: [
    { id: "mum-1", name: "Bandra Kurla Complex", category: "office", offset: [0.02, -0.01] },
    { id: "mum-2", name: "Lilavati Hospital", category: "hospital", offset: [-0.015, 0.01] },
    { id: "mum-3", name: "Cathedral & John Connon School", category: "school", offset: [0.005, 0.02] },
    { id: "mum-4", name: "Andheri Metro Station", category: "metro", offset: [-0.03, -0.02] },
    { id: "mum-5", name: "Phoenix Marketcity", category: "mall", offset: [0.04, 0.03] },
    { id: "mum-6", name: "Powai Tech Park", category: "office", offset: [0.06, 0.05] },
    { id: "mum-7", name: "Kokilaben Hospital", category: "hospital", offset: [-0.02, -0.04] },
    { id: "mum-8", name: "Ghatkopar Metro Station", category: "metro", offset: [0.03, 0.06] },
  ],
  Delhi: [
    { id: "del-1", name: "Connaught Place", category: "office", offset: [0, 0] },
    { id: "del-2", name: "AIIMS Delhi", category: "hospital", offset: [-0.03, 0.02] },
    { id: "del-3", name: "DPS RK Puram", category: "school", offset: [-0.02, -0.03] },
    { id: "del-4", name: "Rajiv Chowk Metro Station", category: "metro", offset: [0.01, 0.01] },
    { id: "del-5", name: "Select Citywalk", category: "mall", offset: [-0.04, 0.04] },
    { id: "del-6", name: "Cyber Hub", category: "office", offset: [0.05, -0.02] },
  ],
  Bengaluru: [
    { id: "blr-1", name: "Electronic City", category: "office", offset: [0.05, 0.02] },
    { id: "blr-2", name: "Manipal Hospital", category: "hospital", offset: [-0.02, 0.01] },
    { id: "blr-3", name: "National Public School", category: "school", offset: [0.01, -0.03] },
    { id: "blr-4", name: "MG Road Metro Station", category: "metro", offset: [0, 0.01] },
    { id: "blr-5", name: "Orion Mall", category: "mall", offset: [-0.03, -0.02] },
    { id: "blr-6", name: "Whitefield Tech Park", category: "office", offset: [0.06, 0.05] },
  ],
  Noida: [
    { id: "noi-1", name: "Sector 62 Office Hub", category: "office", offset: [0.02, 0.01] },
    { id: "noi-2", name: "Fortis Hospital", category: "hospital", offset: [-0.02, 0.02] },
    { id: "noi-3", name: "Amity International School", category: "school", offset: [0.01, -0.02] },
    { id: "noi-4", name: "Botanical Garden Metro Station", category: "metro", offset: [-0.01, -0.01] },
    { id: "noi-5", name: "DLF Mall of India", category: "mall", offset: [0.03, 0.03] },
  ],
  Gurgaon: [
    { id: "gur-1", name: "Cyber City", category: "office", offset: [0, 0] },
    { id: "gur-2", name: "Medanta Hospital", category: "hospital", offset: [-0.02, 0.02] },
    { id: "gur-3", name: "The Shri Ram School", category: "school", offset: [0.02, -0.02] },
    { id: "gur-4", name: "HUDA City Centre Metro Station", category: "metro", offset: [-0.01, 0.01] },
    { id: "gur-5", name: "Ambience Mall", category: "mall", offset: [0.03, 0.02] },
  ],
  Hyderabad: [
    { id: "hyd-1", name: "HITEC City", category: "office", offset: [0.02, 0.02] },
    { id: "hyd-2", name: "Apollo Hospital", category: "hospital", offset: [-0.02, -0.01] },
    { id: "hyd-3", name: "Delhi Public School", category: "school", offset: [0.01, -0.03] },
    { id: "hyd-4", name: "Ameerpet Metro Station", category: "metro", offset: [0, 0.01] },
    { id: "hyd-5", name: "Inorbit Mall", category: "mall", offset: [-0.03, 0.03] },
  ],
};

export function searchLandmarks(city, query) {
  const list = LANDMARKS_BY_CITY[city] || LANDMARKS_BY_CITY.Gurgaon;
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return list.filter((l) => l.name.toLowerCase().includes(q) || l.category.toLowerCase().includes(q)).slice(0, 6);
}

export function landmarkCoords(city, landmark) {
  const center = cityCenter(city);
  return [center[0] + landmark.offset[0], center[1] + landmark.offset[1]];
}

// distanceLabel is illustrative only — a rough km read of the same
// mockCommuteMinutes rate used for the map's travel-radius circle, not a
// separate model. "Flexible" has no upper bound so no distance to show.
export const COMMUTE_OPTIONS = [
  { id: "15", label: "Under 15 min", maxMinutes: 15, distanceLabel: "~1-4 km" },
  { id: "30", label: "15 to 30 min", maxMinutes: 30, distanceLabel: "~4-10 km" },
  { id: "45", label: "30 to 45 min", maxMinutes: 45, distanceLabel: "~10-16 km" },
  { id: "flexible", label: "Flexible", maxMinutes: Infinity, distanceLabel: null },
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
const DEFAULT_CENTER = CITY_CENTERS.Gurgaon;

export function cityCenter(city) {
  return CITY_CENTERS[city] || DEFAULT_CENTER;
}

/** Mock locality pool. Coordinates are jittered around a city center below,
 * not real geocoding. lifestyle_tags used only for matched_signals text.
 * Named for real Gurgaon-area localities — this flow's primary market —
 * rather than generic placeholder names, so results read as authentic
 * even though matching/pricing itself is mocked. Reused as-is for other
 * cities too (no real per-city dataset), same simplification as before. */
export const LOCALITY_POOL = [
  { name: "Sector 29", offset: [0.03, -0.04], demand_tier: "high", trending_score: 0.86, lifestyle_tags: ["transit", "social_infra"], price_index: 0.62, bhk_availability: ["1 BHK", "2 BHK", "3 BHK"] },
  { name: "South City 1", offset: [-0.05, 0.02], demand_tier: "medium", trending_score: 0.52, lifestyle_tags: ["green", "low_traffic"], price_index: 0.48, bhk_availability: ["2 BHK", "3 BHK", "4+ BHK"] },
  { name: "DLF Phase 3", offset: [0.015, 0.06], demand_tier: "high", trending_score: 0.91, lifestyle_tags: ["transit", "new_dev"], price_index: 0.74, bhk_availability: ["2 BHK", "3 BHK", "4+ BHK"] },
  { name: "Sushant Lok 1", offset: [-0.02, -0.07], demand_tier: "medium", trending_score: 0.44, lifestyle_tags: ["green", "safety"], price_index: 0.55, bhk_availability: ["1 BHK", "2 BHK"] },
  { name: "Palam Vihar", offset: [0.06, 0.01], demand_tier: "low", trending_score: 0.21, lifestyle_tags: ["social_infra"], price_index: 0.33, bhk_availability: ["1 RK", "1 BHK", "2 BHK"] },
  { name: "Sohna Road", offset: [-0.04, 0.05], demand_tier: "medium", trending_score: 0.6, lifestyle_tags: ["safety", "green"], price_index: 0.58, bhk_availability: ["2 BHK", "3 BHK"] },
  { name: "Golf Course Road", offset: [0.02, -0.02], demand_tier: "high", trending_score: 0.78, lifestyle_tags: ["transit", "new_dev"], price_index: 0.7, bhk_availability: ["1 BHK", "2 BHK", "3 BHK", "4+ BHK"] },
  { name: "Sector 56", offset: [-0.06, -0.03], demand_tier: "low", trending_score: 0.3, lifestyle_tags: ["low_traffic"], price_index: 0.4, bhk_availability: ["1 RK", "1 BHK"] },
];

/** Small, deliberately simple mock content for the locality/area search screen
 * (Figma "Imagine / Search / m-web", node 6538:9768) — reuses LOCALITY_POOL /
 * LANDMARKS_BY_CITY names instead of inventing a new dataset. Not city-aware
 * (LOCALITY_POOL itself isn't), same simplification the recommendations
 * screen above already makes. */
export const RECENT_LOCALITY_SEARCHES = [
  { name: "Sector 29", note: "Buy 2 BHK under 3 Cr", tag: "3 new" },
  { name: "DLF Phase 3", note: "Buy 3 BHK under 4 Cr" },
  { name: "Golf Course Road", note: "Rent 2 BHK under 60k" },
];

export const LOCALITY_HOTSPOTS = [
  { name: "Golf Course Road", note: "High demand, new launches", yoyPercent: 12 },
  { name: "Palam Vihar", note: "Cooling off this quarter", yoyPercent: -4 },
];

/** Fixed developer roster for the "Top developers" rail (Buy only). */
export const TOP_DEVELOPERS = [
  { name: "Skyline Developers", projects: 42 },
  { name: "Greenfield Homes", projects: 28 },
  { name: "Urban Nest Builders", projects: 19 },
  { name: "Horizon Realty", projects: 11 },
];

export const TRENDING_PROJECTS = [
  { name: "DLF Phase 3 Residences", locality: "DLF Phase 3", pricePerSqft: 14500 },
  { name: "Sohna Road Towers", locality: "Sohna Road", pricePerSqft: 9800 },
  { name: "Golf Course Vista", locality: "Golf Course Road", pricePerSqft: 12200 },
];

/** ₹/sqft, formatted for the "Popular localities" and "Trending projects"
 * cards — simple Indian-digit-group formatting, no new pricing feed. */
export function formatPricePerSqft(value) {
  return `₹${Math.round(value).toLocaleString("en-IN")}/sqft`;
}

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

/** Inverse of mockCommuteMinutes — how far (km) the user's chosen commute
 * tolerance reaches, for drawing the "close enough" radius around a landmark
 * on the recommendations map. Same mock rate, no separate model. */
export function commuteMinutesToKm(minutes) {
  return Math.max(0, (minutes - 4) / 2.6);
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

/** Formats a mock locality price for the recommendation card's budget line —
 * ₹ Cr/L for buy, ₹ k or L per month for rent. Simple, deliberately
 * unsophisticated (this is a mocked-data prototype, not a real pricing feed). */
export function formatLocalityBudget(value, unit) {
  const v = Math.max(value, unit === "rent" ? 4 : 0.1);
  if (unit === "rent") {
    if (v >= 100) return `₹${(v / 100).toFixed(1).replace(/\.0$/, "")} L/mo`;
    return `₹${Math.round(v)} k/mo`;
  }
  if (v >= 1) return `₹${v % 1 === 0 ? v : v.toFixed(2).replace(/0$/, "").replace(/\.$/, "")} Cr`;
  return `₹${Math.round(v * 100)} L`;
}

/**
 * Score + rank mock localities against collected discovery state.
 * Returns { center, ranked } where ranked[].matched_signals /
 * appreciation_signals / distance_from_landmarks follow the shape described
 * in the flow's data contract. BHK and commute tolerance both actively
 * influence score/order here, not just budget/landmarks/lifestyle/intent.
 */
export function getRecommendedLocalities(state) {
  const center = cityCenter(state.city);
  const hasLandmarks = state.landmarks.length > 0;
  const budgetCeilingIndex = state.budgetMax || 1;
  const commuteLimit = COMMUTE_OPTIONS.find((c) => c.id === state.commuteTolerance)?.maxMinutes ?? Infinity;

  const candidates = LOCALITY_POOL.map((base, i) => {
    const coords = [center[0] + base.offset[0], center[1] + base.offset[1]];
    const distance_from_landmarks = state.landmarks.map((landmark) => {
      const km = haversineKm(coords, landmark.coords || center);
      return { landmark_name: landmark.name, km: Math.round(km * 10) / 10, minutes: mockCommuteMinutes(km) };
    });
    const farthestMinutes = hasLandmarks ? Math.max(...distance_from_landmarks.map((d) => d.minutes)) : 0;
    const withinCommute = !hasLandmarks || farthestMinutes <= commuteLimit;

    const estimated_price = base.price_index * budgetCeilingIndex;
    const price_band_match = priceBandMatch(base.price_index, state.budgetMin, state.budgetMax, budgetCeilingIndex);
    const bhkAvailable = !state.bhk || base.bhk_availability.includes(state.bhk);

    const matched_signals = [];
    if (hasLandmarks) {
      distance_from_landmarks.forEach((d) => matched_signals.push(`${d.minutes} min from ${d.landmark_name}`));
    } else if (base.trending_score >= 0.7) {
      matched_signals.push("Trending in " + (state.service === "rent" ? "Rent" : "Buy"));
    }
    if (price_band_match === "within_budget") matched_signals.push("Within budget");
    if (state.bhk && bhkAvailable) matched_signals.push(`${state.bhk} available`);
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

    // Composite score: closer + within-commute + within-budget + right BHK + demand/trending + lifestyle overlap.
    let score = 0;
    if (hasLandmarks) {
      score += Math.max(0, 60 - farthestMinutes);
      score += withinCommute ? 15 : -30;
    } else {
      score += base.trending_score * 60;
    }
    score += price_band_match === "within_budget" ? 25 : price_band_match === "below_budget" ? 10 : -10;
    score += bhkAvailable ? 12 : -15;
    score += base.demand_tier === "high" ? 15 : base.demand_tier === "medium" ? 8 : 0;
    score += state.lifestyleTags.filter((t) => base.lifestyle_tags.includes(t)).length * 6;

    return {
      id: `loc-${i}`,
      name: base.name,
      coordinates: coords,
      distance_from_landmarks,
      estimated_price,
      price_band_match,
      bhk_available: bhkAvailable,
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
