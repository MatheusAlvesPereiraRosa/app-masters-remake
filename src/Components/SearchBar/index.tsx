import './index.css';

interface Props {
  searchValue: string;
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export const SearchBar = ({ searchValue, handleChange }: Props) => (
  <input
    type="search"
    className="search-input"
    placeholder="Digite sua pesquisa"
    value={searchValue}
    onChange={handleChange}
  />
);
