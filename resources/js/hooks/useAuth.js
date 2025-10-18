import { useState, useEffect } from "react";
import axios from "../lib/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const expiry = localStorage.getItem('expiry');
        const now = new Date().getTime();

        if (token && expiry && now < parseInt(expiry)) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get('/api/user')
                .then(res => setUser(res.data))
                .catch(() => {
                    localStorage.clear();
                    setUser(null);
                });
        } else {
            localStorage.clear();
        }
    }, []);

    const login = async (data) => {
        setIsLoading(true);
        setError("");

        try {
            await axios.get("/sanctum/csrf-cookie");
            const res = await axios.post("/api/login", data);

            if (res.data.user) {
                setUser(res.data.user);
                const now = new Date();
                const expiry = now.getTime() + 8 * 60 * 60 * 1000;

                localStorage.setItem("expiry", expiry);
                localStorage.setItem("token", res.data.token);

                Swal.fire("Welcome!", "Login successful", "success");
                window.location.reload();
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
            setIsLoading(false);
        }
    };

    const logout = async () => {
        Swal.fire({
            title: "Logout",
            text: "Are you sure you want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setIsLoading(true);
                    await axios.post("/api/logout");
                    localStorage.clear();
                    setUser(null);
                    Swal.fire("Logged out!", "You have been logged out.", "success");
                    navigate("/");
                } catch (err) {
                    Swal.fire("Error", "Logout failed", "error");
                } finally {
                    setIsLoading(false);
                }
            }
        });
    };

    return {
        user,
        isLoading,
        error,
        login,
        logout
    };
}
