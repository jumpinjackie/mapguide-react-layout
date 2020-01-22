import { IFormatDriver } from "./format-driver";

const _drivers: IFormatDriver[] = [];

export function getFormatDrivers() { return _drivers; }

export function addFormatDriver(driver: IFormatDriver) {
    _drivers.push(driver);
}