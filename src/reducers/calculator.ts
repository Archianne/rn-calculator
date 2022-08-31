import type { InputItem } from "../lib/digits";
import type { Operator, valuesState } from "../lib/types";

const roundedValue = (value: number, digits: number) =>
  Math.round(value * 10 ** digits) / 10 ** digits;

export default function reducer(
  prev: valuesState,
  action: InputItem
): valuesState {
  const tempValue: number = prev.display
    ? prev.display.endsWith("%")
      ? parseFloat(prev.display) / 100
      : Number(prev.display)
    : prev.result;

  console.log(prev);

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

export function handleNumber(prev: valuesState, item: InputItem): valuesState {
  if (prev.waitingForOperand)
    return {
      ...prev,
      display: prev.display + item.value,
      waitingForOperand: false,
    };
  else
    return {
      ...prev,
      display: prev.display + item.value,
    };
}

export function handleOperator(
  prev: valuesState,
  item: InputItem,
  tempValue: number
): valuesState {
  if ("operator" !== item.type) return prev;

  console.log(item);

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
      waitingForOperand: false,
      result: tempValue,
      equation: roundedValue(tempValue, 3) + displayOperator,
    };
  else if (prev.waitingForOperand)
    return {
      ...prev,
      display: "",
      operator: item.value,
      equation: prev.equation.replace(/[+-×÷]$/g, displayOperator),
    };
  else return handleEquation(prev, tempValue, item.value, displayOperator);
}

export function handleEqual(prev: valuesState, tempValue: number): valuesState {
  return !prev.equation && prev.operator === undefined
    ? { ...prev, result: tempValue }
    : handleEquation(prev, tempValue);
}

export function handleEquation(
  prev: valuesState,
  tempValue: number,
  operator?: Operator,
  displayOperator?: string
): valuesState {
  const handleOperator = (result: number) => {
    return {
      ...prev,
      display: "",
      result: result,
      operator: operator,
      waitingForOperand: true,
      equation:
        prev.equation +
        tempValue +
        (operator !== undefined ? displayOperator : ""),
    };
    console.log(prev);
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

export function handleClear(prev: valuesState): valuesState {
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
  prev: valuesState,
  tempValue: number
): valuesState {
  return prev.display
    ? { ...prev, display: (-tempValue).toString() }
    : { ...prev, result: -prev.result };
}

export function handlePercentage(prev: valuesState, tempValue: number) {
  return { ...prev, display: tempValue.toString() + "%" };
}
