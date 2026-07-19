"use client";

import { motion } from "framer-motion";
import { HiOutlineSparkles, HiOutlineChatBubbleLeftRight, HiOutlineChartBar, HiOutlineShieldCheck } from "react-icons/hi2";
import type { IconType } from "react-icons";

type Feature = {
  icon: IconType;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: HiOutlineSparkles,
    title: "AI-Powered Recommendations",
    description: "Our AI analyzes your interests and learning history to suggest courses tailored specifically to your goals.",
  },
  {
    icon: HiOutlineChatBubbleLeftRight,
    title: "24/7 AI Study Assistant",
    description: "Stuck on a concept? Chat with our AI assistant anytime for instant, context-aware help.",
  },
  {
    icon: HiOutlineChartBar,
    title: "Track Your Progress",
    description: "Stay motivated with a clear view of your enrolled courses and learning journey.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Verified Instructors",
    description: "Every course is created by instructors with real, hands-on industry experience.",
  },
];

export default function Features() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-indigo-100 px-3.5 py-1.5 text-xs font-bold text-indigo-700">
            Why LearnPath
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Built for the way you learn
          </h2>
          <p className="mt-4 text-base font-medium text-slate-600">
            We combine AI intelligence with real human expertise to make learning faster and more personal.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border-2 border-slate-100 bg-slate-50 p-6 transition hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-200">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}