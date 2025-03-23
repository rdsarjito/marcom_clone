import { ReactNode } from "react";
import { UserCircle } from "lucide-react";


import { AppSidebar } from "@/app/dashboard/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster"

interface LayoutProps {
  readonly children: ReactNode;
}

/**
 * Layout utama untuk dashboard dengan sidebar dan header.
 */
export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      {/* Sidebar */}
      <AppSidebar />

      {/* Kontainer utama */}
      <SidebarInset>
        {/* Header */}
        <header
          className="
            sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between 
            bg-gray-50 px-4 border-b transition-[width,height] ease-linear"
        >
          {/* Ikon Profil */}
          <div className="p-2 rounded-full hover:bg-gray-100 transition-all">
            <UserCircle className="size-6" />
          </div>
        </header>

        {/* Konten utama */}
        <main>{children}</main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
