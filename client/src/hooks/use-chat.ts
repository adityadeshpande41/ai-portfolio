import { useMutation } from "@tanstack/react-query";
import { api, type ChatRequest } from "@shared/routes";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";

export function useChat() {
  return useMutation({
    mutationFn: async (data: ChatRequest) => {
      // Validate input using the shared schema if possible, 
      // or manually check before sending.
      const res = await apiRequest(
        api.chat.sendMessage.method,
        api.chat.sendMessage.path,
        data
      );
      
      const responseData = await res.json();
      
      // Parse with the response schema to ensure type safety
      return api.chat.sendMessage.responses[200].parse(responseData);
    },
    onError: (error) => {
      console.error("Chat Error:", error);
    }
  });
}

export function useContact() {
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest(
        api.contact.submit.method,
        api.contact.submit.path,
        data
      );
      return api.contact.submit.responses[200].parse(await res.json());
    }
  });
}
