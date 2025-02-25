import React from "react";
import { LogOut, User2, Video } from "lucide-react";
import { IUser } from "@/interfaces/users";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { message } from "antd";
import AdminSidebar from "@/providers/layout-provider/admin-sidebar";

function Header({ loggedInUser }: { loggedInUser: IUser }) {
  const [showAdminSidebar, setShowAdminSidebar] = React.useState(false);
  const { signOut } = useAuth();
  const router = useRouter();
  const onUserClick = () => {
    if (loggedInUser.isAdmin) {
      setShowAdminSidebar(!showAdminSidebar);
    } else {
      router.push("/profile");
    }
  };

  const onLogout = async () => {
    try {
      await signOut();
      message.success("Logged out successfully");
      router.push("/sign-in");
    } catch (e) {
      message.error(e.message);
    }
  };

  return (
    <div
      className={"p-5 bg-black text-white flex justify-between items-center"}
    >
      <h1
        className="flex font-bold gap-2 text-2xl items-center cursor-pointer"
        onClick={() => router.push("/")}
      >
        SHEY <Video className={"text-orange-500"} /> OTT
      </h1>

      <div
        className="flex gap-3 items-center cursor-pointer text-blue-300"
        onClick={onUserClick}
      >
        <User2 className={"text-blue-300"} size={16}></User2>
        <span className="text-sm uppercase">
          {loggedInUser?.username}
          {loggedInUser?.isAdmin && "(Admin)"}
        </span>

        {!loggedInUser?.isAdmin && (
          <LogOut className={"nl-10"} onClick={onLogout} />
        )}
      </div>

      {showAdminSidebar && (
        <AdminSidebar
          setShowAdminSidebar={setShowAdminSidebar}
          showAdminSidebar={showAdminSidebar}
        />
      )}
    </div>
  );
}

export default Header;
