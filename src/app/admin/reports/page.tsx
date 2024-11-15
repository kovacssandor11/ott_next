import React from "react";
import PageTitle from "@/components/page-title";
import ReportTile from "@/app/admin/reports/_components/report-tile";
import { getReportsForAdmin } from "@/server-actions/admin";
import SubscriptionsTable from "@/app/admin/subscription/_components/subscriptions-table";

async function Reports() {
  const response: any = await getReportsForAdmin();
  if (!response.success) {
    return <div>Error fetching data</div>;
  }
  const {
    totalUsers,
    totalSubscriptions,
    activeSubscriptions,
    totalRevenue,
  }: any = response.data;
  return (
    <div>
      <PageTitle title={"Reports"} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-7">
        <ReportTile
          name={"Total Users"}
          description={"Total number of users"}
          value={totalUsers}
          isCurrency={false}
        />
        <ReportTile
          name={"Total Subscriptions"}
          description={"Total number of subscriptions"}
          value={totalSubscriptions}
          isCurrency={false}
        />
        <ReportTile
          name={"Active Subscriptions"}
          description={"Total number of active subscriptions"}
          value={activeSubscriptions}
          isCurrency={false}
        />
        <ReportTile
          name={"Total Revenue"}
          description={"Total revenue generated"}
          value={totalRevenue.toFixed(2)}
          isCurrency={true}
        />
      </div>

      <div className={"mt-7"}>
        <h1 className="text-sm font-bold">Recently Purchased Subscriptions</h1>
        <SubscriptionsTable
          subscription={response.data.lastFiveSubscriptions}
        />
      </div>
    </div>
  );
}

export default Reports;
