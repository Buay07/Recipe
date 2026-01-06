import { ReactNode } from "react";
import Navbar from "../components/Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {children}
        </div>
      </main>
      <footer className="py-8 text-center bg-primary text-white mt-10">
        <div className="container mx-auto px-4">
          <p className="tracking-wide text-md font-medium">
            Copyright © 2024 - All right reserved by Recipes
          </p>
          <p className="text-white/70 text-sm mt-2 font-serif italic">
            Cooking and share joy no matter your skill level!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
