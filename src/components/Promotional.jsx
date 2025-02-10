import { motion } from 'framer-motion';
import { useTheme } from '../provider/ThemeProvider';
import { FiUsers, FiStar, FiAward, FiTrendingUp } from 'react-icons/fi';

const Promotional = () => {
  const { theme } = useTheme();

  const stats = [
    { icon: <FiUsers />, count: '10K+', label: 'Active Users' },
    { icon: <FiStar />, count: '50K+', label: 'Reviews' },
    { icon: <FiAward />, count: '99%', label: 'Satisfaction' },
    { icon: <FiTrendingUp />, count: '24/7', label: 'Support' }
  ];

  return (
    <div className={`
      min-h-screen py-10 px-4 md:px-0
      ${theme === 'dark' ? 'bg-gray-900 text-white' : ' text-gray-900'}
    `}>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Make Better Product Decisions
          </h1>
          <p className="text-xl md:text-2xl opacity-80 max-w-3xl mx-auto">
            Join thousands of users making informed decisions with our AI-powered recommendation platform
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`
                p-6 rounded-2xl text-center
                ${theme === 'dark' 
                  ? 'bg-gray-800 hover:bg-gray-700' 
                  : 'bg-white hover:bg-gray-100'}
                transform hover:scale-105 transition-all duration-300
                shadow-lg hover:shadow-xl
              `}
            >
              <span className="text-3xl text-blue-500 mb-4 inline-block">
                {stat.icon}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{stat.count}</h3>
              <p className="opacity-70">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "AI-Powered Insights",
              description: "Get personalized recommendations based on your preferences and usage patterns",
              gradient: "from-blue-500 to-cyan-500"
            },
            {
              title: "Community Driven",
              description: "Join a thriving community of users sharing their experiences and insights",
              gradient: "from-purple-500 to-pink-500"
            },
            {
              title: "Real-time Updates",
              description: "Stay informed with the latest product recommendations and reviews",
              gradient: "from-orange-500 to-red-500"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`
                p-8 rounded-2xl
                ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
                shadow-lg hover:shadow-xl
                transform hover:-translate-y-2 transition-all duration-300
              `}
            >
              <div className={`
                text-4xl mb-6 bg-gradient-to-r ${feature.gradient} 
                bg-clip-text text-transparent font-bold
              `}>
                {feature.title}
              </div>
              <p className="text-lg opacity-80">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className={`
            text-center p-12 rounded-3xl
            bg-gradient-to-r from-blue-600 to-purple-600
            transform hover:scale-[1.02] transition-all duration-300
          `}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make Better Decisions?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join our platform today and get access to thousands of verified product recommendations
          </p>
          <button className={`
            px-8 py-4 rounded-full text-lg font-semibold
            ${theme === 'dark' 
              ? 'bg-white text-gray-900 hover:bg-gray-100' 
              : 'bg-gray-900 text-white hover:bg-gray-800'}
            transform hover:scale-105 transition-all duration-300
          `}>
            Get Started Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Promotional;