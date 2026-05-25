const NL_TZ = "America/St_Johns";

const longDate = new Intl.DateTimeFormat("en-CA", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: NL_TZ,
});

const shortDate = new Intl.DateTimeFormat("en-CA", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: NL_TZ,
});

const isoDate = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: NL_TZ,
});

const time = new Intl.DateTimeFormat("en-CA", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: NL_TZ,
});

const weekdayShort = new Intl.DateTimeFormat("en-CA", {
  weekday: "short",
  timeZone: NL_TZ,
});

export function formatLongDate(d: Date | string): string {
  return longDate.format(typeof d === "string" ? new Date(d) : d);
}

export function formatShortDate(d: Date | string): string {
  return shortDate.format(typeof d === "string" ? new Date(d) : d);
}

export function formatIsoDate(d: Date | string): string {
  return isoDate.format(typeof d === "string" ? new Date(d) : d);
}

export function formatTime(d: Date | string): string {
  return time.format(typeof d === "string" ? new Date(d) : d);
}

export function formatWeekday(d: Date | string): string {
  return weekdayShort.format(typeof d === "string" ? new Date(d) : d);
}
