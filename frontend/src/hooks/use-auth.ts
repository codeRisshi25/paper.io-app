"use client"

import { useContext } from "react"
import { AuthContext } from "@/providers/auth-provider"

/**
 * Custom hook to access authentication context throughout the application.
 * Provides login, register, logout functionality and authentication state.
 * 
 * @returns {Object} Authentication methods and state
 * @returns {User|null} user - The current authenticated user or null
 * @returns {Function} login - Function to authenticate a user
 * @returns {Function} register - Function to register a new user
 * @returns {Function} logout - Function to log out the current user
 * @returns {boolean} isLoading - Loading state for auth operations
 * @returns {string|null} error - Error message if auth operation fails
 */
export function useAuth() {
  const context = useContext(AuthContext)
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  return context
}