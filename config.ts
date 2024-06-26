export const discord = {
  token: process.env.DISCORD_TOKEN as string,
  guildId: process.env.HELLNET_ID as string,
  applicationId: process.env.HELLBOT_ID as string,
};
export const botlog = {
  token: process.env.BOTLOG_TOKEN as string,
  id: process.env.BOTLOG_ID as string,
};
export const serverURL = new URL(
  (process.env.VITE_SERVER_ORIGIN as string) ?? "http://localhost:3000",
);
export const frontendURL = new URL(
  (process.env.VITE_SERVER_ORIGIN as string) ?? "http://localhost:3080",
);
export const llamaURL = new URL(
  (process.env.LLAMA_ORIGIN as string) ?? "http://localhost:8080",
);
