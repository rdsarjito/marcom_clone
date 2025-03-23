"use client"

import * as React from "react"

import {
  Users,
  GalleryVerticalEnd,
  Home,
  Bell
} from "lucide-react"

import SidebarNavigation from "@/app/dashboard/uiRama/sidebar/sidebar-navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"

export function CustomTrigger() {
  const { toggleSidebar } = useSidebar()
  
  return () => toggleSidebar()
}

const data = {
  navMain: [
    {
      title: "Manajemen Fitur",
      url: "#",
      icon: Home,
    },
    {
      title: "Projects",
      url: "#",
      icon: Users,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-gray-50 flex h-16 gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 px-3 border-b">
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          onClick={CustomTrigger()}
        >
          <div className="flex aspect-square size-6 items-center justify-center">
            <GalleryVerticalEnd className="size-6" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              Dashboard Marcom
            </span>
          </div>
          <div className="flex aspect-square size-8 items-center justify-center">
            <Bell className="ml-auto size-7 rounded-sm p-1 border" />
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavigation items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
