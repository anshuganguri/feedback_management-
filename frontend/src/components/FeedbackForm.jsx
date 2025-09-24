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




import React, { useState } from "react";
import { useForm } from "react-hook-form";

const categories = ["Bug", "Feature", "UI", "Other"];

function StarRating({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          className={
            star <= value
              ? "text-yellow-400"
              : "text-gray-300"
          }
          onClick={() => onChange(star)}
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.174 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

export default function FeedbackForm({ onSubmit, isSubmitting }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const rating = watch("rating", 0);

  return (
    <form onSubmit={handleSubmit(data => { onSubmit(data, reset); })} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          {...register("name", { required: "Name is required" })}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
          placeholder="Your name"
        />
        {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
              message: "Invalid email address",
            },
          })}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
          placeholder="you@email.com"
        />
        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Rating</label>
        <StarRating value={rating} onChange={val => setValue("rating", val)} />
        <input type="hidden" {...register("rating", { required: "Rating required", min: 1 })} />
        {errors.rating && <span className="text-red-500 text-xs">{errors.rating.message}</span>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          {...register("category", { required: "Category required" })}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
        >
          <option value="">Select category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && <span className="text-red-500 text-xs">{errors.category.message}</span>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Comment</label>
        <textarea
          {...register("comment", { required: "Comment required" })}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
          rows={4}
          placeholder="Describe your feedback..."
        />
        {errors.comment && <span className="text-red-500 text-xs">{errors.comment.message}</span>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit Feedback"}
      </button>
    </form>
  );
}


