// One-off / re-runnable seed script: pushes real PASADA content into Sanity.
// Usage: node scripts/seed-content.mjs   (reads SANITY_API_WRITE_TOKEN from .env.local)
import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnvLocal() {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}
loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "4mu2imft";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN (expected in .env.local). Aborting.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-01-01",
  token,
  useCdn: false,
});

function block(text, style = "normal") {
  return {
    _type: "block",
    style,
    children: [{ _type: "span", text, marks: [] }],
    markDefs: [],
  };
}

function bullet(text) {
  return {
    _type: "block",
    style: "normal",
    listItem: "bullet",
    level: 1,
    children: [{ _type: "span", text, marks: [] }],
    markDefs: [],
  };
}

const projectCategories = [
  { _id: "projectCategory.health", _type: "projectCategory", title: "Health", slug: { _type: "slug", current: "health" } },
  { _id: "projectCategory.ovc", _type: "projectCategory", title: "OVC", slug: { _type: "slug", current: "ovc" } },
  { _id: "projectCategory.research", _type: "projectCategory", title: "Research", slug: { _type: "slug", current: "research" } },
  { _id: "projectCategory.community", _type: "projectCategory", title: "Community", slug: { _type: "slug", current: "community" } },
];

const projects = [
  {
    _id: "project.afya-thabiti-amref",
    _type: "project",
    title: "Afya Thabiti Project (AMREF)",
    slug: { _type: "slug", current: "afya-thabiti-amref" },
    category: { _type: "reference", _ref: "projectCategory.health" },
    status: "Ongoing",
    partner: "Amref Health Africa Tanzania",
    duration: "October 2023 - September 2028",
    tag: "HIV & TB",
    sortOrder: 1,
    featured: true,
    summary:
      "A five-year project (Oct 2023-Sep 2028) supporting the Government of Tanzania to deliver comprehensive HIV and TB prevention, care and treatment services across 19 health facilities in Dar es Salaam.",
    content: [
      block("Project overview", "h2"),
      block(
        "The Afya Thabiti Project is implemented by Amref Health Africa Tanzania as the prime partner, in collaboration with PASADA, with the partnership commencing in January 2026 and continuing to date. The project supports the Government of Tanzania in delivering comprehensive HIV and TB prevention, care, and treatment services.",
      ),
      block(
        "It is implemented in Dar es Salaam across 19 health facilities under the Dar es Salaam Archdiocese, in all five councils of the region, in collaboration with the Ministry of Health, the President's Office - Regional Administration and Local Government (PO-RALG), and the respective Regional and Council Health Management Teams (R/CHMTs).",
      ),
      block(
        "Through its interventions, the project contributes to Tanzania's commitment to ending AIDS as a public health threat by 2030, in line with the UNAIDS 95-95-95 targets.",
      ),
    ],
  },
  {
    _id: "project.afya-hatua-thps",
    _type: "project",
    title: "Afya Hatua Project (THPS)",
    slug: { _type: "slug", current: "afya-hatua-thps" },
    category: { _type: "reference", _ref: "projectCategory.health" },
    status: "Ongoing",
    partner: "Tanzania Health Promotion Support (THPS)",
    duration: "2021-2026 (PASADA partnership from October 2023)",
    tag: "HIV & TB",
    sortOrder: 2,
    featured: true,
    summary:
      "A five-year initiative (2021-2026) supporting comprehensive HIV and TB prevention, care and treatment services across 6 health facilities in Pwani region.",
    content: [
      block("Project overview", "h2"),
      block(
        "The Afya Hatua Project is implemented through a collaboration between THPS as the prime partner and PASADA, with the partnership commencing in October 2023 and continuing to date. The project is implemented in Pwani region across 6 health facilities under the Dar es Salaam Archdiocese, in collaboration with the Ministry of Health, PO-RALG, and the respective R/CHMTs.",
      ),
      block("Targets", "h3"),
      block(
        "The implementation aims to ensure that 95% of people living with HIV know their status, 95% of those diagnosed receive sustained antiretroviral therapy (ART), and 95% of individuals on treatment achieve viral suppression.",
      ),
    ],
  },
  {
    _id: "project.glra-integrated-tb",
    _type: "project",
    title: "GLRA - Integrated TB Approach",
    slug: { _type: "slug", current: "glra-integrated-tb" },
    category: { _type: "reference", _ref: "projectCategory.health" },
    status: "Ongoing",
    partner: "GLRA (German Leprosy and TB Relief Association)",
    duration: "1 June 2025 - 1 May 2027",
    tag: "TB",
    sortOrder: 3,
    featured: true,
    summary:
      "Integrating TB screening and care with diabetes, Covid-19, malnutrition and leprosy services to improve community health outcomes.",
    content: [
      block("Integrated health approach", "h2"),
      block(
        "This project strengthens TB outcomes by integrating screening, education, and referrals with related conditions such as diabetes, Covid-19, malnutrition and leprosy. Community engagement improves early detection and adherence to care.",
      ),
    ],
  },
  {
    _id: "project.slf-ovc-support",
    _type: "project",
    title: "SLF (OVC Support)",
    slug: { _type: "slug", current: "slf-ovc-support" },
    category: { _type: "reference", _ref: "projectCategory.ovc" },
    status: "Ongoing",
    duration: "April 2026 - March 2029",
    tag: "OVC",
    sortOrder: 4,
    summary:
      "Supporting orphans and vulnerable children, young women and teenage girls across districts in Pwani.",
    content: [
      block("Supporting vulnerable families", "h2"),
      block(
        "PASADA supports OVC and caregivers through community follow-up, psychosocial support, referrals and practical guidance, strengthening protection, wellbeing and access to services.",
      ),
    ],
  },
  {
    _id: "project.apopo-sua",
    _type: "project",
    title: "APOPO - SUA",
    slug: { _type: "slug", current: "apopo-sua" },
    category: { _type: "reference", _ref: "projectCategory.research" },
    status: "Ongoing",
    partner: "Sokoine University of Agriculture (SUA) / APOPO",
    duration: "2010 to date",
    tag: "Research",
    sortOrder: 5,
    summary:
      "Research using innovative detection methods to improve TB diagnosis from samples that appeared negative.",
    content: [
      block("Innovation and research", "h2"),
      block(
        "This long-running research partnership strengthens diagnostic pathways and improves outcomes, using innovative detection methods to improve TB diagnosis from samples that initially appeared negative, supporting public health goals through evidence-informed practice.",
      ),
    ],
  },
  {
    _id: "project.afya-jumuishi-mdh",
    _type: "project",
    title: "Afya Jumuishi Project (MDH)",
    slug: { _type: "slug", current: "afya-jumuishi-mdh" },
    category: { _type: "reference", _ref: "projectCategory.health" },
    status: "Completed",
    partner: "Management and Development for Health (MDH)",
    duration: "October 2024 - December 2025",
    tag: "HIV & TB",
    sortOrder: 6,
    summary:
      "A five-year initiative (2021-2026) supporting the Government of Tanzania to deliver comprehensive HIV and TB prevention, care and treatment services; PASADA's partnership ran October 2024-December 2025.",
    content: [
      block("Project overview", "h2"),
      block(
        "The Afya Jumuishi Project was implemented through a collaboration between Management and Development for Health (MDH) as the prime partner and PASADA, supporting the Government of Tanzania in delivering comprehensive HIV and TB prevention, care, and treatment services.",
      ),
    ],
  },
  {
    _id: "project.kizazi-hodari-deloitte",
    _type: "project",
    title: "Kizazi Hodari Southern Zone (Deloitte)",
    slug: { _type: "slug", current: "kizazi-hodari-deloitte" },
    category: { _type: "reference", _ref: "projectCategory.ovc" },
    status: "Completed",
    partner: "Deloitte Consulting Limited (USAID)",
    duration: "2022-2026",
    tag: "OVC",
    sortOrder: 7,
    summary:
      "A USAID-funded, five-year project (2022-2026) improving the health, wellbeing and protection of orphans and vulnerable children (OVC) and youth across 58 councils in 11 regions of southern Tanzania.",
    content: [
      block("Project overview", "h2"),
      block(
        "USAID Kizazi Hodari Southern Zone supported the Government of Tanzania to improve the health, wellbeing, and protection of OVC and youth in high HIV-burden communities across Mtwara, Iringa, Njombe, Ruvuma, Lindi, Morogoro, Pwani, Songwe, Rukwa, Katavi and Mjini Magharibi Zanzibar.",
      ),
      block(
        "Activities were delivered through families and communities, engaging Community Case Workers (CCWs), Lead Case Workers (LCWs) and National Integrated Case Management System (NICMS) Assigned Officers, coordinated with the health workforce and PEPFAR clinical partners to improve bi-directional referrals between clinical and community services.",
      ),
    ],
  },
  {
    _id: "project.achieve-pact",
    _type: "project",
    title: "ACHIEVE - PACT",
    slug: { _type: "slug", current: "achieve-pact" },
    category: { _type: "reference", _ref: "projectCategory.community" },
    status: "Completed",
    partner: "PACT",
    tag: "Community",
    sortOrder: 8,
    summary:
      "PASADA implemented community-level activities supporting HIV prevention, care and referral pathways as a sub-grantee partner.",
    content: [
      block("Program overview", "h2"),
      block(
        "ACHIEVE - PACT supported community-level activities that strengthened prevention, care, and referral pathways. PASADA worked alongside partners to deliver outreach, education, and client follow-up in priority areas.",
      ),
    ],
  },
];

