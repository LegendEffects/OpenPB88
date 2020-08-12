export enum RotaryInputType {
  leftTurn,
  rightTurn,
  press
}

export interface IInputReceiver {
  onRotaryInput(type: RotaryInputType): void;
}