import { useEffect, useState } from "react";
import axios from "axios";
import type { Employee } from "../Types/Type";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AttendancePage() {
    const [user, setUser] = useState<Employee>();
    const [time, setTime] = useState(new Date());
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // ambil user dari API Sanctum
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://127.0.0.1:8000/api/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(res.data);
            } catch (err) {
                console.error("Gagal ambil user", err);
            }
        };

        fetchUser();
    }, []);

    // update jam setiap detik
    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const handleClockIn = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
                "http://127.0.0.1:8000/api/attendance/in",
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setMessage(res.data.message + " (" + res.data.status + ")");
            Swal.fire({
                title: "Absen Masuk Berhasil!",
                icon: "success",
            });
        } catch (err: any) {
            console.error("Error saat absen masuk:", err.response || err);
            setMessage("Gagal absen masuk: " + (err.response?.data?.message || err.message));
        }
    };

    const handleClockOut = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.patch(
                "http://127.0.0.1:8000/api/attendance/out",
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            Swal.fire({
                title: "Absen Keluar Berhasil!",
                icon: "success",
            });
            setMessage(res.data.message + " (" + res.data.status + ")");
        } catch (err: any) {
            console.error("Error saat absen keluar:", err.response || err);
            setMessage("Gagal absen keluar: " + (err.response?.data?.message || err.message));
        }
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "http://127.0.0.1:8000/api/logout",
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            localStorage.removeItem("token"); // hapus token di localStorage
            navigate("/login"); // redirect ke login
        } catch (err: any) {
            console.error("Error saat logout:", err.response || err);
            setMessage("Gagal logout: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 text-center">
                <h2 className="text-xl font-semibold mb-4">
                    Hai, {user ? user.name : "Loading..."}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                    Jam sekarang: {time.toLocaleTimeString("id-ID")}
                </p>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleClockIn}
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                    >
                        Absen Masuk
                    </button>
                    <button
                        onClick={handleClockOut}
                        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        Absen Keluar
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"
                    >
                        Logout
                    </button>
                </div>

                {message && (
                    <p className="mt-4 text-sm text-blue-600 font-medium">{message}</p>
                )}
            </div>
        </div>
    );
}
