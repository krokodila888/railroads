import { FC } from "react";
import styles from "./TrainsTable.module.scss";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { TTrain } from "../../utils/types";
import { setCurrentTrain, setValidity } from "../../services/actions/trains";

const TrainsTable: FC = () => {
  const { trains, currentTrain } = useAppSelector(
    (state) => state.trainsReducer
  );
  const dispatch = useAppDispatch();

  //данные о выбранном поезде отображаются по клику
  function handleTrainClick(item: TTrain) {
    dispatch(setCurrentTrain(item));
    dispatch(
      setValidity(
        item.characteristics.map(() => {
          return "isValid";
        })
      )
    );
  }

  return (
    <>
      <table className={styles.trains}>
        <caption className={styles.trains__title}>Поезда</caption>
        <thead className={styles.trains__caption}>
          <tr>
            <th className={styles.trains__td}>Название</th>
            <th className={styles.trains__td}>Описание</th>
          </tr>
        </thead>
        <tbody>
          {trains &&
            currentTrain &&
            trains.length !== 0 &&
            trains.map((item: TTrain, i: number) => (
              <tr
                key={i}
                className={
                  item.name === currentTrain?.name
                    ? styles.trains__tr_chosen
                    : styles.trains__tr
                }
                onClick={() => {
                  handleTrainClick(item);
                }}
              >
                <td className={styles.trains__td}>{item.name}</td>
                <td className={styles.trains__td}>{item.description}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default TrainsTable;
