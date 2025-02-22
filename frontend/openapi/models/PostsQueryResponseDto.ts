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
import type { PostQueryResponseDto } from './PostQueryResponseDto';
import {
    PostQueryResponseDtoFromJSON,
    PostQueryResponseDtoFromJSONTyped,
    PostQueryResponseDtoToJSON,
    PostQueryResponseDtoToJSONTyped,
} from './PostQueryResponseDto';

/**
 * The DTO used as the response body of multiple-post queries.
 * @export
 * @interface PostsQueryResponseDto
 */
export interface PostsQueryResponseDto {
    /**
     * The total number of posts there are. Used for pagination purposes.
     * @type {number}
     * @memberof PostsQueryResponseDto
     */
    count: number;
    /**
     * The returned posts.
     * @type {Array<PostQueryResponseDto>}
     * @memberof PostsQueryResponseDto
     */
    posts: Array<PostQueryResponseDto>;
}

/**
 * Check if a given object implements the PostsQueryResponseDto interface.
 */
export function instanceOfPostsQueryResponseDto(value: object): value is PostsQueryResponseDto {
    if (!('count' in value) || value['count'] === undefined) return false;
    if (!('posts' in value) || value['posts'] === undefined) return false;
    return true;
}

export function PostsQueryResponseDtoFromJSON(json: any): PostsQueryResponseDto {
    return PostsQueryResponseDtoFromJSONTyped(json, false);
}

export function PostsQueryResponseDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PostsQueryResponseDto {
    if (json == null) {
        return json;
    }
    return {
        
        'count': json['count'],
        'posts': ((json['posts'] as Array<any>).map(PostQueryResponseDtoFromJSON)),
    };
}

export function PostsQueryResponseDtoToJSON(json: any): PostsQueryResponseDto {
    return PostsQueryResponseDtoToJSONTyped(json, false);
}

export function PostsQueryResponseDtoToJSONTyped(value?: PostsQueryResponseDto | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'count': value['count'],
        'posts': ((value['posts'] as Array<any>).map(PostQueryResponseDtoToJSON)),
    };
}

