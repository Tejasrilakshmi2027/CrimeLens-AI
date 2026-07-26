import api from './axios';
import type { ChatResponse } from '../types';

interface ChatRequest {
  question: string;
  conversation_history?: Array<{ role: string; content: string }>;
}

export const askQuestion = async (request: ChatRequest): Promise<ChatResponse> => {
  const { data } = await api.post<ChatResponse>('/api/chatbot/ask', request);
  return data;
};