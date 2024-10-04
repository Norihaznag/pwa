import React from "react";
import { Clock, DollarSign, CreditCard } from "lucide-react";

const ServiceCard = ({ title, description, Icon }:any) => {
  return (
    <div className="bg-white border-black border-2  p-6 transition-all duration-300 hover:shadow-lg ">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

const ServiceSection = () => {
  return (
    <section className="container mx-auto py-12 ">
      <h2 className="text-3xl font-bold text-center mb-8">Services Ta3na</h2>
      <div className="grid gap-6 md:grid-cols-3 px-[5%]">
        <ServiceCard
          title="Fast Delivery"
          description="Hot meals at your door in 30 minutes or less"
          Icon={Clock}
        />
        <ServiceCard
          title="Budget-Friendly Menu"
          description="Great taste without breaking the bank"
          Icon={DollarSign}
        />
        <ServiceCard
          title="Cash on Delivery"
          description="Pay only when your food arrives"
          Icon={CreditCard}
        />
      </div>
    </section>
  );
};

export default ServiceSection;