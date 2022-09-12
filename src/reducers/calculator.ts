import { useEffect } from "react";
import type { InputItem } from "../lib/digits";
import type { Operator, ValuesState } from "../lib/types";

const roundedValue = (value: number, digits: number) =>
  Math.round(value * 10 ** digits) / 10 ** digits;

export default function reducer(
  prev: ValuesState,
  action: InputItem
): ValuesState {
  const tempValue: number = prev.display
    ? prev.display.endsWith("%")
      ? parseFloat(prev.display) / 100
      : Number(prev.display)
    : prev.result;

  //console.log(prev);

  switch (action.type) {
    case "number":
      return handleNumber(prev, action);
    case "operator":
      return handleOperator(prev, action, tempValue);
    case "equal":
      return handleEqual(prev, tempValue);
    case "clear":
      return handleClear(prev);
    case "+/-":
      return handlePlusOrMinus(prev, tempValue);
    case "percentage":
      return handlePercentage(prev, tempValue);
    default:
      console.warn("Unhandled action", action);
      console.warn("Returning existing state (unmodified)");
      return prev;
  }
}

export function handleNumber(prev: ValuesState, item: InputItem): ValuesState {
  if (prev.pressedEqual) {
    return {
      ...prev,
      equation: "",
      display: item.value.toString(),
      pressedEqual: false,
    };
  }
  if (prev.waitingForOperand) {
    return {
      ...prev,
      display: prev.display + item.value,
      waitingForOperand: false,
    };
  } else
    return {
      ...prev,
      display: prev.display + item.value,
    };
}

export function handleOperator(
  prev: ValuesState,
  item: InputItem,
  tempValue: number
): ValuesState {
  if ("operator" !== item.type) return prev;

  //console.log(item);

  const displayOperator =
    ((item.value === "+" || item.value === "-") && item.value) ||
    (item.value === "*" && "×") ||
    (item.value === "/" && "÷") ||
    "";

  if (prev.operator === undefined)
    return {
      ...prev,
      operator: item.value,
      display: "",
      waitingForOperand: true,
      pressedEqual: false,
      result: tempValue,
      equation: roundedValue(tempValue, 3) + displayOperator,
    };
  else if (prev.waitingForOperand)
    return {
      ...prev,
      display: "",
      operator: item.value,
      pressedEqual: false,
      equation: prev.equation.replace(/[+-×÷]$/g, displayOperator),
    };
  else return handleEquation(prev, tempValue, item.value, displayOperator);
}

export function handleEqual(prev: ValuesState, tempValue: number): ValuesState {
  return !prev.equation && prev.operator === undefined
    ? { ...prev, result: tempValue }
    : handleEquation(prev, tempValue, undefined, "", true);
}

export function handleEquation(
  prev: ValuesState,
  tempValue: number,
  operator?: Operator,
  displayOperator?: string,
  pressedEqual?: boolean
): ValuesState {
  const handleOperator = (result: number) => {
    return {
      ...prev,
      display: "",
      result: result,
      operator: operator,
      waitingForOperand: true,
      pressedEqual: pressedEqual,
      equation:
        prev.equation +
        tempValue +
        (operator !== undefined ? displayOperator : ""),
    };
  };

  switch (prev.operator) {
    case "+":
      return handleOperator(prev.result + tempValue);
    case "-":
      return handleOperator(prev.result - tempValue);
    case "*":
      return handleOperator(prev.result * tempValue);
    case "/":
      return handleOperator(prev.result / tempValue);
    default:
      return prev;
  }
}

export function handleClear(prev: ValuesState): ValuesState {
  return {
    ...prev,
    display: "",
    operator: undefined,
    waitingForOperand: true,
    result: 0,
    equation: "",
  };
}

export function handlePlusOrMinus(
  prev: ValuesState,
  tempValue: number
): ValuesState {
  return prev.display
    ? { ...prev, display: (-tempValue).toString() }
    : { ...prev, result: -prev.result };
}

export function handlePercentage(prev: ValuesState, tempValue: number) {
  let fixedTempValue: number | string = prev.pressedEqual
    ? prev.result
    : tempValue;

  if (tempValue.toString().includes("."))
    fixedTempValue = fixedTempValue.toFixed(3);
  else fixedTempValue = fixedTempValue;

  // return { ...prev, display: fixedTempValue + "%" };
  if (prev.pressedEqual)
    return { ...prev, equation: "", display: tempValue + "%" };
  else return { ...prev, display: tempValue + "%" };
}
