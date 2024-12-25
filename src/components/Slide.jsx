/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

const Slide = ({ image, text }) => {
  return (
    <div
      className='w-full bg-center bg-cover h-[38rem]'
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className='flex items-center justify-center w-full h-full bg-gray-900/70'>
        <div className='text-center'>
          <h1 className='text-xl font-semibold text-white lg:text-2xl'>
            {text}
          </h1>
          <br />
          <Link
            to='/queries'
            className='w-full btn btn-primary px-5 py-4 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform  rounded-md lg:w-auto'
          >
            All Recommendations
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Slide
