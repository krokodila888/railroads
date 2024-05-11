import { FC, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../Main/Main";
import styles from "./App.module.scss";
import {
  getTrains,
  setCurrentTrain,
  editTrain,
} from "../../services/actions/trains";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { api } from "../../utils/Api";
import { TCharacteristics, TTrain } from "../../utils/types";

const App: FC = () => {
  const [trains, setTrains] = useState<TTrain[] | null>(null);
  const [rowsToChange, setRowsToChange] = useState<TCharacteristics[] | null>(
    null
  );
  const [isValid, setIsValid] = useState<string[]>([]);
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
    }
  }, [trains]);

  // характеристики выбранного поезда для изменения с последующей отпрвкой в стор
  useEffect(() => {
    if (currentTrain) {
      const currentCharacteristics = currentTrain.characteristics;
      setRowsToChange(currentCharacteristics);
      setIsValid(
        currentTrain.characteristics.map(() => {
          return "isValid";
        })
      );
    }
  }, [currentTrain]);

  // по клику на кнопку сортированные данные выводятся в консоль (с учетом валидных пользовательских даннных в рамках развития идеи из брифа).
  // в техзадании ничего не было про сохранение пользовательских данных, но пусть они уйдут в хранилище, а то зачем все это было
  function saveChanges(item: TTrain | null) {
    if (item && rowsToChange && !isValid.includes("isInvalid")) {
      dispatch(
        editTrain({
          name: item.name,
          description: item.description,
          characteristics: rowsToChange,
        })
      );
      const res = rowsToChange.map(function (obj) {
        return obj.speed;
      });
      res.sort(function (a, b) {
        return a - b;
      });
      console.log(res);
    }
  }

  //данные о выбранном поезде отображаются по клику
  function handleTrainClick(item: TTrain) {
    dispatch(setCurrentTrain(item));
  }

  return (
    <div className={styles.page}>
      <Routes>
        <Route
          path="*"
          element={
            <Main
              saveChanges={saveChanges}
              handleTrainClick={handleTrainClick}
              setRowsToChange={setRowsToChange}
              rowsToChange={rowsToChange}
              isValid={isValid}
              setIsValid={setIsValid}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
