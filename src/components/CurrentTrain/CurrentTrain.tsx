import { Dispatch, FC, SetStateAction } from "react";
import styles from "./CurrentTrain.module.scss";
import { useAppSelector } from "../../services/hooks";
import { TCharacteristics, TTrain } from "../../utils/types";
import SubmitButton from "../ui/SubmitButton/SubmitButton";
import TableRow from "../TableRow/TableRow";

type TProps = {
  saveChanges: (item: TTrain | null) => void;
  isValid: boolean;
  setIsValid: (arg0: boolean) => void;
  setRowsToChange: Dispatch<SetStateAction<TCharacteristics[] | null>>;
  rowsToChange: TCharacteristics[] | null;
};

const CurrentTrain: FC<TProps> = ({
  saveChanges,
  isValid,
  setIsValid,
  setRowsToChange,
  rowsToChange,
}) => {
  const { currentTrain } = useAppSelector((state) => state.trainsReducer);

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
        <tbody className={styles.train__tbody}>
          {currentTrain &&
            currentTrain.characteristics.map(
              (item: TCharacteristics, i: number) => (
                <TableRow
                  key={i}
                  i={i}
                  item={item}
                  setIsValid={setIsValid}
                  setRowsToChange={setRowsToChange}
                  rowsToChange={rowsToChange}
                />
              )
            )}
        </tbody>
      </table>
      <SubmitButton
        onClick={saveChanges}
        disabled={!isValid}
        text="Отправить данные"
        item={currentTrain}
      />
    </div>
  );
};

export default CurrentTrain;
