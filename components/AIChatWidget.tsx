"use client";

import { useState, useEffect, useRef } from "react";

interface Message {
  role: "user" | "model";
  text: string;
  suggestions?: string[];
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Welcome to Aurora Heights. How can I assist you with our portfolio of signature estates today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of conversation
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Load initial suggestions on first open
  useEffect(() => {
    if (isOpen && messages.length === 1) {
      fetchSuggestions(messages[0].text);
    }
  }, [isOpen]);

  const fetchSuggestions = async (lastMsg: string) => {
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const res = await fetch(
        `${apiBase}/ai-chat/suggestions?lastMessage=${encodeURIComponent(
          lastMsg
        )}`
      );
      if (!res.ok) throw new Error("Failed to fetch suggestions");
      const json = await res.json();
      const suggestions = json.data || [];

      setMessages((prev) => {
        const next = [...prev];
        if (next.length > 0 && next[next.length - 1].role === "model") {
          next[next.length - 1] = { ...next[next.length - 1], suggestions };
        }
        return next;
      });
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMessage: Message = { role: "user", text: textToSend };
    
    // Add user message to history
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Map current history to format expected by backend
      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const res = await fetch(`${apiBase}/ai-chat/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        const errorJson = await res.json();
        throw new Error(errorJson.message || "Failed to process chat message");
      }

      const json = await res.json();
      const assistantReply = json.data?.reply || "I am unable to answer that at this time.";

      const assistantMessage: Message = {
        role: "model",
        text: assistantReply,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setLoading(false);

      // Fetch follow-up suggestions for the new assistant response
      await fetchSuggestions(assistantReply);
    } catch (err: any) {
      console.error("AI Chat message sending error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: `We are experiencing connectivity issues with the AI module: ${err.message}. Please check back shortly.`,
        },
      ]);
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-luxury-dark border border-gold-500/30 text-gold-500 hover:text-white rounded-full shadow-[0_8px_30px_rgba(189,155,76,0.15)] hover:shadow-[0_8px_40px_rgba(189,155,76,0.25)] hover:bg-gold-600 transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center"
        aria-label="Toggle AI Assistant Chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[400px] h-[550px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)] bg-white border border-luxury-sand/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col z-50 overflow-hidden animate-[fadeIn_0.3s_ease-out]">
          
          {/* Header */}
          <div className="bg-luxury-dark px-6 py-4 flex items-center justify-between border-b border-gold-500/20">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-gold-500 uppercase block">
                  AURORA HEIGHTS
                </span>
                <h3 className="font-serif text-sm font-light text-white tracking-wide">
                  Signature AI Assistant
                </h3>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Conversation History */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-luxury-cream/10">
            {messages.map((msg, index) => {
              const isUser = msg.role === "user";
              return (
                <div key={`msg-${index}`} className="space-y-3">
                  <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                        isUser
                          ? "bg-luxury-charcoal text-white rounded-tr-none shadow-sm"
                          : "bg-white border border-luxury-sand/20 text-luxury-charcoal rounded-tl-none shadow-[0_4px_12px_rgba(0,0,0,0.01)]"
                      }`}
                    >
                      <p className="whitespace-pre-line font-light">{msg.text}</p>
                    </div>
                  </div>

                  {/* Inline Suggested Follow-Up Prompts */}
                  {!isUser && msg.suggestions && msg.suggestions.length > 0 && index === messages.length - 1 && (
                    <div className="flex flex-wrap gap-2 pt-1 animate-[fadeIn_0.5s_ease-out]">
                      {msg.suggestions.map((suggestion, sIdx) => (
                        <button
                          key={`sug-${sIdx}`}
                          onClick={() => handleSendMessage(suggestion)}
                          className="px-3 py-1.5 bg-gold-50/60 border border-gold-500/20 hover:border-gold-500 text-gold-800 hover:bg-gold-500 hover:text-white text-[10px] rounded-full transition-all duration-300 cursor-pointer active:scale-95 text-left font-light"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {loading && (
              <div className="flex justify-start animate-[fadeIn_0.2s_ease-out]">
                <div className="bg-white border border-luxury-sand/20 text-luxury-charcoal rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-gold-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-gold-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-gold-600 rounded-full animate-bounce" />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={handleFormSubmit}
            className="p-4 border-t border-luxury-sand/20 bg-white flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about properties, pricing, viewings..."
              className="flex-1 bg-luxury-cream border border-luxury-sand/40 rounded-full py-2.5 px-4 text-xs text-luxury-charcoal placeholder-luxury-charcoal/40 focus:outline-none focus:border-gold-500 transition-all"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 bg-gold-500 hover:bg-gold-600 text-white rounded-full transition-all disabled:opacity-40 disabled:hover:bg-gold-500 cursor-pointer flex items-center justify-center shrink-0 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
