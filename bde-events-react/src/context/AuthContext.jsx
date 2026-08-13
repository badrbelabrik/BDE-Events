import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(
        localStorage.getItem("token")
    );
    const [loading, setLoading] = useState(true);

    // Check the current user when the application starts
    useEffect(() => {

        const checkAuth = async () => {

            if (!token) {
                setLoading(false);
                return;
            }

            try {

                const response = await api.get("/user");

                console.log("Current user:", response.data);

                // Adjust this if your API returns user differently
                setUser(response.data.user);

            } catch (error) {

                console.error("Authentication failed:", error);

                localStorage.removeItem("token");
                setToken(null);
                setUser(null);

            } finally {

                setLoading(false);

            }
        };

        checkAuth();

    }, [token]);


    // LOGIN
    const login = async (email, password) => {

        const response = await api.post("/login", {
            email,
            password
        });

        console.log("LOGIN RESPONSE:", response.data);

        const newToken = response.data.token;

        // Save token
        localStorage.setItem("token", newToken);

        // Update React state immediately
        setToken(newToken);
        setUser(response.data.user);

        return response.data;
    };


    // LOGOUT
    const logout = async () => {

        try {

            await api.post("/logout");

        } catch (error) {

            console.error("Logout API error:", error);

        } finally {

            // Remove authentication locally regardless of API response
            localStorage.removeItem("token");

            setToken(null);
            setUser(null);
        }
    };


    const value = {
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {

    return useContext(AuthContext);

}