
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Container className="flex-1 flex flex-col">
        {/* Header */}
        <header className="py-6">
          <nav className="flex items-center justify-between">
            <Link 
              to="/" 
              className="text-2xl font-display font-semibold text-peerly-900"
            >
              peerly
            </Link>
            
            <Link
              to="/"
              className="flex items-center text-peerly-600 hover:text-peerly-900 transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to home
            </Link>
          </nav>
        </header>
        
        {/* Login form */}
        <div className="flex-1 flex items-center justify-center py-12">
          <div className="w-full max-w-md animate-fade-up">
            <div className="glass-card p-8 rounded-2xl">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-display font-semibold text-peerly-900">Welcome back</h1>
                <p className="mt-2 text-peerly-600">Sign in to your account to continue</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                  {/* Email input */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-peerly-700 mb-1">
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-peerly-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="your@email.com"
                        required
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-peerly-400" size={18} />
                    </div>
                  </div>
                  
                  {/* Password input */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="password" className="block text-sm font-medium text-peerly-700">
                        Password
                      </label>
                      <Link to="/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-colors">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-3 border border-peerly-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="••••••••"
                        required
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-peerly-400" size={18} />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-peerly-400 hover:text-peerly-600 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  
                  {/* Remember me */}
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 text-primary border-peerly-300 rounded focus:ring-primary"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-peerly-600">
                      Remember me for 30 days
                    </label>
                  </div>
                  
                  {/* Submit button */}
                  <Button
                    type="submit"
                    className="w-full py-6 text-base font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </div>
                    ) : "Sign in"}
                  </Button>
                </div>
              </form>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-peerly-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-peerly-500">Or continue with</span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-3 px-4 border border-peerly-200 rounded-lg bg-white text-sm font-medium text-peerly-700 hover:bg-peerly-50 transition-colors"
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.68 17.56V20.13H19.22C21.19 18.31 22.56 15.57 22.56 12.25Z" fill="#4285F4"/>
                      <path d="M12 23C14.97 23 17.46 22.01 19.22 20.13L15.68 17.56C14.69 18.22 13.42 18.58 12 18.58C9.00998 18.58 6.48998 16.56 5.62998 13.8H1.96998V16.46C3.71998 20.34 7.58998 23 12 23Z" fill="#34A853"/>
                      <path d="M5.63 13.8C5.39 13.17 5.25 12.49 5.25 11.8C5.25 11.11 5.39 10.43 5.63 9.8V7.14H1.97C1.35 8.55 1 10.13 1 11.8C1 13.47 1.35 15.05 1.97 16.46L5.63 13.8Z" fill="#FBBC05"/>
                      <path d="M12 5.02C13.62 5.02 15.06 5.55 16.21 6.64L19.36 3.49C17.45 1.72 14.97 0.72 12 0.72C7.58998 0.72 3.71998 3.38 1.96998 7.26L5.62998 9.92C6.48998 7.16 9.00998 5.02 12 5.02Z" fill="#EA4335"/>
                    </svg>
                    Google
                  </button>
                  
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-3 px-4 border border-peerly-200 rounded-lg bg-white text-sm font-medium text-peerly-700 hover:bg-peerly-50 transition-colors"
                  >
                    <svg className="h-5 w-5 mr-2 text-[#24292F]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5807 20.2772 21.0497 21.7437 19.0074C23.2101 16.965 23.9993 14.5143 24 12C24 5.37 18.63 0 12 0Z" />
                    </svg>
                    GitHub
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-peerly-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary font-medium hover:text-primary/80 transition-colors">
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
