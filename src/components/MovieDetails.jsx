import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar';
import './css/shadows.css'

const imageURL = 'https://image.tmdb.org/t/p/w500/';
const backdropURL = 'https://image.tmdb.org/t/p/original/';
const logoURL = 'https://image.tmdb.org/t/p/w200/';
const API_KEY = import.meta.env.VITE_SOME_KEY;

const MovieDetails = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [mediaInfo, setMediaInfo] = useState({});
    
    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
                    params: {
                        api_key: API_KEY,
                    }
                });
                setMediaInfo(response.data);
                // console.log(response.data);
            } catch(error) {
                console.error("API call error:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchDetails();
    }, [id])

    const getPopularityColor = (popularity) => {
        if (popularity >= 1000) return 'bg-green-500';
        if (popularity >= 500) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>;
    }

    return (
        <div className="min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${backdropURL + mediaInfo.backdrop_path})` }}>
            <div className="bg-black bg-opacity-75 min-h-screen">
                <Navbar />
                <div className="container mx-auto px-4 py-12">
                    <div className="flex flex-col md:flex-row bg-white bg-opacity-90 rounded-lg shadow-lg overflow-hidden max-w-8xl mx-auto">
                        <div className="md:w-1/3 lg:w-1/4 flex-shrink-0">
                            <div className="aspect-w-2 aspect-h-3">
                                <img
                                    className="w-full h-full object-cover rounded-r-lg shadow-card"
                                    src={imageURL + mediaInfo.poster_path}
                                    alt={mediaInfo.title + ' Poster'}
                                />
                            </div>
                        </div>
                        <div className="md:w-2/3 lg:w-3/4 p-8">
                            <h1 className="text-5xl font-bold text-gray-900 mb-4">{mediaInfo.title}</h1>
                            <p className="text-2xl text-gray-600 mb-6">{mediaInfo.tagline}</p>
                            <div className="flex items-center mb-6">
                                <span className="text-3xl font-semibold text-yellow-500">{mediaInfo.vote_average.toFixed(1)}</span>
                                <span className="ml-2 text-xl text-gray-600">({mediaInfo.vote_count} votes)</span>
                            </div>
                            
                            {/* Popularity Meter */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2">Popularity</h3>
                                <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                                    <div 
                                        className={`h-4 rounded-full ${getPopularityColor(mediaInfo.popularity)}`} 
                                        style={{ width: `${Math.min((mediaInfo.popularity / 1500) * 100, 100)}%` }}
                                    ></div>
                                </div>
                                <p className="mt-1 text-lg">{mediaInfo.popularity.toFixed(2)} points</p>
                            </div>

                            <p className="text-xl text-gray-700 mb-8">{mediaInfo.overview}</p>
                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div>
                                    <h3 className="text-xl font-semibold">Release Date</h3>
                                    <p className="text-lg">{new Date(mediaInfo.release_date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold">Runtime</h3>
                                    <p className="text-lg">{mediaInfo.runtime} minutes</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold">Budget</h3>
                                    <p className="text-lg">${mediaInfo.budget.toLocaleString()}</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold">Revenue</h3>
                                    <p className="text-lg">${mediaInfo.revenue.toLocaleString()}</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold">Original Language</h3>
                                    <p className="text-lg">{mediaInfo.original_language}</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold">Original Title</h3>
                                    <p className="text-lg">{mediaInfo.original_title}</p>
                                </div>
                            </div>
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-3">Genres</h3>
                                <div className="flex flex-wrap gap-2">
                                    {mediaInfo.genres.map(genre => (
                                        <span key={genre.id} className="px-4 py-2 bg-gray-200 rounded-full text-lg">
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold mb-3">Production Companies</h3>
                                    <div className="flex flex-wrap gap-6">
                                        {mediaInfo.production_companies.map(company => (
                                            <div key={company.id} className="flex flex-col items-center w-24">
                                                {company.logo_path ? (
                                                    <img 
                                                        src={logoURL + company.logo_path} 
                                                        alt={company.name + ' Logo'} 
                                                        className="h-12 object-contain mb-2"
                                                    />
                                                ) : (
                                                    <div className="h-12 w-24 bg-gray-200 flex items-center justify-center rounded mb-2">
                                                        <span className="text-sm text-gray-500">No Logo</span>
                                                    </div>
                                                )}
                                                <span className="text-sm text-center">{company.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-3">Production Countries</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {mediaInfo.production_countries.map((country, index) => (
                                            <span key={index} className="px-3 py-2 bg-gray-200 rounded-full text-lg">
                                                {country.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails
