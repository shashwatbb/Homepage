/* "Seen in photos" feature pills — hardcoded mock data (srp_image_feature_pills).
   Counts, header lines and alternate covers are fake; nothing is filtered. */

export const FEATURE_CATEGORY_ID = "hf";

export const FEATURES = [
  { id: "natural_light", label: "Natural light", icon: "naturalLight", count: 312, group: "Light and air", header: "86 homes with natural light" },
  { id: "modular_kitchen", label: "Modular kitchen", icon: "modularKitchen", count: 268, group: "Kitchen", header: "74 homes with a modular kitchen" },
  { id: "balcony", label: "Balcony", icon: "balcony", count: 405, group: "Outdoor spaces", header: "112 homes with a balcony" },
  { id: "ventilation", label: "Good ventilation", icon: "ventilation", count: 221, group: "Light and air", header: "63 homes with good ventilation" },
  { id: "sea_view", label: "Sea view", icon: "seaView", count: 48, group: "Views", header: "18 homes with a sea view" },
  { id: "spacious", label: "Spacious rooms", icon: "spacious", count: 187, group: "Interiors", header: "52 homes with spacious rooms" },
  { id: "terrace", label: "Terrace", icon: "terrace", count: 96, group: "Outdoor spaces", header: "27 homes with a terrace" },
  { id: "garden_view", label: "Garden view", icon: "gardenView", count: 133, group: "Views", header: "39 homes with a garden view" },
];

export const FEATURE_GROUPS = ["Light and air", "Views", "Kitchen", "Interiors", "Outdoor spaces"];

export const featureById = (id) => FEATURES.find((f) => f.id === id);

/** One alternate cover per listing per feature — simple lookup, mock photos. */
export const featureCover = (listingId, featureId) =>
  `https://picsum.photos/seed/${listingId}-${featureId}/900/675`;

export const SEARCH_PLACEHOLDERS = [
  "2BHK in Andheri West with natural light",
  "3BHK in Worli with sea view",
  "1BHK for rent in Powai with modular kitchen",
  "2BHK in Thane West with balcony",
];
