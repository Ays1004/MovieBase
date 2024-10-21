import './App.css'
import Home from './components/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MovieDetails from './components/MovieDetails';
import Search from './components/Search';
import TopList from './components/TopList';
import TopListShows from './components/TopListShows';
import TvDetails from './components/TvDetails';


const App = () => {
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/movie/:id',
      element: <MovieDetails />
    },
    {
      path: '/tv/:id',
      element: <TvDetails />
    },
    {
      path: '/search',
      element: <Search />
    },
    {
      path: '/search/:query',
      element: <Search />
    },
    {
      path: '/top/films/:page',
      element: <TopList />
    },
    {
      path: '/top/shows/:page',
      element: <TopListShows />
    }

  ])


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