const services = [
  {
    _id: "service.hiv-testing-and-counseling",
    _type: "service",
    title: "HIV testing and counseling",
    slug: { _type: "slug", current: "hiv-testing-and-counseling" },
    sortOrder: 1,
    featured: true,
    summary: "Confidential HIV testing and compassionate counseling, with privacy and respect.",
    content: [
      block("What this service provides", "h2"),
      block(
        "PASADA provides confidential HIV testing and counseling in a supportive environment. Clients receive accurate information, risk-reduction guidance, and referrals based on their needs.",
      ),
    ],
  },
  {
    _id: "service.home-based-and-palliative-care",
    _type: "service",
    title: "Home-based and palliative care",
    slug: { _type: "slug", current: "home-based-and-palliative-care" },
    sortOrder: 2,
    featured: true,
    summary: "Comfort-focused care and supportive follow-up for clients and families.",
    content: [
      block("Comfort-focused support", "h2"),
      block(
        "Home-based and palliative care offers comfort, follow-up, and psychosocial support for clients and families, especially during difficult periods. PASADA teams work with caregivers and health facilities to ensure continuity of care.",
      ),
    ],
  },
  {
    _id: "service.comprehensive-hiv-care",
    _type: "service",
    title: "Comprehensive HIV care and treatment support",
    slug: { _type: "slug", current: "comprehensive-hiv-care" },
    sortOrder: 3,
    featured: true,
    summary: "Holistic, client-centered support to help individuals manage their health.",
    content: [
      block("Holistic treatment support", "h2"),
      block(
        "PASADA supports clients to access and continue HIV care through counseling, adherence support, follow-up and referrals. Services are delivered with respect, confidentiality and compassion.",
      ),
    ],
  },
  {
    _id: "service.pmtct-screening",
    _type: "service",
    title: "PMTCT screening",
    slug: { _type: "slug", current: "pmtct-screening" },
    sortOrder: 4,
    featured: true,
    summary: "Screening and support to prevent mother-to-child transmission.",
    content: [
      block("Protecting mother and child", "h2"),
      block(
        "PMTCT screening supports early identification and timely referrals. PASADA promotes education and respectful counseling for mothers and families, strengthening prevention and continuity of care.",
      ),
    ],
  },
  {
    _id: "service.cervical-cancer-screening",
    _type: "service",
    title: "Cervical cancer screening",
    slug: { _type: "slug", current: "cervical-cancer-screening" },
    sortOrder: 5,
    featured: true,
    summary: "Protecting women's health through early detection and referral pathways.",
    content: [
      block("Women's health", "h2"),
      block(
        "Cervical cancer screening increases awareness and supports early detection. PASADA works with referral pathways to ensure clients receive appropriate follow-up and guidance.",
      ),
    ],
  },
  {
    _id: "service.ncd-screening",
    _type: "service",
    title: "NCD screening",
    slug: { _type: "slug", current: "ncd-screening" },
    sortOrder: 6,
    featured: true,
    summary: "Early detection and wellness support for non-communicable diseases.",
    content: [
      block("Preventing complications early", "h2"),
      block(
        "NCD screening helps communities identify risk factors early and take practical steps toward healthier living. PASADA supports education, screening awareness and referrals when needed.",
      ),
    ],
  },
  {
    _id: "service.ovc-caregiver-support",
    _type: "service",
    title: "Support to OVC and caregivers",
    slug: { _type: "slug", current: "ovc-caregiver-support" },
    sortOrder: 7,
    summary: "Empowering vulnerable children and caregivers with care and dignity.",
  },
  {
    _id: "service.psychosocial-support",
    _type: "service",
    title: "Psychosocial support and counseling",
    slug: { _type: "slug", current: "psychosocial-support" },
    sortOrder: 8,
    summary: "Mental health and emotional support for individuals and families.",
  },
  {
    _id: "service.community-sensitization",
    _type: "service",
    title: "Community sensitization and education",
    slug: { _type: "slug", current: "community-sensitization" },
    sortOrder: 9,
    summary: "Reducing stigma and strengthening prevention through community engagement.",
  },
  {
    _id: "service.capacity-development",
    _type: "service",
    title: "Capacity development",
    slug: { _type: "slug", current: "capacity-development" },
    sortOrder: 10,
    summary: "Training, mentorship and supervision for sustainable program outcomes.",
  },
  {
    _id: "service.provision-of-art",
    _type: "service",
    title: "Provision of ART",
    slug: { _type: "slug", current: "provision-of-art" },
    sortOrder: 11,
    summary:
      "Antiretroviral Therapy (ART) at our Care and Treatment Clinics to increase access for adults and children living with HIV.",
    content: [
      block("ART at our Care and Treatment Clinics", "h2"),
      block(
        "PASADA's Antiretroviral Therapy (ART) program, implemented in Care and Treatment Clinics (CTC), aims to increase access to ART services among adult and child populations living with HIV. The provision and efficacy of ART is monitored through routine laboratory investigations including CD4, viral load, full blood count, and liver and renal function tests.",
      ),
    ],
  },
  {
    _id: "service.fast-track-services",
    _type: "service",
    title: "Fast Track Services",
    slug: { _type: "slug", current: "fast-track-services" },
    sortOrder: 12,
    summary:
      "Upendano Fast Track Unit provides expedited outpatient, HIV/Hepatitis B prevention, laboratory and diagnostic imaging services-having served over 200,000 clients since 2012.",
    content: [
      block("Upendano Fast Track Unit", "h2"),
      block(
        "Established in 2012, the Upendano Fast Track Unit provides expedited healthcare to clients who need urgent attention, including NHIF beneficiaries and individuals who are unaware of their HIV status or facing other health challenges.",
      ),
      block(
        "Since 2012, the unit has served over 200,000 clients, improving access to timely healthcare for NHIF beneficiaries and strengthening preventive HIV and Hepatitis B services.",
      ),
    ],
  },
  {
    _id: "service.laboratory-services",
    _type: "service",
    title: "Laboratory Services",
    slug: { _type: "slug", current: "laboratory-services" },
    sortOrder: 13,
    summary:
      "Upendano Dispensary Laboratory provides technical expertise, reagents and supplies supporting HIV/TB testing and monitoring across the Archdiocese of Dar es Salaam.",
    content: [
      block("Upendano Dispensary Laboratory", "h2"),
      block(
        "Staffed by a laboratory technologist, laboratory assistant and data officer, the laboratory provides technical expertise, essential reagents and supplies to dispensaries across the Archdiocese of Dar es Salaam, supporting HIV/TB/AIDS prevention, care, treatment and support services.",
      ),
    ],
  },
  {
    _id: "service.tb-hiv-services",
    _type: "service",
    title: "TB & HIV Services",
    slug: { _type: "slug", current: "tb-hiv-services" },
    sortOrder: 14,
    summary:
      "Integrated TB screening, TPT provision, HIV counselling and testing, and directly observed treatment at Upendano Dispensary.",
    content: [
      block("Integrated TB and HIV care", "h2"),
      block(
        "Services include TB screening for all PLHIV, TB Preventive Therapy (TPT), HIV counselling and testing, TB diagnosis via GeneXpert/TrueNat/TB LAM/ZN stain microscopy, Directly Observed Treatment (DOT), contact tracing, and integrated TB/HIV, TB/diabetes and TB/malnutrition services under one roof.",
      ),
    ],
  },
  {
    _id: "service.case-management-services",
    _type: "service",
    title: "Case Management Services",
    slug: { _type: "slug", current: "case-management-services" },
    sortOrder: 15,
    summary:
      "Monthly household case management visits for OVC and caregivers, with care plans, direct support and referral linkages.",
    content: [
      block("Community case management", "h2"),
      block(
        "Community Case Workers (CCWs) conduct regular monthly household visits to provide case management services to OVC and caregivers, developing care plans and linking households to health, religious and educational institutions.",
      ),
    ],
  },
];

