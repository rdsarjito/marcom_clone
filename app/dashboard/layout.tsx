import { ReactNode } from "react";

import { AppSidebar } from "@/app/dashboard/componentes/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

interface LayoutProps {
    readonly children: ReactNode;
  }  

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 px-4">
          <div className="flex items-center gap-2">
          </div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
          </Avatar>
        </header>
        <div className="p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}