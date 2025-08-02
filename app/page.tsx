"use client"
import Navbar from "@/components/navbar/navbar";
import Tab from "@/components/tab/Tab";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <SessionProvider>
      <div >
        <Navbar />
        <Tab />
      </div>
    </SessionProvider>
  );
}
