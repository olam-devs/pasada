import {
  Activity,
  Baby,
  ClipboardList,
  FlaskConical,
  GraduationCap,
  HandHeart,
  HeartPulse,
  House,
  Megaphone,
  MessagesSquare,
  Microscope,
  Pill,
  Ribbon,
  Stethoscope,
  TestTube,
  Timer,
  Users,
  type LucideIcon,
} from "lucide-react";

/** Picks a symbol for a programme from words in its slug or title. */
const RULES: [RegExp, LucideIcon][] = [
  [/laborator/, Microscope],
  [/testing|counsel+ing-and|hts/, TestTube],
  [/pmtct|mother|maternal/, Baby],
  [/cervical|cancer/, Ribbon],
  [/ncd|non-communicable/, HeartPulse],
  [/fast-track/, Timer],
  [/home-based|palliative/, House],
  [/psychosocial|counsel/, MessagesSquare],
  [/ovc|orphan|child|caregiver|kizazi|ecd/, Users],
  [/community|sensiti|outreach|education/, Megaphone],
  [/capacity|training/, GraduationCap],
  [/(^|-)art(-|$)|antiretroviral/, Pill],
  [/(^|-)tb(-|$)|tubercul/, Activity],
  [/case-management/, ClipboardList],
  [/research|apopo/, FlaskConical],
  [/care|treatment|clinic/, Stethoscope],
];

export function programmeIcon(key: string): LucideIcon {
  const k = key.toLowerCase();
  return RULES.find(([re]) => re.test(k))?.[1] ?? HandHeart;
}
