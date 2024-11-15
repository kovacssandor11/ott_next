"use servers";

import UserModel from "@/models/user-model";
import SubscriptionModel from "@/models/subscription-model";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;
import { subscription } from "swr/subscription";

export const getAllUsers = async () => {
  try {
    const users = await UserModel.find().select("-password");
    return { success: true, data: JSON.parse(JSON.stringify(users)) };
  } catch (e: any) {
    return {
      success: false,
      message: e.message,
    };
  }
};

export const getAllSubscriptions = async () => {
  try {
    const subscription = await SubscriptionModel.find()
      .populate("user")
      .sort({ createdAt: -1 });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(subscription)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getReportsForAdmin = async () => {
  try {
    const [users, subscriptions] = await Promise.all([
      UserModel.find(),
      SubscriptionModel.find().populate("user").sort({ createdAt: -1 }),
    ]);
    const reportsData = {
      totalUsers: users.length,
      totalSubscriptions: subscriptions.length,
      activeSubscription: subscriptions.filter(
        (subscription) => subscription.isActive,
      ).length,
      totalRevenue: subscriptions.reduce(
        (acc, subscription) => acc + subscription.price,
        0,
      ),
      lastFiveSubscriptions: JSON.parse(
        JSON.stringify(subscriptions.slice(0, 5)),
      ),
    };
    return {
      success: true,
      data: reportsData,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
