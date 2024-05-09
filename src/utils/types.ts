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
