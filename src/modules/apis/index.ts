/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge } from "electron";

export interface Api<T> {
	key: string;
	api: T;
}

export const loadApis = (apis: Api<any>[]) => {
	apis.forEach((api: Api<any>) =>
		contextBridge.exposeInMainWorld(api.key, api.api)
	);
};
