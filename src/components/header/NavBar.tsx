import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Image, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, DropdownItem, Dropdown, DropdownTrigger, DropdownMenu, Avatar, Select, SelectItem } from "@nextui-org/react";
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
import { LangDropDown } from "@/constants/constants";
import { useRouter } from "next/router";
import Jwt from 'jsonwebtoken';

//import { debug } from "console";

export default function App() {
  const {locale }= useRouter();
  const route = useRouter();
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
        setLogo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  interface MenuItem {
    id: number;
    name: string;
    localizedName: string;
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
  const handleLogin = async () => {
    if (window.confirm('Are you sure to Loing from this user !') === true) {
      try {
          debugger;
          const fetchResponse = await fetch(`https://localhost:7160/api/Auth/AuthenticateById?id=${session?.user.saId}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
          });

          if (!fetchResponse.ok) {
              throw new Error(`Request failed with status: ${fetchResponse.status}`);
          }

          const resp = await fetchResponse.json();
          const json = Jwt.decode(resp.message) as { [key: string]: string };
          console.log(json);
          signIn("credentials", {
              email: json['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
              name: json['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
              role: json['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
              permission: json['permission'],
              saId : json['saId'],
              redirect: false,
          }).then(() => {
              route.push('/');
          });
      } catch (error) {
          console.error('Fetch error:');
      }
    }}
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
                          {/* {(() => {
                            switch (route.locale) {
                              case 'en':
                                return item.name;
                              case 'ar':
                                return item.arabicName;
                              default:
                                return item.name;
                            }
                          })()} */}
                          {locale === 'en' ? item.name : item.localizedName}
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
                            {locale === 'en' ? subItem.name : subItem.localizedName}
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
                      {locale === 'en' ? item.name : item.localizedName}
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
              <select
                value={locale}
                onChange={(e) => {
                  route.push('', undefined, {
                    locale: e.target.value,
                  }).then(() => {
                    //route.reload();
                  });
                }}
              >
                {LangDropDown.map((op) => (
                  <option value={op.value} key={op.id}>
                    {op.label}
                  </option>
                ))}
              </select>

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
                  <DropdownMenu disabledKeys={["hidden"]} aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <p className="font-semibold">Signed in as</p>
                      <p className="font-semibold">{session?.user?.userEmail}</p>
                    </DropdownItem>
                    <DropdownItem key="settings">Settings</DropdownItem>
                    <DropdownItem onClick={() => signOut()} key="logout" color="danger">
                      Log Out
                    </DropdownItem>
                    {session.user.saId !== "0" ? (
                      <DropdownItem onClick={() => handleLogin()} key="logout" color="success">
                        Impersonate
                      </DropdownItem>
                    ) : <DropdownItem key="hidden"></DropdownItem>}
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
                          {locale === 'en' ? item.name : item.localizedName}
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
                            {locale === 'en' ? subItem.name : subItem.localizedName}
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
                      {locale === 'en' ? item.name : item.localizedName}
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


