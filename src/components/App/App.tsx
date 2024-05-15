import { FC, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../Main/Main";
import styles from "./App.module.scss";
import {
  getTrains,
  setCurrentTrain,
  setValidity,
  setNewData,
} from "../../services/actions/trains";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { api } from "../../utils/Api";
import { TTrain } from "../../utils/types";

const App: FC = () => {
  const [trains, setTrains] = useState<TTrain[] | null>(null);
  const dispatch = useAppDispatch();
  const { currentTrain } = useAppSelector((state) => state.trainsReducer);

  // запрос с бекенда стартовых данных
  useEffect(() => {
    api.getTrains().then((res) => {
      setTrains(res);
    });
  }, []);

  // стартовые данные идут в redux
  // данные о первом выбранном поезде выставляются сразу: тут и пользовательская подсказка, и более юзерфрендли статичная верстка
  useEffect(() => {
    if (trains && trains.length !== 0) {
      dispatch(getTrains());
      dispatch(setCurrentTrain(trains[0]));
      dispatch(
        setValidity(
          trains[0].characteristics.map(() => {
            return "isValid";
          })
        )
      );
    }
  }, [trains]);

  // характеристики выбранного поезда для изменения с последующей отпрвкой в стор
  useEffect(() => {
    if (currentTrain) {
      const currentCharacteristics = currentTrain.characteristics;
      dispatch(setNewData(currentCharacteristics));
      //setRowsToChange(currentCharacteristics);
    }
  }, [currentTrain]);

  return (
    <div className={styles.page}>
      <Routes>
        <Route path="*" element={<Main />}></Route>
      </Routes>
    </div>
  );
};

export default App;
