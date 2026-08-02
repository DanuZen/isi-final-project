"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminFakultasBebasPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin-fakultas/dashboard");
  }, [router]);

  return null;
}
