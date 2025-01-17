import { useEffect, useState } from 'react';
import Card from './Card';
import Navbar from './Navbar';
import axios from 'axios';


const API_KEY = import.meta.env.VITE_SOME_KEY;


const Home = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
        setLoading(true);
      try {
        setLoading(true);
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular?', {
          params: {
            api_key: API_KEY,
            include_adult: 'false',
            language: 'en-US',
            page: '1'
          }
        });
        setTrending(response.data.results); // Fix the property to 'results'
        // console.log(response.data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const getPopularityColor = (popularity) => {
    if (popularity >= 1000) return 'bg-green-500';
    if (popularity >= 500) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div>
      <Navbar ></Navbar>
      <div >
      <h2 className="pt-2 pb-0 text-center font-bold tracking-tight sm:text-4xl">Trending🔥 </h2>
      </div>
      {loading ? (
          <p>Loading...</p>  // Display loading state if loading is true
        ) : (
          <div className="movie-grid grid grid-cols-5 content-between">
            {trending && trending.length > 0 ? (
              trending.map((movie) => (
                <Card
                  type="movie"
                  key={movie.id}
                  title={movie.title}
                  poster={movie.poster_path}
                  releaseDate={movie.release_date}
                  rating={movie.vote_average}
                  id={movie.id}
                  popularity={movie.popularity}
                  popularityColor={getPopularityColor(movie.popularity)}
                />
              ))
            ) : (
              <p>No movies found.</p>  // Message if no movies are available
            )}
          </div>
        )}
        <div>
          
        </div>
    </div>
  );
};

export default Home;
