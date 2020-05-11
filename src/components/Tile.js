import React from 'react';

const Tile = ({ tile, openTile, index }) => {
  return (
    <div
      className={`tile ${tile.isMatched && 'disappear'}`}
      onClick={() => {
        openTile(tile, index);
      }}
      style={{
        backgroundColor: tile.isOpen && tile.color,
      }}
    ></div>
  );
};

export default Tile;
