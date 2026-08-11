import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await login(email, password);

            console.log("Login successful");
        } catch (error) {
            console.error(error);
            setError("Email ou mot de passe incorrect.");
        }
    };

    return (
        <div>
            <h1>Connexion</h1>

            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Se connecter
                </button>
            </form>
        </div>
    );
}

export default Login;