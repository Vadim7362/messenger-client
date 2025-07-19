"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuthRedirect } from "@/src/hooks/useAuthRedirect";

type User = {
  id: number;
  username: string;
  email: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useAuthRedirect();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    axios
      .get("http://localhost:3000/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Ошибка получения профиля", err))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) return <p>Загрузка...</p>;
  if (!user) return <p>Пользователь не найден или не авторизован</p>;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-2xl font-bold mb-2">Профиль</h1>
      <p>Имя: {user.username}</p>
      <p>Email: {user.email}</p>
      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Выйти
      </button>
    </main>
  );
}
