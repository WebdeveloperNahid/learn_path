"use client";

import Link from "next/link";
import {
  Person,
  Gear,
  Envelope,
  ArrowUpRight,
  Calendar,
  House,
} from "@gravity-ui/icons";

const stats = [
  { label: "Enrolled Tours", value: "5", delta: "2 upcoming", accent: "ocean" },
  { label: "Completed Tours", value: "8", delta: "all reviewed", accent: "emerald" },
  { label: "Pending Requests", value: "2", delta: "awaiting confirmation", accent: "amber" },
  { label: "Reviews Given", value: "8", delta: "4.7 avg rating", accent: "violet" },
];

const upcomingBookings = [
  { tour: "Sundarbans Mangrove Trail", instructor: "Rahim Ahmed", date: "22 Jul", status: "Confirmed" },
  { tour: "Old Dhaka Heritage Walk", instructor: "Farida Yasmin", date: "24 Jul", status: "Pending" },
  { tour: "Sylhet Tea Garden Trek", instructor: "Kamal Uddin", date: "27 Jul", status: "Confirmed" },
  { tour: "Cox's Bazar Sunrise Tour", instructor: "Nasrin Akter", date: "29 Jul", status: "Pending" },
];

const statusStyles: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const accentStyles: Record<string, string> = {
  ocean: "bg-indigo-50 text-indigo-700",
  amber: "bg-amber-50 text-amber-700",
  emerald: "bg-emerald-50 text-emerald-700",
  violet: "bg-violet-50 text-violet-700",
};

const StudentPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-indigo-50/40 px-6 py-8 sm:px-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-1">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Student Dashboard
        </p>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Welcome back 👋
          </h1>
          <Link
            href="/all-course"
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:shadow-md"
          >
            <House className="size-4" />
            Explore Tours
          </Link>
        </div>
        <p className="text-sm text-slate-500">
          Here&apos;s what&apos;s happening with your tours today.
        </p>
      </div>

      {/* Stats grid */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${accentStyles[stat.accent]}`}
              >
                {stat.delta}
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Upcoming bookings table */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Upcoming Bookings</h2>
            <Link
              href="/dashboard/student/booking-request"
              className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-violet-600"
            >
              View all
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3">Tour</th>
                  <th className="px-4 py-3">Instructor</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {upcomingBookings.map((booking) => (
                  <tr key={booking.tour} className="transition hover:bg-indigo-50/40">
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {booking.tour}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{booking.instructor}</td>
                    <td className="px-4 py-3 text-slate-600">{booking.date}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs font-bold ${statusStyles[booking.status]}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick actions + profile snapshot */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-bold text-slate-900">Quick Actions</h2>
            <div className="flex flex-col gap-3">
              <Link
                href="/all-course"
                className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
              >
                <Person className="size-4" />
                Browse tours
              </Link>
              <Link
                href="/dashboard/student/booking-request"
                className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
              >
                <Gear className="size-4" />
                My booking requests
              </Link>
              <Link
                href="/dashboard/user/review"
                className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
              >
                <Envelope className="size-4" />
                Write a review
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-600 to-violet-600 p-6 text-white shadow-sm">
            <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-white/15">
              <Calendar className="size-5" />
            </div>
            <p className="text-sm font-semibold text-indigo-100">Next Tour</p>
            <p className="mt-1 text-2xl font-bold">22 Jul</p>
            <p className="mt-2 text-xs text-indigo-100">
              Sundarbans Mangrove Trail with Rahim Ahmed — don&apos;t forget to pack light!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;