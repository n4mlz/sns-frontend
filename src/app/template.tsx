"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

import AnnouncementDialog from "@/components/handle/announcementDialog";
import NetworkErrorDialog from "@/components/handle/networkErrorDialog";

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
};

export default function Template({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  return (
    <motion.div
      className="site-wrapper"
      key={pathName}
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{
        type: "linear",
        duration: 0.25,
      }}>
      <AnnouncementDialog />
      <NetworkErrorDialog />
      {children}
    </motion.div>
  );
}
