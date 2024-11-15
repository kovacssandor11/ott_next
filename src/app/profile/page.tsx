import { Tabs } from "antd";
import UserDetails from "@/app/profile/_components/user-details";
import SubscriptionDetails from "@/app/profile/_components/subscription-details";
import PageTitle from "@/components/page-title";

export default function Page() {
  return (
    <div>
      <PageTitle title={"Profile"} />
      <Tabs defaultActiveKey={"1"}>
        <Tabs.TabPane tab={"User Details"} key={"1"}>
          <UserDetails />
        </Tabs.TabPane>
        <Tabs.TabPane tab={"Subscription Details"} key={"2"}>
          <SubscriptionDetails />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
