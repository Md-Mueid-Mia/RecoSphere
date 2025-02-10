// /* eslint-disable react/prop-types */
// import { Link } from 'react-router-dom'

// const Slide = ({ image, text }) => {
//   return (
//     <div
//       className='w-full bg-center bg-cover h-[20rem] md:h-[38rem]'
//       style={{
//         backgroundImage: `url(${image})`,
//       }}
//     >
//       <div className='flex items-center justify-center w-full h-full bg-gray-900/70'>
//         <div className='text-center'>
//           <h1 className='text-xl font-semibold text-white lg:text-2xl p-2'>
//             {text}
//           </h1>
//           <br />
//           <Link
//             to='/queries'
//             className = 'w-5/6 md:w-1/3 btn btn-primary px-5 py-4 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform  rounded-md lg:w-auto'
//           >
//             All Recommendations
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }
export default function Slide({ image, text, theme }) {
  return (
    <div className="relative w-full h-[50vh] md:h-[70vh]">
      <img
        src={image}
        alt={text}
        className="w-full h-full object-cover"
      />
      <div className={`
        absolute inset-0 flex items-center justify-center
        bg-gradient-to-r
        ${theme === 'dark' 
          ? 'from-black/70 to-black/50'
          : 'from-white/70 to-transparent'}
      `}>
        <h2 className={`
          text-2xl md:text-4xl lg:text-5xl font-bold text-center
          max-w-3xl px-6 animate-fade-in
          ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
        `}>
          {text}
        </h2>
      </div>
    </div>
  )
}
// export default Slide
