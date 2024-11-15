import React from "react";
import { getAllSubscriptions } from "@/server-actions/admin";
import PageTitle from "@/components/page-title";
import SubscriptionsTable from "@/app/admin/subscription/_components/subscriptions-table";

async function SubscriptionPurchased() {
  const subscriptionsResponse = await getAllSubscriptions();
  const subscriptions = subscriptionsResponse.data;
  return (
    <div>
      <PageTitle title={"Subscription Purchased"} />
      <SubscriptionsTable subscription={subscriptions} />
    </div>
  );
}

export default SubscriptionPurchased;
