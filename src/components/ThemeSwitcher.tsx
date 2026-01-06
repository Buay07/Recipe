import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Button } from "@heroui/react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Button
      isIconOnly
      variant="light"
      radius="full"
      onPress={toggleTheme}
      className="text-default-500 hover:text-primary transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <FaSun size={20} className="animate-in fade-in zoom-in duration-300" />
      ) : (
        <FaMoon size={20} className="animate-in fade-in zoom-in duration-300" />
      )}
    </Button>
  );
};

export default ThemeSwitcher;
