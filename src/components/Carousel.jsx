

import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import { EffectCube, Autoplay, Pagination } from 'swiper/modules';
import { useTheme } from '../provider/ThemeProvider';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800",
    title: "Find Your Perfect Match",
    subtitle: "Browse thousands of verified product recommendations",
    link: "/products"
  },
  {
    image: "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=800",
    title: "Expert Reviews",
    subtitle: "Get insights from real users and experts",
    link: "/reviews"
  },
  {
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800",
    title: "Share Your Experience",
    subtitle: "Help others make informed decisions",
    link: "/share"
  }
];

export default function Carousel() {
  const { theme } = useTheme();

  return (
    <div className={`
      relative min-h-[350px] flex items-center justify-center
      ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}
      overflow-hidden py-10 md:py-20
    `}>
      <div className="absolute inset-0 z-0">
        <div className={`
          absolute inset-0 
          
        `}></div>
      </div>

      <Swiper
        effect={'cube'}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectCube, Autoplay, Pagination]}
        className="w-full max-w-7xl aspect-[16/9]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full group">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`
                absolute inset-0 flex flex-col items-center justify-center
                ${theme === 'dark' 
                  ? 'bg-gradient-to-t from-black/80 via-black/60 to-transparent' 
                  : 'bg-gradient-to-t from-white/80 via-white/60 to-transparent'}
              `}>
                <h2 className={`
                  text-3xl md:text-5xl font-bold text-center mb-4
                  transform transition-all duration-700
                  ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
                `}>
                  {slide.title}
                </h2>
                <p className={`
                  text-lg md:text-xl text-center max-w-2xl px-6 mb-8
                  ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
                `}>
                  {slide.subtitle}
                </p>
                <Link
                  to={slide.link}
                  className={`
                    px-8 py-3 rounded-full font-semibold
                    transform transition-all duration-300 hover:scale-105
                    ${theme === 'dark' 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white'}
                  `}
                >
                  Explore Now
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}