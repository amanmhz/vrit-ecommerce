'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser, fetchUserDetails, clearError, decodeToken } from '@/store/slices/authSlice';
import { showToast } from '@/store/slices/toastSlice';
import Link from 'next/link';
import ShopHeader from '@/components/ShopHeader';
import { RootState } from '@/store/store';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error, isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleSearch = (searchQuery: string) => {
    router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(showToast({ message: 'Logging in...', type: 'loading' }));
    
    const result = await dispatch(loginUser({ username, password }));
    
    if (loginUser.fulfilled.match(result)) {
      const token = result.payload.token;
      const decoded = decodeToken(token);
      const userId = decoded?.sub;
      
      if (userId) {
        await dispatch(fetchUserDetails(userId));
      }
      dispatch(showToast({ message: 'Login successful!', type: 'success' }));
      router.push('/');
    } else {
      dispatch(showToast({ message: error || 'Login failed', type: 'error' }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ShopHeader onSearch={handleSearch} />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 p-4 text-center">E-Commerce</h2>
          <h2 className="text-sm text-gray-600 mb-6 text-center">Login to your account to continue</h2>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="text-gray-600 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder=""
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-gray-600  w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder=""
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/login" className="text-gray-900 hover:text-gray-700 font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
