import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Signup() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async ({ name, email, password }) => {
    try {
      const res = await api.post('/auth/signup', { name, email, password });
      login(res.data, res.data?.token);
      navigate('/dashboard');
    } catch (e) {
      alert('Failed to sign up');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Create account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 bg-white rounded border p-4">
        <input className="w-full border rounded px-3 py-2" placeholder="Name" {...register('name', { required: true })} />
        <input className="w-full border rounded px-3 py-2" placeholder="Email" {...register('email', { required: true })} />
        <input type="password" className="w-full border rounded px-3 py-2" placeholder="Password" {...register('password', { required: true, minLength: 6 })} />
        <button disabled={isSubmitting} className="w-full px-4 py-2 rounded bg-blue-600 text-white">
          {isSubmitting ? 'Creating...' : 'Sign up'}
        </button>
      </form>
      <p className="text-sm text-gray-600 mt-3">Already have an account? <Link className="text-blue-600" to="/login">Login</Link></p>
    </div>
  );
}


