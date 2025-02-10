import { motion } from 'framer-motion';
import { FiCheck, FiStar, FiAward, FiTrendingUp } from 'react-icons/fi';
import { useTheme } from '../../provider/ThemeProvider';

const Services = () => {
  const { theme } = useTheme();

  const services = [
    {
      title: "Basic Recommendations",
      price: "Free",
      features: [
        "5 recommendations per month",
        "Basic AI insights",
        "Community access",
        "Email support"
      ],
      icon: <FiStar className="text-4xl" />,
      gradient: "from-blue-400 to-cyan-400"
    },
    {
      title: "Pro Recommender",
      price: "$9.99",
      features: [
        "Unlimited recommendations",
        "Advanced AI analysis",
        "Priority support",
        "Custom insights"
      ],
      icon: <FiAward className="text-4xl" />,
      gradient: "from-purple-400 to-pink-400",
      popular: true
    },
    {
      title: "Enterprise Solutions",
      price: "Custom",
      features: [
        "Dedicated account manager",
        "Custom API access",
        "24/7 priority support",
        "Advanced analytics"
      ],
      icon: <FiTrendingUp className="text-4xl" />,
      gradient: "from-orange-400 to-red-400"
    }
  ];

  return (
    <div className={`
      min-h-screen py-10 px-4 md:px-0
      ${theme === 'dark' ? 'bg-gray-900' : ''}
      transition-all duration-300
    `}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className={`
            text-4xl md:text-5xl font-bold mb-6
            ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
          `}>
            Choose Your Perfect Plan
          </h1>
          <p className={`
            text-xl max-w-3xl mx-auto
            ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
          `}>
            Get access to AI-powered product recommendations tailored to your needs
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`
                relative p-8 rounded-2xl
                ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
                shadow-xl hover:shadow-2xl
                transform hover:-translate-y-2 transition-all duration-300
                ${service.popular ? 'ring-2 ring-blue-500' : ''}
              `}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                    Most Popular
                  </span>
                </div>
              )}

              <div className={`
                inline-block p-4 rounded-2xl mb-6
                bg-gradient-to-r ${service.gradient}
              `}>
                {service.icon}
              </div>

              <h3 className={`
                text-2xl font-bold mb-4
                ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
              `}>
                {service.title}
              </h3>

              <div className={`
                text-3xl font-bold mb-6
                ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
              `}>
                {service.price}
                {service.price !== "Custom" && (
                  <span className="text-base font-normal opacity-60">/month</span>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <FiCheck className={`
                      ${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'}
                    `} />
                    <span className={`
                      ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
                    `}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button className={`
                w-full py-3 px-6 rounded-lg font-medium
                transform transition-all duration-300 hover:scale-105
                ${theme === 'dark' 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'}
              `}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`
            text-center p-12 rounded-3xl
            ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
            shadow-lg
          `}
        >
          <h2 className={`
            text-2xl md:text-3xl font-bold mb-4
            ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
          `}>
            Need a Custom Solution?
          </h2>
          <p className={`
            mb-6 max-w-2xl mx-auto
            ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
          `}>
            Contact our team for enterprise-grade solutions tailored to your specific needs
          </p>
          <button className={`
            px-8 py-3 rounded-lg font-medium
            ${theme === 'dark' 
              ? 'bg-white text-gray-900 hover:bg-gray-100'
              : 'bg-gray-900 text-white hover:bg-gray-800'}
            transform hover:scale-105 transition-all duration-300
          `}>
            Contact Sales
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;