import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { FileRouteTypes } from "@/routeTree.gen";
import { Link, useLocation } from "@tanstack/react-router";
import {
  BadgeDollarSign,
  ChartCandlestick,
  Code,
  Dumbbell,
  NotebookPen,
  SquareKanban,
  Volleyball,
} from "lucide-react";

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  link: FileRouteTypes["to"];
}

const menuItems: MenuItem[] = [
  {
    label: "Gym",
    icon: <Dumbbell />,
    link: "/gym",
  },
  {
    label: "Code",
    icon: <Code />,
    link: "/code",
  },
  {
    label: "Trading",
    icon: <ChartCandlestick />,
    link: "/trading",
  },
  {
    label: "Finance",
    icon: <BadgeDollarSign />,
    link: "/finance",
  },
  {
    label: "Notes",
    icon: <NotebookPen />,
    link: "/notes",
  },
  {
    label: "Kanban",
    icon: <SquareKanban />,
    link: "/kanban",
  },
  {
    label: "Football",
    icon: <Volleyball />,
    link: "/football",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { pathname } = useLocation();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          {menuItems.map((item) => (
            <SidebarMenu key={item.label}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.includes(item.link)}
                >
                  <Link to={item.link}>
                    {item.icon}
                    {item.label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
