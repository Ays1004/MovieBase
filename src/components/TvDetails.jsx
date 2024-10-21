import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar';
import './css/shadows.css'

const API_KEY = import.meta.env.VITE_SOME_KEY;

const imageURL = 'https://image.tmdb.org/t/p/w500/';
const backdropURL = 'https://image.tmdb.org/t/p/original/';
const logoURL = 'https://image.tmdb.org/t/p/w200/';

const TvDetails = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [mediaInfo, setMediaInfo] = useState({});
    const [countryFlag, setCountryFlag] = useState('');
    
    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, {
                    params: {
                        api_key: API_KEY,
                    }
                });
                setMediaInfo(response.data);
                
                if (response.data.origin_country && response.data.origin_country.length > 0) {
                    const countryCode = response.data.origin_country[0];
                    const flagResponse = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
                    if (flagResponse.data && flagResponse.data.length > 0) {
                        setCountryFlag(flagResponse.data[0].flags.svg);
                    }
                }
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
                                    alt={mediaInfo.name + ' Poster'}
                                />
                            </div>
                        </div>
                        <div className="md:w-2/3 lg:w-3/4 p-8">
                            <h1 className="text-5xl font-bold text-gray-900 mb-4">{mediaInfo.name}</h1>
                            <p className="text-2xl text-gray-600 mb-6">{mediaInfo.original_name}</p>
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
                                    <h3 className="text-xl font-semibold">First Air Date</h3>
                                    <p className="text-lg">{new Date(mediaInfo.first_air_date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold">Last Air Date</h3>
                                    <p className="text-lg">{new Date(mediaInfo.last_air_date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold">Number of Seasons</h3>
                                    <p className="text-lg">{mediaInfo.number_of_seasons}</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold">Number of Episodes</h3>
                                    <p className="text-lg">{mediaInfo.number_of_episodes}</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold">Original Language</h3>
                                    <p className="text-lg">{mediaInfo.original_language}</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold">Origin Country</h3>
                                    <div className="flex items-center">
                                        {countryFlag && (
                                            <img src={countryFlag} alt="Country flag" className="w-8 h-6 mr-2" />
                                        )}
                                        <p className="text-lg">{mediaInfo.origin_country && mediaInfo.origin_country[0]}</p>
                                    </div>
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
                                    <h3 className="text-xl font-semibold mb-3">Networks</h3>
                                    <div className="flex flex-wrap gap-6">
                                        {mediaInfo.networks.map(network => (
                                            <div key={network.id} className="flex flex-col items-center w-24">
                                                {network.logo_path ? (
                                                    <img 
                                                        src={logoURL + network.logo_path} 
                                                        alt={network.name + ' Logo'} 
                                                        className="h-12 object-contain mb-2"
                                                    />
                                                ) : (
                                                    <div className="h-12 w-24 bg-gray-200 flex items-center justify-center rounded mb-2">
                                                        <span className="text-sm text-gray-500">No Logo</span>
                                                    </div>
                                                )}
                                                <span className="text-sm text-center">{network.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-3">Status</h3>
                                    <span className="px-4 py-2 bg-green-200 text-green-800 rounded-full text-lg">
                                        {mediaInfo.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TvDetails
