import React from "react";
import { Link } from 'react-router-dom';
import '../components/css/shadows.css';

const imageURL = 'https://image.tmdb.org/t/p/w500/';

const Card = ({title, poster, releaseDate, rating, id, type, popularity, popularityColor}) => {
  return (
    <div className="shadow-card-hover p-4 m-7 bg-white rounded-lg">
      <Link to={`/${type}/${id}`}>
        <img
          className="w-full h-auto rounded-lg mb-4 shadow-card2"
          src={imageURL+poster}
          alt={title}
        />
        <h2 className="text-xl font-bold mb-2 text-gray-900">{title}</h2>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">{releaseDate}</span>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {rating}/10
          </span>
        </div>
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 my-10 rounded-full ${popularityColor}`} 
              style={{ width: `${Math.min((popularity / 1500) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
