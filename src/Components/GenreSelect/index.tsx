import './index.css';

interface Props {
  genreValue: string;
  handleChange(e: React.ChangeEvent<HTMLSelectElement>): void;
  genres: string[];
}

export const GenreSelect = ({ genreValue, handleChange, genres }: Props) => (
  <select value={genreValue} onChange={handleChange} className="select-input">
    <option value="">Selecione um gênero</option>
    {genres.map((genre) => (
      <option key={genre} value={genre}>
        {genre}
      </option>
    ))}
  </select>
);
