const colors = require("tailwindcss/colors")

module.exports = {
	mode: "jit",
	purge: ["./index.html", "./src/**/*.{ts,tsx}"],
	darkMode: "class", // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				"fox-light": "#D83A30",
				"rabbit-light": "#D9A900",
				"mouse-light": "#DC7441",
				"bird-light": "#36B0AE",

				"fox-dark": "#FF6666",
				"rabbit-dark": "#FBE545",
				"mouse-dark": "#F68B57",
				"bird-dark": "#5EC3C1",

				"warm-gray": colors.warmGray,
			},
			fontFamily: {
				serif: "Libre Baskerville",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/aspect-ratio")],
}
