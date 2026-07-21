"use client";

import { useState, useRef, useEffect } from "react";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineXMark,
  HiOutlinePaperAirplane,
} from "react-icons/hi2";
import { HiSparkles } from "react-icons/hi2";
import { sendChatMessage } from "@/lib/actions/ai";

type Message = {
  role: "user" | "model";
  text: string;
};

const INITIAL_PROMPTS = [
  "What courses do you offer?",
  "Recommend a course for beginners",
  "How do I become an instructor?",
];

// প্রতিটা AI reply-র পর দেখানোর জন্য rotating follow-up prompt pool
// const FOLLOW_UP_POOL = [
//   "Tell me more about that",
//   "Show me similar courses",
//   "What's the price range?",
//   "How do I enroll?",
//   "Any beginner-friendly options?",
//   "Who teaches this course?",
// ];

// function getRandomFollowUps(count = 3) {
//   return [...FOLLOW_UP_POOL].sort(() => 0.5 - Math.random()).slice(0, count);
// }

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hi! I'm the LearnPath assistant. Ask me about courses, categories, or how to get started.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [followUps, setFollowUps] = useState<string[]>(INITIAL_PROMPTS);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleSend = async (textOverride?: string) => {
    const text = textOverride || input.trim();
    if (!text || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", text }];
    setMessages(newMessages);
    setInput("");
    setFollowUps([]); // ইউজার নতুন প্রশ্ন করলে পুরনো suggestion সরিয়ে দাও
    setLoading(true);

    try {
      const history = newMessages
        .slice(0, -1)
        .map((m) => ({ role: m.role, text: m.text }));
      const result = await sendChatMessage(text, history);

      if (result?.reply) {
        setMessages((prev) => [...prev, { role: "model", text: result.reply }]);
        setFollowUps(
          result.followUps && result.followUps.length > 0
            ? result.followUps
            : [],
        );
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            text: "Sorry, something went wrong. Please try again.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-300 transition hover:scale-105"
          aria-label="Open chat assistant"
        >
          <HiOutlineChatBubbleLeftRight className="h-6 w-6" />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[520px] w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3.5 text-white">
            <div className="flex items-center gap-2">
              <HiSparkles className="h-5 w-5" />
              <span className="text-sm font-bold">LearnPath Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Close chat">
              <HiOutlineXMark className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm font-medium ${
                    m.role === "user"
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white"
                      : "border border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                </div>
              </div>
            )}

            {/* ✅ প্রতিটা AI reply-র পরে (এবং শুরুতেও) follow-up suggestion দেখাবে */}
            {!loading && followUps.length > 0 && (
              <div className="flex flex-col gap-2 pt-2">
                {followUps.map((p) => (
                  <button
                    key={p}
                    onClick={() => handleSend(p)}
                    className="rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-left text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-slate-200 bg-white p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask something..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-indigo-400"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white disabled:opacity-50"
              aria-label="Send message"
            >
              <HiOutlinePaperAirplane className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
