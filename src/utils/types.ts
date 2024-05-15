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
  force: null | string | undefined;
  speed: number | null;
};

export type TTableRowProps = {
  item: TCharacteristics;
  i: number;
};

export type TButtonProps = {
  text: string;
  disabled: boolean | undefined;
  item: TTrain | null;
};

export type TValidationData = {
  number: number;
  status: string;
};
