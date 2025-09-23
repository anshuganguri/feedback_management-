import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  FiUser, 
  FiMail, 
  FiLock, 
  FiSun, 
  FiMoon, 
  FiBell,
  FiShield,
  FiSave,
  FiEye,
  FiEyeOff
} from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import { validateEmail, validatePassword } from '../utils/helpers';
import Layout from '../components/Layout';
import toast from 'react-hot-toast';

export default function Settings() {
  const { user, theme, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors, isSubmitting: isSubmittingProfile },
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    }
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    watch: watchPassword,
    reset: resetPassword,
    formState: { errors: passwordErrors, isSubmitting: isSubmittingPassword },
  } = useForm();

  const newPassword = watchPassword('newPassword');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'security', label: 'Security', icon: FiShield },
    { id: 'preferences', label: 'Preferences', icon: FiBell },
  ];

  const onSubmitProfile = async (data) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch({ type: 'UPDATE_PROFILE', payload: data });
      toast.success('Profile updated successfully!');
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update profile. Please try again.' });
      toast.error('Failed to update profile. Please try again.');
    }
  };

  const onSubmitPassword = async (data) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would validate the current password with the server
      toast.success('Password updated successfully!');
      resetPassword();
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    } catch (error) {
      toast.error('Failed to update password. Please try again.');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
    toast.success(`Switched to ${theme === 'light' ? 'dark' : 'light'} mode`);
  };

  const handleNotificationToggle = (type) => {
    toast.success(`${type} notifications toggled`);
  };

  const handleExportData = () => {
    toast.success('Data export feature would be implemented here');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast.error('Account deletion feature would be implemented here');
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Profile Information
            </h2>
            
            <form onSubmit={handleSubmitProfile(onSubmitProfile)} className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Profile Picture
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    JPG, GIF or PNG. 1MB max.
                  </p>
                  <button
                    type="button"
                    onClick={() => toast.info('Photo upload feature would be implemented here')}
                    className="mt-2 btn-secondary text-sm"
                  >
                    Change Avatar
                  </button>
                </div>
              </div>

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...registerProfile('name', {
                      required: 'Name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters'
                      }
                    })}
                    type="text"
                    className="input-field pl-10"
                    placeholder="Enter your full name"
                  />
                </div>
                {profileErrors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {profileErrors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...registerProfile('email', {
                      required: 'Email is required',
                      validate: value => validateEmail(value) || 'Please enter a valid email address'
                    })}
                    type="email"
                    className="input-field pl-10"
                    placeholder="Enter your email address"
                  />
                </div>
                {profileErrors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {profileErrors.email.message}
                  </p>
                )}
              </div>

              {/* Bio Field */}
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bio (Optional)
                </label>
                <textarea
                  {...registerProfile('bio')}
                  rows={3}
                  className="input-field resize-none"
                  placeholder="Tell us a little about yourself..."
                />
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmittingProfile}
                  className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiSave className="w-4 h-4" />
                  <span>{isSubmittingProfile ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            {/* Change Password */}
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Change Password
              </h2>
              
              <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-6">
                {/* Current Password */}
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...registerPassword('currentPassword', {
                        required: 'Current password is required'
                      })}
                      type={showCurrentPassword ? 'text' : 'password'}
                      className="input-field pl-10 pr-10"
                      placeholder="Enter your current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showCurrentPassword ? (
                        <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {passwordErrors.currentPassword && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {passwordErrors.currentPassword.message}
                    </p>
                  )}
                </div>

                {/* New Password */}
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...registerPassword('newPassword', {
                        required: 'New password is required',
                        validate: value => validatePassword(value) || 'Password must be at least 6 characters'
                      })}
                      type={showNewPassword ? 'text' : 'password'}
                      className="input-field pl-10 pr-10"
                      placeholder="Enter your new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showNewPassword ? (
                        <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {passwordErrors.newPassword && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {passwordErrors.newPassword.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...registerPassword('confirmPassword', {
                        required: 'Please confirm your new password',
                        validate: value => value === newPassword || 'Passwords do not match'
                      })}
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="input-field pl-10 pr-10"
                      placeholder="Confirm your new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {passwordErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {passwordErrors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmittingPassword}
                    className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiSave className="w-4 h-4" />
                    <span>{isSubmittingPassword ? 'Updating...' : 'Update Password'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Account Actions */}
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Account Actions
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Export Data</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Download all your feedback and account data
                    </p>
                  </div>
                  <button
                    onClick={handleExportData}
                    className="btn-secondary"
                  >
                    Export
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20">
                  <div>
                    <h3 className="font-medium text-red-900 dark:text-red-300">Delete Account</h3>
                    <p className="text-sm text-red-600 dark:text-red-400">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <button
                    onClick={handleDeleteAccount}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div className="space-y-6">
            {/* Theme Settings */}
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Appearance
              </h2>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center space-x-3">
                  {theme === 'light' ? (
                    <FiSun className="w-6 h-6 text-yellow-500" />
                  ) : (
                    <FiMoon className="w-6 h-6 text-blue-500" />
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Theme
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Current: {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleTheme}
                  className="btn-secondary flex items-center space-x-2"
                >
                  {theme === 'light' ? <FiMoon className="w-4 h-4" /> : <FiSun className="w-4 h-4" />}
                  <span>Switch to {theme === 'light' ? 'Dark' : 'Light'}</span>
                </button>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Notifications
              </h2>
              
              <div className="space-y-4">
                {[
                  { id: 'email', label: 'Email Notifications', description: 'Receive updates via email' },
                  { id: 'push', label: 'Push Notifications', description: 'Browser push notifications' },
                  { id: 'feedback', label: 'Feedback Updates', description: 'Notifications when feedback status changes' },
                  { id: 'marketing', label: 'Marketing Emails', description: 'Product updates and newsletters' },
                ].map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FiBell className="w-5 h-5 text-gray-400" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {notification.label}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {notification.description}
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={notification.id !== 'marketing'}
                        onChange={() => handleNotificationToggle(notification.label)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}