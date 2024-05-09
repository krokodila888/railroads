import { Dispatch, FC, SetStateAction } from "react";
import CurrentTrain from "../CurrentTrain/CurrentTrain";
import { TCharacteristics, TTrain } from "../../utils/types";
import TrainsTable from "../TrainsTable/TrainsTable";

type TProps = {
  saveChanges: (item: TTrain | null) => void;
  handleTrainClick: (item: TTrain) => void;
  isValid: boolean;
  setIsValid: (arg0: boolean) => void;
  setRowsToChange: Dispatch<SetStateAction<TCharacteristics[] | null>>;
  rowsToChange: TCharacteristics[] | null;
};

const Main: FC<TProps> = ({
  saveChanges,
  handleTrainClick,
  isValid,
  setIsValid,
  setRowsToChange,
  rowsToChange,
}) => {
  return (
    <>
      <TrainsTable handleTrainClick={handleTrainClick} />
      <CurrentTrain
        saveChanges={saveChanges}
        isValid={isValid}
        setIsValid={setIsValid}
        setRowsToChange={setRowsToChange}
        rowsToChange={rowsToChange}
      />
    </>
  );
};

export default Main;
