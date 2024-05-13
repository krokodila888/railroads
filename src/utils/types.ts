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

export type TMainProps = {
  saveChanges: (item: TTrain | null) => void;
  handleTrainClick: (item: TTrain) => void;
};

export type TFormRow = {
  engineAmperage: number | null;
  force: null | string | undefined;
  speed: number | null;
};

export type TTableRowProps = {
  item: TCharacteristics;
  i: number;
};

export type TTrainsTableProps = {
  handleTrainClick: (item: TTrain) => void;
};

export type TButtonProps = {
  onClick: (item: TTrain | null) => void;
  text: string;
  disabled: boolean | undefined;
  item: TTrain | null;
};

export type TCurrentTrainProps = {
  saveChanges: (item: TTrain | null) => void;
};

export type TValidationData = {
  number: number;
  status: string;
};
