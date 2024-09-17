import { Suspense } from "react";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col relative">
      <Navbar />
      <Suspense fallback={<Loading />}>
        <div className="mt-14 md:mt-16">{children}</div>
      </Suspense>
    </main>
  );
}

export default MainLayout;
