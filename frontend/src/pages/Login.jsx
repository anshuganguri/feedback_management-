import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async ({ email, password }) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data, res.data?.token);
      navigate('/dashboard');
    } catch (e) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 bg-white rounded border p-4">
        <input className="w-full border rounded px-3 py-2" placeholder="Email" {...register('email', { required: true })} />
        <input type="password" className="w-full border rounded px-3 py-2" placeholder="Password" {...register('password', { required: true })} />
        <button disabled={isSubmitting} className="w-full px-4 py-2 rounded bg-blue-600 text-white">
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
      <p className="text-sm text-gray-600 mt-3">No account? <Link className="text-blue-600" to="/signup">Sign up</Link></p>
    </div>
  );
}


