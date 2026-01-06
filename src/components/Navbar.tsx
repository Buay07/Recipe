import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
} from "@heroui/react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import logo from "../assets/logo.png";
import ThemeSwitcher from "./ThemeSwitcher";
import "../App.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue.trim()) {
      navigate(`/search/${searchValue}`);
    }
  };

  const cuisineItems = [
    { name: "Thai", flag: "https://flagicons.lipis.dev/flags/4x3/th.svg" },
    { name: "American", flag: "https://flagicons.lipis.dev/flags/4x3/us.svg" },
    { name: "Japanese", flag: "https://flagicons.lipis.dev/flags/4x3/jp.svg" },
    { name: "Mexican", flag: "https://flagicons.lipis.dev/flags/4x3/mx.svg" },
  ];

  return (
    <HeroNavbar
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      maxWidth="2xl"
      className="mb-4"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <RouterLink to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
            <p className="font-bold text-inherit hidden sm:block">Recipes</p>
          </RouterLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link as={RouterLink} color="foreground" to="/allrecipe">
            Recipes
          </Link>
        </NavbarItem>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<FaChevronDown />}
                radius="sm"
                variant="light"
              >
                Cuisines
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Cuisines"
            itemClasses={{
              base: "gap-4",
            }}
          >
            {cuisineItems.map((item) => (
              <DropdownItem
                key={item.name}
                description={`Explore ${item.name} dishes`}
                endContent={
                  <img
                    src={item.flag}
                    alt={item.name}
                    className="w-6 h-4 object-cover rounded"
                  />
                }
              >
                <RouterLink
                  to={`/cuisines/${item.name}`}
                  className="w-full h-full block"
                >
                  {item.name}
                </RouterLink>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <div className="w-64">
            <Input
              variant="bordered"
              placeholder="Search..."
              startContent={<FaSearch size={16} />}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem className="mb-4">
          <Input
            variant="bordered"
            placeholder="Search..."
            startContent={<FaSearch size={16} />}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearch}
          />
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            as={RouterLink}
            className="w-full"
            color="foreground"
            size="lg"
            to="/allrecipe"
          >
            Recipes
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <span className="text-lg font-bold mb-2 block text-default-500">
            Cuisines
          </span>
        </NavbarMenuItem>
        {cuisineItems.map((item) => (
          <NavbarMenuItem key={`${item.name}-mobile`}>
            <Link
              as={RouterLink}
              color="foreground"
              className="w-full flex justify-between items-center"
              to={`/cuisines/${item.name}`}
              size="lg"
            >
              {item.name}
              <img
                src={item.flag}
                alt={item.name}
                className="w-6 h-4 object-cover rounded"
              />
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </HeroNavbar>
  );
};

export default Navbar;
