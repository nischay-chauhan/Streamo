import { UserButton } from "@clerk/nextjs";
import { Results, ResultSkeleton } from "./_components/result";
import { Suspense } from "react";
export default function Home() {
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback = {<ResultSkeleton />}>
      <Results />
      </Suspense>
    </div>
  );
}
