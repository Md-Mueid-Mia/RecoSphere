import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { useTheme } from '../provider/ThemeProvider';

const Reviews = () => {
  const { theme } = useTheme();

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Product Manager",
      image: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      review: "This platform has transformed how we make product decisions. The AI recommendations are spot-on!",
      date: "March 15, 2024"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Tech Lead",
      image: "https://i.pravatar.cc/150?img=2",
      rating: 5,
      review: "Incredible insights and user-friendly interface. Makes decision-making a breeze!",
      date: "March 14, 2024"
    },
    {
      id: 3,
      name: "Emma Watson",
      role: "UX Designer",
      image: "https://i.pravatar.cc/150?img=3",
      rating: 4,
      review: "The visual analytics and recommendation engine are game-changers for our team.",
      date: "March 13, 2024"
    },
    {
      id: 4,
      name: "David Miller",
      role: "Startup Founder",
      image: "https://i.pravatar.cc/150?img=4",
      rating: 5,
      review: "Best decision support tool we've used. The ROI has been phenomenal!",
      date: "March 12, 2024"
    }
  ];

  return (
    <div className={` py-10 px-4 md:px-8 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : ' text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            What Our Users Say
          </h2>
          <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what professionals around the world think about our platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="flex items-center mb-4">
                <img 
                  src={review.image} 
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                />
                <div className="ml-4">
                  <h3 className="font-semibold">{review.name}</h3>
                  <p className="text-sm opacity-75">{review.role}</p>
                </div>
              </div>

              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>

              <p className={`mb-4 text-sm leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                "{review.review}"
              </p>

              <p className="text-xs opacity-50">{review.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;