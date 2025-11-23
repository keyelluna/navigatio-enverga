import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import imgImage1 from "figma:asset/e30c10d7f9b16dd75f0275ed8191330fefa3bd8d.png";
import { authenticateUser, setCurrentUser } from '../utils/localStorage';
import { toast } from 'sonner';

interface SignInProps {
  userType: 'student' | 'faculty';
  onSignInSuccess: () => void;
  onGoToSignUp: () => void;
  onBack: () => void;
}

export default function SignIn({ userType, onSignInSuccess, onGoToSignUp, onBack }: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Authenticate user from localStorage
    const user = authenticateUser(email, password);
    
    if (user && user.userType === userType) {
      setCurrentUser(user);
      toast.success('Sign in successful!');
      setTimeout(() => {
        onSignInSuccess();
      }, 500);
    } else {
      toast.error('Invalid credentials or user type mismatch');
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 relative w-full min-h-screen flex items-center justify-center p-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#780302]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#780302]/5 rounded-full blur-3xl" />
      </div>

      {/* Back button */}
      <button 
        onClick={onBack}
        className="fixed top-6 left-6 z-50 p-3 bg-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all group"
      >
        <ArrowLeft className="size-5 text-[#780302] group-hover:-translate-x-1 transition-transform" />
      </button>

      {/* Sign In Form */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-[#780302] to-[#a00402] p-8 text-white">
          <div className="flex justify-center mb-4">
            <div className="size-20 bg-white rounded-full p-2 shadow-lg">
              <img alt="University Logo" className="w-full h-full object-cover rounded-full" src={imgImage1} />
            </div>
          </div>
          <h2 className="text-center mb-2 font-lilita text-[32px]">
            {userType === 'student' ? 'Student' : 'Faculty'} Sign In
          </h2>
          <p className="text-white/90 text-center">Welcome back! Please sign in to continue.</p>
        </div>

        {/* Form content */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-gray-700 mb-2 block">
                {userType === 'student' ? 'Student ID' : 'Email or Faculty ID'}
              </Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-50 border-gray-300 focus:border-[#780302] focus:ring-[#780302] transition-all"
                placeholder={userType === 'student' ? 'Enter your student ID' : 'Enter your email or faculty ID'}
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700 mb-2 block">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-50 border-gray-300 focus:border-[#780302] focus:ring-[#780302] pr-10 transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#780302] transition-colors"
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-[#780302] to-[#a00402] text-white hover:from-[#5a0201] hover:to-[#780302] shadow-lg h-12 text-[18px] transition-all hover:shadow-xl"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={onGoToSignUp}
                className="text-[#780302] hover:text-[#5a0201] underline transition-colors"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}