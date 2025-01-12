"use client";

import CheckoutPage from "./_components/CheckoutPage";
import { convertToSubcurrency } from "@/lib/utils";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const UpgradePage = () => {
  const amount = 49.99;

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-primary to-dark-100">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Subscribe to Premium</h1>
        <p className="text-sm text-gray-400">
          Enjoy 100 logo creation with faster waiting time.
        </p>
        <h2 className="text-2xl">
          only for
          <span className="font-bold"> ${amount}</span>
        </h2>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </main>
  );
};

export default UpgradePage;
