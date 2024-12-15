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
  CommentsQueryResponseDto,
  PostQueryResponseDto,
  PostSortKey,
  PostsQueryResponseDto,
  ProblemDetails,
  SortDirection,
} from '../models/index';
import {
    CommentsQueryResponseDtoFromJSON,
    CommentsQueryResponseDtoToJSON,
    PostQueryResponseDtoFromJSON,
    PostQueryResponseDtoToJSON,
    PostSortKeyFromJSON,
    PostSortKeyToJSON,
    PostsQueryResponseDtoFromJSON,
    PostsQueryResponseDtoToJSON,
    ProblemDetailsFromJSON,
    ProblemDetailsToJSON,
    SortDirectionFromJSON,
    SortDirectionToJSON,
} from '../models/index';

export interface ApiPostsGetRequest {
    start?: number;
    range?: number;
    sortBy?: PostSortKey;
    sortDirection?: SortDirection;
    author?: string;
    tag?: string;
    title?: string;
    content?: string;
}

export interface ApiPostsIdGetRequest {
    id: number;
}

export interface ApiPostsPostRequest {
    title: string;
    content: string;
    tags?: Array<string>;
    attachments?: Array<Blob>;
}

export interface ApiPostsPostIdCommentsGetRequest {
    postId: number;
    start?: number;
    range?: number;
    sortDirection?: SortDirection;
}

export interface ApiPostsPostIdCommentsPostRequest {
    postId: number;
    content: string;
}

/**
 * 
 */
export class PostsApi extends runtime.BaseAPI {

    /**
     * Queries posts by various query parameters. If multiple criteria are given, this searches for posts that satisfy all of them.
     */
    async apiPostsGetRaw(requestParameters: ApiPostsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PostsQueryResponseDto>> {
        const queryParameters: any = {};

        if (requestParameters['start'] != null) {
            queryParameters['Start'] = requestParameters['start'];
        }

        if (requestParameters['range'] != null) {
            queryParameters['Range'] = requestParameters['range'];
        }

        if (requestParameters['sortBy'] != null) {
            queryParameters['SortBy'] = requestParameters['sortBy'];
        }

        if (requestParameters['sortDirection'] != null) {
            queryParameters['SortDirection'] = requestParameters['sortDirection'];
        }

        if (requestParameters['author'] != null) {
            queryParameters['Author'] = requestParameters['author'];
        }

        if (requestParameters['tag'] != null) {
            queryParameters['Tag'] = requestParameters['tag'];
        }

        if (requestParameters['title'] != null) {
            queryParameters['Title'] = requestParameters['title'];
        }

        if (requestParameters['content'] != null) {
            queryParameters['Content'] = requestParameters['content'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/Posts`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PostsQueryResponseDtoFromJSON(jsonValue));
    }

    /**
     * Queries posts by various query parameters. If multiple criteria are given, this searches for posts that satisfy all of them.
     */
    async apiPostsGet(requestParameters: ApiPostsGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PostsQueryResponseDto> {
        const response = await this.apiPostsGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Quries a post by its ID.
     */
    async apiPostsIdGetRaw(requestParameters: ApiPostsIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PostQueryResponseDto>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling apiPostsIdGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/Posts/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PostQueryResponseDtoFromJSON(jsonValue));
    }

    /**
     * Quries a post by its ID.
     */
    async apiPostsIdGet(requestParameters: ApiPostsIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PostQueryResponseDto> {
        const response = await this.apiPostsIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Submits a new post. Tags that were not known by the DB are automatically added to it as \"topic\" tags.
     */
    async apiPostsPostRaw(requestParameters: ApiPostsPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['title'] == null) {
            throw new runtime.RequiredError(
                'title',
                'Required parameter "title" was null or undefined when calling apiPostsPost().'
            );
        }

        if (requestParameters['content'] == null) {
            throw new runtime.RequiredError(
                'content',
                'Required parameter "content" was null or undefined when calling apiPostsPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const consumes: runtime.Consume[] = [
            { contentType: 'multipart/form-data' },
        ];
        // @ts-ignore: canConsumeForm may be unused
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters['title'] != null) {
            formParams.append('Title', requestParameters['title'] as any);
        }

        if (requestParameters['content'] != null) {
            formParams.append('Content', requestParameters['content'] as any);
        }

        if (requestParameters['tags'] != null) {
            requestParameters['tags'].forEach((element) => {
                formParams.append('Tags', element as any);
            })
        }

        if (requestParameters['attachments'] != null) {
            requestParameters['attachments'].forEach((element) => {
                formParams.append('Attachments', element as any);
            })
        }

        const response = await this.request({
            path: `/api/Posts`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Submits a new post. Tags that were not known by the DB are automatically added to it as \"topic\" tags.
     */
    async apiPostsPost(requestParameters: ApiPostsPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.apiPostsPostRaw(requestParameters, initOverrides);
    }

    /**
     * Queries comments under a post by various query parameters.
     */
    async apiPostsPostIdCommentsGetRaw(requestParameters: ApiPostsPostIdCommentsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CommentsQueryResponseDto>> {
        if (requestParameters['postId'] == null) {
            throw new runtime.RequiredError(
                'postId',
                'Required parameter "postId" was null or undefined when calling apiPostsPostIdCommentsGet().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['start'] != null) {
            queryParameters['Start'] = requestParameters['start'];
        }

        if (requestParameters['range'] != null) {
            queryParameters['Range'] = requestParameters['range'];
        }

        if (requestParameters['sortDirection'] != null) {
            queryParameters['SortDirection'] = requestParameters['sortDirection'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/Posts/{postId}/Comments`.replace(`{${"postId"}}`, encodeURIComponent(String(requestParameters['postId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CommentsQueryResponseDtoFromJSON(jsonValue));
    }

    /**
     * Queries comments under a post by various query parameters.
     */
    async apiPostsPostIdCommentsGet(requestParameters: ApiPostsPostIdCommentsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CommentsQueryResponseDto> {
        const response = await this.apiPostsPostIdCommentsGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Adds a comment to a post.
     */
    async apiPostsPostIdCommentsPostRaw(requestParameters: ApiPostsPostIdCommentsPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['postId'] == null) {
            throw new runtime.RequiredError(
                'postId',
                'Required parameter "postId" was null or undefined when calling apiPostsPostIdCommentsPost().'
            );
        }

        if (requestParameters['content'] == null) {
            throw new runtime.RequiredError(
                'content',
                'Required parameter "content" was null or undefined when calling apiPostsPostIdCommentsPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const consumes: runtime.Consume[] = [
            { contentType: 'multipart/form-data' },
        ];
        // @ts-ignore: canConsumeForm may be unused
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = false;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters['content'] != null) {
            formParams.append('Content', requestParameters['content'] as any);
        }

        const response = await this.request({
            path: `/api/Posts/{postId}/Comments`.replace(`{${"postId"}}`, encodeURIComponent(String(requestParameters['postId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Adds a comment to a post.
     */
    async apiPostsPostIdCommentsPost(requestParameters: ApiPostsPostIdCommentsPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.apiPostsPostIdCommentsPostRaw(requestParameters, initOverrides);
    }

}