const serviceCategories = [
  { _id: "serviceCategory.clinical", _type: "serviceCategory", title: "Clinical", slug: { _type: "slug", current: "clinical" } },
];

const blogCategories = [
  { _id: "category.events", _type: "category", title: "Events", slug: { _type: "slug", current: "events" } },
  { _id: "category.awareness", _type: "category", title: "Awareness", slug: { _type: "slug", current: "awareness" } },
  { _id: "category.partnerships", _type: "category", title: "Partnerships", slug: { _type: "slug", current: "partnerships" } },
  { _id: "category.community", _type: "category", title: "Community", slug: { _type: "slug", current: "community" } },
];

const posts = [
  {
    _id: "post.womens-day-2023",
    _type: "post",
    title: "PASADA Women's Day Celebration 2023",
    slug: { _type: "slug", current: "womens-day-2023" },
    category: { _type: "reference", _ref: "category.events" },
    sortOrder: 1,
    featured: true,
    publishedAt: "2023-03-08T00:00:00.000Z",
    excerpt:
      "Celebrating achievements and advancing dignity, health and opportunity for women and girls-through community outreach and supportive services.",
    content: [
      block("Celebrating women and community strength", "h2"),
      block(
        "International Women's Day is an opportunity to celebrate achievements while reaffirming our commitment to dignity and health for women and girls. PASADA activities focus on practical support, community education and respectful care.",
      ),
      block("Highlights", "h3"),
      bullet("Health education and stigma reduction conversations"),
      bullet("Client-centered referrals and follow-up support"),
      bullet("Women's health awareness and early screening information"),
    ],
  },
  {
    _id: "post.aids-day-2022",
    _type: "post",
    title: "PASADA AIDS Day 2022",
    slug: { _type: "slug", current: "aids-day-2022" },
    category: { _type: "reference", _ref: "category.awareness" },
    sortOrder: 2,
    featured: true,
    publishedAt: "2022-12-01T00:00:00.000Z",
    excerpt:
      "Solidarity, education and advocacy toward a world free from stigma and discrimination-strengthening community understanding and support.",
    content: [
      block("Why AIDS Day matters", "h2"),
      block(
        "World AIDS Day is a moment to unite, remember, and act. PASADA uses this day to strengthen awareness, encourage testing, and support those living with or affected by HIV.",
      ),
      block("Focus areas", "h3"),
      block(
        "Our messaging emphasizes dignity, confidentiality, and practical steps that families can take-while addressing stigma and misinformation.",
      ),
      bullet("HIV testing and counseling awareness"),
      bullet("Linkage to care and treatment support"),
      bullet("Psychosocial support for clients and caregivers"),
    ],
  },
  {
    _id: "post.health-summit-2023",
    _type: "post",
    title: "Tanzania Health Summit 2023",
    slug: { _type: "slug", current: "health-summit-2023" },
    category: { _type: "reference", _ref: "category.partnerships" },
    sortOrder: 3,
    publishedAt: "2023-07-01T00:00:00.000Z",
    excerpt:
      "A milestone gathering that strengthened collaboration, practical solutions, and community-centered approaches to public health.",
    content: [
      block("Collaboration for better outcomes", "h2"),
      block(
        "The summit brought together partners working across prevention, care, and community programming. PASADA's work centers on dignity-supporting clients, caregivers and communities with services that are compassionate and accessible.",
      ),
    ],
  },
  {
    _id: "post.community-outreach-2024",
    _type: "post",
    title: "Community outreach in Dar es Salaam",
    slug: { _type: "slug", current: "community-outreach-2024" },
    category: { _type: "reference", _ref: "category.community" },
    sortOrder: 4,
    publishedAt: "2024-02-14T00:00:00.000Z",
    excerpt:
      "Field teams sharing health education, testing awareness, and compassionate follow-up support-building trust one household at a time.",
    content: [
      block("Outreach that builds trust", "h2"),
      block(
        "Community outreach helps families access accurate information and timely referrals. PASADA teams support stigma reduction, encourage health-seeking behavior, and follow up with clients and caregivers who need additional support.",
      ),
    ],
  },
];

