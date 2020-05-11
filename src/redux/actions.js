import { OPEN_TILE, TILES_NOT_MATCHED, TILES_MATCHED, USER_WIN } from './types';

// Создаем переменную для 1 открытой карточки
let openedCard = null;

export const openTile = (tile, index) => {
  return (dispatch) => {
    // Если карточка в переменной отсутсвует, присваиваем id, записываем в переменную и диспатчим её открытие
    if (!openedCard) {
      openedCard = { ...tile, id: index };
      dispatch({ type: OPEN_TILE, payload: { tile, index } });
    } else if (
      // Если пристутсвует, сравниваем, чтобы совпадал цвет, но не индекс. Освобождаем переменную, диспатчим её открытие и удаление
      openedCard &&
      openedCard.id !== index &&
      openedCard.color === tile.color
    ) {
      openedCard = null;
      dispatch({ type: OPEN_TILE, payload: { tile, index } });
      setTimeout(() => {
        dispatch({
          type: TILES_MATCHED,
          payload: { ...tile, isMatched: true },
        });
      }, 300);
    } else {
      // Если не удовлетворяет условиям, открываем карточку и диспатчим закрытие остальных
      dispatch({ type: OPEN_TILE, payload: { tile, index } });
      openedCard = null;
      setTimeout(() => {
        dispatch({ type: TILES_NOT_MATCHED });
      }, 300);
    }
  };
};

export const userWin = () => {
  // Все карточки открыты, диспатчим победу
  return { type: USER_WIN };
};
