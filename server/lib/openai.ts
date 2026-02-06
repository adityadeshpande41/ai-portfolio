import OpenAI from "openai";

// This class wraps OpenAI functionality
// We use the official 'openai' package.
export class OpenAIClient {
  private client: OpenAI;

  constructor() {
    // Requires OPENAI_API_KEY env var
    // If not present, we will throw an error when trying to use it.
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "dummy-key-for-build",
    });
  }

  async getEmbedding(text: string): Promise<number[]> {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY not set");
    }
    const response = await this.client.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
      encoding_format: "float",
    });
    return response.data[0].embedding;
  }

  async chat(
    messages: { role: "system" | "user" | "assistant"; content: string }[],
    model = "gpt-4o-mini"
  ): Promise<string> {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY not set");
    }
    const response = await this.client.chat.completions.create({
      model: model,
      messages: messages,
    });
    return response.choices[0].message.content || "";
  }
}

export const openai = new OpenAIClient();
