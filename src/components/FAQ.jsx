import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "What is this platform about?",
      answer:
        "This platform is a Product Recommendation System designed to help users find alternatives to various products. Users can create queries, explore recommendations, and contribute their own recommendations for products.",
    },
    {
      question: "How can I add a query about a product?",
      answer:
        "To add a query, log in to your account and navigate to the 'Add Queries' section. Fill out the form with the product details and submit it. Your query will be available for others to view and respond to.",
    },
    {
      question: "Can I update or delete my queries?",
      answer:
        "Yes, you can update or delete any of your queries. Go to the 'My Queries' section, select the query you want to edit or delete, and follow the instructions provided.",
    },
    {
        question: "How can I view recommendations for products?",
        answer:
          "Visit the 'Queries' section to view alternative recommendations for various products. Click on any query to explore the details and see user-submitted recommendations.",
      },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className=" bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row">
        {/* FAQ Section */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">FAQ</h1>
          <p className="text-gray-600 mb-6">
            Got questions? We’ve got answers. Explore the frequently asked
            questions below.
          </p>
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-300 mb-4"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center py-4 text-left font-semibold text-lg focus:outline-none"
              >
                {item.question}
                <span>
                  {activeIndex === index ? "▲" : "▼"}
                </span>
              </button>
              {activeIndex === index && (
                <div className="p-4 text-gray-600">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Image Section */}
        <div className="flex-1 flex items-center justify-center mt-8 md:mt-0">
          <img
            src="https://i.ibb.co.com/3yBYWPm/happy-young-man-using-laptop-computer-removebg-preview.png"
            alt="FAQ illustration"
            className="rounded-md "
          />
        </div>
      </div>
    </div>
  );
};

export default FAQ;