const testimonialCategories = [
  { _id: "testimonialCategory.clients", _type: "testimonialCategory", title: "Clients", slug: { _type: "slug", current: "clients" } },
  { _id: "testimonialCategory.caregivers", _type: "testimonialCategory", title: "Caregivers", slug: { _type: "slug", current: "caregivers" } },
  { _id: "testimonialCategory.volunteers", _type: "testimonialCategory", title: "Volunteers", slug: { _type: "slug", current: "volunteers" } },
  { _id: "testimonialCategory.partners", _type: "testimonialCategory", title: "Partners", slug: { _type: "slug", current: "partners" } },
];

function testimonial(id, categoryRef, quote, name, role, sortOrder, featured) {
  const doc = {
    _id: `testimonial.${id}`,
    _type: "testimonial",
    category: { _type: "reference", _ref: categoryRef },
    quote,
    name,
    role,
    sortOrder,
  };
  if (featured) doc.featured = true;
  return doc;
}

const testimonials = [
  testimonial("t1", "testimonialCategory.clients", "PASADA helped my family access care with dignity and without judgement. The support gave us strength during a difficult season.", "Community Member", "Client support", 1, true),
  testimonial("t1b", "testimonialCategory.clients", "From the first visit I felt welcomed. Staff explained every step with patience and treated us with respect.", "Family member", "Outpatient support", 2, true),
  testimonial("t1c", "testimonialCategory.clients", "Medication support and counseling were coordinated in one place. That made it easier for us to stay on treatment.", "Client", "Integrated care", 3),
  testimonial("t1d", "testimonialCategory.clients", "We were never turned away because of faith or background. PASADA serves everyone with the same compassion.", "Parent", "Family support", 4),
  testimonial("t1e", "testimonialCategory.clients", "Home visits helped when transport was difficult. The team listened and adjusted support to our situation.", "Community member", "Home-based care", 5),
  testimonial("t1f", "testimonialCategory.clients", "Peer support groups reminded us we are not alone. Sharing experiences gave us courage to keep going.", "Support group participant", "Peer support", 6),

  testimonial("t2", "testimonialCategory.caregivers", "The counseling services gave me hope and practical guidance. I felt listened to and respected throughout the process.", "Caregiver", "Psychosocial support", 10, true),
  testimonial("t2b", "testimonialCategory.caregivers", "Training and supervision at PASADA helped me support clients with confidence and compassion every day.", "Home-based caregiver", "Care team", 11),
  testimonial("t2c", "testimonialCategory.caregivers", "Clear protocols and respectful supervision help us deliver safe, dignified care in the community.", "Field caregiver", "Community care", 12),
  testimonial("t2d", "testimonialCategory.caregivers", "When cases are complex, the team coordinates quickly so clients do not fall through the gaps.", "Case support worker", "Care coordination", 13),
  testimonial("t2e", "testimonialCategory.caregivers", "Spiritual and emotional support is offered gently-clients choose what helps them without pressure.", "Pastoral care volunteer", "Holistic support", 14),
  testimonial("t2f", "testimonialCategory.caregivers", "Regular reflection sessions help us process difficult days and return to clients with renewed empathy.", "Counselor", "Mental health", 15),

  testimonial("t3", "testimonialCategory.volunteers", "PASADA's outreach programs make health information easier to understand and act on. The community response has been encouraging.", "Volunteer", "Community sensitization", 20, true),
  testimonial("t3b", "testimonialCategory.volunteers", "Volunteering here connected me to people who care deeply about dignity and health in our neighborhoods.", "Community volunteer", "Outreach", 21),
  testimonial("t3c", "testimonialCategory.volunteers", "Door-to-door awareness sessions helped families learn about prevention and where to seek help early.", "Outreach volunteer", "Health education", 22),
  testimonial("t3d", "testimonialCategory.volunteers", "I help organize events and welcome visitors-small tasks that make the center feel warm and open.", "Youth volunteer", "Events & welcome", 23),
  testimonial("t3e", "testimonialCategory.volunteers", "Translating information into Swahili during sessions helped more people participate and ask questions.", "Language volunteer", "Community dialogue", 24),
  testimonial("t3f", "testimonialCategory.volunteers", "Weekend clinics need many hands; volunteering showed me how teamwork keeps services running smoothly.", "Clinical volunteer", "Service support", 25),

  testimonial("t4", "testimonialCategory.partners", "Working with PASADA strengthened referral pathways and community trust. Their team is responsive and committed to dignity in service delivery.", "Program Partner", "Collaboration", 30),
  testimonial("t4b", "testimonialCategory.partners", "Our joint programs reached more families because PASADA coordinates referrals and follow-up with care.", "Faith-based partner", "Referral network", 31),
  testimonial("t4c", "testimonialCategory.partners", "Shared data and regular meetings help us align outreach and avoid duplicating efforts in the same wards.", "NGO collaborator", "Program alignment", 32),
  testimonial("t4d", "testimonialCategory.partners", "PASADA's documentation standards made reporting to donors transparent and focused on client outcomes.", "Funding partner", "Accountability", 33),
  testimonial("t4e", "testimonialCategory.partners", "Hospital linkages improved when PASADA escorts clients and shares care plans with clinical teams.", "Health facility partner", "Referrals", 34),
  testimonial("t4f", "testimonialCategory.partners", "Archdiocese parishes appreciate clear communication-PASADA keeps partners informed and involved.", "Parish partner", "Faith community", 35),
];

