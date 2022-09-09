export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Operator = "+" | "-" | "*" | "/" | "=" | "%";
//enum => Operator.plus
export type Params = {
  tempValue: number;
  operator?: Operator;
  displayOperator?: string;
};
export type ValuesState = {
  display: string;
  waitingForOperand: boolean;
  result: number;
  operator: Operator | undefined;
  equation: string;
  pressedEqual?: boolean;
};
export type PadValues = {
  changeTheme?: () => void;
  onSwitchValueChange?: () => void;
  withSwitch?: boolean;
  switchValue?: boolean;
  isLight?: boolean;
  navigation?: any;
  children?: any;
  setLanguage?: any;
  language?: string;
};
