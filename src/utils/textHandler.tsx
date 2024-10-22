import { startCase, round } from "lodash";

export const textToStartCase = (text: string) => startCase(text);

export const roundNumber = (num: number) => round(num);
