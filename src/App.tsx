import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AppLayout } from "./components/layout/AppLayout";
import LoginForm from "./components/ui/login-form";
import Dashboard from "./pages/Dashboard";
import AIInteraction from "./pages/AIInteraction";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();
  return currentUser ? <>{children}</> : <Navigate to="/login" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/ai-interaction" element={
              <ProtectedRoute>
                <AppLayout>
                  <AIInteraction />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <AppLayout>
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold">Dashboard Analítico</h1>
                    <p className="text-muted-foreground mt-2">Próximamente...</p>
                  </div>
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/comparisons" element={
              <ProtectedRoute>
                <AppLayout>
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold">Comparaciones Avanzadas</h1>
                    <p className="text-muted-foreground mt-2">Próximamente...</p>
                  </div>
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/manual-creation" element={
              <ProtectedRoute>
                <AppLayout>
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold">Creación Manual</h1>
                    <p className="text-muted-foreground mt-2">Próximamente...</p>
                  </div>
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/history" element={
              <ProtectedRoute>
                <AppLayout>
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold">Historial Unificado</h1>
                    <p className="text-muted-foreground mt-2">Próximamente...</p>
                  </div>
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/preview" element={
              <ProtectedRoute>
                <AppLayout>
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold">Previsualización</h1>
                    <p className="text-muted-foreground mt-2">Próximamente...</p>
                  </div>
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
