"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { convertToSubcurrency } from "@/lib/utils";
import { toast } from "sonner";
import { updateUserSubscription, getCurrentUser } from "@/services/user";

const CheckoutPage = ({ amount }: { amount: number }) => {
  const [currentUser, setCurrentUser] = useState<UserType>({
    id: 0,
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    credits: 0,
    isPremium: false,
    paymentIntentId: "",
  });
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user?.data);
    };

    getUser();
  }, []);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setPaymentIntentId(data.paymentIntentId);
      });
  }, [amount]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveSubscription = async (paymentIntentId: any, userEmail: string) => {
    try {
      const result = await updateUserSubscription(paymentIntentId, userEmail);
      // if user is not subscribed yet
      if (result?.data === "user subscribed successfully") {
        // then update isPremium property of user
        toast(
          <p className="text-sm text-green-500 font-bold">
            Subscribed successfully
          </p>
        );
      } else {
        toast(
          <p className="text-sm text-yellow-500 font-bold">
            User already subscribed
          </p>
        );
      }
    } catch {
      toast(
        <p className="text-sm text-red-500 font-bold">
          Internal error occured while saving the payment info
        </p>
      );
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    console.log("saving payment info to database...");
    await saveSubscription(paymentIntentId, currentUser?.email);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `https://meowgic.vercel.app/payment-success?amount=${amount}`, // update this once hosted
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      setErrorMessage(error.message);
    } else {
      // The payment UI automatically closes with a success animation.
      // Your customer is redirected to your `return_url`.
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {clientSecret && <PaymentElement />}

      {errorMessage && <div>{errorMessage}</div>}

      <button
        disabled={!stripe || loading}
        className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay $${amount}` : "Processing..."}
      </button>
    </form>
  );
};

export default CheckoutPage;
