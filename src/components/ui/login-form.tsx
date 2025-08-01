import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/hero-travel.jpg';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);

  const { login, register, loginWithGoogle } = useAuth();
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailValid(validateEmail(value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    
    if (value.length > 0 && value.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailValid) {
      toast({
        title: "Email inválido",
        description: "Por favor ingresa un email válido",
        variant: "destructive"
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: "Contraseña muy corta",
        description: "La contraseña debe tener al menos 8 caracteres",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = isLoginMode 
        ? await login(email, password)
        : await register(email, password);
        
      if (error) {
        toast({
          title: isLoginMode ? "Error de autenticación" : "Error de registro",
          description: error.message || "Ocurrió un error inesperado",
          variant: "destructive"
        });
      } else {
        toast({
          title: isLoginMode ? "¡Bienvenido!" : "¡Cuenta creada!",
          description: isLoginMode 
            ? "Has iniciado sesión correctamente"
            : "Tu cuenta ha sido creada exitosamente",
        });
      }
    } catch (error: any) {
      toast({
        title: isLoginMode ? "Error de autenticación" : "Error de registro",
        description: "Ocurrió un error inesperado",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(23, 63, 112, 0.9), rgba(44, 146, 131, 0.9)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-glow mb-4 animate-float">
            <Plane className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Flowmatic</h1>
          <p className="text-white/80">Gestión Inteligente de Viajes</p>
        </div>

        {/* Login Card */}
        <Card className="bg-white/95 backdrop-blur-lg shadow-hover border-0">
          <CardHeader className="text-center pb-6">
            <h2 className="text-2xl font-semibold text-foreground">
              {isLoginMode ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </h2>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={handleEmailChange}
                    className="pl-10 pr-10 h-12 bg-background border-2 transition-smooth"
                  />
                  {emailValid && email.length > 0 && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={handlePasswordChange}
                    className="pl-10 pr-10 h-12 bg-background border-2 transition-smooth"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {passwordError && (
                  <p className="text-sm text-destructive mt-1">{passwordError}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading || !emailValid || password.length < 8}
                variant="flowmatic"
                className="w-full h-12 font-semibold disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Accediendo...</span>
                  </div>
                ) : (
                  isLoginMode ? 'Acceder' : 'Crear Cuenta'
                )}
              </Button>

              {/* Google Sign In */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-muted-foreground/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">o continúa con</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                disabled={loading}
                onClick={async () => {
                  setLoading(true);
                  try {
                    const { error } = await loginWithGoogle();
                    if (error) {
                      toast({
                        title: "Error con Google",
                        description: error.message,
                        variant: "destructive"
                      });
                    }
                  } catch (error: any) {
                    toast({
                      title: "Error con Google",
                      description: "Ocurrió un error inesperado",
                      variant: "destructive"
                    });
                  } finally {
                    setLoading(false);
                  }
                }}
                className="w-full h-12 font-semibold border-2"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continuar con Google
              </Button>

              {/* Toggle between login and register */}
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setIsLoginMode(!isLoginMode)}
                  className="text-sm text-primary hover:underline"
                >
                  {isLoginMode 
                    ? '¿No tienes cuenta? Créate una' 
                    : '¿Ya tienes cuenta? Inicia sesión'
                  }
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white/70 text-sm">
            © 2024 Flowmatic - Gestión Inteligente de Viajes
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;