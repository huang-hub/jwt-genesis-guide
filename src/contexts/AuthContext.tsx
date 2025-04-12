
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in on mount
    const storedToken = localStorage.getItem('jwt-token');
    
    if (storedToken) {
      // Validate token and get user info
      validateToken(storedToken)
        .then(userData => {
          setUser(userData);
          setToken(storedToken);
        })
        .catch(() => {
          // If token is invalid, remove it
          localStorage.removeItem('jwt-token');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  // Mock function to validate token (replace with actual JWT validation)
  const validateToken = async (token: string): Promise<User> => {
    // In a real app, you would decode and validate the JWT here
    // For demo, we'll just return mock user data
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if token format is valid (this is just for demo)
        if (token && token.length > 10) {
          resolve({
            id: '1',
            name: 'Demo User',
            email: 'user@example.com'
          });
        } else {
          reject(new Error('Invalid token'));
        }
      }, 500);
    });
  };

  const login = async (email: string, password: string): Promise<void> => {
    // Implement your JWT login logic here
    // For demo purposes, we're using a mock response
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock validation (replace with actual API call)
        if (email && password.length >= 6) {
          // Mock successful login
          const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkRlbW8gVXNlciIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.fake-signature';
          const mockUser = {
            id: '1',
            name: 'Demo User',
            email: email
          };
          
          // Save token to localStorage
          localStorage.setItem('jwt-token', mockToken);
          
          // Update context
          setToken(mockToken);
          setUser(mockUser);
          
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    // Implement your JWT registration logic here
    // For demo purposes, we're using a mock response
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock validation (replace with actual API call)
        if (name && email && password.length >= 8) {
          // Mock successful registration
          const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwibmFtZSI6IkRlbW8gVXNlciIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.fake-signature';
          const mockUser = {
            id: '2',
            name: name,
            email: email
          };
          
          // Save token to localStorage
          localStorage.setItem('jwt-token', mockToken);
          
          // Update context
          setToken(mockToken);
          setUser(mockUser);
          
          resolve();
        } else {
          reject(new Error('Invalid registration data'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('jwt-token');
    setUser(null);
    setToken(null);
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
