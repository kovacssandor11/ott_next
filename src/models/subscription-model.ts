import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    plan: {
      type: Object,
      required: true,
    },
    expiryDate: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    price: {
      type: Number,
      required: true,
    },
    planeName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

if (mongoose.models && mongoose.models["subscriptions"]) {
  delete mongoose.models["subscriptions"];
}

const SubscriptionModel = mongoose.model("subscriptions", subscriptionSchema);
export default SubscriptionModel;
