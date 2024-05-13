import { FC } from "react";
import CurrentTrain from "../CurrentTrain/CurrentTrain";
import { TMainProps } from "../../utils/types";
import TrainsTable from "../TrainsTable/TrainsTable";

const Main: FC<TMainProps> = ({ saveChanges, handleTrainClick }) => {
  return (
    <>
      <TrainsTable handleTrainClick={handleTrainClick} />
      <CurrentTrain saveChanges={saveChanges} />
    </>
  );
};

export default Main;
