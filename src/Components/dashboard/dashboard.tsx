"use client";

import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Envelope,
  House,
  Person,
  Plus,
  ListCheck,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";

import { useSession } from "@/lib/auth-client";
import { RiSideBarFill } from "react-icons/ri";

type NavItem = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  href: string;
};

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  const isAdmin =
    !isPending && (session?.user as { role?: string })?.role === "instructor";

  const userItems: NavItem[] = [
    { icon: House, label: "Home", href: "/dashboard/student" },
    { icon: Person, label: "Browse Courses", href: "/all-course" },
    { icon: Envelope, label: "Review Course", href: "/dashboard/user/review" },
  ];

  const adminItems: NavItem[] = [
    { icon: House, label: "Home", href: "/dashboard/instructor" },
    { icon: Plus, label: "Add Course", href: "/dashboard/instructor/add-course" },
    { icon: ListCheck, label: "Manage Courses", href: "/dashboard/instructor/manage-course" },
  ];

  const items = isAdmin ? adminItems : userItems;

  const renderLinks = (list: NavItem[]) => (
    <nav className="flex flex-col gap-0.5">
      {list.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`group relative flex items-center gap-2 whitespace-nowrap rounded-md px-2 py-1.5 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            }`}
          >
            <span
              className={`absolute left-0 top-1/2 h-3.5 w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b from-indigo-600 to-violet-600 transition-opacity duration-200 ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            />
            <item.icon
              className={`size-4 shrink-0 transition-colors duration-200 ${
                isActive ? "text-indigo-600" : "text-slate-400"
              }`}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  const NavContent = (
    <div>
      <p
        suppressHydrationWarning
        className="mb-0.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400"
      >
        {isAdmin ? "instructor" : "student"}
      </p>
      {renderLinks(items)}
    </div>
  );

  return (
    <>
      <aside className="hidden w-44 flex-shrink-0 border-r border-slate-100 bg-white px-2 py-3 lg:block">
        {NavContent}
      </aside>

      <Drawer>
        <Button
          className="border-indigo-200 text-indigo-600 lg:hidden"
          variant="secondary"
        >
          <RiSideBarFill />
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading className="text-slate-900">
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