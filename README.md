<img width="1919" height="966" alt="image" src="https://github.com/user-attachments/assets/68147598-b793-4e9f-b47c-03455a9cdc4f" />

# 📘 Dokumentasi Frontend AttendanceApp

## 1. Persiapan Lingkungan

Pastikan sudah terinstall:

* **Node.js** (v16+)
* **npm** atau **yarn**
* **Git**

Clone project FE (buat folder kosong dulu untuk frontend):

```bash
git clone https://github.com/bagasriatmaputera/attendanceApp.git attendanceAppBE
cd attendanceAppBE
```

> **Catatan:** Repo di atas adalah **Backend**. Untuk **Frontend**, buat project baru dengan Vite React.

---

## 2. Inisialisasi Project FE

Buat project baru dengan **Vite + React**:

```bash
npm create vite@latest attendanceAppFE
cd attendanceAppFE
```

Pilih:

* Framework: `React`
* Variant: `JavaScript` (atau TypeScript jika ingin)

---

## 3. Install Dependency

Install library yang dibutuhkan:

```bash
npm install react-router-dom axios sweetalert2
```

Jika menggunakan Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Atur `tailwind.config.js`:

```js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Tambahkan ke `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 4. Struktur Project

```
attendanceAppFE/
├── src/
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── AttendancePage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── api.js   // konfigurasi axios
└── ...
```

---

## 5. Konfigurasi Axios

Buat file `src/api.js`:

```js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // ganti dengan URL BE
  headers: {
    "Content-Type": "application/json",
  },
});

// auto tambah token kalau ada
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

---

## 6. Routing Utama

Edit `src/App.jsx`:

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AttendancePage from "./pages/AttendancePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

## 7. Contoh Login Page

`src/pages/LoginPage.jsx`

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    try {
      const res = await api.post("/login", form);
      localStorage.setItem("token", res.data.token);
      Swal.fire("Berhasil", "Login sukses!", "success");
      navigate("/attendance");
    } catch (err) {
      Swal.fire("Gagal", err.response?.data?.message || "Login gagal", "error");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </div>
  );
}
```

---

## 8. Contoh Attendance Page

`src/pages/AttendancePage.jsx`

```jsx
import { useState, useEffect } from "react";
import api from "../api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AttendancePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    api.get("/user")
      .then((res) => setUser(res.data))
      .catch(() => navigate("/login"));
  }, [navigate]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const clockIn = async () => {
    try {
      const res = await api.post("/attendance/in");
      Swal.fire("Berhasil", res.data.message, "success");
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Gagal absen masuk", "error");
    }
  };

  const clockOut = async () => {
    try {
      const res = await api.patch("/attendance/out");
      Swal.fire("Berhasil", res.data.message, "success");
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Gagal absen keluar", "error");
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout");
      localStorage.removeItem("token");
      Swal.fire("Logout", "Anda berhasil logout", "success");
      navigate("/login");
    } catch {
      Swal.fire("Error", "Logout gagal", "error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-6 rounded shadow w-96 text-center">
        <h2 className="text-xl font-bold mb-2">
          Hai, {user ? user.name : "Loading..."}
        </h2>
        <p className="mb-4">Jam sekarang: {time.toLocaleTimeString("id-ID")}</p>

        <button
          onClick={clockIn}
          className="w-full bg-green-500 text-white p-2 mb-2 rounded hover:bg-green-600"
        >
          Absen Masuk
        </button>
        <button
          onClick={clockOut}
          className="w-full bg-red-500 text-white p-2 mb-2 rounded hover:bg-red-600"
        >
          Absen Keluar
        </button>
        <button
          onClick={logout}
          className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
```

---

## 9. Integrasi dengan Backend

* API **Backend Laravel**: [attendanceApp Backend](https://github.com/bagasriatmaputera/attendanceApp.git)
* Endpoint yang digunakan FE:

  * `POST /api/login` → login user
  * `POST /api/register` → registrasi
  * `POST /api/logout` → logout
  * `GET /api/user` → ambil data user login
  * `POST /api/attendance/in` → absen masuk
  * `PATCH /api/attendance/out` → absen keluar

---

## 10. Jalankan Project

Jalankan frontend:

```bash
npm run dev
```

Buka: `http://localhost:5173`

Jalankan backend (Laravel):

```bash
php artisan serve
```

Buka: `http://127.0.0.1:8000`

