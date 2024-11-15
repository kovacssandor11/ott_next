export const subscriptionPlans = [
  {
    name: "Basic",
    features: [
      "Basic streaming",
      "Single device support",
      "Standard video quality",
    ],
    price: { perMonth: 9.99, perYear: 99.99 },
    maximumDevices: 1,
  },
  {
    name: "Standard",
    features: ["HD streaming", "Multiple device support", "Offline viewing"],
    price: { perMonth: 14.99, perYear: 149.99 },
    maximumDevices: 3,
  },
  {
    name: "Family",
    features: [
      "4K streaming",
      "Up to 5 devices",
      "Parental controls",
      "Offline viewing",
    ],
    price: { perMonth: 19.99, perYear: 199.99 },
    maximumDevices: 5,
  },
];
