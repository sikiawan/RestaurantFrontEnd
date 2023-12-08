import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Image, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, DropdownItem, Dropdown, DropdownTrigger, DropdownMenu, Avatar } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo";
import { ChevronDown, Scale, LockIcon, Activity, Flash, Server, TagUser } from "../icons/icons";
import UnstyledLink from "../links/UnstyledLink";
import { useTheme } from "next-themes";
import MoonIcon from "../icons/MoonIcon";
import SunIcon from "../icons/SunIcon";
import { useSession, signIn, signOut } from "next-auth/react"
import axios from "axios";
import toast from "react-hot-toast";
import { debug } from "console";
//import { debug } from "console";

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
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [logo, setLogo] = useState('');

  const getData = (userEmail: string) => {
    axios.get(`https://localhost:7160/api/Permission/GetMenuItems?userEmail=${userEmail}`)
      .then((response) => {
        console.log('get data');
        setMenuItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getLogo = (userEmail: string) => {
    axios.get(`https://localhost:7160/api/Restaurant/GetRestaurantLogo?userEmail=${userEmail}`)
      .then((response) => {
        console.log('get logo');

        console.log(response);
        setLogo(response.data.imageSource);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  interface MenuItem {
    id: number;
    name: string;
    href: string;
    permission?: string;
    parentId?: number;
    subItems?: MenuItem[]; // Adjusted to include subItems as an array of MenuItem
  }

  function buildMenuTree(menuItems: MenuItem[], parentId = 0): MenuItem[] {
    const menuTree: MenuItem[] = [];

    menuItems
      .filter((item) => item.parentId === parentId)
      .forEach((item) => {
        const subItems = buildMenuTree(menuItems, item.id);
        if (subItems.length > 0) {
          item.subItems = subItems;
        }
        menuTree.push(item);
      });

    return menuTree;
  }
  const nestedMenuItems = buildMenuTree(menuItems);

  useEffect(() => {
    const userEmail = session?.user?.userEmail;
    if (userEmail) {
      getData(userEmail);
      getLogo(userEmail);
    }
  }, [session]);
  // var menuItems : MenuItem[] = [
  //   {
  //     name: "Home",
  //     href: "/",
  //     permission : "Permissions.Home.View",
  //   },
  //   {
  //     name: "Menu",
  //     href: "/",
  //     permission : "Permissions.Home.View",
  //     subItems: [
  //       {
  //         name: "Dashboard",
  //         href: "/dashboard",
  //         permission : "Permissions.DB.View",
  //       },
  //       {
  //         name: "Restaurants",
  //         href: "/restaurant",
  //         permission : "Permissions.Rest.View",
  //       },
  //       {
  //         name: "Client Preference",
  //         href: "/clientpreference",
  //         permission : "Permissions.CP.View",
  //       },
  //       {
  //         name: "Users",
  //         href: "/users",
  //         permission : "Permissions.Users.View",
  //       },
  //     ],
  //   },
  //   {
  //     name: "Dashboard",
  //     href: "/dashboard",
  //     permission : "Permissions.DB.View",
  //     subItems: [
  //       {
  //         name: "Admin Home",
  //         href: "/",
  //         permission : "Permissions.DB.View",
  //       },
  //       {
  //         name: "Admin Dashboard",
  //         href: "/",
  //         permission : "Permissions.DB.View",
  //       },
  //     ],
  //   },
  // ];
  // const permissionsString = session?.user.permissions;
  // if (permissionsString) {
  //   const permissionsArray = permissionsString.split(',');

  //   // Recursive function to filter menu items and subitems
  //   const filterMenuItems = (items: MenuItem[]): MenuItem[] => {
  //     return items.filter(item => {
  //       if (item.permission && !permissionsArray.includes(item.permission)) {
  //         return false; // Exclude the item if it has a permission and it's not in permissionsArray
  //       }
  //       if (item.subItems) {
  //         // Recursively filter subItems
  //         item.subItems = filterMenuItems(item.subItems);
  //       }
  //       return true;
  //     });
  //   };

  //   // Filter menu items and subItems based on permissionsArray
  //   menuItems = filterMenuItems(menuItems);
  // }


  return (
    <>
      {status === "authenticated" && (
        <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
            />
            <NavbarBrand>
              <Image
                width={50}
                height={50}
                radius='none'
                alt='NextUI hero Image'
                src={logo}
                className="lg:w-12 lg:h-12 md:w-10 md:h-10 sm:w-16 sm:h-16"
              />
              {/* <p className="font-bold text-inherit">ACME</p> */}
            </NavbarBrand>
          </NavbarContent>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            {nestedMenuItems.map((item, index) => (
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
            <div>
            </div>
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
                      src='https://localhost:7160/Image/mine234629318.jpg'
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <p className="font-semibold">Signed in as</p>
                      <p className="font-semibold">{session?.user?.userEmail}</p>
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
            {nestedMenuItems.map((item, index) => (
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
