"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {  HiOutlineChartPie, HiOutlineCamera, HiOutlineMegaphone, HiOutlinePaintBrush, HiOutlineLanguage } from "react-icons/hi2";
import type { IconType } from "react-icons";
import { HiOutlineCode } from "react-icons/hi";

type Category = {
  icon: IconType;
  name: string;
  count: number;
};

const categories: Category[] = [
  { icon: HiOutlineCode, name: "Web Development", count: 42 },
  { icon: HiOutlineChartPie, name: "Data Science", count: 28 },
  { icon: HiOutlineMegaphone, name: "Marketing", count: 19 },
  { icon: HiOutlinePaintBrush, name: "Design", count: 33 },
  { icon: HiOutlineCamera, name: "Photography", count: 15 },
  { icon: HiOutlineLanguage, name: "Languages", count: 21 },
];

export default function Categories() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Explore by category
            </h2>
            <p className="mt-3 text-base font-medium text-slate-600">
              Find the right path across our most popular learning categories.
            </p>
          </div>
          <Link
            href="/explore"
            className="shrink-0 text-sm font-bold text-indigo-600 hover:text-indigo-700"
          >
            View all courses →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              <Link
                href={`/explore?category=${encodeURIComponent(cat.name)}`}
                className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white p-5 text-center transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-gradient-to-br group-hover:from-indigo-600 group-hover:to-violet-600 group-hover:text-white">
                  <cat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{cat.name}</p>
                  <p className="text-xs font-semibold text-slate-500">{cat.count} courses</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}