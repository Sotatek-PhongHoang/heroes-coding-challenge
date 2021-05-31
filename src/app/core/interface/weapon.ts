import { BaseWearable } from "./base-wearable";

export interface Weapon extends BaseWearable {
  damage: number;
  imageSrc?: string;
}