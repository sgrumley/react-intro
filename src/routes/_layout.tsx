import { createFileRoute, Outlet } from '@tanstack/react-router'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Navigation"

export const Route = createFileRoute('/_layout')({
  component: Layout,
})

function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <Outlet/>
      </main>
    </SidebarProvider>
  )
}


