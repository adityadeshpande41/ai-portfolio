import OpenAI from "openai";

// This class wraps OpenAI functionality
// We use the official 'openai' package.
export class OpenAIClient {
  private client: OpenAI | null = null;

  private getClient() {
    if (!this.client) {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey || apiKey === "dummy-key-for-build") {
        throw new Error("OPENAI_API_KEY not set or invalid");
      }
      this.client = new OpenAI({ apiKey });
    }
    return this.client;
  }

  async getEmbedding(text: string): Promise<number[]> {
    const client = this.getClient();
    const response = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
      encoding_format: "float",
    });
    return response.data[0].embedding;
  }

  async chat(
    messages: { role: "system" | "user" | "assistant"; content: string }[],
    maxTokens = 60,
    model = "gpt-4o-mini"
  ): Promise<string> {
    const client = this.getClient();
    const response = await client.chat.completions.create({
      model: model,
      messages: messages,
      max_tokens: maxTokens,
      temperature: 0.7,
    });
    return response.choices[0].message.content || "";
  }
}

export const openai = new OpenAIClient();
