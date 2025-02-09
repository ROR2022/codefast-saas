import React from "react";
import ButtonLink from "@/components/ButtonLink";

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="text-green-600 size-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 12.75 6 6 9-13.5"
    />
  </svg>
);

const listBenefits = [
  "Collect customer feedback",
  "Unlimited boards",
  "Admin dashboard",
  "24/7 support",
];

const listFAQ = [
  {
    question: "How does the 14-day free trial work?",
    answer:
      "When you sign up for the 14-day free trial, you get access to all of the Pro plan features. We want to make sure that you are completely satisfied with our product before you buy it.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Yes, you can cancel and upgrade your plan at any time. There are no restrictions or penalties for canceling.",
  },
  {
    question: "Do you offer discounts?",
    answer:
      "Yes, we offer discounts for annual plans. You can save up to 20% by paying annually.",
  },
];

const generateUniqueKey = () => {
  const base = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return [...Array(10)]
    .map(() => base[Math.floor(Math.random() * base.length)])
    .join("");
};

const age = 19;

let canVote;
canVote = age >= 18 ? "Yes" : "No";

console.log(canVote);

export default function Home() {
  return (
    <main>
      {/* HEADER */}
      <section className="bg-base-200">
        <div className="flex justify-between items-center py-2 px-8 max-w-3xl mx-auto">
          <div>CodeFastSaaS</div>
          <div className="space-x-4 max-md:hidden">
            <a className="link link-hover" href="#pricing">Pricing</a>
            <a className="link link-hover" href="#faq">FAQ</a>
          </div>
          <div>
            <ButtonLink linkTo="dashboard" />
          </div>
        </div>
      </section>
      {/* HERO */}
      <section className="text-center py-32 px-8 max-w-3xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-extrabold mb-6">
          Collect customer feedback to build better products
        </h1>
        <div className="opacity-80 mb-16">
          Create a feedback board in minutes, prioritize features, and buil
          products your customers will love.
        </div>
        <ButtonLink linkTo="dashboard" />
      </section>
      {/* PRICING */}
      <section className="bg-base-100 py-16 px-8" id="pricing">
        <div className="py-32 px-8 max-w-3xl mx-auto">
          <p className="text-sm uppercase font-medium text-center text-primary mb-4">
            Pricing
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-center mb-12">
            A pricing that adapts to your needs.
          </h2>
          <div className="p-8 bg-gray-300 max-w-96 rounded-3xl mx-auto mb-8 space-y-6">
            <div className="flex gap-2 items-baseline">
              <p className="text-2xl font-bold text-center">$19</p>
              <p className="text-sm text-center opacity-80 uppercase">/month</p>
            </div>

            <ul className="space-y-2">
              {listBenefits.map((benefit) => (
                <li
                  key={generateUniqueKey()}
                  className="flex items-center gap-2"
                >
                  <CheckIcon />
                  {benefit}
                </li>
              ))}
            </ul>

            <ButtonLink linkTo="dashboard" />
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className="bg-base-200 py-16 px-8" id="faq">
        <div className="py-32 px-8 max-w-3xl mx-auto">
          <p className="text-sm uppercase font-medium text-center text-primary mb-4">
            FAQ
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <ul className="max-w-lg mx-auto">
            {listFAQ.map((faq) => (
              <li key={generateUniqueKey()} className="mb-8">
                <details className="cursor-pointer">
                  <summary className="font-bold">{faq.question}</summary>
                  <p className="opacity-80 mt-2">{faq.answer}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
