import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "./Card";
import Navbar from "./Navbar";
import axios from "axios";

const API_KEY = import.meta.env.VITE_SOME_KEY;

const TopListShows = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(parseInt(page) || 1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/tv/top_rated",
          {
            params: {
              api_key: API_KEY,
              include_adult: "true",
              language: "en-US",
              page: currentPage,
            },
          }
        );
        setTrending(response.data.results);
        // console.log(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    navigate(`/top/shows/${newPage}`);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <Navbar />
      <div>
        <h2 className="pt-2 pb-0 text-center font-bold tracking-tight sm:text-4xl ">
          Highest Rated Shows
        </h2>
      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <div className="movie-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 content-between">
            {trending && trending.length > 0 ? (
              trending.map((show) => (
                <Card
                  type="tv"
                  key={show.id}
                  title={show.name}
                  poster={show.poster_path}
                  releaseDate={show.first_air_date}
                  rating={show.vote_average}
                  id={show.id}
                />
              ))
            ) : (
              <p className="col-span-full text-center">No movies found.</p>
            )}
          </div>
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-lg font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TopListShows;
