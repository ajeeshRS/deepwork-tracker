import { Sun } from "lucide-react";
import { Button } from "./ui/button";

export default function Appbar() {
  return (
    <header className="w-full h-20 py-5">
      <nav className="backdrop-blur-3xl w-full flex items-center justify-center text-black space-x-4">
        <h2 className="font-bold">Track IT</h2>
        <Button
          size="icon"
          className="rounded-lg bg-neutral-100 hover:bg-neutral-50 cursor-pointer"
        >
          <Sun className="w-6 h-6 text-black" />
        </Button>
      </nav>
    </header>
  );
}
