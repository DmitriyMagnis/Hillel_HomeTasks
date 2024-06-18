import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import Loader from './components/Loader';

interface ISwapiUnwraper<T> {
  count: number;
  results: T;
}

export interface ISWFilms {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
}

const fetchSwapiFilms = () =>
  axios
    .get<ISwapiUnwraper<ISWFilms[]>>('https://swapi.dev/api/films/')
    .then(({ data }) => data.results);

const delay = (wait: number = 1000) =>
  new Promise(res => setTimeout(res, wait));

function App() {
  const [films, setFilms] = useState<ISWFilms[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  useEffect(() => {
    const getStarwarsFIlms = async () => {
      try {
        setloading(true);
        await delay();
        const films = await fetchSwapiFilms();
        setFilms(films);
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };
    getStarwarsFIlms();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <h2 className="h2 text-center p-3">Let the force be with you!</h2>
      </div>
      <div className="row gx-3 gy-3">
        {loading && <Loader />}
        {films.length === 0 && <h3 className="h3 text-center">Empty</h3>}
        {films.map(film => (
          <div className="col-12 col-md-6 col-lg-4" key={film.episode_id}>
            <Card {...film} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