const jobs = [
  {
    _id: "job.community-health-outreach-officer",
    _type: "job",
    title: "Community Health Outreach Officer",
    slug: { _type: "slug", current: "community-health-outreach-officer" },
    department: "Programs",
    location: "Dar es Salaam",
    employmentType: "Full-time",
    postedAt: "2026-01-15",
    summary:
      "Support field outreach, client follow-up, and community education activities across PASADA service areas.",
    responsibilities: [
      "Coordinate community sensitization sessions",
      "Support referral pathways and client follow-up",
      "Prepare activity reports and program data",
    ],
    requirements: [
      "Diploma or degree in public health or related field",
      "Experience in community-based HIV programs",
      "Strong communication in Kiswahili and English",
    ],
    applyEmail: "recruitment@pasada.or.tz",
    isActive: true,
  },
  {
    _id: "job.counselor-htc-psychosocial",
    _type: "job",
    title: "Counselor (HTC & Psychosocial Support)",
    slug: { _type: "slug", current: "counselor-htc-psychosocial" },
    department: "Clinical Services",
    location: "Dar es Salaam",
    employmentType: "Full-time",
    postedAt: "2026-02-01",
    summary:
      "Provide compassionate HIV testing & counseling and psychosocial support for clients and families.",
    responsibilities: [
      "Conduct confidential HTC sessions",
      "Provide psychosocial support and referrals",
      "Maintain accurate client documentation",
    ],
    requirements: [
      "Certification in counseling or social work",
      "Experience in HIV/AIDS service delivery",
      "Commitment to dignity, confidentiality, and ethics",
    ],
    applyEmail: "recruitment@pasada.or.tz",
    isActive: true,
  },
];

