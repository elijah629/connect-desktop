import { EventController } from "../../renderer/eventController";
import { Api } from "..";
import { isType } from "../../utils";

type SettingsValue =
	| null
	| boolean
	| string
	| number
	| SettingsObject
	| SettingsValue[];

type SettingsObject = {
	[key: string]: SettingsValue;
};

interface SettingsApiType {
	get(): Promise<SettingsObject>;
	set(settings: SettingsObject): void;
	file(): Promise<string>;
}

const api: SettingsApiType = {
	get: async () => {
		const settings = await EventController.call("settings", "get");
		if (isType<SettingsObject>(settings)) {
			return settings;
		}
	},
	set: (settings: SettingsObject) =>
		EventController.emit("settings", "set", settings),
	file: async () => {
		const file = await EventController.call("settings", "file");
		if (isType<string>(file)) {
			return file;
		}
	}
};

export const SettingsApi: Api<SettingsApiType> = {
	key: "settings",
	api: api
};
