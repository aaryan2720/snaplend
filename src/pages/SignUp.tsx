import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, isLoading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const passwordStrength = [hasMinLength, hasUppercase, hasLowercase, hasNumber].filter(Boolean).length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(email, password, name);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Container className="flex-1 flex flex-col">
        <header className="py-6">
          <nav className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-display font-semibold text-peerly-900">peerly</Link>
            <Link to="/" className="flex items-center text-peerly-600 hover:text-peerly-900 transition-colors">
              <ArrowLeft size={18} className="mr-2" /> Back to home
            </Link>
          </nav>
        </header>

        <div className="flex-1 flex items-center justify-center py-12">
          <div className="w-full max-w-md animate-fade-up">
            <div className="glass-card p-8 rounded-2xl">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-display font-semibold text-peerly-900">Create your account</h1>
                <p className="mt-2 text-peerly-600">Join our community of renters and owners</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Input */}
                <InputField id="name" label="Full name" type="text" value={name} onChange={setName} icon={<User size={18} />} placeholder="John Doe" required />
                {/* Email Input */}
                <InputField id="email" label="Email address" type="email" value={email} onChange={setEmail} icon={<Mail size={18} />} placeholder="your@email.com" required />
                {/* Password Input */}
                <PasswordField password={password} showPassword={showPassword} setShowPassword={setShowPassword} setPassword={setPassword} passwordStrength={passwordStrength} />
                <Button type="submit" isLoading={isLoading} className="w-full">Sign Up</Button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const InputField = ({ id, label, type, value, onChange, icon, placeholder, required }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-peerly-700 mb-1">{label}</label>
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-peerly-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        placeholder={placeholder}
        required={required}
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-peerly-400">{icon}</div>
    </div>
  </div>
);

const PasswordField = ({ password, showPassword, setShowPassword, setPassword, passwordStrength }) => (
  <div>
    <label htmlFor="password" className="block text-sm font-medium text-peerly-700 mb-1">Create password</label>
    <div className="relative">
      <input
        id="password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={cn("w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors")}
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
);

export default SignUp;
