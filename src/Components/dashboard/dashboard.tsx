"use client";

import type { ComponentType, SVGProps } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Envelope,
  Gear,
  House,
  Person,
  Plus,
  ListCheck,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";

import { useSession } from "@/lib/auth-client";
import { COLORS } from "@/lib/theme";
import { RiSideBarFill } from "react-icons/ri";

type NavItem = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  href: string;
};

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  // ⭐ নতুন — client এ mount হওয়ার আগ পর্যন্ত সবসময় server এর সাথে মিলিয়ে "false" রাখা হচ্ছে
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // mounted না হওয়া পর্যন্ত সবসময় false (server output এর সাথে মিলবে)
  const isAdmin =
    mounted &&
    !isPending &&
    (session?.user as { role?: string })?.role === "instructor";

  const userItems: NavItem[] = [
    { icon: House, label: "Home", href: "/dashboard/student" },
    { icon: Person, label: "Browse-Course", href: "/all-course" },
    { icon: Gear, label: "Booking-Request", href: "/dashboard/student/booking-request" },
    { icon: Envelope, label: "Review-Course", href: "/dashboard/user/review" },
  ];

  const adminItems: NavItem[] = [
    { icon: House, label: "Home", href: "/dashboard/instructor" },
    { icon: Plus, label: "Add Tour", href: "/dashboard/instructor/add-course" },
    { icon: ListCheck, label: "Manage Tours", href: "/dashboard/instructor/manage-course" },
    { icon: Gear, label: "Booking-Request", href: "/dashboard/instructor/booking-request" },
  ];

  const items = isAdmin ? adminItems : userItems;

  const renderLinks = (list: NavItem[]) => (
    <nav className="flex flex-col gap-1">
      {list.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className="group relative flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-slate-50"
            style={{
              color: isActive ? COLORS.ocean : COLORS.inkMuted,
              backgroundColor: isActive ? COLORS.ocean50 : "transparent",
            }}
          >
            <span
              className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full transition-opacity duration-200"
              style={{
                backgroundColor: COLORS.ocean,
                opacity: isActive ? 1 : 0,
              }}
            />
            <item.icon
              className="size-4 transition-colors duration-200"
              style={{ color: isActive ? COLORS.ocean : COLORS.inkMuted }}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  const NavContent = (
    <div className="flex flex-col gap-6">
      <div>
        <p
          className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider"
          style={{ color: COLORS.inkMuted }}
        >
          {!mounted ? "\u00A0" : isAdmin ? "instructor" : "student"}
        </p>
        {renderLinks(items)}
      </div>
    </div>
  );

  return (
    <>
      <aside
        className="hidden w-fit flex-shrink-0 border-r bg-white px-3 py-4 lg:block"
        style={{ borderColor: COLORS.ocean50 }}
      >
        {NavContent}
      </aside>

      <Drawer>
        <Button
          className="lg:hidden"
          variant="secondary"
          style={{ color: COLORS.ocean, borderColor: COLORS.ocean }}
        >
          <RiSideBarFill />
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading style={{ color: COLORS.ink }}>
                  Navigation
                </Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{NavContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}