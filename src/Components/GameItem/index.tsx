import './index.css';

import { IGame } from '../../interfaces/Game';

import { motion } from 'framer-motion';

export const GameItem = ({
  title,
  thumbnail,
  short_description,
  genre,
  platform,
  release_date
}: IGame) => {
  return (
    <motion.div layout whileHover={{ scale: 1.1 }} className="card-item">
      <img src={thumbnail} alt="Imagem do Jogo" />

      <div className="text-container">
        <h1>{title}</h1>
        <h3>{genre}</h3>

        <div className="text-container_description">
          <p>{short_description}</p>
        </div>

        <div className="text-container_little">
          <p>
            Data de lançamento: <br /> {release_date}
          </p>
          <p>
            Plataforma: <br />
            {platform}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
