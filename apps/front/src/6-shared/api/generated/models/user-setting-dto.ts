/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

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
