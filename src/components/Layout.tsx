import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export const Layout = () => {
  return (
    <section className="flex min-w-screen max-w-5xl min-h-screen">
      <div className="flex grow flex-col">
        <nav className="sticky top-0">
          <Navbar />
        </nav>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </section>
  );
};
