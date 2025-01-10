/* tslint:disable */
/* eslint-disable */
/**
 * Citizen Proposal App
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { UserQueryResponseDto } from './UserQueryResponseDto';
import {
    UserQueryResponseDtoFromJSON,
    UserQueryResponseDtoFromJSONTyped,
    UserQueryResponseDtoToJSON,
    UserQueryResponseDtoToJSONTyped,
} from './UserQueryResponseDto';

/**
 * The DTO used as the response body of multiple-user queries.
 * @export
 * @interface UsersQueryResponseDto
 */
export interface UsersQueryResponseDto {
    /**
     * The total number of users there are. Used for pagination purposes.
     * @type {number}
     * @memberof UsersQueryResponseDto
     */
    count: number;
    /**
     * The returned users.
     * @type {Array<UserQueryResponseDto>}
     * @memberof UsersQueryResponseDto
     */
    users: Array<UserQueryResponseDto>;
}

/**
 * Check if a given object implements the UsersQueryResponseDto interface.
 */
export function instanceOfUsersQueryResponseDto(value: object): value is UsersQueryResponseDto {
    if (!('count' in value) || value['count'] === undefined) return false;
    if (!('users' in value) || value['users'] === undefined) return false;
    return true;
}

export function UsersQueryResponseDtoFromJSON(json: any): UsersQueryResponseDto {
    return UsersQueryResponseDtoFromJSONTyped(json, false);
}

export function UsersQueryResponseDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): UsersQueryResponseDto {
    if (json == null) {
        return json;
    }
    return {
        
        'count': json['count'],
        'users': ((json['users'] as Array<any>).map(UserQueryResponseDtoFromJSON)),
    };
}

export function UsersQueryResponseDtoToJSON(json: any): UsersQueryResponseDto {
    return UsersQueryResponseDtoToJSONTyped(json, false);
}

export function UsersQueryResponseDtoToJSONTyped(value?: UsersQueryResponseDto | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'count': value['count'],
        'users': ((value['users'] as Array<any>).map(UserQueryResponseDtoToJSON)),
    };
}

