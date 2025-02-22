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


import * as runtime from '../runtime';
import type {
  ProblemDetails,
  TagQueryResponseDto,
  TagsQueryResponseDto,
} from '../models/index';
import {
    ProblemDetailsFromJSON,
    ProblemDetailsToJSON,
    TagQueryResponseDtoFromJSON,
    TagQueryResponseDtoToJSON,
    TagsQueryResponseDtoFromJSON,
    TagsQueryResponseDtoToJSON,
} from '../models/index';

export interface ApiTagsGetRequest {
    keyword: string;
    start?: number;
    range?: number;
}

export interface ApiTagsIdGetRequest {
    id: number;
}

/**
 * 
 */
export class TagsApi extends runtime.BaseAPI {

    /**
     * Searches tags with a keyword. The result is always sorted ascendingly by the lengths of the tag names.
     */
    async apiTagsGetRaw(requestParameters: ApiTagsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TagsQueryResponseDto>> {
        if (requestParameters['keyword'] == null) {
            throw new runtime.RequiredError(
                'keyword',
                'Required parameter "keyword" was null or undefined when calling apiTagsGet().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['start'] != null) {
            queryParameters['Start'] = requestParameters['start'];
        }

        if (requestParameters['range'] != null) {
            queryParameters['Range'] = requestParameters['range'];
        }

        if (requestParameters['keyword'] != null) {
            queryParameters['Keyword'] = requestParameters['keyword'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/Tags`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TagsQueryResponseDtoFromJSON(jsonValue));
    }

    /**
     * Searches tags with a keyword. The result is always sorted ascendingly by the lengths of the tag names.
     */
    async apiTagsGet(requestParameters: ApiTagsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TagsQueryResponseDto> {
        const response = await this.apiTagsGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Quries a tag by its ID.
     */
    async apiTagsIdGetRaw(requestParameters: ApiTagsIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TagQueryResponseDto>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling apiTagsIdGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/Tags/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TagQueryResponseDtoFromJSON(jsonValue));
    }

    /**
     * Quries a tag by its ID.
     */
    async apiTagsIdGet(requestParameters: ApiTagsIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TagQueryResponseDto> {
        const response = await this.apiTagsIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
