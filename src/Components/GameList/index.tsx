import './index.css';

import { GameItem } from '../GameItem';
import { IGame } from '../../interfaces/Game';

interface Props {
  data: IGame[];
}

export const GameList = ({ data }: Props) => {
  return (
    <div className="game-list">
      {Object.values(data).map((data) => {
        return (
          <GameItem
            title={data.title}
            thumbnail={data.thumbnail}
            short_description={data.short_description}
            genre={data.genre}
            platform={data.platform}
            release_date={data.release_date}
            key={data.id}
          />
        );
      })}
    </div>
  );
};
