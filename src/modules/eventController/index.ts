/**
 * Wrapper for IpcMain
 */

import * as crypto from "crypto";
import { ipcMain, WebContents } from "electron";
const uuid = () => crypto.randomUUID();

interface Metadata {
	respond: false | string;
	hasResponse: boolean;
	response?: unknown;
}

export class EventController {
	webContents: WebContents;
	constructor(webContents: WebContents) {
		this.webContents = webContents;
	}
	emit(eventName: string, ...args: unknown[]) {
		const metadata: Metadata = {
			respond: false,
			hasResponse: false
		};

		this.webContents.send(eventName, metadata, ...args);
	}
	call(eventName: string, ...args: unknown[]) {
		const channel = "response:" + uuid();
		const promise = new Promise<unknown>((resolve, reject) => {
			ipcMain.once(channel, (_event, ...args) => {
				const metadata: Metadata = args[0];
				const response = metadata.response;

				if (metadata.hasResponse) {
					resolve(response);
				} else {
					reject(
						`Event's metadata recieved on response channel does not include a response. This may mean that you are already using the channel "${channel}" elsewhere`
					);
				}
			});
		});

		const metadata: Metadata = {
			respond: channel,
			hasResponse: false
		};

		this.webContents.send(eventName, metadata, ...args);
		return promise;
	}
	static listen(
		eventName: string,
		listener: (event: Electron.IpcMainEvent, ...args: unknown[]) => unknown
	) {
		ipcMain.on(eventName, (event, ...args) => {
			const metadata: Metadata = args.shift();
			const response = listener(event, ...args);

			if (metadata.respond) {
				const responseData: Metadata = {
					respond: false,
					hasResponse: true,
					response: response
				};
				event.sender.send(metadata.respond, responseData);
			}
		});
	}
}
