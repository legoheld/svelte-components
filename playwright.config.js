/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
	webServer: {
		command: 'npm run dev',
		port: 5173
	},
	use: {
		baseURL: 'http://localhost:5173'
	}
};

export default config;