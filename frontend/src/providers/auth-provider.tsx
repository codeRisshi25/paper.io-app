'use client'

import { useRouter } from "next/navigation";
import { ReactNode, createContext, useContext, useEffect, useState } from "react"

const baseUrl = "http://localhost:3000";
const USER_STORAGE_KEY = "paperio_user";

type User = { id: string; name: string, email: string , image: string , createdAt : string , bio : string | null , stats : { published: number , drafts: number , views : number } } | null; 

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
  const router = useRouter();

  const updateUser = (userData: User | null) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  };

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (err) {
      console.error("Failed to parse stored user data");
    }

    // Then verify with the server (but don't block UI rendering)
    fetch(`${baseUrl}/api/auth/me`, { credentials: 'include' })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(userData => {
        // Update localStorage with fresh data from server
        updateUser(userData);
        if (userData && window.location.pathname === '/auth/login') {
          router.replace("/dashboard");
        }
      })
      .catch(() => {
        // If server check fails, clear stored user data
        updateUser(null);
      })
      .finally(() => setLoading(false));
  }, [router]);

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
        updateUser(data.user);
        router.replace("/dashboard");
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
      
      // Validation logic remains the same...
      
      const response = await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include',
      });
      
      if (response.ok) {
        const userData = await response.json();
        if (userData.user) {
          updateUser(userData.user);
        } else {
          // Try to fetch user data if not provided in register response
          try {
            const userResponse = await fetch(`${baseUrl}/api/auth/me`, { 
              credentials: 'include' 
            });
            
            if (userResponse.ok) {
              const userProfileData = await userResponse.json();
              updateUser(userProfileData.user);
            }
          } catch (error) {
            console.warn('User registered but profile fetch failed');
          }
        }
        
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
        updateUser(null);
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

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}