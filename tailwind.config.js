/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "media",
	content: ["./src/**/*.{ts,tsx,html}"],
	theme: {
		fontFamily: {
			sans: [
				"Fira Code VF",
				"ui-monospace",
				"SFMono-Regular",
				"Menlo",
				"Monaco",
				"Consolas",
				"Liberation Mono",
				"Courier New",
				"monospace"
			]
		},
		extend: {
			colors: {
				"light-bg": "#efefef",
				"dark-bg": "#161f27"
			}
		}
	},
	plugins: []
};
