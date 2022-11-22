import { AppAPI } from "../../modules/apis/app";
import { EventController } from "../../modules/renderer/eventController";

export {};
declare global {
	interface Window {
		EventController: typeof EventController;
		app: typeof AppAPI.api;
		crypto: {
			randomUUID(): string;
		};
	}
	interface Crypto {
		randomUUID(): string;
	}
}
