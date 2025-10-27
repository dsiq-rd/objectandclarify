"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
    setLoading(false); // ✅ tell app we’ve finished checking
  }, []);

  const login = async (email: string, password: string) => {
    if (email === "demo@clarify.com" && password === "password") {
      const newUser = { name: "Demo User", email };
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
      toast.success("Welcome back 👋");
      router.push("/main/dashboard");
      return true;
    } else {
      toast.error("Invalid credentials. Try demo@clarify.com / password");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast("Signed out successfully");
    router.push("/signin");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
