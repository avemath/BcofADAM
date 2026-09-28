/** Typed access to the JSON files the family edits in the Studio. */
import homeJson from './home.json';
import factsJson from './facts.json';
import resourcesJson from './resources.json';
import teamJson from './team.json';

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
}
export interface Resource {
  name: string;
  url: string;
  description: string;
}
export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  photo?: string;
}

export const home = homeJson;
export const headline: Fact[] = factsJson.headline;
export const nonfatal: Fact[] = factsJson.nonfatal;
export const risks: Risk[] = factsJson.risks;
export const factGroups: { title: string; intro?: string; facts: Fact[] }[] = factsJson.groups;
export const survivorResources: Resource[] = resourcesJson.survivor;
export const resourceGroups: { title: string; items: Resource[] }[] = resourcesJson.groups;
export const team: TeamMember[] = teamJson;
