"use client";
import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import User from "./components/User";
import { IUser } from "./types/user";

export default function Home() {
  const [data, setData] = useState<IUser | null>(null);

  return (
    <div className="flex flex-col items-center justify-between h-dvh">
      <div className="w-full">
        <Header />
        <SearchBar setData={setData} />
        {data ? (
          <User user={data} />
        ) : (
          <p className="text-gray-500 text-center">No user data available.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
