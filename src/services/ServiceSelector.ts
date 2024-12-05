import {IApiService} from "./IApiService.ts";
import {MockService} from "./MockService.ts";
import {ApiService} from "./ApiService.ts";

export const ServiceSelector: IApiService = ApiService.getInstance();
//export const ServiceSelector: IApiService = MockService;