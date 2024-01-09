import type { RawTranslation } from "/core/I18n.ts";

export default {
  name: () => "timer",
  description: () => "Responds with 'Beep' when the timer is up.",
  beep: () => "Beep, timer is up!",
  minutes: () => "minutes",
  minutesDescription: () => "Minutes to wait before the timer is up.",
} satisfies RawTranslation;
