import { UserButton } from "@clerk/nextjs";
export default function Home() {
  return (
    <div className="flex gap-y-4 flex-col">
      <h1>DashBoard</h1>
      <UserButton
      afterSignOutUrl="/"
      />
    </div>
  );
}
