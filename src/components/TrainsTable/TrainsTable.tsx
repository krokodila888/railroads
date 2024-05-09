import { FC } from "react";
import styles from "./TrainsTable.module.scss";
import { useAppSelector } from "../../services/hooks";
import { TTrain } from "../../utils/types";

type TProps = {
  handleTrainClick: (item: TTrain) => void;
};

const TrainsTable: FC<TProps> = ({ handleTrainClick }) => {
  const { trains, currentTrain } = useAppSelector(
    (state) => state.trainsReducer
  );

  return (
    <>
      <table className={styles.main}>
        <caption className={styles.main__title}>Поезда</caption>
        <thead className={styles.main__caption}>
          <tr>
            <th className={styles.main__td}>Название</th>
            <th className={styles.main__td}>Описание</th>
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
                    ? styles.main__tr1
                    : styles.main__tr
                }
                onClick={() => {
                  handleTrainClick(item);
                }}
              >
                <td className={styles.main__td}>{item.name}</td>
                <td className={styles.main__td}>{item.description}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default TrainsTable;
