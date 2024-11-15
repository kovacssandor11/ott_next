"use client";
import React from "react";
import Header from "@/providers/layout-provider/header";
import { getCurrentUserFromMongoDB } from "@/server-actions/users";
import { message } from "antd";
import { usePathname } from "next/navigation";
import { IUsersGlobalStore, useUsersGlobalStore } from "@/store/users-store";
import Spinner from "@/components/spinner";
import { getSubscriptionByUserId } from "@/server-actions/subscription";
import { isAdmin } from "@firebase/util";

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const isAuthRoute =
    pathName.includes("/sign-in") || pathName.includes("/sign-up");
  const isAdminRoute = pathName.includes("/admin");
  const { loggedInUserData, setLoggedInUserData }: IUsersGlobalStore =
    useUsersGlobalStore();
  const [loading, setLoading] = React.useState<boolean>(false);

  const getLoggedInUser = async () => {
    try {
      setLoading(true);
      const response = await getCurrentUserFromMongoDB();
      if (response.success) {
        const userSubscription = await getSubscriptionByUserId(
          response.data._id,
        );
        if (userSubscription.success) {
          response.data.currentSubscription = userSubscription.data;
        }
        setLoggedInUserData(response.data);
      }
      setLoggedInUserData(response.data);
    } catch (e: any) {
      message.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (!isAuthRoute && !loggedInUserData) {
      getLoggedInUser().catch(console.error);
    }
  }, [pathName]);

  if (isAuthRoute) {
    return <div>{children}</div>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (loggedInUserData && !loggedInUserData.isAdmin && isAdminRoute) {
    return (
      <div>
        <Header loggedInUser={loggedInUserData!} />
        <div className={"mt-7 test-sm p-5"}>
          You are not authorized to access this page
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header loggedInUser={loggedInUserData!} />
      <div className="p-5"> {children} </div>
    </div>
  );
}
