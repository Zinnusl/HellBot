import type { Locale } from "/core/I18n.ts";

export default {
  name: () => "timer",
  description: () => "TBD",
  example: (arg: string) => `This is the '${arg}'.`,
} satisfies Locale;
