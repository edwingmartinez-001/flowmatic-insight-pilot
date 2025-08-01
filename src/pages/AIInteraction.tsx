import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Camera, 
  Sheet, 
  MessageSquare, 
  Sparkles,
  X,
  Image,
  Mail,
  Send,
  Plane
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const AIInteraction = () => {
  const [activeTab, setActiveTab] = useState("pdf");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [textInput, setTextInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any>(null);

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files).slice(0, 5);
      setUploadedFiles(prev => [...prev, ...newFiles].slice(0, 5));
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const processFiles = async () => {
    setProcessing(true);
    setProgress(0);
    
    // Simulate AI processing
    const steps = [
      { message: "Analizando archivos...", progress: 25 },
      { message: "Extrayendo datos...", progress: 65 },
      { message: "Estructurando información...", progress: 90 },
      { message: "¡Listo!", progress: 100 }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProgress(step.progress);
    }

    // Mock results
    setResults({
      trips: [
        {
          destination: "Barcelona",
          dates: "15-22 Marzo 2024",
          hotel: "Hotel Arts Barcelona",
          cost: "€1,250"
        },
        {
          destination: "Valencia",
          dates: "5-12 Abril 2024", 
          hotel: "Hotel Las Arenas",
          cost: "€890"
        }
      ]
    });

    setProcessing(false);
  };

  const optimizeText = () => {
    setTextInput(prev => 
      "Viaje familiar para 4 personas a Barcelona del 15 al 22 de marzo de 2024. " +
      "Preferencia por hotel 4 estrellas cerca de la playa. Presupuesto aproximado €2000. " +
      "Incluir actividades para niños y visitas culturales."
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Interacción con AI</h1>
          <p className="text-muted-foreground mt-1">
            Procesa información de múltiples fuentes para crear presupuestos automáticamente
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-flowmatic-teal" />
          <span className="text-sm text-muted-foreground">Powered by IA</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pdf" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Subir PDF</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center space-x-2">
            <Camera className="w-4 h-4" />
            <span>Captura Email</span>
          </TabsTrigger>
          <TabsTrigger value="sheet" className="flex items-center space-x-2">
            <Sheet className="w-4 h-4" />
            <span>Hoja Cálculo</span>
          </TabsTrigger>
          <TabsTrigger value="text" className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4" />
            <span>Texto Natural</span>
          </TabsTrigger>
        </TabsList>

        {/* PDF Upload Tab */}
        <TabsContent value="pdf">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="w-5 h-5 mr-2 text-flowmatic-teal" />
                Subir Documentos PDF
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div 
                className="border-2 border-dashed border-muted rounded-lg p-8 text-center hover:border-flowmatic-teal transition-smooth cursor-pointer"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium">Arrastra archivos aquí o haz clic para seleccionar</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Máximo 5 archivos (PDF, JPG, PNG)
                </p>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e.target.files)}
                />
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Archivos subidos:</h4>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-flowmatic-teal/10 rounded">
                          {file.type.includes('pdf') ? (
                            <FileText className="w-4 h-4 text-flowmatic-teal" />
                          ) : (
                            <Image className="w-4 h-4 text-flowmatic-teal" />
                          )}
                        </div>
                        <span className="text-sm font-medium">{file.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Capture Tab */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-flowmatic-teal" />
                Capturar Email
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Email asociado</label>
                  <Input 
                    placeholder="cliente@email.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                </div>
                
                <div 
                  className="border-2 border-dashed border-muted rounded-lg p-8 text-center hover:border-flowmatic-teal transition-smooth cursor-pointer"
                  onClick={() => document.getElementById('email-upload')?.click()}
                >
                  <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium">Subir capturas de email</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Solo imágenes claras de emails
                  </p>
                  <input
                    id="email-upload"
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Spreadsheet Tab */}
        <TabsContent value="sheet">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sheet className="w-5 h-5 mr-2 text-flowmatic-teal" />
                Conectar Hoja de Cálculo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <Sheet className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Conectar Google Sheets</h3>
                <p className="text-muted-foreground mb-6">
                  Importa datos directamente desde tus hojas de cálculo
                </p>
                <Button variant="flowmatic">
                  <Sheet className="w-4 h-4 mr-2" />
                  Conectar Google Sheets
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Text Input Tab */}
        <TabsContent value="text">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-flowmatic-teal" />
                Descripción en Texto Natural
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <Textarea
                  placeholder="Describe el viaje que quieres organizar. Incluye destino, fechas, número de personas, tipo de alojamiento, presupuesto y preferencias especiales..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="min-h-[150px]"
                />
                <Button 
                  variant="outline" 
                  onClick={optimizeText}
                  className="flex items-center"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Optimizar descripción
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Processing Section */}
      {processing && (
        <Card className="bg-gradient-to-r from-flowmatic-medium-blue/5 to-flowmatic-teal/5">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="animate-spin w-8 h-8 border-2 border-flowmatic-teal border-t-transparent rounded-full"></div>
              <div className="flex-1">
                <h3 className="font-medium">Procesando con AI...</h3>
                <Progress value={progress} className="mt-2" />
                <p className="text-sm text-muted-foreground mt-1">
                  {progress < 25 ? "Analizando..." : 
                   progress < 65 ? "Extrayendo datos..." :
                   progress < 90 ? "Estructurando..." : "¡Listo!"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Section */}
      {results && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-success" />
              Previsualización de Resultados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Destino</th>
                      <th className="text-left p-3 font-medium">Fechas</th>
                      <th className="text-left p-3 font-medium">Hotel</th>
                      <th className="text-left p-3 font-medium">Coste</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.trips.map((trip: any, index: number) => (
                      <tr key={index} className="border-b hover:bg-muted/30">
                        <td className="p-3">{trip.destination}</td>
                        <td className="p-3">{trip.dates}</td>
                        <td className="p-3">{trip.hotel}</td>
                        <td className="p-3 font-medium text-flowmatic-teal">{trip.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between pt-4">
                <Badge variant="outline" className="text-success border-success">
                  ✓ Datos extraídos correctamente
                </Badge>
                
                <div className="flex space-x-3">
                  <Button variant="outline">
                    Editar manualmente
                  </Button>
                  <Button variant="flowmatic">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar al cliente
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Button */}
      {(uploadedFiles.length > 0 || textInput.length > 0) && !processing && !results && (
        <div className="flex justify-center">
          <Button 
            onClick={processFiles}
            variant="flowmatic"
            size="lg"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Procesar con AI
          </Button>
        </div>
      )}
    </div>
  );
};

export default AIInteraction;