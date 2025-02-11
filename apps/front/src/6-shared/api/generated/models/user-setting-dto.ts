/* tslint:disable */
/* eslint-disable */
import { ValueType } from '../models/value-type';
export interface UserSettingDto {
    id: number;
    settingCode: string;
    settingValueType: ValueType;
    userId: number;
    valueBool?: boolean;
    valueInt?: number;
    valueJson?: {
        [key: string]: any;
    };
}
