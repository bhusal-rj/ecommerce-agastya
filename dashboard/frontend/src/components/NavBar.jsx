import React from "react";
import NavItem from "./NavItem";
import { TbBorderStyle2 } from "react-icons/tb";
import { RiHome2Line } from "react-icons/ri";
import { RiWechatChannelsFill } from "react-icons/ri";
import { MdAir, MdKey, MdProductionQuantityLimits } from "react-icons/md";
import { useState } from "react";

const navOption = [
  {
    id: 1,
    label: "Dashboard",
    isActive: true,
    path: "/dashboard",
    icon: RiHome2Line,
  },
  {
    id: 2,
    label: "Product",
    isActive: false,
    path: "/products",
    icon: MdProductionQuantityLimits,
  },
  {
    id: 3,
    label: "Orders",
    isActive: false,
    path: "/orders",
    icon: TbBorderStyle2,
  },
  {
    id: 4,
    label: "Channels",
    isActive: false,
    path: "/channels",
    icon: RiWechatChannelsFill,
  },
  {
    id: 5,
    label: "Ask AI",
    isActive: false,
    path: "/ai",
    icon: MdKey,
  },
  {
    id: 6,
    label: "AI Metrics",
    isActive: false,
    path: "/insight",
    icon: MdAir,
  },
];

const NavBar = () => {
  const [navOptions, setNavOptions] = useState(navOption);

  const updateNav = (id) => {
    const updatedNavs = navOptions.map((nav) => ({
      ...nav,
      isActive: nav.id === id,
    }));

    setNavOptions(updatedNavs);
  };

  return (
    <>
      <div className="min-h-screen w-72  flex-col p-5 pt-8 pr-[120px]">
        <div className="flex">
          <img
            src="/agastya.png"
            alt="Agastya Logo"
            className="h-12 w-12 rounded-full border-spacing-1  border border-orange-700"
          />
          <h1 className="text-2xl font-semibold mt-2 text-orange-600 ml-2">
            Agastya
          </h1>
        </div>

        <div>
          {navOptions.map((item) => (
            <NavItem key={item.id} data={item} update={updateNav} />
          ))}
        </div>
      </div>
    </>
  );
};

export default NavBar;
