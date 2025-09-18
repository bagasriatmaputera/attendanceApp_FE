import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // handle input
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // login karyawan
    const handleLogin = async () => {
        try {
            setLoading(true);
            setError("");
            const res = await axios.post("http://127.0.0.1:8000/api/login", form);
            localStorage.setItem("token", res.data.token);
            navigate("/attendance");
        } catch (err) {
            setError("Login gagal, cek email dan password!");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                {error && (
                    <div className="bg-red-100 text-red-600 p-2 rounded mb-3 text-center">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                        placeholder="Masukkan email"
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-1 text-sm font-medium">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                        placeholder="Masukkan password"
                    />
                </div>

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                >
                    {loading ? "Loading..." : "Login"}
                </button>

                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => navigate("/register")}
                        className="text-sm text-blue-500 hover:underline"
                    >
                        Register
                    </button>
                    <Link to={'http://127.0.0.1:8000/admin/attendances'}>
                        <button
                            className="text-sm text-red-500 hover:underline"
                        >
                            Login as Admin
                        </button>
                    </Link>

                </div>
            </div>
        </div>
    );
}
