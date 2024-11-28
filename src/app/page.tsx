"use client";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("adminpanel/dashboard");
    }
    else{
        router.push('adminpanel/login')
    }
  },[router]);
  return <div className={styles.page}>
    Redirecting.....
  </div>;
}
