import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlinePaperAirplane, HiOutlineShieldCheck } from "react-icons/hi";
import { FaExclamationTriangle } from "react-icons/fa";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { fetchChatHistory, sendChat } from "../services/chatService";

const suggestions = ["I feel stressed", "I feel anxious", "I feel lonely", "I cannot sleep"];

const WELCOME =
  "Hello—I'm MindCare Assistant. I'm here to listen and share gentle coping ideas. I can't diagnose conditions. How are you feeling today?";

function TypingBubble() {
  return (
    <div className="flex max-w-[85%] items-end gap-2">
      <div
        className="rounded-2xl rounded-bl-md border border-white/60 bg-white/70 px-4 py-3 shadow-sm backdrop-blur dark:border-slate-600 dark:bg-slate-700/80"
        aria-live="polite"
        aria-label="Assistant is typing"
      >
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-slate-400 animate-typing-dot" />
          <span className="h-2 w-2 rounded-full bg-slate-400 animate-typing-dot [animation-delay:0.15s]" />
          <span className="h-2 w-2 rounded-full bg-slate-400 animate-typing-dot [animation-delay:0.3s]" />
        </div>
      </div>
    </div>
  );
}

export default function Chatbot() {
  const { isAuthenticated } = useAuth();
  const [messages, setMessages] = useState([{ id: "welcome", role: "assistant", text: WELCOME }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);
  const bottomRef = useRef(null);

  const scrollToBottom = useCallback((smooth = true) => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "auto" });
    } else {
      bottomRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "end" });
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchChatHistory()
      .then((res) => {
        if (res.data.messages?.length) {
          setMessages(
            res.data.messages.map((m, i) => ({
              id: `hist-${i}`,
              role: m.role,
              text: m.text,
            }))
          );
        }
      })
      .catch(() => {});
  }, [isAuthenticated]);

  useEffect(() => {
    const id = requestAnimationFrame(() => scrollToBottom(true));
    return () => cancelAnimationFrame(id);
  }, [messages, typing, scrollToBottom]);

  const buildHistory = useCallback(
    (list) =>
      list
        .filter((m) => m.id !== "welcome")
        .slice(-10)
        .map((m) => ({ role: m.role, text: m.text })),
    []
  );

  const handleSend = async (raw) => {
    const text = (raw ?? input).trim();
    if (!text || typing) return;
    setInput("");
    setError("");

    const userMsg = {
      id: `u-${crypto.randomUUID?.() ?? Date.now()}`,
      role: "user",
      text,
    };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setTyping(true);

    try {
      const history = buildHistory(nextMessages);
      const { data } = await sendChat(text, history);

      if (data.messages?.length) {
        setMessages(
          data.messages.map((m, i) => ({
            id: `srv-${i}-${Date.now()}`,
            role: m.role,
            text: m.text,
          }))
        );
      } else if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { id: `a-${Date.now()}`, role: "assistant", text: data.reply },
        ]);
      }

      if (data.source === "fallback") {
        setError("AI is on backup mode right now—you still received a supportive reply.");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Could not reach the assistant. Ensure the server is running and GEMINI_API_KEY is set.";
      setError(msg);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          text: "I'm here with you. The connection hiccuped—please try again in a moment, or visit Resources for Pakistani helplines.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="py-8 md:py-12">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700/90 dark:text-teal-400/90">
            AI support
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-slate-100">
            A calm conversation space
          </h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            This assistant is not a replacement for professional mental health care. For human support in Pakistan, see{" "}
            <Link
              to="/support"
              className="font-medium text-teal-800 underline decoration-teal-200 underline-offset-2 dark:text-teal-300 dark:decoration-teal-700"
            >
              Resources
            </Link>
            .
          </p>
        </div>

        <div className="mx-auto mt-6 max-w-3xl space-y-3">
          <div className="flex items-start gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/70 p-3 text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100/90">
            <FaExclamationTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
            <div>
              <p className="font-semibold">Emergency support</p>
              <p className="mt-1 text-xs text-amber-950/90">
                Immediate danger: Police <strong>15</strong>, rescue <strong>1122</strong> where available.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-teal-200/80 bg-teal-50/60 p-3 text-sm text-teal-950 dark:border-teal-800/50 dark:bg-teal-950/30 dark:text-teal-100/90">
            <HiOutlineShieldCheck className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
            <p className="text-xs">
              MindCare Assistant does not diagnose or prescribe. Conversations
              {isAuthenticated ? " are saved to your account" : " are not saved unless you log in"}.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-3xl">
          <div className="glass-strong flex max-h-[min(72vh,680px)] min-h-[360px] flex-col overflow-hidden rounded-[1.75rem] shadow-2xl ring-1 ring-white/70 dark:ring-slate-600/50 sm:min-h-[400px]">
            <div className="shrink-0 border-b border-white/60 bg-white/50 px-4 py-3 backdrop-blur dark:border-slate-700/60 dark:bg-slate-800/60">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">MindCare Assistant</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Powered by Gemini • empathic guidance only</p>
            </div>

            <div
              id="chat-scroll"
              ref={scrollRef}
              className="dark-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4 scroll-smooth sm:px-5"
            >
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                      m.role === "user"
                        ? "rounded-br-md bg-gradient-to-br from-teal-500 to-cyan-600 text-white"
                        : "rounded-bl-md border border-white/60 bg-white/75 text-slate-800 backdrop-blur dark:border-slate-600 dark:bg-slate-700/90 dark:text-slate-200"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing ? <TypingBubble /> : null}
              {error ? (
                <p className="text-center text-xs text-amber-800" role="status">
                  {error}
                </p>
              ) : null}
              <div ref={bottomRef} className="h-px shrink-0" aria-hidden />
            </div>

            <div className="shrink-0 border-t border-white/60 bg-white/45 p-3 backdrop-blur dark:border-slate-700/60 dark:bg-slate-800/50 sm:p-4">
              <div className="mb-3 flex flex-wrap gap-1.5">
                {suggestions.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    disabled={typing}
                    onClick={() => handleSend(chip)}
                    className="rounded-full border border-slate-200/80 bg-white/70 px-2.5 py-1 text-xs font-medium text-slate-700 transition-all duration-300 hover:border-teal-200 hover:bg-teal-50/80 disabled:opacity-50 dark:border-slate-600 dark:bg-slate-700/80 dark:text-slate-300 dark:hover:border-teal-500/50 dark:hover:bg-teal-900/40"
                  >
                    {chip}
                  </button>
                ))}
              </div>
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
              >
                <label htmlFor="chat-input" className="sr-only">
                  Message
                </label>
                <input
                  id="chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={typing}
                  placeholder="Write what feels true today…"
                  className="mindcare-input min-w-0 flex-1 px-4 py-2.5 shadow-inner disabled:opacity-60"
                />
                <Button type="submit" className="shrink-0 px-4" disabled={typing} aria-label="Send message">
                  <HiOutlinePaperAirplane className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
