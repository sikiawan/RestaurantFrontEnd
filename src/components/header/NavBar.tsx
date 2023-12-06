import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, DropdownItem, Dropdown, DropdownTrigger, DropdownMenu, Avatar } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo";
import { ChevronDown, Scale, LockIcon, Activity, Flash, Server, TagUser } from "../icons/icons";
import UnstyledLink from "../links/UnstyledLink";
import { useTheme } from "next-themes";
import MoonIcon from "../icons/MoonIcon";
import SunIcon from "../icons/SunIcon";
import { useSession, signIn, signOut } from "next-auth/react"

export default function App() {
  const { resolvedTheme, theme, setTheme } = useTheme();
  const { data: session } = useSession()
  const { status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    scale: <Scale className="text-warning" fill="currentColor" size={30} />,
    lock: <LockIcon className="text-success" fill="currentColor" size={30} />,
    activity: <Activity className="text-secondary" fill="currentColor" size={30} />,
    flash: <Flash className="text-primary" fill="currentColor" size={30} />,
    server: <Server className="text-success" fill="currentColor" size={30} />,
    user: <TagUser className="text-danger" fill="currentColor" size={30} />,
  };
  const menuItems = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Menu",
      href: "/",
      subItems: [
        {
          name: "Dashboard",
          href: "/dashboard",
        },
        {
          name: "Restaurants",
          href: "/restaurant",
        },
        {
          name: "Client Preference",
          href: "/clientpreference",
        },
        {
          name: "Users",
          href: "/users",
        },
      ],
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      subItems: [
        {
          name: "Admin Home",
          href: "/",
        },
        {
          name: "Admin Dashboard",
          href: "/",
        },
      ],
    },
  ];

  return (
    <>
    {status === "authenticated" &&(
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <React.Fragment key={`${item}-${index}`}>
            {item.subItems ? (
              <Dropdown>
                <NavbarItem>
                  <DropdownTrigger>
                    <Button
                      disableRipple
                      className="font-primary flex-1 text-[16px] font-semibold"
                      endContent={icons.chevron}
                      radius="sm"
                      variant="light"
                    >
                      {item.name}
                    </Button>
                  </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu
                  aria-label={`Submenu for ${item.name}`}
                  className="w-[150px]"
                  itemClasses={{
                    base: "gap-4",
                  }}
                >
                  {item.subItems.map((subItem, subIndex) => (
                    <DropdownItem key={`${subItem}-${subIndex}`}>
                      <UnstyledLink
                        href={subItem.href}
                        openNewTab={false}
                        className={'font-primary w-full flex-1 text-[16px] font-semibold'}
                      >
                        {subItem.name}
                      </UnstyledLink>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            ) : (
              <NavbarItem onClick={() => setIsMenuOpen(false)}>
                <UnstyledLink
                  href={item.href}
                  openNewTab={false}
                  className={'font-primary flex-1 text-[16px] font-semibold'}
                >
                  {item.name}
                </UnstyledLink>
              </NavbarItem>
            )}
          </React.Fragment>
        ))}
      </NavbarContent>
      <NavbarContent as='div' justify="end">
        <button
          onClick={() => {
            setTheme(resolvedTheme === "light" ? "dark" : "light");
          }}
          type='button'
          className='rounded-md hover:bg-gray-200 dark:hover:bg-gray-700'>
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </button>
      </NavbarContent>
      {session && (
        <>
          <NavbarContent as="div" justify="end">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="/user.png"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{session?.user?.email}</p>
                </DropdownItem>
                <DropdownItem key="settings">Settings</DropdownItem>
                <DropdownItem onClick={() => signOut()} key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        </>
      )}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <React.Fragment key={`${item}-${index}`}>
            {item.subItems ? (
              <Dropdown>
                <NavbarMenuItem>
                  <DropdownTrigger>
                    <Button
                      disableRipple
                      className="font-primary flex-1 text-[16px] font-semibold"
                      endContent={icons.chevron}
                      radius="sm"
                      variant="light"
                    >
                      {item.name}
                    </Button>
                  </DropdownTrigger>
                </NavbarMenuItem>
                <DropdownMenu
                  aria-label={`Submenu for ${item.name}`}
                  className="w-[150px]"
                  itemClasses={{
                    base: "gap-4",
                  }}
                >
                  {item.subItems.map((subItem, subIndex) => (
                    <DropdownItem key={`${subItem}-${subIndex}`}>
                      <UnstyledLink
                        href={subItem.href}
                        openNewTab={false}
                        className={'font-primary w-full flex-1 text-[16px] font-semibold'}
                        onClick={() => { setIsMenuOpen(false) }}
                      >
                        {subItem.name}
                      </UnstyledLink>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            ) : (
              <NavbarMenuItem onClick={() => setIsMenuOpen(false)}>
                <UnstyledLink
                  href={item.href}
                  openNewTab={false}
                  className={'font-primary flex-1 text-[16px] font-semibold'}
                >
                  {item.name}
                </UnstyledLink>
              </NavbarMenuItem>
            )}
          </React.Fragment>
        ))}
      </NavbarMenu>
    </Navbar>
    )}
    </>
  );
}
