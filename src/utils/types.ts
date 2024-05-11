import { Dispatch, SetStateAction } from "react";

export type TCharacteristics = {
  speed: number;
  force: number;
  engineAmperage: number;
};

export type TTrain = {
  name: string;
  description: string;
  characteristics: TCharacteristics[];
};

export type TFormRow = {
  engineAmperage: number | null;
  force: number | null | string | undefined;
  speed: number | null;
};

export type TTableRowProps = {
  item: TCharacteristics;
  setIsValid: (arg0: boolean) => void;
  setRowsToChange: Dispatch<SetStateAction<TCharacteristics[] | null>>;
  i: number;
  rowsToChange: TCharacteristics[] | null;
};

export type TTrainsTableProps = {
  handleTrainClick: (item: TTrain) => void;
};

export type TButtonProps = {
  onClick: (item: TTrain | null) => void;
  text: string;
  disabled: boolean;
  item: TTrain | null;
};

export type TCurrentTrainProps = {
  saveChanges: (item: TTrain | null) => void;
  isValid: boolean;
  setIsValid: (arg0: boolean) => void;
  setRowsToChange: Dispatch<SetStateAction<TCharacteristics[] | null>>;
  rowsToChange: TCharacteristics[] | null;
};
