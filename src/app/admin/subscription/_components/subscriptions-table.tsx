"use client";
import React from "react";
import { getDateTimeFormat } from "@/helpers/date-timeformats";
import { Table } from "antd";
import { ISubscription } from "@/interfaces/subscription";
import dayjs from "dayjs";

function SubscriptionTable({
  subscription,
}: {
  subscription: ISubscription[];
}) {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (user: any) => user.username,
    },
    {
      title: "Play",
      dataIndex: "planName",
    },
    { title: "Amount", dataIndex: "price" },
    { title: "Payment Id", dataIndex: "paymentId" },
    {
      title: "Purchased On",
      dataIndex: "createdAt",
      render: (createdAt: string) => getDateTimeFormat(createdAt),
    },
    {
      title: "Expiry Data",
      dataIndex: "expiryDate",
      render: (expiryDate: string) => dayjs(expiryDate).format("MMM dd, yyyy"),
    },
  ];
  return <Table columns={columns} dataSource={subscription}></Table>;
}

export default SubscriptionTable;
