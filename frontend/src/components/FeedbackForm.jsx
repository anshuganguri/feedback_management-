import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

export default function FeedbackForm({ onSubmit, isSubmitting }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <motion.form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white rounded border p-4"
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <div>
        <label className="block text-sm mb-1">Name</label>
        <input className="w-full border rounded px-3 py-2" {...register('name', { required: true })} />
        {errors.name && <p className="text-sm text-red-600 mt-1">Name is required</p>}
      </div>
      <div>
        <label className="block text-sm mb-1">Email</label>
        <input type="email" className="w-full border rounded px-3 py-2" {...register('email', { required: true })} />
        {errors.email && <p className="text-sm text-red-600 mt-1">Email is required</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm mb-1">Type</label>
          <select className="w-full border rounded px-3 py-2" {...register('type', { required: true })}>
            <option value="bug">Bug</option>
            <option value="feature">Feature</option>
            <option value="improvement">Improvement</option>
            <option value="question">Question</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Priority</label>
          <select className="w-full border rounded px-3 py-2" {...register('priority', { required: true })}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm mb-1">Title</label>
        <input className="w-full border rounded px-3 py-2" {...register('title', { required: true, minLength: 5 })} />
      </div>
      <div>
        <label className="block text-sm mb-1">Description</label>
        <textarea rows="4" className="w-full border rounded px-3 py-2" {...register('description', { required: true, minLength: 10 })} />
      </div>
      <div>
        <label className="block text-sm mb-1">Rating</label>
        <input type="number" min="1" max="5" className="w-32 border rounded px-3 py-2" {...register('rating', { required: true, min: 1, max: 5 })} />
      </div>
      <button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded bg-blue-600 text-white">
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </motion.form>
  );
}


