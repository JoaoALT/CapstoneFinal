"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export const useAuth = () => {
  return { user: null, userData: null, loading: false, signOut: async () => {} };
};
