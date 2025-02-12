import { ReactNode } from "react";

import { AppSidebar } from "@/app/dashboard/componentes/sidebar/app-sidebar"

import {
  UserCircle,
} from "lucide-react"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

interface LayoutProps {
  readonly children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-gray-50 flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 px-4 border-b">
          <div className="flex items-center gap-2">
          </div>
          <div className="p-2 rounded-full hover:bg-gray-100 transition-all">
            <UserCircle className="size-6" />
          </div>
        </header>
        <div>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
