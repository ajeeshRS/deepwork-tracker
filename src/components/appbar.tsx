"use client";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

export default function Appbar() {
  const { setTheme, theme } = useTheme();

  return (
    <header className="w-full h-20 py-5">
      <nav className="backdrop-blur-3xl w-full flex items-center justify-center text-black space-x-4">
        <h2 className="font-bold dark:text-white">Track IT</h2>
        <div className="w-fit bg-neutral-200 dark:bg-neutral-600 p-1 rounded-full flex items-center space-x-1">
          <Button
            onClick={() => setTheme("light")}
            size="icon"
            className={`rounded-full bg-neutral-100 hover:bg-neutral-50 dark:bg-neutral-800 dark:hover:bg-neutral-900 cursor-pointer`}
          >
            <Sun className="w-6 h-6 text-black dark:text-white" />
          </Button>
          <Button
            onClick={() => setTheme("dark")}
            size="icon"
            className="rounded-full bg-neutral-100 hover:bg-neutral-50 dark:bg-neutral-800 dark:hover:bg-neutral-900 cursor-pointer"
          >
            <Moon className="w-6 h-6 text-black dark:text-white" />
          </Button>
        </div>
      </nav>
    </header>
  );
}
