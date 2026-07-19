"use client";

import { useState } from "react";
import { FiHelpCircle, FiChevronDown, FiMail } from "react-icons/fi";

const FAQS = [
  {
    question: "How do I enroll in a course?",
    answer:
      "Browse the course catalog, open the course you like, and click Enroll. You'll need to be signed in with a student account first.",
  },
  {
    question: "How do I become an instructor?",
    answer:
      "Sign up for an account and request instructor access from your dashboard settings. Once approved, you can publish your first course.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Refunds are available within 7 days of enrollment if you haven't completed more than 20% of the course content. Contact support to request one.",
  },
  {
    question: "How do booking requests work?",
    answer:
      "For live/in-person courses, submit a booking request from the course page. The instructor will confirm your spot, and you'll see the status in your dashboard.",
  },
  {
    question: "I forgot my password. What do I do?",
    answer:
      "Click 'Forgot password' on the sign-in page and follow the reset link sent to your email.",
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-white to-indigo-50/40 px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-1.5 text-xs font-semibold tracking-wide text-white shadow-md shadow-indigo-200">
          <FiHelpCircle className="h-3.5 w-3.5" />
          HELP & SUPPORT
        </span>
        <h1 className="mt-5 text-4xl font-bold text-slate-900">
          How can we help?
        </h1>
        <span className="mx-auto mt-4 block h-1 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600" />
        <p className="mt-5 text-slate-500">
          Answers to common questions about courses, enrollment, and your
          account.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="mx-auto max-w-2xl space-y-3">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.question}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="text-sm font-bold text-slate-900">
                  {faq.question}
                </span>
                <FiChevronDown
                  className={`h-4 w-4 shrink-0 text-indigo-600 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="border-t border-slate-100 px-5 pb-5 pt-3">
                  <p className="text-sm leading-relaxed text-slate-500">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contact CTA */}
      <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-slate-200 border-t-4 border-t-indigo-600 bg-white p-8 text-center shadow-sm">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
          <FiMail className="h-5 w-5" />
        </span>
        <h2 className="mt-4 text-lg font-bold text-slate-900">
          Still need help?
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Our support team usually replies within 24 hours.
        </p>
        <a
          href="mailto:support@learnpath.com"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-indigo-200 transition-all hover:shadow-lg hover:shadow-indigo-300"
        >
          <FiMail className="h-4 w-4" />
          Email Support
        </a>
      </div>
    </section>
  );
}