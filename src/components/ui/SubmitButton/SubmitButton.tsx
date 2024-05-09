import { FC } from "react";
import styles from "./SubmitButton.module.scss";
import { TTrain } from "../../../utils/types";

type TProps = {
  onClick: (item: TTrain | null) => void;
  text: string;
  disabled: boolean;
  item: TTrain | null;
};

const SubmitButton: FC<TProps> = (props: TProps) => {
  const { onClick, text, disabled, item } = props;

  return (
    <button
      className={disabled ? styles.button__disabled : styles.button}
      onClick={() => onClick(item)}
      type="button"
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
