import { useReducer } from "react";
import type { InputItem } from "../lib/digits";
import reducer from "../reducers/calculator";

const roundedValue = (value: number, digits: number) =>
  Math.round(value * 10 ** digits) / 10 ** digits;

export const useCalculator = () => {
  const [state, dispatch] = useReducer(reducer, {
    display: "",
    waitingForOperand: true,
    result: 0,
    operator: undefined,
    equation: "",
  });

  const handleAllFunctions = (item: InputItem) => {
    dispatch(item);
  };

  return {
    values: state,
    handleAllFunctions,
    roundedValue,
  };
};
