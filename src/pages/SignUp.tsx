
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, isLoading, user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  
  // Password strength indicators
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const passwordStrength = [hasMinLength, hasUppercase, hasLowercase, hasNumber].filter(Boolean).length;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp(email, password, name);
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
        
        {/* Signup form */}
        <div className="flex-1 flex items-center justify-center py-12">
          <div className="w-full max-w-md animate-fade-up">
            <div className="glass-card p-8 rounded-2xl">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-display font-semibold text-peerly-900">Create your account</h1>
                <p className="mt-2 text-peerly-600">Join our community of renters and owners</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                  {/* Name input */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-peerly-700 mb-1">
                      Full name
                    </label>
                    <div className="relative">
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-peerly-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="John Doe"
                        required
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-peerly-400" size={18} />
                    </div>
                  </div>
                  
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
                    <label htmlFor="password" className="block text-sm font-medium text-peerly-700 mb-1">
                      Create password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={cn(
                          "w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors",
                          passwordStrength === 0 && "border-peerly-200",
                          passwordStrength === 1 && "border-red-300",
                          passwordStrength === 2 && "border-orange-300",
                          passwordStrength === 3 && "border-yellow-300",
                          passwordStrength === 4 && "border-green-300",
                        )}
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
                    
                    {/* Password strength */}
                    {password.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <div className="flex space-x-1">
                          <div 
                            className={cn(
                              "h-1 flex-1 rounded", 
                              passwordStrength >= 1 ? (
                                passwordStrength === 1 ? "bg-red-400" : 
                                passwordStrength === 2 ? "bg-orange-400" : 
                                passwordStrength === 3 ? "bg-yellow-400" : "bg-green-400"
                              ) : "bg-peerly-200"
                            )} 
                          />
                          <div 
                            className={cn(
                              "h-1 flex-1 rounded", 
                              passwordStrength >= 2 ? (
                                passwordStrength === 2 ? "bg-orange-400" : 
                                passwordStrength === 3 ? "bg-yellow-400" : "bg-green-400"
                              ) : "bg-peerly-200"
                            )} 
                          />
                          <div 
                            className={cn(
                              "h-1 flex-1 rounded", 
                              passwordStrength >= 3 ? (
                                passwordStrength === 3 ? "bg-yellow-400" : "bg-green-400"
                              ) : "bg-peerly-200"
                            )} 
                          />
                          <div 
                            className={cn(
                              "h-1 flex-1 rounded", 
                              passwordStrength >= 4 ? "bg-green-400" : "bg-peerly-200"
                            )} 
                          />
                        </div>
                        
                        <div className="text-xs space-y-1">
                          <div className="flex items-center">
                            <div className={cn(
                              "w-4 h-4 rounded-full flex items-center justify-center mr-2",
                              hasMinLength ? "bg-green-100 text-green-600" : "bg-peerly-100 text-peerly-400"
                            )}>
                              {hasMinLength && <Check size={12} />}
                            </div>
                            <span className={cn(
                              hasMinLength ? "text-green-600" : "text-peerly-500"
                            )}>
                              At least 8 characters
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className={cn(
                              "w-4 h-4 rounded-full flex items-center justify-center mr-2",
                              hasUppercase ? "bg-green-100 text-green-600" : "bg-peerly-100 text-peerly-400"
                            )}>
                              {hasUppercase && <Check size={12} />}
                            </div>
                            <span className={cn(
                              hasUppercase ? "text-green-600" : "text-peerly-500"
                            )}>
                              At least one uppercase letter
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className={cn(
                              "w-4 h-4 rounded-full flex items-center justify-center mr-2",
                              hasLowercase ? "bg-green-100 text-green-600" : "bg-peerly-100 text-peerly-400"
                            )}>
                              {hasLowercase && <Check size={12} />}
                            </div>
                            <span className={cn(
                              hasLowercase ? "text-green-600" : "text-peerly-500"
                            )}>
                              At least one lowercase letter
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className={cn(
                              "w-4 h-4 rounded-full flex items-center justify-center mr-2",
                              hasNumber ? "bg-green-100 text-green-600" : "bg-peerly-100 text-peerly-400"
                            )}>
                              {hasNumber && <Check size={12} />}
                            </div>
                            <span className={cn(
                              hasNumber ? "text-green-600" : "text-peerly-500"
                            )}>
                              At least one number
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Terms and Privacy */}
                  <div className="flex items-start">
                    <input
                      id="terms"
                      type="checkbox"
                      className="h-4 w-4 mt-1 text-primary border-peerly-300 rounded focus:ring-primary"
                      required
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-peerly-600">
                      I agree to Peerly's{" "}
                      <Link to="/terms" className="text-primary hover:text-primary/80 transition-colors">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-primary hover:text-primary/80 transition-colors">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  
                  {/* Submit button */}
                  <Button
                    type="submit"
                    className="w-full py-6 text-base font-medium"
                    disabled={isLoading || passwordStrength < 3}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating account...
                      </div>
                    ) : "Create account"}
                  </Button>
                </div>
              </form>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-peerly-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-peerly-500">Or sign up with</span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-3 px-4 border border-peerly-200 rounded-lg bg-white text-sm font-medium text-peerly-700 hover:bg-peerly-50 transition-colors"
                    onClick={() => alert("Google Sign-up will be implemented in future updates")}
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
                    onClick={() => alert("Facebook Sign-up will be implemented in future updates")}
                  >
                    <svg className="h-5 w-5 mr-2 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-peerly-600">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-medium hover:text-primary/80 transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
