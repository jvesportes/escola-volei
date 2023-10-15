"use client";

import { useEffect, useState } from "react";
import { NavigationSidebar } from "../navigation/navigation-sidebar";

export const SidebarProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return <></>;
};
