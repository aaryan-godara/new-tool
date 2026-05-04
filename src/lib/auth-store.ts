// ─── TCC Admin Auth Store ───
// Simple localStorage-based auth with hardcoded credentials

const AUTH_KEY = "tcc_admin_auth";
const AUTH_EVENT = "tcc-auth-update";

// Admin credentials (in production, use a real backend)
const ADMIN_CREDENTIALS = {
  email: "admin@tcc.com",
  password: "tcc@2024",
};

export interface AuthState {
  isLoggedIn: boolean;
  email: string;
  loginTime: number;
}

function emitAuthUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(AUTH_EVENT));
  }
}

export function getAuth(): AuthState {
  if (typeof window === "undefined") return { isLoggedIn: false, email: "", loginTime: 0 };
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return { isLoggedIn: false, email: "", loginTime: 0 };
    const state = JSON.parse(raw) as AuthState;
    // Auto-expire after 24 hours
    if (Date.now() - state.loginTime > 24 * 60 * 60 * 1000) {
      localStorage.removeItem(AUTH_KEY);
      return { isLoggedIn: false, email: "", loginTime: 0 };
    }
    return state;
  } catch {
    return { isLoggedIn: false, email: "", loginTime: 0 };
  }
}

export function login(email: string, password: string): { success: boolean; error?: string } {
  if (email.trim().toLowerCase() !== ADMIN_CREDENTIALS.email) {
    return { success: false, error: "Invalid email address" };
  }
  if (password !== ADMIN_CREDENTIALS.password) {
    return { success: false, error: "Incorrect password" };
  }

  const state: AuthState = {
    isLoggedIn: true,
    email: email.trim().toLowerCase(),
    loginTime: Date.now(),
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(state));
  emitAuthUpdate();
  return { success: true };
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
  emitAuthUpdate();
}

export function onAuthUpdate(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(AUTH_EVENT, callback);
  return () => window.removeEventListener(AUTH_EVENT, callback);
}
