import React from 'react';
import { 
  Plane, 
  Users, 
  FileText, 
  Euro, 
  TrendingUp, 
  MapPin,
  Bell,
  Sparkles,
  Calendar,
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  // Mock data
  const kpiData = [
    {
      title: "Viajes Activos",
      value: "156",
      change: "+12%",
      trend: "up",
      icon: Plane,
      color: "text-flowmatic-teal"
    },
    {
      title: "Clientes Únicos",
      value: "89",
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "text-flowmatic-medium-blue"
    },
    {
      title: "Presupuestos",
      value: "73%",
      change: "Firmados",
      trend: "neutral",
      icon: FileText,
      color: "text-flowmatic-green"
    },
    {
      title: "Valoración Total",
      value: "€487K",
      change: "+15%",
      trend: "up",
      icon: Euro,
      color: "text-flowmatic-dark-blue"
    }
  ];

  const alerts = [
    {
      id: 1,
      client: "Hotel Majestic Barcelona",
      days: 9,
      type: "sin_respuesta"
    },
    {
      id: 2,
      client: "Viajes Costa Brava",
      days: 3,
      type: "presupuesto_vence"
    },
    {
      id: 3,
      client: "Turismo Mediterráneo",
      days: 7,
      type: "sin_respuesta"
    }
  ];

  const destinations = [
    { name: "Barcelona", trips: 45, coords: [2.1734, 41.3851] },
    { name: "Madrid", trips: 38, coords: [-3.7038, 40.4168] },
    { name: "Valencia", trips: 29, coords: [-0.3763, 39.4699] },
    { name: "Sevilla", trips: 22, coords: [-5.9845, 37.3891] },
    { name: "Bilbao", trips: 18, coords: [-2.9253, 43.2627] }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Resumen Ejecutivo</h1>
          <p className="text-muted-foreground mt-1">
            Panel de control principal - {new Date().toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <Button variant="flowmatic">
          <Calendar className="w-4 h-4 mr-2" />
          Generar Informe
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="bg-flowmatic-card shadow-flowmatic hover:shadow-hover transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {kpi.title}
                  </p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    {kpi.value}
                  </p>
                  <div className="flex items-center mt-2">
                    {kpi.trend === "up" && <TrendingUp className="w-4 h-4 text-success mr-1" />}
                    <span className={`text-sm ${kpi.trend === "up" ? "text-success" : "text-muted-foreground"}`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-background ${kpi.color}`}>
                  <kpi.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map Section */}
        <Card className="lg:col-span-2 shadow-flowmatic">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-flowmatic-teal" />
              Mapa de Destinos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-gradient-to-br from-flowmatic-medium-blue/10 to-flowmatic-teal/10 rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Simplified map representation */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50"></div>
              
              {/* Destination bubbles */}
              {destinations.map((dest, index) => (
                <div
                  key={dest.name}
                  className={`absolute animate-float bg-flowmatic-gradient rounded-full flex items-center justify-center text-white font-semibold shadow-glow cursor-pointer hover:scale-110 transition-smooth`}
                  style={{
                    width: `${Math.max(40, dest.trips)}px`,
                    height: `${Math.max(40, dest.trips)}px`,
                    left: `${20 + index * 15}%`,
                    top: `${30 + index * 10}%`,
                    animationDelay: `${index * 0.5}s`
                  }}
                  title={`${dest.name}: ${dest.trips} viajes`}
                >
                  {dest.trips}
                </div>
              ))}
              
              <div className="text-center">
                <MapPin className="w-12 h-12 text-flowmatic-teal mx-auto mb-4" />
                <p className="text-lg font-semibold text-foreground">
                  Distribución de Destinos
                </p>
                <p className="text-muted-foreground">
                  Visualización interactiva de viajes por ubicación
                </p>
              </div>
            </div>
            
            {/* Destination Legend */}
            <div className="mt-4 flex flex-wrap gap-2">
              {destinations.map((dest) => (
                <Badge key={dest.name} variant="secondary" className="bg-flowmatic-teal/10 text-flowmatic-teal">
                  {dest.name}: {dest.trips}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts Section */}
        <Card className="shadow-flowmatic">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2 text-warning" />
              Alertas Urgentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-3 bg-background rounded-lg border">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground">
                        {alert.client}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {alert.type === "sin_respuesta" 
                          ? `${alert.days} días sin respuesta`
                          : `Presupuesto vence en ${alert.days} días`
                        }
                      </p>
                    </div>
                    <Badge 
                      variant={alert.type === "sin_respuesta" ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {alert.days}d
                    </Badge>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full mt-2 text-xs"
                  >
                    <Bell className="w-3 h-3 mr-1" />
                    Enviar recordatorio
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendation */}
      <Card className="bg-gradient-to-r from-flowmatic-medium-blue/5 to-flowmatic-teal/5 border-flowmatic-teal/20 shadow-glow">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-flowmatic-gradient rounded-full">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-foreground mb-2">
                Recomendación AI Central
              </h3>
              <p className="text-muted-foreground mb-4">
                Basado en las tendencias actuales, se recomienda enfocar esfuerzos comerciales en destinos de playa para la próxima temporada alta. Los datos muestran un incremento del 23% en consultas para Valencia y destinos mediterráneos.
              </p>
              <div className="flex items-center space-x-3">
                <Button variant="flowmatic">
                  <Target className="w-4 h-4 mr-2" />
                  Aplicar sugerencia
                </Button>
                <Button variant="outline">
                  Ver análisis completo
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;