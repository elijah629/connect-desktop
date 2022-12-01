import { SettingsApi } from "../../modules/apis/settings";
import { AppApi } from "../../modules/apis/app";
import { EventController } from "../../modules/renderer/eventController";

export {};

declare global {
	interface Window {
		// APIs
		EventController: typeof EventController;
		app: typeof AppApi.api;
		settings: typeof SettingsApi.api;

		crypto: {
			randomUUID(): string;
		};
	}
	interface Crypto {
		randomUUID(): string;
	}
}
