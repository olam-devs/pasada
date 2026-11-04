/**
 * Photos for each programme, used when its Sanity entry has no main image.
 * A photo uploaded in Sanity always takes priority over these.
 * Real PASADA photos are used wherever one exists. The others are free stock
 * photos (see public/images/programmes/SOURCES.md) that stand in until PASADA
 * supplies its own; replace them by uploading a Main image in Sanity.
 */
const P = "/images/programmes";

export const servicePhotos: Record<string, string> = {
  // Real PASADA photos
  "community-sensitization": "/images/community-aids-day.jpg",
  "tb-hiv-services": "/images/community-tb-group.jpg",
  "case-management-services": "/images/home-clinical-care.jpg",
  // Stand-in stock photos
  "hiv-testing-and-counseling": `${P}/hiv-testing.jpg`,
  "provision-of-art": `${P}/art-medication.jpg`,
  "pmtct-screening": `${P}/mother-and-newborn.jpg`,
  "cervical-cancer-screening": `${P}/womens-health.jpg`,
  "home-based-and-palliative-care": `${P}/home-care.jpg`,
  "psychosocial-support": `${P}/support-group.jpg`,
  "capacity-development": `${P}/training-workshop.jpg`,
  "ovc-caregiver-support": `${P}/caregivers-and-children.jpg`,
};

export const projectPhotos: Record<string, string> = {
  // Real PASADA photos
  "afya-hatua-thps": `${P}/lab-technician.jpg`,
  "glra-integrated-tb": "/images/community-tb-group.jpg",
  // Stand-in stock photos
  "afya-jumuishi-mdh": `${P}/community-health-check.jpg`,
  "slf-ovc-support": `${P}/community-meeting.jpg`,
  "achieve-pact": `${P}/health-education.jpg`,
  "achieve-ecd": `${P}/newborn-care.jpg`,
  "ready-reppsi": `${P}/training-workshop.jpg`,
};
