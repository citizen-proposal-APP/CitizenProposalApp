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
import type { TagQueryResponseDto } from './TagQueryResponseDto';
import {
    TagQueryResponseDtoFromJSON,
    TagQueryResponseDtoFromJSONTyped,
    TagQueryResponseDtoToJSON,
    TagQueryResponseDtoToJSONTyped,
} from './TagQueryResponseDto';

/**
 * The DTO used as the response body of multiple-tag queries.
 * @export
 * @interface TagsQueryResponseDto
 */
export interface TagsQueryResponseDto {
    /**
     * The total number of tags there are. Used for pagination purposes.
     * @type {number}
     * @memberof TagsQueryResponseDto
     */
    count: number;
    /**
     * The returned tags.
     * @type {Array<TagQueryResponseDto>}
     * @memberof TagsQueryResponseDto
     */
    tags: Array<TagQueryResponseDto>;
}

/**
 * Check if a given object implements the TagsQueryResponseDto interface.
 */
export function instanceOfTagsQueryResponseDto(value: object): value is TagsQueryResponseDto {
    if (!('count' in value) || value['count'] === undefined) return false;
    if (!('tags' in value) || value['tags'] === undefined) return false;
    return true;
}

export function TagsQueryResponseDtoFromJSON(json: any): TagsQueryResponseDto {
    return TagsQueryResponseDtoFromJSONTyped(json, false);
}

export function TagsQueryResponseDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): TagsQueryResponseDto {
    if (json == null) {
        return json;
    }
    return {
        
        'count': json['count'],
        'tags': ((json['tags'] as Array<any>).map(TagQueryResponseDtoFromJSON)),
    };
}

export function TagsQueryResponseDtoToJSON(json: any): TagsQueryResponseDto {
    return TagsQueryResponseDtoToJSONTyped(json, false);
}

export function TagsQueryResponseDtoToJSONTyped(value?: TagsQueryResponseDto | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'count': value['count'],
        'tags': ((value['tags'] as Array<any>).map(TagQueryResponseDtoToJSON)),
    };
}

