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
import type { TagQueryResponseDto } from './TagQueryResponseDto';
import {
    TagQueryResponseDtoFromJSON,
    TagQueryResponseDtoFromJSONTyped,
    TagQueryResponseDtoToJSON,
    TagQueryResponseDtoToJSONTyped,
} from './TagQueryResponseDto';

/**
 * The DTO used as the response body of single-post queries.
 * @export
 * @interface PostQueryResponseDto
 */
export interface PostQueryResponseDto {
    /**
     * The primary key.
     * @type {number}
     * @memberof PostQueryResponseDto
     */
    id: number;
    /**
     * The title of this post.
     * @type {string}
     * @memberof PostQueryResponseDto
     */
    title: string;
    /**
     * The text of this post.
     * @type {string}
     * @memberof PostQueryResponseDto
     */
    content: string;
    /**
     * The date when this post was posted.
     * @type {Date}
     * @memberof PostQueryResponseDto
     */
    postedTime: Date;
    /**
     * The tags on this post.
     * @type {Array<TagQueryResponseDto>}
     * @memberof PostQueryResponseDto
     */
    tags: Array<TagQueryResponseDto>;
    /**
     * 
     * @type {UserQueryResponseDto}
     * @memberof PostQueryResponseDto
     */
    author: UserQueryResponseDto;
    /**
     * The IDs of the attachments on this post. To get the attachments themselves, query them at ```/api/Attachments/{id}```.
     * @type {Array<number>}
     * @memberof PostQueryResponseDto
     */
    attachmentIds: Array<number>;
}

/**
 * Check if a given object implements the PostQueryResponseDto interface.
 */
export function instanceOfPostQueryResponseDto(value: object): value is PostQueryResponseDto {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('title' in value) || value['title'] === undefined) return false;
    if (!('content' in value) || value['content'] === undefined) return false;
    if (!('postedTime' in value) || value['postedTime'] === undefined) return false;
    if (!('tags' in value) || value['tags'] === undefined) return false;
    if (!('author' in value) || value['author'] === undefined) return false;
    if (!('attachmentIds' in value) || value['attachmentIds'] === undefined) return false;
    return true;
}

export function PostQueryResponseDtoFromJSON(json: any): PostQueryResponseDto {
    return PostQueryResponseDtoFromJSONTyped(json, false);
}

export function PostQueryResponseDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PostQueryResponseDto {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'title': json['title'],
        'content': json['content'],
        'postedTime': (new Date(json['postedTime'])),
        'tags': ((json['tags'] as Array<any>).map(TagQueryResponseDtoFromJSON)),
        'author': UserQueryResponseDtoFromJSON(json['author']),
        'attachmentIds': json['attachmentIds'],
    };
}

export function PostQueryResponseDtoToJSON(json: any): PostQueryResponseDto {
    return PostQueryResponseDtoToJSONTyped(json, false);
}

export function PostQueryResponseDtoToJSONTyped(value?: PostQueryResponseDto | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'title': value['title'],
        'content': value['content'],
        'postedTime': ((value['postedTime']).toISOString()),
        'tags': ((value['tags'] as Array<any>).map(TagQueryResponseDtoToJSON)),
        'author': UserQueryResponseDtoToJSON(value['author']),
        'attachmentIds': value['attachmentIds'],
    };
}

