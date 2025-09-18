import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        alert(`Register:\nNama: ${name}\nEmail: ${email}\nAlamat: ${address}\nPassword: ${password}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Register Page
                </h2>

                {/* Nama */}
                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">Nama</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Masukkan nama"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Masukkan email"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    />
                </div>

                {/* Alamat */}
                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">Alamat</label>
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Masukkan alamat"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    ></textarea>
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label className="block text-gray-600 mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Masukkan password"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    />
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleRegister}
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                    >
                        Register
                    </button>

                    <Link
                        to="/login"
                        className="w-full bg-gray-700 text-white py-2 text-center rounded-lg hover:bg-gray-800 transition"
                    >
                        Kembali ke Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
