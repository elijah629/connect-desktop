/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { app, BrowserWindow, shell } from "electron";
import { EventController } from "./modules/eventController/index";
import * as settings from "electron-settings";

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

import installExtension, {
	REACT_DEVELOPER_TOOLS
} from "electron-devtools-installer";
import { isType } from "./modules/utils";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
	app.quit();
}

const launchApp = () => {
	const window = new BrowserWindow({
		title: "Connect",
		width: 945,
		minWidth: 945,
		height: 500,
		minHeight: 500,
		webPreferences: {
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
		},
		frame: false
	});

	EventController.listen("app", (e, command: string) => {
		const win = BrowserWindow.fromWebContents(e.sender)!;

		switch (command) {
			case "close":
				win.close();
				break;
			case "minimize":
				win.minimize();
				break;
			case "maximize-restore":
				if (win.isMaximized()) {
					win.unmaximize();
				} else {
					win.maximize();
				}
				break;
			case "isMaximized":
				return win.isMaximized();
			default:
				throw new Error("Unknown app command " + command);
		}
	});

	EventController.listen("settings", (event, command: string, ...args) => {
		switch (command) {
			case "get":
				return settings.getSync();
			case "set":
				if (isType<SettingsObject>(args[0])) {
					settings.setSync(args[0]);
				}
				break;
			case "file":
				return settings.file();
		}
	});

	const windowEvents = new EventController(window.webContents);

	window.on("maximize", () => {
		windowEvents.emit("max-update", true);
	});

	window.on("unmaximize", () => {
		windowEvents.emit("max-update", false);
	});

	window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
	if (!app.isPackaged) {
		window.webContents.openDevTools();
	}
};

app.whenReady().then(() => {
	if (!app.isPackaged) {
		installExtension(REACT_DEVELOPER_TOOLS)
			.then(name =>
				console.debug(
					`[Main:Debug:DeveloperExtensions] Developer Extension "${name}" added`
				)
			)
			.catch(e => console.error("[Main:Error:DeveloperExtensions]", e));
	}

	launchApp();
	app.on(
		"activate",
		() => BrowserWindow.getAllWindows().length === 0 && app.relaunch()
	);
});

app.on("window-all-closed", () => process.platform !== "darwin" && app.quit());
