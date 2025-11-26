import { createContext, useState } from "react";
 
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token")|| null);
    const [loading, setLoading] = useState(false);

    async function login(username, password) {
        setLoading (true);
        try {
            const response = await fetch ("https://fakestoreapi.com/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            if (!response.ok) {
                throw new Error ("Credenciais inválidas");
            }
            const data = await response.json();
            setToken (data.token);
            localStorage.setItem("token", data.token);
            setUser({ username });
        } catch (error) {
            console.error (error);
            throw error;
        } finally {
            setLoading(false);
        }
    }
    return(
        <AuthContext.Provider value={{ user, token, login, logout, loading, isAuthenticated: boleana(token) }}>
            {children}
        </AuthContext.Provider>
    )
}