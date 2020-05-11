import { OPEN_TILE, TILES_NOT_MATCHED, TILES_MATCHED, USER_WIN } from './types';

// Генерируем цвет для карточки
const genColor = () => Math.floor(Math.random() * 255);

// Генерируем карточки, чтобы не делать хардкодинг
const tilesQuantity = 16;

const tiles = Array(tilesQuantity / 2)
  .fill(0)
  .map(() => ({
    color: `rgb(${genColor()}, ${genColor()}, ${genColor()})`,
    isOpen: false,
    isMatched: false,
  }));

const pairsOfTiles = [...tiles, ...tiles].sort(() => Math.random() - 0.5);

const initialState = {
  tiles: pairsOfTiles,
  tilesQuantity: tilesQuantity,
  win: false,
};

export const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_TILE:
      // Открываем выбраную карточку
      return {
        ...state,
        tiles: state.tiles.map((tile, index) =>
          index === action.payload.index
            ? { ...tile, isOpen: !tile.isOpen }
            : tile
        ),
      };

    case TILES_MATCHED:
      // Убираем карточки, которые совпали
      return {
        ...state,
        tiles: state.tiles.map((tile) =>
          tile.color === action.payload.color
            ? { ...tile, isMatched: true }
            : tile
        ),
        tilesQuantity: state.tilesQuantity - 2,
      };

    case TILES_NOT_MATCHED:
      // Возвращаем к предыдущему состоянию, если карточки не совпали
      return {
        ...state,
        tiles: state.tiles.map((tile) => {
          return { ...tile, isOpen: false };
        }),
      };

    case USER_WIN:
      // Победа пользователя
      return {
        ...state,
        win: true,
      };

    default:
      return state;
  }
};
