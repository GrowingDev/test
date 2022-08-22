import { SensorData } from "./sensor-data.model";

export interface KitData {
    kitID: string;
    userID: string;
    kitName: string;
    Location: string;
    sensors?: SensorData[];
}