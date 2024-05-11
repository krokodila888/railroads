import { FC } from "react";
import CurrentTrain from "../CurrentTrain/CurrentTrain";
import { TMainProps } from "../../utils/types";
import TrainsTable from "../TrainsTable/TrainsTable";

const Main: FC<TMainProps> = ({
  saveChanges,
  handleTrainClick,
  setRowsToChange,
  rowsToChange,
  isValid,
  setIsValid,
}) => {
  return (
    <>
      <TrainsTable handleTrainClick={handleTrainClick} />
      <CurrentTrain
        saveChanges={saveChanges}
        setRowsToChange={setRowsToChange}
        rowsToChange={rowsToChange}
        isValid={isValid}
        setIsValid={setIsValid}
      />
    </>
  );
};

export default Main;
