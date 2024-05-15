import { FC } from "react";
import styles from "./CurrentTrain.module.scss";
import { useAppSelector } from "../../services/hooks";
import { TCharacteristics } from "../../utils/types";
import SubmitButton from "../ui/SubmitButton/SubmitButton";
import TableRow from "../TableRow/TableRow";

// можно было бы реализовать таблицу библиотеками, но с таким функционалом без них все даже управляемее и проще

const CurrentTrain: FC = () => {
  const { currentTrain, validity } = useAppSelector(
    (state) => state.trainsReducer
  );

  return (
    <div className={styles.train}>
      <table className={styles.train__table} cellSpacing={0}>
        {currentTrain && (
          <caption className={styles.train__title}>
            Характеристики <br />
            {currentTrain.name}
          </caption>
        )}
        <thead className={styles.train__caption}>
          <tr className={styles.train__tr}>
            <th className={styles.train__captiontd}>Ток двигателя (А)</th>
            <th className={styles.train__captiontd}>Сила тяги (кН)</th>
            <th className={styles.train__captiontd}>Скорость (км/ч)</th>
          </tr>
        </thead>
        <tbody>
          {currentTrain &&
            currentTrain.characteristics.map(
              (item: TCharacteristics, i: number) => (
                <TableRow key={i} i={i} item={item} />
              )
            )}
        </tbody>
      </table>
      <SubmitButton
        disabled={validity?.includes("isInvalid")}
        text="Отправить данные"
        item={currentTrain}
      />
    </div>
  );
};

export default CurrentTrain;
