"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineEnvelope, HiOutlineCheckCircle } from "react-icons/hi2";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // এখানে পরে actual newsletter API call বসবে
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 px-6 py-14 text-center sm:px-14"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-amber-300/20 blur-2xl" />

          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            Stay ahead with new courses & tips
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm font-medium text-indigo-100">
            Get weekly updates on new courses, AI learning features, and career tips — no spam, unsubscribe anytime.
          </p>

          {subscribed ? (
            <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-2 rounded-xl bg-white/15 px-5 py-3 text-sm font-bold text-white">
              <HiOutlineCheckCircle className="h-5 w-5" />
              You&apos;re subscribed! Welcome aboard.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <div className="relative flex-1">
                <HiOutlineEnvelope className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border-0 bg-white py-3 pl-10 pr-4 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-slate-900 shadow-md transition hover:bg-amber-300"
              >
                Subscribe
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}