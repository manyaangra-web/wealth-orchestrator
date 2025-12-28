import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
      
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';
      
      default:
        return '';
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    
    if (touched.email) {
      const error = validateField('email', value);
      setErrors(prev => ({
        ...prev,
        email: error
      }));
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    
    if (touched.password) {
      const error = validateField('password', value);
      setErrors(prev => ({
        ...prev,
        password: error
      }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));

    const value = field === 'email' ? email : password;
    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  const validateForm = (): boolean => {
    const emailError = validateField('email', email);
    const passwordError = validateField('password', password);
    
    const newErrors = {
      email: emailError,
      password: passwordError
    };

    setErrors(newErrors);
    setTouched({ email: true, password: true });

    return !emailError && !passwordError;
  };

  const handleLogin = async (email: string, password: string) => {
    console.log('handleLogin called with:', { email, password }); // Debug log
    
    try {
      console.log('Making API request to:', 'http://16.171.34.205:8002/api/auth/login/'); // Debug log
      
      const response = await fetch('http://16.171.34.205:8002/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Response status:', response.status); // Debug log
      console.log('Response headers:', response.headers); // Debug log
      
      const data = await response.json();
      console.log('Response data:', data); // Debug log

      if (data.success) {
        // Store tokens in localStorage
        localStorage.setItem('access_token', data.tokens.access);
        localStorage.setItem('refresh_token', data.tokens.refresh);
        localStorage.setItem('user_data', JSON.stringify(data.user));

        // Notify other tabs/components of login
        window.dispatchEvent(new Event('authStateChanged'));
        
        // Store remember me preference
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('rememberedEmail');
        }
        
        toast.success(`Welcome back, ${data.user.first_name}!`);
        
        // Navigate to dashboard (adjust route as needed)
        navigate('/');
        
        return true;
      } else {
        console.error('Login failed:', data); // Debug log
        setErrors({
          password: data.message || 'Invalid email or password'
        });
        toast.error('Login failed. Please check your credentials.');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        password: 'Network error. Please try again.'
      });
      toast.error('Network error. Please check your connection and try again.');
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('Form submitted'); // Debug log
    e.preventDefault();
    
    console.log('Current form values:', { email, password }); // Debug log
    
    if (!validateForm()) {
      console.log('Form validation failed'); // Debug log
      return;
    }

    console.log('Form validation passed, starting login process'); // Debug log
    setIsLoading(true);
    
    try {
      const loginSuccess = await handleLogin(email, password);
      console.log('Login result:', loginSuccess); // Debug log
      
      if (loginSuccess) {
        // Reset form on success
        setEmail('');
        setPassword('');
        setErrors({});
        setTouched({});
      }
    } catch (error) {
      console.error('Login submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load remembered email on component mount
  useEffect(() => {
    const remembered = localStorage.getItem('rememberMe');
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    
    if (remembered === 'true' && rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-serif font-semibold text-foreground">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to your Wealth Orchestrator account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@gmail.com"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`pl-10 ${errors.email && touched.email ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                    disabled={isLoading}
                    autoComplete="email"
                  />
                </div>
                {errors.email && touched.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="admin"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    onBlur={() => handleBlur('password')}
                    className={`pl-10 pr-10 ${errors.password && touched.password ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                    disabled={isLoading}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    disabled={isLoading}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                    disabled={isLoading}
                  />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-primary hover:text-primary/80 transition-colors"
                  disabled={isLoading}
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoading || !email.trim() || !password}
                variant="gold"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>

              {/* Login attempt counter and lockout warning */}
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Sign in securely to access your financial dashboard
                </p>
              </div>
            </form>

            <div className="mt-6 text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={handleSignUp}
                  className="text-primary hover:text-primary/80 transition-colors font-medium"
                  disabled={isLoading}
                >
                  Sign up
                </button>
              </p>
              
              <p className="text-sm text-muted-foreground">
                Need help?{' '}
                <button
                  type="button"
                  className="text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Contact Support
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            © 2025 Wealth Orchestrator. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}