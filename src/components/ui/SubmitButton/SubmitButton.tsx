import { FC } from "react";
import styles from "./SubmitButton.module.scss";
import { TButtonProps } from "../../../utils/types";

const SubmitButton: FC<TButtonProps> = (props: TButtonProps) => {
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
