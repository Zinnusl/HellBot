import type { Message } from "./Message.ts";

export type Chat = {
  context: Array<Message>;
  title: string; // "Chat"
  system: string; // "You are a helpful assistant."
  temperature: number; // 0.8
  stop: string; // ""
  top_k: number; // 40
  top_p: number; // 0.95
  min_p: number; // 0.05
  repeat_penalty: number; // 1.1
  presence_penalty: number; // 0.0 (disabled)
  frequency_penalty: number; // 0.0 (disabled)
};