const tenders = [
  {
    _id: "tender.tender-for-delivery-of-car-hire-service",
    _type: "tender",
    title: "Tender for Delivery of Car Hire Service",
    slug: { _type: "slug", current: "tender-for-delivery-of-car-hire-service" },
    tenderNumber: "PASADA/T/2026/01",
    status: "Closed",
    publishedAt: "2026-01-10",
    deadline: "2026-01-31T17:00:00+03:00",
    summary:
      "PASADA invited competent and licensed car hire service providers to submit bids for the provision of vehicle hire services.",
    content: [
      block("Scope of the tender", "h2"),
      block(
        "Interested and eligible car hire companies were invited to submit technical and financial proposals for the provision of vehicle hire services to support PASADA's program activities.",
      ),
    ],
    contactEmail: "info@pasada.or.tz",
  },
];

function span(text, marks = []) {
  return { _type: "span", text, marks };
}

function richBlock(children, style = "normal") {
  return { _type: "block", style, markDefs: [], children };
}

const aboutPageDoc = {
  _id: "aboutPage",
  _type: "aboutPage",
  heroEyebrow: "About PASADA",
  heroTitle: "A faith-based organization serving all with dignity",
  intro: [
    richBlock([
      span(
        "Pastoral Activities and Services for people with AIDS Dar es Salaam Archdiocese (PASADA (T)) is a faith-based Organization operating under the Roman Catholic Archdiocese of Dar es Salaam. PASADA was formed in ",
      ),
      span("August 1992", ["strong"]),
      span(
        " when a small group of people with HIV gathered to seek mutual aid and support.",
      ),
    ]),
    richBlock([
      span("Although sponsored by the Roman Catholic Church, the services offered by PASADA are available to "),
      span("all individuals without discrimination", ["strong"]),
      span(" and are provided "),
      span("free of charge", ["strong"]),
      span("."),
    ]),
  ],
  missionText:
    "Responding to the call of faith, PASADA (T) strives to provide and maintain quality, caring and compassionate services and support to people infected and affected by HIV and AIDS in Tanzania—with particular attention to the poorest and the neediest—through a holistic approach with the light of the Gospel, emphasizing justice, solidarity, sustainability and efficiency.",
  visionText:
    "A society in which all people can live life to their full potential with dignity and respect.",
  coreValues: [
    { _key: "justice", title: "Justice", description: "Fair access to care for the poorest and neediest.", icon: "scale" },
    { _key: "solidarity", title: "Solidarity", description: "Walking together with families and communities.", icon: "users" },
    { _key: "sustainability", title: "Sustainability", description: "Programs built for long-term community resilience.", icon: "target" },
    { _key: "efficiency", title: "Efficiency", description: "Responsible stewardship of resources and partnerships.", icon: "sparkles" },
    { _key: "compassion", title: "Compassion", description: "Client-centered support rooted in dignity.", icon: "heart" },
    { _key: "respect", title: "Respect", description: "Confidential, non-judgmental service for all.", icon: "eye" },
  ],
  focusAreas: [
    "HIV testing and counseling",
    "Home-based and palliative care",
    "Comprehensive HIV care and treatment support",
    "PMTCT screening",
    "Cervical cancer screening",
    "NCD screening",
    "Support to OVC and caregivers",
    "Psychosocial support and counseling",
    "Community sensitization and education",
    "Capacity development",
  ],
  ctaTitle: "Get inspired—take action",
  ctaText:
    "Donors, volunteers and partners help us strengthen community wellbeing and bring hope to families.",
};

