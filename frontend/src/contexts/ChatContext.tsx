import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { ChatMessage } from '../types';

interface ChatContextType {
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
  conversationId: string;
  setConversationId: (id: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string>('');

  useEffect(() => {
    const savedMessages = localStorage.getItem('chat_messages');
    const savedConversationId = localStorage.getItem('conversation_id');
    
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
    if (savedConversationId) {
      setConversationId(savedConversationId);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (conversationId) {
      localStorage.setItem('conversation_id', conversationId);
    }
  }, [conversationId]);

  const addMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  const clearMessages = () => {
    setMessages([]);
    setConversationId('');
    localStorage.removeItem('chat_messages');
    localStorage.removeItem('conversation_id');
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage, clearMessages, conversationId, setConversationId }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
