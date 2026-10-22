"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initChrome, initPage } from "@/lib/effects";

export default function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    const ac = new AbortController();
    initChrome(ac.signal);
    return () => ac.abort();
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    initPage(ac.signal);
    return () => ac.abort();
  }, [pathname]);

  return null;
}
