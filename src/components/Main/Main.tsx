import { FC } from "react";
import CurrentTrain from "../CurrentTrain/CurrentTrain";
import TrainsTable from "../TrainsTable/TrainsTable";

const Main: FC = () => {
  return (
    <>
      <TrainsTable />
      <CurrentTrain />
    </>
  );
};

export default Main;
