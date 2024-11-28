"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.back()
  },[router]);
  return <div>Redirecting ....</div>;
}
