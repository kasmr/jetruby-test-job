import React, { useEffect } from 'react';
import Tile from './Tile';
import { connect } from 'react-redux';
import { openTile, userWin } from '../redux/actions';
import PropTypes from 'prop-types';

const TilesBoard = ({ tiles, tilesQuantity, win, openTile, userWin }) => {
  useEffect(() => {
    // Следим за количеством карточек и победой пользователя
    if (tilesQuantity === 0) {
      userWin();
    }
    //eslint-disable-next-line
  }, [tilesQuantity]);

  return (
    <>
      {win ? (
        <h1>Congratulations! You win!</h1>
      ) : (
        <h1>
          Pairs of tiles left to open: <span> {tilesQuantity / 2} </span>
        </h1>
      )}
      <div className='container-tiles'>
        {tiles.map((tile, index) => (
          // Документация реакт говорит, что не стоит использовать индекс в качестве ключа, но в данном случае использование например uuid не имеет смысла
          <Tile tile={tile} key={index} index={index} openTile={openTile} />
        ))}
      </div>
    </>
  );
};

TilesBoard.propTypes = {
  tiles: PropTypes.array.isRequired,
  tilesQuantity: PropTypes.number.isRequired,
  win: PropTypes.bool.isRequired,
  openTile: PropTypes.func.isRequired,
  userWin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    tiles: state.tiles,
    tilesQuantity: state.tilesQuantity,
    win: state.win,
  };
};

export default connect(mapStateToProps, { openTile, userWin })(TilesBoard);
