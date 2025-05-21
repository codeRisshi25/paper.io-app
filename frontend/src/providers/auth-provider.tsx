'use client'

import { useRouter } from "next/navigation"; // Changed from next/router
import { ReactNode, createContext, useContext, useEffect, useState } from "react"

const baseUrl = "http://localhost:3000";
type User = { id: string; name: string, email: string };

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Get router instance using the hook

  useEffect(() => {
    fetch(`${baseUrl}/api/auth/me`, { credentials: 'include' })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        setUser(data.user);
        // Only redirect if user exists
        if (data.user) {
          router.replace("/dashboard");
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [router]); // Add router to dependency array

  const clearError = () => {
    setError(null);
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        console.log("User logged in successfully:", data);
        router.replace("/dashboard"); // Use router instance
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError(error instanceof Error ? error.message : 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!name || !email || !password) {
        throw new Error("All fields are required");
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email address");
      }
      
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }
      
      const response = await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include', // Add credentials for cookie handling
      });
      
      if (response.ok) {
        const userData = await response.json();
        if (userData.user) {
          setUser(userData.user);
        } else {
          // Try to fetch user data if not provided in register response
          try {
            const userResponse = await fetch(`${baseUrl}/api/auth/me`, { 
              credentials: 'include' 
            });
            
            if (userResponse.ok) {
              const userProfileData = await userResponse.json();
              setUser(userProfileData.user);
            }
          } catch (error) {
            console.warn('User registered but profile fetch failed');
          }
        }
        
        // Navigate to dashboard after successful registration
        router.replace("/dashboard");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error registering:', error);
      setError(error instanceof Error ? error.message : 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  }

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${baseUrl}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      
      if (response.ok) {
        setUser(null);
        // Navigate after setting user to null
        router.replace("/");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      setError(error instanceof Error ? error.message : 'An error occurred during logout');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ login, register, logout, user, loading, error, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}