export type Player = "AI" | "HUM" | undefined;

export default interface ValuesModel {
  [key: number]: Player;
}
