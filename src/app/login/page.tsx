"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<FormData>();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      const res = await axios.post("http://localhost:3000/login", data);
      console.log("TOKEN:", res.data.token);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Ошибка входа");
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-2xl font-bold mb-4">Вход</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-full max-w-sm"
      >
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="border px-4 py-2 rounded"
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Пароль"
          className="border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Войти
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </main>
  );
}
