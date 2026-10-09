const CATEGORY_IMAGES = {
  "Food Relief": "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=1200&q=80",
  "Youth & Literacy": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
  "Environmental Action": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80",
};

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=1200&q=80";

export function getOpportunityImage(category) {
  return CATEGORY_IMAGES[category] || FALLBACK_IMAGE;
}