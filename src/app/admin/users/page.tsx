import React from "react";
import { getAllUsers } from "@/server-actions/admin";
import PageTitle from "@/components/page-title";
import UsersTable from "@/app/admin/users/_components/users-table";

async function UsersList() {
  const usersResponse = await getAllUsers();
  const users = usersResponse.data;
  return (
    <div>
      <PageTitle title={"Users"} />
      <UsersTable users={users} />
    </div>
  );
}

export default UsersList;
