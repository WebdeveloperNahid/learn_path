"use client";

import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

type Testimonial = {
  name: string;
  role: string;
  initials: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Farhan Ahmed",
    role: "Frontend Developer",
    initials: "FA",
    quote: "The AI recommendations actually understood what I needed to learn next. Saved me weeks of guessing.",
  },
  {
    name: "Nusrat Jahan",
    role: "Data Analyst",
    initials: "NJ",
    quote: "The AI chat assistant felt like having a tutor available at 2 AM. Genuinely helped me pass my project deadline.",
  },
  {
    name: "Rakib Hasan",
    role: "UI/UX Designer",
    initials: "RH",
    quote: "Course quality is excellent and instructors clearly know their field from real work experience.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Loved by learners everywhere
          </h2>
          <p className="mt-4 text-base font-medium text-slate-600">
            Real feedback from students building real skills on LearnPath.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="rounded-2xl border-2 border-slate-100 bg-slate-50 p-6"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, idx) => (
                  <FaStar key={idx} className="h-4 w-4 text-amber-400" />
                ))}
              </div>
              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
                “{t.quote}”
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{t.name}</p>
                  <p className="text-xs font-semibold text-slate-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}