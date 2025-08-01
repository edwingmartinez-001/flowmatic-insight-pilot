import { useState } from "react";
import { 
  Home, 
  Bot, 
  BarChart3, 
  GitCompare, 
  PlusCircle, 
  History, 
  Eye, 
  LogOut,
  Plane
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarHeader
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const items = [
  { title: "Resumen Ejecutivo", url: "/dashboard", icon: Home },
  { title: "Interacción con AI", url: "/ai-interaction", icon: Bot },
  { title: "Dashboard Analítico", url: "/analytics", icon: BarChart3 },
  { title: "Comparaciones Avanzadas", url: "/comparisons", icon: GitCompare },
  { title: "Creación Manual", url: "/manual-creation", icon: PlusCircle },
  { title: "Historial Unificado", url: "/history", icon: History },
  { title: "Previsualización", url: "/preview", icon: Eye },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { logout } = useAuth();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-flowmatic-teal/10 text-flowmatic-teal font-medium border-r-2 border-flowmatic-teal" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <Sidebar
      className={`${collapsed ? "w-14" : "w-64"} border-r bg-white shadow-sm`}
      collapsible="icon"
    >
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-flowmatic-gradient rounded-lg flex items-center justify-center">
            <Plane className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-bold text-lg text-foreground">Flowmatic</h1>
              <p className="text-xs text-muted-foreground">Gestión de Viajes</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Navegación Principal
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavCls}
                    >
                      <item.icon className="w-5 h-5 min-w-[20px]" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout Section */}
        <div className="mt-auto p-2 border-t">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/5"
          >
            <LogOut className="w-5 h-5 min-w-[20px]" />
            {!collapsed && <span className="ml-3">Cerrar sesión</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}