const siteSettingsPatch = {
  donationEmail: "info@pasada.or.tz",
  careersEmail: "recruitment@pasada.or.tz",
  volunteerEmail: "volunteer@pasada.or.tz",
  whistleblowerChannel1Url:
    "https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAANAAob4kyZUME5RVlRHVlZUWEVKUE42TEw2OEFMRDhFMy4u",
  whistleblowerChannel2Url:
    "https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__qiYUi9UQUpVNDhPWk1QQTNRVkY5TFZBNjdXUElUWi4u",
};

async function run() {
  console.log(`Seeding Sanity project ${projectId}/${dataset} ...`);

  const allDocs = [
    ...projectCategories,
    ...projects,
    ...services,
    ...serviceCategories,
    ...blogCategories,
    ...posts,
    ...testimonialCategories,
    ...testimonials,
    ...jobs,
    ...tenders,
    aboutPageDoc,
  ];

  const tx = client.transaction();
  for (const doc of allDocs) {
    tx.createOrReplace(doc);
  }
  await tx.commit();
  console.log(`Upserted ${allDocs.length} documents:`);
  console.log(`  - ${projectCategories.length} project categories, ${projects.length} projects`);
  console.log(`  - ${serviceCategories.length} service categories, ${services.length} services`);
  console.log(`  - ${blogCategories.length} blog categories, ${posts.length} blog posts`);
  console.log(`  - ${testimonialCategories.length} testimonial categories, ${testimonials.length} testimonials`);
  console.log(`  - ${jobs.length} jobs, ${tenders.length} tenders`);
  console.log(`  - 1 about page`);

  const existingSettings = await client.fetch('*[_type == "siteSettings"][0]{_id}');
  if (existingSettings?._id) {
    await client.patch(existingSettings._id).set(siteSettingsPatch).commit();
    console.log(`Patched existing siteSettings doc (${existingSettings._id}).`);
  } else {
    await client.create({
      _id: "siteSettings",
      _type: "siteSettings",
      title: "PASADA (T)",
      tagline: "Care - Hope - Dignity",
      email: "info@pasada.or.tz",
      phone: "+255 22 286 6618",
      address: "Dar es Salaam, Tanzania",
      maxFeaturedPosts: 3,
      maxFeaturedProjects: 3,
      maxFeaturedServices: 6,
      ...siteSettingsPatch,
    });
    console.log("Created new siteSettings singleton.");
  }

  console.log("Done.");
}

run().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
