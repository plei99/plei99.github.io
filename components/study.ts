// Lookups and formatting shared by the subscription table and the quota chart.
import {
  aiSubscriptions as study,
  type ModelLevel,
  type ModelLine,
  type Plan,
  type StudyRow,
} from "../lib/site";

export const number = (value: number, digits = 0) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

/** Two significant figures: the quota shares run from 0.0004% to 2%. */
export const percent = (value: number) =>
  `${value.toLocaleString("en-US", { maximumSignificantDigits: 2 })}%`;

/** A model line's level with the plan it is used through. */
export type Entry = {
  plan: Plan;
  line: ModelLine;
  level: ModelLevel;
  /** The model and, when it has several, its reasoning setting. */
  label: string;
};

export const entry = (line: ModelLine, level: ModelLevel): Entry => ({
  plan: study.plans[line.plan],
  line,
  level,
  label: level.effort ? `${line.name} (${level.effort})` : line.name,
});

const lines = new Map(study.lines.map((line) => [line.id, line]));

/** Look up a table row's level, failing the build if it names none. */
export function resolve(
  row: StudyRow,
): Entry & Pick<StudyRow, "time_url" | "url"> {
  const line = lines.get(row.line);
  const level = line?.levels.find((level) => level.effort === row.effort);
  if (!line || !level) {
    throw new Error(`No AA level for ${row.line} (${row.effort ?? "only"})`);
  }
  return { ...entry(line, level), time_url: row.time_url, url: row.url };
}

/** The data attributes uses.js recomputes a timed row from. */
export const values = ({ plan, level }: Entry) => ({
  "data-study-values": plan.timing,
  "data-api": plan.api,
  "data-cost": level.cost,
  "data-price": plan.price,
});
