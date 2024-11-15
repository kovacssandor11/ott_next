"use client";
import React from "react";
import { IUser } from "@/interfaces/users";
import { Button, Table } from "antd";
import { getDateTimeFormat } from "@/helpers/date-timeformats";

function UsersTable({ users }: { users: IUser[] }) {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "UserId",
      dataIndex: "_id",
    },
    {
      title: "Role",
      dataIndex: "isAdmin",
      render: (isAdmin: boolean) => (isAdmin ? "Admin" : "User"),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (createdAt: string) => getDateTimeFormat(createdAt),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => <Button size={"small"}>Subscriptions</Button>,
    },
  ];

  return <Table dataSource={users} columns={columns} />;
}

export default UsersTable;
