/**
 * Wrapper for IpcRenderer
 */

import { ipcRenderer } from "electron";

interface Metadata {
	respond: false | string;
	hasResponse: boolean;
	response?: unknown;
}

export class EventController {
	static emit(eventName: string, ...args: unknown[]) {
		const metadata: Metadata = {
			respond: false,
			hasResponse: false
		};

		ipcRenderer.send(eventName, metadata, ...args);
	}

	static call(eventName: string, ...args: unknown[]) {
		const channel = window.crypto.randomUUID();

		const promise = new Promise<unknown>((resolve, reject) => {
			ipcRenderer.once(channel, (_event, ...args) => {
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

		ipcRenderer.send(eventName, metadata, ...args);
		return promise;
	}

	static listen(
		eventName: string,
		listener: (event: Electron.IpcRendererEvent, ...args: unknown[]) => void
	) {
		ipcRenderer.on(eventName, (event, ...args) => {
			const metadata: Metadata = args.shift();
			const response = listener(event, ...args);

			if (metadata.respond) {
				const responseData: Metadata = {
					respond: false,
					hasResponse: true,
					response: response
				};
				ipcRenderer.emit(metadata.respond, responseData);
			}
		});
	}
}
