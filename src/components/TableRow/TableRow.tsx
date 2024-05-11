import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./TableRow.module.scss";
import { useAppSelector } from "../../services/hooks";
import { TFormRow, TTableRowProps } from "../../utils/types";

const TableRow: FC<TTableRowProps> = ({
  item,
  setIsValid,
  setRowsToChange,
  i,
  rowsToChange,
}) => {
  const { currentTrain } = useAppSelector((state) => state.trainsReducer);
  // единый инпут для значений строки
  const [form, setValue] = useState<TFormRow>({
    engineAmperage: null,
    force: null,
    speed: null,
  });

  // обновление данных при смене выбранного поезда
  useEffect(() => {
    if (currentTrain) {
      setValue({
        engineAmperage: item.engineAmperage,
        force: item.force,
        speed: item.speed,
      });
    }
  }, [currentTrain]);

  // тут валидация данных для кнопки и стилей. Валидные данные идут в стейт, чтобы при изменении параметров уйти в redux
  useEffect(() => {
    if (
      form !== null &&
      form.engineAmperage !== null &&
      form.force !== null &&
      form.speed !== null
    ) {
      if (
        form.engineAmperage > 0 &&
        form.force !== undefined &&
        Number(form.force) > 0 &&
        form.speed >= 0 &&
        form.speed % 1 === 0 &&
        form.engineAmperage % 1 === 0 &&
        typeof form.engineAmperage !== "string" &&
        typeof form.speed !== "string" &&
        !/^\./.test("" + form.force)
      ) {
        setIsValid(true);
        const res = rowsToChange?.map((item, num) => {
          if (num === i) {
            return {
              engineAmperage: Number(form.engineAmperage),
              force: Number(form.force),
              speed: Number(form.speed),
            };
          } else return item;
        });
        if (res !== undefined) {
          setRowsToChange(res);
        }
      } else {
        setIsValid(false);
      }
    }
  }, [form]);

  // изменение данных в инпутах. Можно было бы использовать valueAsNumber, но так удаляется значение при вводе символов, и пользователь больше не видит "испорченное" число
  // пользователь может ввести невалидные данные множеством способов даже при ограничениях в инпутах. Тут можно предотвратить некоторые из них: добавление математических знаков и разрешенных переменных (e) в середину значения
  // можно заблокировать тут возможность ввода отрицательных чисел. Ограничивать число знаков до/после запятой таким способом можно, но так пользователь может пропустить свою ошибку, если приложение будет првить все за пользователя и показывать валидный инпут
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "speed") {
      setValue({
        ...form,
        [e.target.name]: Number(e.target.value.replace(/[^0-9\d]/gi, "")),
      });
    }
    // здесь валидация поля с дробью. Пользователь лишен возможности сделать большую часть ошибок (ввести в поле буквы и некорректные символы), но не написать верно (например, возможен первый ноль в начале строки, но не несколько подряд без разделительной запятой (одной на поле, вторая блокируется)
    if (
      e.target.name === "force" &&
      e !== null &&
      e.target !== null &&
      e.target.value
    ) {
      let res = e.target.value.match(/[0-9\.]/gi)?.join("");
      if (res !== undefined && !res?.includes(".") && /^0+/.test(res)) {
        res = res.replace(/^0+/, "0");
      }
      if (res !== undefined && res?.includes(".") && /^0+\./.test(res)) {
        res = res.replace(/^0+\./, "0.");
      }
      if (res !== undefined && res?.includes(".") && /^0+[1-9]/.test(res)) {
        res = res.replace(/^0+/, "");
      }
      if (res) {
        setValue({
          ...form,
          force: res,
        });
      }
    }
    if (e.target.name === "engineAmperage") {
      setValue({
        ...form,
        [e.target.name]: Number(e.target.value.replace(/[^0-9\d]/gi, "")),
      });
    }
  };

  // тут убирается последний знак инпута с типом number при стирании с клавиатуры
  // можно решить это и по-другому, через более сложное регулярное выражение и type="text"
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      ("" + form.force).length === 1 &&
      (e.key === "Backspace" || e.key === "Delete")
    ) {
      setValue({
        ...form,
        force: 0,
      });
    }
    if (("" + form.force).includes(".") && e.key === ".") {
      e.preventDefault();
    }
  };

  return (
    <tr className={styles.row__tr}>
      <td className={styles.row__td}>
        <input
          value={
            form.engineAmperage !== null ? form.engineAmperage : "Нет значения"
          }
          name="engineAmperage"
          onChange={onChange}
          type="text"
          className={
            form.engineAmperage !== null &&
            form.engineAmperage > 0 &&
            form.engineAmperage % 1 === 0 &&
            typeof form.engineAmperage !== "string"
              ? styles.row__input
              : styles.row__input_incorrect
          }
        />
      </td>
      <td className={styles.row__td}>
        <input
          value={form.force !== null ? form.force : "Нет значения"}
          name="force"
          onChange={onChange}
          onKeyDown={onKeyDown}
          type="text"
          /*pattern="/[^0-9\d]/gi"*/
          className={
            form.force !== null &&
            form.force !== undefined &&
            Number(form.force) > 0 &&
            !/^\./.test("" + form.force)
              ? styles.row__input
              : styles.row__input_incorrect
          }
        />
      </td>
      <td className={styles.row__td}>
        <input
          value={form.speed !== null ? form.speed : "Нет значения"}
          name="speed"
          onChange={onChange}
          type="text"
          className={
            form.speed !== null &&
            form.speed >= 0 &&
            form.speed % 1 === 0 &&
            typeof form.speed !== "string"
              ? styles.row__input
              : styles.row__input_incorrect
          }
        />
      </td>
    </tr>
  );
};

export default TableRow;
