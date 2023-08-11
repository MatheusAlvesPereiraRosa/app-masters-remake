import './index.css';
import P from 'prop-types';

interface Props {
  onClick(): void 
}

export const Button = ({ onClick }: Props) => (
  <button onClick={onClick} type="button" className="btn-load">
    <div className="btn-text">Load more...</div>
  </button>
);