import TimerComponent from "@/components/timer";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center md:p-0 p-5">
      <TimerComponent />
    </div>
  );
}
