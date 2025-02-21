# RecoSphere

RecoSphere is a Product Recommendation platform where users can add, view, update, delete queries, and recommend products based on their experiences. It allows users to interact with product recommendations and participate in discussions about product alternatives.

## Application Preview

![RecoSphere Screenshot](https://i.ibb.co.com/cXJTq1LQ/Reco-Sphere.png)
## Live URL

[RecoSphere Live](https://assignment-11-41308.web.app)

## Purpose

RecoSphere aims to provide a seamless experience for users to explore and share product recommendations. It offers features like querying products, adding recommendations, and interacting with other users' suggestions.

## Key Features

- **User Authentication**: Login and registration with email/password or Google Sign-in.
- **Query Management**: Users can add, update, and delete their product queries.
- **Recommendations**: Users can add product recommendations for queries and interact with recommendations from others.
- **Private Routes**: Some routes are restricted to authenticated users only.
- **Responsive Design**: The website is fully responsive, designed to work across mobile, tablet, and desktop devices.
- **Search Functionality**: Users can search for queries based on product names.
- **Theme Toggle**: Switch between light and dark modes for comfortable viewing in any environment.

## Theme Settings

RecoSphere offers a seamless theme switching experience:
- **Light Mode**: Classic, clean interface for daytime viewing
- **Dark Mode**: Eye-friendly dark theme for low-light environments
- **Persistent Theme**: User theme preference is saved locally
- **System Theme Support**: Automatically matches system preferences

## Technology Stack

- **Frontend**: React, Redux (if applicable), React Router, CSS, HTML
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token) for secure user authentication
- **Hosting**: [Firebase](https://www.Firebase.com), [Vercel](https://vercel.com),

## NPM Packages Used

- `express`: Framework for building the backend API
- `mongodb`: MongoDB database client
- `jsonwebtoken`: Used for handling JWT authentication
- `cookie-parser`: Middleware for cookie handling
- `dotenv`: Loads environment variables
- `cors`: Middleware for handling CORS (Cross-Origin Resource Sharing)
- `react-router-dom`: For navigation in React
- `firebase`: For user authentication (if applicable)
- `react-slick`: For implementing the product slider
- Additional npm packages can be added as per project requirements.

 ### dependencies
  {
    "@headlessui/react": "^2.2.0",
    "@react-spring/three": "^9.7.5",
    "aos": "^2.3.4",
    "axios": "^1.7.9",
    "dotenv": "^16.4.7",
    "firebase": "^11.1.0",
    "flowbite": "^2.5.2",
    "framer-motion": "^12.4.2",
    "localforage": "^1.10.0",
    "match-sorter": "^8.0.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hot-toast": "^2.5.1",
    "react-icon": "^1.0.0",
    "react-icons": "^5.4.0",
    "react-router-dom": "^7.1.0",
    "react-tilt": "^1.0.2",
    "sort-by": "^1.2.0",
    "sweetalert2": "^11.16.0",
    "swiper": "^11.1.15"
  },