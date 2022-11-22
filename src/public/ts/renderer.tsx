// Webpack Loading
import "../html/index.html";
import "../css/index.css";

// Components
import { App } from "../routes/App";
import { Auth } from "../routes/Auth";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

// Utilities
import { $ } from "../../modules/renderer/utils";

// Dependencies
import { marked } from "marked";

import * as ReactDOM from "react-dom/client";
import * as React from "react";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
	getAuth,
	GithubAuthProvider,
	onAuthStateChanged,
	setPersistence,
	signInWithPopup,
	indexedDBLocalPersistence,
	User
} from "firebase/auth";
// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
// import { App } from "../components/App";

marked.use({
	breaks: true,
	xhtml: true,
	renderer: {
		link(href) {
			return `<a href="${href}">${href}</a>`;
		},
		heading(_, level, raw) {
			return "#".repeat(level) + " " + raw;
		},
		html(html) {
			const elem = document.createElement("p");
			elem.innerText = html;
			return elem.innerHTML;
		}
	}
});

function changeMaxRestoreIcon(maximized: boolean) {
	$("#window-maximize-restore").innerHTML = maximized
		? `<svg width="11" height="11" viewBox="0 0 11 11"><path d="M11 8.8H8.8V11H0V2.2h2.2V0H11zM7.7 3.3H1.1v6.6h6.6zm2.2-2.2H3.3v1.1h5.5v5.5h1.1z"/></svg>`
		: `<svg width="10" height="10" viewBox="0 0 10 10"><path d="M10 0v10H0V0zM9 1H1v8h8z"/></svg>`;
}

window.EventController.listen("max-update", (_, maximized: boolean) => {
	changeMaxRestoreIcon(maximized);
});

changeMaxRestoreIcon(await window.app.isMaximized());

$("#window-close").addEventListener("click", () => window.app.close());
$("#window-maximize-restore").addEventListener("click", () =>
	window.app.maximizeRestore()
);
$("#window-minimize").addEventListener("click", () => window.app.minimize());

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
	apiKey: "AIzaSyDOigly2OpdMqyEWpD8APgY1IsYiuuKRzk",
	authDomain: "connect-spa.firebaseapp.com",
	projectId: "connect-spa",
	storageBucket: "connect-spa.appspot.com",
	messagingSenderId: "121310370203",
	appId: "1:121310370203:web:ee6dd98faaef192d27e93e",
	measurementId: "G-2SFVPJ2NZE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// const response = await signInWithPopup(auth, new GithubAuthProvider());

// // Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// // key is the counterpart to the secret key you set in the Firebase console.
// const appCheck = initializeAppCheck(app, {
// 	provider: new ReCaptchaV3Provider(
// 		"6LfvwiMjAAAAAMerpjF0nOyAxaNTzXnsYNyapeZB"
// 	),

// 	// Optional argument. If true, the SDK automatically refreshes App Check
// 	// tokens as needed.
// 	isTokenAutoRefreshEnabled: true
// });

// const response = await signInWithPopup(auth, new GithubAuthProvider());

// onAuthStateChanged(auth, user => {
// 	if (user) {
// 		console.debug(user.metadata);
// 	} else {
// 		console.debug("Logged out");
// 	}
// });

const router = createMemoryRouter([
	{
		path: "/",
		element: <Auth auth={auth} />
	},
	{
		path: "/app",
		element: <App />
	}
]);

let user: User;

const unsubscribe = onAuthStateChanged(auth, async _user => {
	if (_user) {
		console.debug("Logged in");
		// User is logged in through persistence
		user = _user;
	} else {
		// User is not logged in, set persistance to not expire until signout, then issue login popup
		await setPersistence(auth, indexedDBLocalPersistence);

		await signInWithPopup(auth, new GithubAuthProvider());
	}
});

unsubscribe();

const root = ReactDOM.createRoot($("main"));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
