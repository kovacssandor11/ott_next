import React from "react";
import { Button, message, Modal } from "antd";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { IUsersGlobalStore, useUsersGlobalStore } from "@/store/users-store";
import { a } from "@clerk/clerk-react/dist/useAuth-DT1ot2zi";
import dayjs from "dayjs";
import { createNewSubscription } from "@/server-actions/subscription";

function PaymentModal({
  showPaymentModal,
  setShowPaymentModal,
  plan,
  tenure,
}: {
  showPaymentModal: boolean;
  setShowPaymentModal: (showPaymentModal: boolean) => void;
  plan?: any;
  tenure?: string;
}) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { loggedInUserData }: IUsersGlobalStore = useUsersGlobalStore as a;
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    try {
      setLoading(true);
      event.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://example.com/order/123/complete",
        },
        redirect: "if_required",
      });

      if (result.error) {
        message.error(result.error.message);
      } else {
        message.success("Payment successful!");

        let expiryDate: string;
        if (tenure === "monthly") {
          expiryDate = dayjs().add(1, "month").format("YYYY-MM-DD");
        } else {
          expiryDate = dayjs().add(1, "year").format("YYYY-MM-DD");
        }

        const subscriptionPayload = {
          user: loggedInUserData?.id,
          paymentId: result.paymentIntent.id,
          plan,
          expiryDate,
          isActive: true,
          price:
            tenure === "monthly" ? plan.price.perMonth : plan.price.perYear,
          planName: plan.name,
        };
        const response = await createNewSubscription(subscriptionPayload);
        if (response.success) {
          message.success(response.message);
        } else {
          message.error(response.message);
        }
        setShowPaymentModal(false);
      }
    } catch (err: any) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={showPaymentModal}
      onCancel={() => setShowPaymentModal(false)}
      title={"Complete your subscription purchase"}
      footer={null}
    >
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <AddressElement
          options={{ mode: "billing", allowedCountries: ["US"] }}
        />
        <div className="flex justify-end mt-7 gap-7">
          <Button disabled={loading}>Cancel</Button>
          <Button type={"primary"} htmlType={"submit"} loading={loading}>
            Pay
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default PaymentModal;
