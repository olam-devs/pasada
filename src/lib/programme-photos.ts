/**
 * Photos for each programme, used when its Sanity entry has no main image.
 * A photo uploaded in Sanity always takes priority over these.
 * Real PASADA photos come first; free stock photos (see public/images/programmes/SOURCES.md)
 * stand in until PASADA supplies its own.
 */
export const servicePhotos: Record<string, string> = {
  "community-sensitization": "/images/community-aids-day.jpg",
  "tb-hiv-services": "/images/community-tb-group.jpg",
  "case-management-services": "/images/home-clinical-care.jpg",
  "hiv-testing-and-counseling": "/images/programmes/lab-technician.jpg",
};

export const projectPhotos: Record<string, string> = {
  "afya-hatua-thps": "/images/programmes/lab-technician.jpg",
  "glra-integrated-tb": "/images/community-tb-group.jpg",
  "afya-jumuishi-mdh": "/images/home-clinical-care.jpg",
};
