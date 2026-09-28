/** Typed access to the JSON files the family edits in the Studio. */
import homeJson from './home.json';
import factsJson from './facts.json';
import resourcesJson from './resources.json';
import teamJson from './team.json';
import anywhereJson from './anywhere.json';
import aboutJson from './about.json';
import isrJson from './isr.json';
import pediatriciansJson from './pediatricians.json';
import checklistJson from './checklist.json';

export interface Fact {
  stat: string;
  label: string;
  detail?: string;
  source: string;
  sourceUrl: string;
}
export interface Risk {
  title: string;
  body: string;
  source?: string;
  sourceUrl?: string;
  source2?: string;
  sourceUrl2?: string;
}
export interface Resource {
  name: string;
  url: string;
  description: string;
}
export interface AnywherePlace {
  icon: string;
  title: string;
  text: string;
  tip?: string;
  source?: string;
  sourceUrl?: string;
  source2?: string;
  sourceUrl2?: string;
  link?: string;
  linkLabel?: string;
}
export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  photo?: string;
  photoAlt?: string;
}
/** Dad's ISR story box. The Studio drops empty fields when it saves, so most of these are optional. */
export interface IsrBox {
  programName: string;
  blurb: string;
  /** Why we recommend ISR specifically (shown in the home page ISR section). */
  stance?: string;
  disclosure?: string;
  photo?: string;
  photoAlt?: string;
}

export const home = homeJson;
export const headline: Fact[] = factsJson.headline;
export const nonfatal: Fact[] = factsJson.nonfatal;
export const risks: Risk[] = factsJson.risks;
export const factGroups: { title: string; intro?: string; facts: Fact[] }[] = factsJson.groups;
export const survivorResources: Resource[] = resourcesJson.survivor;
export const resourceGroups: { title: string; items: Resource[] }[] = resourcesJson.groups;
export const team: TeamMember[] = teamJson;
export const about: { photo?: string; photoAlt?: string; caption?: string } = aboutJson;
export const isr: IsrBox = isrJson;
/** "What pediatricians say" box on the ISR page and the home page. */
export const pediatricians: {
  title?: string;
  summary?: string;
  points?: string[];
  source?: string;
  sourceUrl?: string;
  policyUrl?: string;
} = pediatriciansJson;
export const anywhere: Omit<typeof anywhereJson, 'places'> & { places: AnywherePlace[] } = anywhereJson;
/** Printable home water safety checklist (/checklist). The Studio drops empty lists, so they default to []. */
export const checklist = {
  title: checklistJson.title ?? 'Home water safety checklist',
  intro: checklistJson.intro ?? '',
  sections: (checklistJson.sections ?? []).map((s: { title: string; items?: string[] }) => ({ title: s.title, items: s.items ?? [] })),
  sitterTitle: checklistJson.sitterTitle ?? 'For babysitters and grandparents',
  sitterIntro: checklistJson.sitterIntro ?? '',
  sitterItems: (checklistJson.sitterItems ?? []) as string[],
  sitterBlanks: (checklistJson.sitterBlanks ?? []) as string[],
};
