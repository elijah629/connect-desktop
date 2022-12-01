import { EventController } from "../../renderer/eventController";
import { Api } from "..";
import { isType } from "../../utils";

interface AppApiType {
	close(): void;
	minimize(): void;
	maximizeRestore(): void;
	isMaximized(): Promise<boolean>;
}

const api: AppApiType = {
	close: () => EventController.emit("app", "close"),
	minimize: () => EventController.emit("app", "minimize"),
	maximizeRestore: () => EventController.emit("app", "maximize-restore"),
	isMaximized: async () => {
		const isMaximized = await EventController.call("app", "isMaximized");

		if (isType<boolean>(isMaximized)) {
			return isMaximized;
		}
	}
};

export const AppApi: Api<AppApiType> = {
	key: "app",
	api: api
};
