import AppBar from "@/components/appbar";
import User from "@/components/user";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden">
      <AppBar />
      <User />
    </div>
  );
}
