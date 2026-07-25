import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Trash2, Bot, User } from 'lucide-react';
import { askQuestion } from '../api/chatbot';
import { useChat } from '../contexts/ChatContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Chat() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, addMessage, clearMessages } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: input,
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askQuestion({
        question: input,
        conversation_history: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      });

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: response.answer,
        timestamp: new Date(),
      };

      addMessage(assistantMessage);
    } catch (error) {
      console.error('Failed to get response:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      addMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full flex flex-col"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Crime Assistant</h1>
          <p className="text-gray-400">Ask questions about crime data, statistics, and trends</p>
        </div>
        <Button variant="danger" icon={Trash2} iconPosition="left" onClick={clearMessages}>
          Clear Chat
        </Button>
      </div>

      <Card className="flex-1 flex flex-col !p-0 !overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence>
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-full text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#1E3A8A] flex items-center justify-center mb-4">
                  <Bot className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Welcome to Crime Lens AI</h3>
                <p className="text-gray-400 max-w-md">
                  Ask me anything about crime statistics, district-wise data, case trends, or get insights from our crime database.
                </p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
                  {[
                    'What are the top crime categories?',
                    'Show me crime trends for Bangalore',
                    'Which district has the most solved cases?',
                    'What is the arrest rate this month?',
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setInput(suggestion)}
                      className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-left text-sm text-gray-300 hover:text-white transition-all"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#06B6D4] to-[#1E3A8A] flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] rounded-2xl p-4 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-[#06B6D4] to-[#1E3A8A] text-white'
                      : 'bg-white/10 text-gray-200 border border-white/10'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <ReactMarkdown
                      components={{
                        code({ node, inline, className, children, ...props }: any) {
                          const match = /language-(\w+)/.exec(className || '');
                          return !inline && match ? (
                            <SyntaxHighlighter
                              style={vscDarkPlus}
                              language={match[1]}
                              PreTag="div"
                              className="rounded-lg"
                              {...props}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          ) : (
                            <code className="bg-black/30 px-1 py-0.5 rounded text-sm" {...props}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  ) : (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  )}
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#22C55E] to-[#16a34a] flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 justify-start"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#06B6D4] to-[#1E3A8A] flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-[#06B6D4] rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-[#06B6D4] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-[#06B6D4] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about crime data, statistics, or trends..."
                rows={1}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#06B6D4]/50 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/20 text-white placeholder-gray-400 resize-none transition-all"
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
            </div>
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              icon={Send}
              className="!px-4"
            >
              Send
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            AI responses may not always be accurate. Verify important information.
          </p>
        </div>
      </Card>
    </motion.div>
  );
}