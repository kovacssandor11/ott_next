"use server";

import SubscriptionModel from "@/models/subscription-model";

export const createNewSubscription = async (payload: any) => {
  try {
    await SubscriptionModel.create(payload);
    return {
      success: true,
      message: "Subscription created successfully",
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    };
  }
};

export const getSubscriptionByUserId = async (userId: string) => {
  try {
    const subscription = await SubscriptionModel.findOne({
      user: userId,
      isActive: true,
    });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(subscription)),
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    };
  }
};
