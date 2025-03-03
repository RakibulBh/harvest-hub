import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SubscriptionCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  iconType: "view" | "create";
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  iconType,
}) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md flex flex-col justify-between">
      <div>
        <div className="mb-6">
          {iconType === "view" ? (
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-600"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
          ) : (
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-600"
              >
                <path d="M12 5v14"></path>
                <path d="M5 12h14"></path>
              </svg>
            </div>
          )}
        </div>
        <h2 className="text-2xl font-bold mb-3 text-gray-800">{title}</h2>
        <p className="text-gray-600 mb-8">{description}</p>
      </div>
      <Link
        href={buttonLink}
        className="flex items-center text-green-600 font-medium group"
      >
        {buttonText}
        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};

const SubscriptionSection: React.FC = () => {
  return (
    <section className="bg-green-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Choose your subscription. Get organized.
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <SubscriptionCard
            title="View subscription packages"
            description="Browse our selection of pre-designed subscription packages with different features and benefits to find the one that fits your needs."
            buttonText="View packages"
            buttonLink="/packages"
            iconType="view"
          />

          <SubscriptionCard
            title="Create your own package"
            description="Build a custom subscription package that's tailored to your specific requirements and only pay for the features you actually need."
            buttonText="Create custom package"
            buttonLink="/custom"
            iconType="create"
          />
        </div>

        <div className="text-center mt-12">
          <Link
            href="/trial"
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Start your free trial <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSection;
