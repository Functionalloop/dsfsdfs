import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight } from 'lucide-react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const { loginWithEmail, signupWithEmail, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isSignup) {
        await signupWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message?.replace('Firebase: ', '') || 'Authentication failed');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Google login failed');
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
      setError('');
    } catch (err: any) {
      setError(err.message?.replace('Firebase: ', '') || 'Failed to send reset email');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80')" }}
      >
        <div className="absolute inset-0 bg-[#061826]/70 mix-blend-multiply"></div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center p-4 z-10">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
          
          {/* Left Side - Branding */}
          <div className="hidden md:flex md:w-1/2 bg-[#0d1627] p-12 flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-[#84cc16] mb-4">Traveloop</h1>
              <p className="text-lg text-slate-300 leading-snug pr-4">
                Your gateway to extraordinary adventures and seamless itineraries.
              </p>
            </div>
            <div className="flex justify-center my-8">
              <img 
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=300&h=300" 
                alt="Travel adventure" 
                className="w-[300px] h-[300px] rounded-xl object-cover shadow-lg"
              />
            </div>
            <p className="text-sm text-slate-400 italic">"The journey of a thousand miles begins with a single step."</p>
          </div>

          {/* Right Side - Auth Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="max-w-sm mx-auto w-full">
              {/* Toggle Tabs */}
              <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
                <button 
                  onClick={() => { setIsSignup(false); setError(''); setResetSent(false); }}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition-all ${
                    !isSignup ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Login
                </button>
                <button 
                  onClick={() => { setIsSignup(true); setError(''); setResetSent(false); }}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition-all ${
                    isSignup ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {isSignup ? 'Create Account' : 'Welcome Back'}
                </h2>
                <p className="text-gray-600">
                  {isSignup ? 'Start planning your next adventure.' : 'Sign in to access your planned trips.'}
                </p>
              </div>

              {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm">{error}</div>}
              {resetSent && <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-4 text-sm">Password reset email sent! Check your inbox.</div>}

              <form className="space-y-5" onSubmit={handleEmailSubmit}>
                {isSignup && (
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name" 
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#84cc16] focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" 
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#84cc16] focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={isSignup ? 'Create a password (min 6 chars)' : 'Enter your password'}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#84cc16] focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                    required
                  />
                </div>

                {!isSignup && (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#65a30d] focus:ring-[#65a30d]" />
                      <span className="text-gray-600">Remember me</span>
                    </label>
                    <button 
                      type="button"
                      onClick={handleForgotPassword}
                      className="font-medium text-[#4d7c0f] hover:text-[#3f6212]"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                <button 
                  type="submit" 
                  className="w-full py-3 px-4 bg-[#65a30d] hover:bg-[#4d7c0f] text-white rounded-lg font-medium transition-colors flex items-center justify-center group"
                >
                  {isSignup ? 'Create Account' : 'Login to Traveloop'}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <div className="mt-8 flex items-center mb-8">
                <div className="flex-grow h-px bg-gray-200"></div>
                <span className="px-4 text-sm text-gray-500">Or continue with</span>
                <div className="flex-grow h-px bg-gray-200"></div>
              </div>

              <div>
                <button 
                  type="button" 
                  onClick={handleGoogleLogin}
                  className="w-full py-2.5 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="w-full bg-[#0B121A] text-gray-300 py-6 px-8 z-10 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-8">
            <span className="text-xl font-bold text-white tracking-tight">Traveloop</span>
            <div className="hidden md:flex space-x-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">About Us</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Contact Support</a>
            </div>
          </div>
          <div className="text-sm text-gray-500 text-center md:text-right">
            © 2026 Traveloop Adventure Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
