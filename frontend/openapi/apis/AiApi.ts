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
  AiSafetyQueryResponseDto,
  ProblemDetails,
} from '../models/index';
import {
    AiSafetyQueryResponseDtoFromJSON,
    AiSafetyQueryResponseDtoToJSON,
    ProblemDetailsFromJSON,
    ProblemDetailsToJSON,
} from '../models/index';

export interface ApiAiCheckimagePostRequest {
    image: Blob;
}

export interface ApiAiChecktextGetRequest {
    text: string;
}

export interface ApiAiGuesstagsGetRequest {
    title: string;
}

/**
 * 
 */
export class AiApi extends runtime.BaseAPI {

    /**
     * Checks if an image contains inappropriate content using AI. If the AI service is unavailable, defaults to returning \"safe\".
     */
    async apiAiCheckimagePostRaw(requestParameters: ApiAiCheckimagePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AiSafetyQueryResponseDto>> {
        if (requestParameters['image'] == null) {
            throw new runtime.RequiredError(
                'image',
                'Required parameter "image" was null or undefined when calling apiAiCheckimagePost().'
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

        if (requestParameters['image'] != null) {
            formParams.append('image', requestParameters['image'] as any);
        }

        const response = await this.request({
            path: `/api/Ai/checkimage`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AiSafetyQueryResponseDtoFromJSON(jsonValue));
    }

    /**
     * Checks if an image contains inappropriate content using AI. If the AI service is unavailable, defaults to returning \"safe\".
     */
    async apiAiCheckimagePost(requestParameters: ApiAiCheckimagePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AiSafetyQueryResponseDto> {
        const response = await this.apiAiCheckimagePostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Checks if a piece of text contains inappropriate content using AI. If the AI service is unavailable, defaults to returning \"safe\".
     */
    async apiAiChecktextGetRaw(requestParameters: ApiAiChecktextGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AiSafetyQueryResponseDto>> {
        if (requestParameters['text'] == null) {
            throw new runtime.RequiredError(
                'text',
                'Required parameter "text" was null or undefined when calling apiAiChecktextGet().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['text'] != null) {
            queryParameters['text'] = requestParameters['text'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/Ai/checktext`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AiSafetyQueryResponseDtoFromJSON(jsonValue));
    }

    /**
     * Checks if a piece of text contains inappropriate content using AI. If the AI service is unavailable, defaults to returning \"safe\".
     */
    async apiAiChecktextGet(requestParameters: ApiAiChecktextGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AiSafetyQueryResponseDto> {
        const response = await this.apiAiChecktextGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Guess what tags a post may have from its title.
     */
    async apiAiGuesstagsGetRaw(requestParameters: ApiAiGuesstagsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<string>>> {
        if (requestParameters['title'] == null) {
            throw new runtime.RequiredError(
                'title',
                'Required parameter "title" was null or undefined when calling apiAiGuesstagsGet().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['title'] != null) {
            queryParameters['title'] = requestParameters['title'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/Ai/guesstags`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Guess what tags a post may have from its title.
     */
    async apiAiGuesstagsGet(requestParameters: ApiAiGuesstagsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<string>> {
        const response = await this.apiAiGuesstagsGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
