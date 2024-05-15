import { FC } from "react";
import styles from "./SubmitButton.module.scss";
import { TButtonProps, TTrain } from "../../../utils/types";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { editTrain } from "../../../services/actions/trains";

const SubmitButton: FC<TButtonProps> = (props: TButtonProps) => {
  const { text, disabled, item } = props;
  const { validity, newData } = useAppSelector((state) => state.trainsReducer);
  const dispatch = useAppDispatch();

  // по клику на кнопку сортированные данные выводятся в консоль (с учетом валидных пользовательских даннных в рамках развития идеи из брифа).
  // в техзадании ничего не было про сохранение пользовательских данных, но пусть они уйдут в хранилище, а то зачем все это было
  function saveChanges(item: TTrain | null) {
    if (item && newData && !validity?.includes("isInvalid")) {
      dispatch(
        editTrain({
          name: item.name,
          description: item.description,
          characteristics: newData,
        })
      );
      const res = newData.map(function (obj) {
        return obj.speed;
      });
      res.sort(function (a, b) {
        return a - b;
      });
      console.log(res);
    }
  }

  return (
    <button
      className={disabled ? styles.button__disabled : styles.button}
      onClick={() => saveChanges(item)}
      type="button"
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
