"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type User = {
  id: number;
  username: string;
  email: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
  if (loading) return <p>Загрузка...</p>;
  if (!user) return <p>Пользователь не найден или не авторизован</p>;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-2xl font-bold mb-2">Профиль</h1>
      <p>Имя: {user.username}</p>
      <p>Email: {user.email}</p>
    </main>
  );
}
