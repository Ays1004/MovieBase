import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Card from "./Card";
import axios from "axios";

const API_KEY = import.meta.env.VITE_SOME_KEY;

const Search = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Update searchTerm and trigger search when location state changes
    if (location.state?.searchTerm) {
      setSearchTerm(location.state.searchTerm);
      fetchMovies(location.state.searchTerm);
    }
  }, [location.state]);

  const fetchMovies = async (term) => {
    if (!term) return;
    
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/search/movie",
        {
          params: {
            query: term,
            api_key: API_KEY,
            include_adult: "false",
            language: "en-US",
            page: "1",
            sort_by: "popularity.desc",
          },
        }
      );
      setSearchResult(response.data.results);
    } catch (error) {
      console.error(error);
      setSearchResult([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="">
        <h2 className="pt-2 pb-0 text-center font-bold tracking-tight sm:text-4xl">Search Results for: {searchTerm}</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="movie-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 content-between">
            {searchResult && searchResult.length > 0 ? (
              searchResult.map((movie) => (
                <Card
                  type="movie"
                  key={movie.id}
                  title={movie.title}
                  poster={movie.poster_path}
                  releaseDate={movie.release_date}
                  rating={movie.vote_average}
                  id={movie.id}
                />
              ))
            ) : (
              <p>No movies found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
