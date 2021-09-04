module.exports = {
	mode: "jit",
	purge: ["./index.html", "./src/**/*.{ts,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				serif: "Libre Baskerville",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
