"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isLogin ? "login" : "register";

    try {
      const res = await axios.post(`http://localhost:3000/${url}`, form);
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
        router.push("/profile");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(
          "Ошибка: " +
            (err.response?.data?.error || "Не удалось авторизоваться")
        );
      } else {
        alert("Неизвестная ошибка");
      }
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Вход" : "Регистрация"}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Имя пользователя"
              className="border p-2 rounded"
              required
            />
          )}

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded"
            required
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Пароль"
            className="border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
          >
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 hover:underline text-sm mt-4 block text-center"
        >
          {isLogin ? "Зарегистрироваться" : "Войти"}
        </button>
      </div>
    </main>
  );
}
