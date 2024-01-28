import type { RawTranslation } from "/core/I18n.ts";

export default {
  description: () => "Antwortet mit 'Piep' nachdem der Timer abgelaufen ist.",
  beep: () => "Piep, der Timer ist abgelaufen.",
  minutes: () => "minuten",
  minutesDescription: () => "Minuten bis der Timer abgelaufen ist.",
  cancel: () => "Abbrechen",
  replySet: (minutes: string) => `Timer wurde auf ${minutes} minuten gestellt.`,
  replyCancel: () => "Timer wurde abgebrochen.",
  replyIsUp: () => "Timer ist abgelaufen.",
  replyExeption: () =>
    "Timer muss zwischen 1 und 1440 minuten gestellt werden.",
  replyAlreadySet: (minutes: string, seconds: string) =>
    `Timer bereits gestellt mit ${minutes} minuten und ${seconds} sekunden verbleibend.`,
} satisfies RawTranslation;