import type { ISWFilms } from '../App';

function Card({
  title,
  opening_crawl,
  director,
  producer,
  release_date,
}: ISWFilms) {
  return (
    <div className="card p-0 shadow-sm h-100">
      <div className="card-header h5">{title}</div>
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          <p>{opening_crawl}</p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <small className="text-body-secondary">Producer</small>:{' '}
              <cite title="Source Title">{producer}</cite>
            </li>
            <li className="list-group-item">
              <small className="text-body-secondary">Director</small>:{' '}
              <cite title="Source Title">{director}</cite>
            </li>
            <li className="list-group-item">
              <small className="text-body-secondary">Release Date</small>:{' '}
              <cite title="Source Title">{release_date}</cite>
            </li>
          </ul>
          {/* <footer className="blockquote-footer">
            Director:
            <cite title="Source Title"> {director}</cite>
          </footer>
          <footer className="blockquote-footer">
            Producer:
            <cite title="Source Title"> {producer}</cite>
          </footer> */}
        </blockquote>
      </div>
    </div>
  );
}

export default Card;
