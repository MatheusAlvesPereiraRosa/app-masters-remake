import axios from 'axios';
import { useState, useEffect } from 'react';

// componentes
import './index.css';
import { Button } from '../../Components/Button';
import { GameList } from '../../Components/GameList';
import { Loading } from '../../Components/Loading';
import { SearchBar } from '../../Components/SearchBar';

// interfaces
import { IGame } from '../../interfaces/Game';
import { IStatusReq } from '../../interfaces/StatusReq';
import { GenreSelect } from '../../Components/GenreSelect';

// assets
import error from '../../Assets/error.png';
import timeout from '../../Assets/timeout.png';

function Home() {
  const [data, setData] = useState<IGame[]>([]);
  const [fullData, setFullData] = useState<IGame[]>([]);
  const [filteredData, setFilteredData] = useState<IGame[]>([]);
  const [page, setPage] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>('');
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [statusReq, setStatusReq] = useState<IStatusReq>({
    message: '',
    code: '',
    error: false,
    timeout: false
  });

  // constantes
  const DATA_PER_PAGE = 15;
  const NO_MORE_DATA: boolean = page + DATA_PER_PAGE >= fullData.length;
  /*const filteredData = searchValue
    ? fullData.filter((data) => {
        return data.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : data;*/

  const getData = async () => {
    await axios
      .get('https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/', {
        headers: {
          'content-type': 'application/json',
          'dev-email-address': 'matpr2.a98@gmail.com'
        },
        timeout: 5000
      })
      .then((response) => {
        setData(response.data.slice(page, DATA_PER_PAGE));
        setFullData(response.data);
        setGenreArr(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          setIsLoading(false);
          setStatusReq({
            ...statusReq,
            message: error.message,
            code: error.response.status.toString(),
            error: true
          });
        } else if (error.request) {
          setIsLoading(false);
          setStatusReq({
            ...statusReq,
            message: 'A requisição demorou mais do que 5 segundos',
            code: 'Timeout',
            timeout: true
          });
        }
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    filterData(fullData, searchValue, selectedGenre);
  }, [fullData, searchValue, selectedGenre]);

  // funções

  const filterData = (fullData: IGame[], searchValue?: string, selectedGenre?: string): void => {
    let filteredData = fullData;

    if (searchValue) {
      filteredData = filteredData.filter((data) =>
        data.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (selectedGenre) {
      filteredData = filteredData.filter((data) => data.genre === selectedGenre);
    }

    if (selectedGenre === '' && searchValue === '') {
      filteredData = data;
    }

    setFilteredData(filteredData);
  };

  function getNextPage(page: number, DATA_PER_PAGE: number): number {
    const nextPage = page + DATA_PER_PAGE;

    return nextPage;
  }

  function getNextData(nextPage: number, DATA_PER_PAGE: number): IGame[] {
    const nextData = fullData.slice(nextPage, nextPage + DATA_PER_PAGE);

    data.push(...nextData);

    return data;
  }

  function validateError(numCode: string): boolean {
    const code = numCode.toString();
    const match = /[5][0][0, 2, 3, 4, 7, 8, 9]/;

    if (match.test(code)) {
      return true;
    }

    return false;
  }

  const setGenreArr = (games: IGame[]): void => {
    const uniqueGenres = games.reduce((uniqueGenres, item) => {
      if (!uniqueGenres.includes(item.genre)) {
        uniqueGenres.push(item.genre);
      }
      return uniqueGenres;
    }, []);

    setGenres(uniqueGenres);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
    //filterData(fullData, searchValue, selectedGenre)
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSelectedGenre(value);
    //filterData(fullData, searchValue, selectedGenre)
  };

  const loadMoreData = (): void => {
    const nextPage = getNextPage(page, DATA_PER_PAGE);
    const data = getNextData(nextPage, DATA_PER_PAGE);

    setData(data);
    setPage(nextPage);
  };

  return (
    <section className="container">
      <div className="top-container">
        <div className="filter-container">
          <SearchBar searchValue={searchValue} handleChange={handleChange} />

          <GenreSelect
            genreValue={selectedGenre}
            handleChange={handleSelectChange}
            genres={genres}
          />
        </div>

        {!!searchValue && <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Search value: {searchValue}</h1>}
      </div>

      {isLoading && <Loading />}

      {filteredData.length > 0 && <GameList data={filteredData} />}

      {filteredData.length === 0 && !isLoading && (
        <p className="no-result">Sem resultados para a pesquisa</p>
      )}

      {statusReq.error === true && validateError(statusReq.code) && (
        <div className="error-container">
          <p className="no-result">O servidor falhou em responder, tente recarregar a página</p>
          <img className="error-img" src={error} />
        </div>
      )}

      {statusReq.error === true && !validateError(statusReq.code) && (
        <div className="error-container">
          <p className="no-result">
            O servidor não conseguirá responder por agora, tente voltar novamente mais tarde
          </p>
          <img className="error-img" src={error} />
        </div>
      )}

      {statusReq.timeout === true && statusReq.code === 'Timeout' && (
        <div className="error-container">
          <p className="no-result">O servidor demorou para responder, tente mais tarde</p>
          <img className="timeout-img" src={timeout} />
        </div>
      )}

      {!searchValue &&
        !selectedGenre &&
        !isLoading &&
        statusReq.error === false &&
        statusReq.timeout === false && <Button onClick={loadMoreData} isDisabled={NO_MORE_DATA} />}
    </section>
  );
}

export default Home;
