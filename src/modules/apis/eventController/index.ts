import { EventController } from "../../renderer/eventController";
import { Api } from "../index";

interface EventControllerApiType {
	emit(eventName: string, ...args: unknown[]): void;
	call(eventName: string, ...args: unknown[]): Promise<unknown>;
	listen(
		eventName: string,
		listener: (event: Electron.IpcRendererEvent, ...args: unknown[]) => void
	): void;
}

export const EventControllerApi: Api<EventControllerApiType> = {
	key: "EventController",
	api: {
		emit: EventController.emit,
		call: EventController.call,
		listen: EventController.listen
	}
};
