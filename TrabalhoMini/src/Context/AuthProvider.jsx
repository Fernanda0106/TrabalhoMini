import React, {useState } from "react";

export default function AuthProvider({ children }) {
    const AuthContext = React.createContext();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function login(username, password) {
        setLoading(true);
        try {
            const response = await fetch("https://fakestoreapi.com/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            if (!response.ok) {
                throw new Error("Credenciais inválidas");
            }
            const data = await response.json();
            setToken(data.token);
            localStorage.setItem("token", data.token);
            setUser({ username });
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message); // Adiciona mensagem de erro ao estado
            throw error;
        } finally {
            setLoading(false);
        }
    }

    function logout() {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                loading,
                isAuthenticated: !!token,
                errorMessage,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}