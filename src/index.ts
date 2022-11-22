/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { app, BrowserWindow } from "electron";
import { EventController } from "./modules/eventController/index";

import installExtension, {
	REACT_DEVELOPER_TOOLS
} from "electron-devtools-installer";

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

	// window.webContents.on("will-navigate", (e, url) => {
	// 	e.preventDefault();
	// 	shell.openExternal(url);
	// });

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
	installExtension(REACT_DEVELOPER_TOOLS)
		.then(name => console.log(`Developer Extension '${name}' added`))
		.catch(e => console.error(e));

	// const client = new Auth0.Client({
	// 	keytar: {
	// 		service: "connect-oauth"
	// 	},
	// 	auth0: {
	// 		clientId: "1KwETsj3JZk1PSrmuFCJqfVyXBOnfg25",
	// 		domain: "connect-org.us.auth0.com",
	// 		audience: "https://connect-org.us.auth0.com/api/v2/",
	// 		scopes: [
	// 			"openid",
	// 			"profile",
	// 			"offline_access",
	// 			"email",
	// 			"read:current_user",
	// 			"update:current_user_metadata",
	// 			"create:current_user_metadata"
	// 		]
	// 	},
	// 	window: {
	// 		width: 470,
	// 		height: 680,
	// 		resizable: false,
	// 		icon: "../assets/images/connect-icon.png"
	// 	}
	// });
	// client.login().then(launchApp);
	launchApp();
	app.on(
		"activate",
		() => BrowserWindow.getAllWindows().length === 0 && app.relaunch()
	);
});

app.on("window-all-closed", () => process.platform !== "darwin" && app.quit());
