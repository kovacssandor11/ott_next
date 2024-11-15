import React from "react";
import { IUsersGlobalStore, useUsersGlobalStore } from "@/store/users-store";
import { getDateTimeFormat } from "@/helpers/date-timeformats";

function UserDetails() {
  const { loggedInUserData }: IUsersGlobalStore =
    useUsersGlobalStore() as IUsersGlobalStore;
  if (!loggedInUserData) {
    return null;
  }
  const renderUserProperty = (label: string, value: string) => {
    return (
      <div className="flex flex-col">
        <span className={"font-bold text-sm"}>{label}</span>
        <span className={"text-sm text-gray-600"}>{value}</span>
      </div>
    );
  };
  return (
    <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}>
      {renderUserProperty("ID", loggedInUserData?.id as string)}
      {renderUserProperty("Name", loggedInUserData?.username as string)}
      {renderUserProperty("Email", loggedInUserData?.email as string)}
      {renderUserProperty("Role", loggedInUserData?.isAdmin ? "Admin" : "User")}
      {renderUserProperty(
        "Clerk User Id",
        loggedInUserData?.clerkUserId as string,
      )}
      {renderUserProperty(
        "Created At",
        getDateTimeFormat(loggedInUserData?.createdAt as string),
      )}
    </div>
  );
}

export default UserDetails;
