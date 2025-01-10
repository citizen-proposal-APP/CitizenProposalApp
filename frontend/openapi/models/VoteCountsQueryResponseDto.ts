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
/**
 * Used as the response body when querying how many likes and dislikes a post has.
 * @export
 * @interface VoteCountsQueryResponseDto
 */
export interface VoteCountsQueryResponseDto {
    /**
     * How many likes the post has.
     * @type {number}
     * @memberof VoteCountsQueryResponseDto
     */
    likeCount: number;
    /**
     * How many dislikes the post has.
     * @type {number}
     * @memberof VoteCountsQueryResponseDto
     */
    dislikeCount: number;
}

/**
 * Check if a given object implements the VoteCountsQueryResponseDto interface.
 */
export function instanceOfVoteCountsQueryResponseDto(value: object): value is VoteCountsQueryResponseDto {
    if (!('likeCount' in value) || value['likeCount'] === undefined) return false;
    if (!('dislikeCount' in value) || value['dislikeCount'] === undefined) return false;
    return true;
}

export function VoteCountsQueryResponseDtoFromJSON(json: any): VoteCountsQueryResponseDto {
    return VoteCountsQueryResponseDtoFromJSONTyped(json, false);
}

export function VoteCountsQueryResponseDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): VoteCountsQueryResponseDto {
    if (json == null) {
        return json;
    }
    return {
        
        'likeCount': json['likeCount'],
        'dislikeCount': json['dislikeCount'],
    };
}

export function VoteCountsQueryResponseDtoToJSON(json: any): VoteCountsQueryResponseDto {
    return VoteCountsQueryResponseDtoToJSONTyped(json, false);
}

export function VoteCountsQueryResponseDtoToJSONTyped(value?: VoteCountsQueryResponseDto | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'likeCount': value['likeCount'],
        'dislikeCount': value['dislikeCount'],
    };
}

