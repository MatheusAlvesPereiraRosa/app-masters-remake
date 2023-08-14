import './index.css';

interface Props {
  onClick(): void;
  isDisabled: boolean;
}

export const Button = ({ onClick, isDisabled }: Props) => (
  <button onClick={onClick} type="button" className="btn-load" disabled={isDisabled}>
    <div className="btn-text">Load more...</div>
  </button>
);
