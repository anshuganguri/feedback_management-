import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (credentials) => {
    try {
      await login(credentials);
      navigate('/dashboard');
    } catch (e) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      
      {/* Left Column */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 md:w-1/2 text-center">
        {/* Illustration */}
        <div className="bg-blue-100 h-40 w-40 rounded-xl mb-6 flex items-center justify-center">
          <span className="text-blue-400 text-4xl font-bold">FH</span>
        </div>
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome to FeedbackHub</h2>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          Your trusted platform for collecting and managing feedback.
        </p>
        {/* Stats */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
          <div className="flex-1 bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <span className="text-2xl font-bold text-blue-600">500+</span>
            <span className="text-xs text-gray-500 mt-1">Feedbacks</span>
          </div>
          <div className="flex-1 bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <span className="text-2xl font-bold text-green-600">95%</span>
            <span className="text-xs text-gray-500 mt-1">Satisfaction</span>
          </div>
          <div className="flex-1 bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <span className="text-2xl font-bold text-yellow-500">24h</span>
            <span className="text-xs text-gray-500 mt-1">Avg Response Time</span>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 md:w-1/2">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md px-8 py-10">
          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Sign in to your account</h2>

          {/* Demo credentials */}
          <div className="bg-gray-100 rounded p-3 mb-6 text-sm text-gray-600 text-center">
            <div className="mb-1 font-semibold text-gray-700">Demo Credentials</div>
            <div>Email: <span className="font-mono">admin@example.com</span></div>
            <div>Password: <span className="font-mono">password123</span></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              {...register('email', { required: true })}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            />
            <input
              type="password"
              placeholder="Password"
              {...register('password', { required: true })}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox" /> Remember me
              </label>
              <button type="button" className="text-blue-600 hover:underline">Forgot password?</button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>

            {/* OR divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-200" />
              <span className="mx-2 text-gray-400 text-xs">OR</span>
              <div className="flex-grow h-px bg-gray-200" />
            </div>

            {/* Social login buttons */}
            <div className="flex flex-col gap-3">
              <button type="button" className="w-full py-2 px-4 rounded bg-white border border-gray-300 text-gray-700 font-semibold flex items-center justify-center gap-2 shadow-sm hover:bg-gray-50">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M21.35 11.1H12.18V13.9H17.98C17.6 15.5 16.13 16.7 14.18 16.7C12.07 16.7 10.35 14.98 10.35 12.87C10.35 10.76 12.07 9.04 14.18 9.04C15.13 9.04 15.98 9.37 16.65 9.89L18.44 8.1C17.22 7.09 15.77 6.4 14.18 6.4C10.61 6.4 7.7 9.31 7.7 12.88C7.7 16.45 10.61 19.36 14.18 19.36C17.75 19.36 20.66 16.45 20.66 12.88C20.66 12.47 20.62 12.08 20.56 11.7L21.35 11.1Z" fill="#4285F4"/>
                </svg>
                Sign in with Google
              </button>

              <button type="button" className="w-full py-2 px-4 rounded bg-gray-900 text-white font-semibold flex items-center justify-center gap-2 shadow-sm hover:bg-gray-800">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 7C10.34 7 9 8.34 9 10C9 11.66 10.34 13 12 13C13.66 13 15 11.66 15 10C15 8.34 13.66 7 12 7ZM12 15C9.33 15 7 16.34 7 18V19H17V18C17 16.34 14.67 15 12 15Z" fill="#fff"/>
                </svg>
                Sign in with GitHub
              </button>
            </div>
          </form>

          <p className="text-sm text-gray-600 mt-6 text-center">
            No account? <Link className="text-blue-600" to="/signup">Sign up</Link>
          </p>
        </div>
      </div>

    </div>
  );
}
