import React, { useState } from "react";
import { useTheme } from "../provider/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { theme } = useTheme();

  const faqData = [
    {
      question: "What makes our recommendation system unique?",
      answer: "Our platform uses advanced AI algorithms to provide personalized product recommendations based on user preferences, usage patterns, and community feedback. We focus on quality over quantity, ensuring each recommendation is valuable.",
      icon: "🎯"
    },
    {
      question: "How reliable are the product recommendations?",
      answer: "All recommendations are verified by our community of experts and real users. We maintain strict quality control and authenticity checks to ensure reliable suggestions.",
      icon: "⭐"
    },
    {
      question: "Can I become a product recommender?",
      answer: "Yes! After creating an account and building your profile, you can start contributing recommendations. Higher engagement and quality contributions earn you expert status.",
      icon: "👥"
    },
    {
      question: "How do you ensure recommendation quality?",
      answer: "We use a combination of AI verification, community voting, and expert reviews to maintain high-quality recommendations. Our system also tracks user satisfaction rates.",
      icon: "✅"
    },
    {
      question: "What's the process for disputing recommendations?",
      answer: "Users can report incorrect or misleading recommendations through our dispute resolution system. Our team reviews these cases within 24 hours.",
      icon: "⚖️"
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={`
       py-10 px-4 md:px-0
      ${theme === 'dark' ? 'bg-gray-900' : ''}
      transition-colors duration-300
    `}>
      <div className="max-w-4xl mx-auto">
        <h2 className={`
          text-3xl md:text-4xl font-bold text-center mb-12
          ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
        `}>
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                rounded-xl overflow-hidden
                ${theme === 'dark' 
                  ? 'bg-gray-800 hover:bg-gray-700' 
                  : 'bg-white hover:bg-gray-50'}
                transition-all duration-300
                shadow-lg hover:shadow-xl
              `}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className={`
                  w-full p-6 text-left flex items-center justify-between
                  ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
                `}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{faq.icon}</span>
                  <span className="text-lg font-semibold">{faq.question}</span>
                </div>
                {activeIndex === index ? 
                  <FiMinus className="flex-shrink-0 w-6 h-6" /> : 
                  <FiPlus className="flex-shrink-0 w-6 h-6" />
                }
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`
                      px-6 pb-6 text-lg
                      ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
                    `}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;