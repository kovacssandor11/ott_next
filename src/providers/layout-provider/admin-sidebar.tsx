import React from "react";
import { Drawer, message } from "antd";
import { DollarSign, GitGraph, Home, LogOut, User2, Video } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

function AdminSidebar({
  showAdminSidebar,
  setShowAdminSidebar,
}: {
  showAdminSidebar: boolean;
  setShowAdminSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const iconsSize = 16;
  const router = useRouter();
  const pathName = usePathname();
  const { signOut } = useAuth();

  const onLogout = async () => {
    try {
      await signOut();
      message.success("Logged out successfully");
      router.push("/sign-in");
    } catch (e) {
      message.error(e.message);
    }
  };

  const menuItems = [
    {
      name: "Home",
      icon: <Home size={iconsSize} />,
      onClick: () => router.push("/"),
      isActive: pathName === "/",
    },
    {
      name: "Users",
      icon: <User2 size={iconsSize} />,
      onClick: () => router.push("/admin/users"),
      isActive: pathName === "/admin/users",
    },
    {
      name: "Shows",
      icon: <Video size={iconsSize} />,
      onClick: () => router.push("/admin/shows"),
      isActive: pathName.includes("/admin/show"),
    },
    {
      name: "Subscriptions",
      icon: <DollarSign size={iconsSize} />,
      onClick: () => router.push("/admin/subscriptions"),
      isActive: pathName === "/admin/subscriptions",
    },
    {
      name: "Reports",
      icon: <GitGraph size={iconsSize} />,
      onClick: () => router.push("/admin/reports"),
      isActive: pathName === "/admin/reports",
    },
    {
      name: "Logout",
      icon: <LogOut size={iconsSize} />,
      onClick: () => onLogout(),
    },
  ];

  return (
    <Drawer
      open={showAdminSidebar}
      onClose={() => setShowAdminSidebar(false)}
      title={"SHEY OTT - Admin Panel"}
    >
      <div className="flex flex-col gap-10 mt-10 cursor-pointer">
        {menuItems.map((item) => (
          <div
            className={`flex gap-3 p-3 items-center ${item.isActive ? "bg-black text-white rounded p-2" : ""} `}
            onClick={() => {
              item.onClick();
              setShowAdminSidebar(false);
            }}
            key={item.name}
          >
            {item.icon}
            <span className="text-sm">{item.name}</span>
          </div>
        ))}
      </div>
    </Drawer>
  );
}

export default AdminSidebar;
