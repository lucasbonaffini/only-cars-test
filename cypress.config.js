const { defineConfig } = require('cypress');
const dotenvPlugin = require('cypress-dotenv');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
	defaultCommandTimeout: 15000,
	viewportWidth: 1920,
	viewportHeight: 1080,
	requestTimeout: 30000,
	numTestsKeptInMemory: 5,
	responseTimeout: 50000,
	pageLoadTimeout: 200000,
	chromeWebSecurity: false,
	screenshotOnRunFailure: true,
	video: true,
	taskTimeout: 600000,
	retries: {
		openMode: 0,
		runMode: 0,
	},
	env: {
		allure: true,
		allureResultsPath: 'allure-results',
		allureAddVideoOnPass: true,
	},
	chromeWebSecurity: false,
	e2e: {
		experimentalMemoryManagement: true,
		experimentalRunAllSpecs: true,
		setupNodeEvents(on, config) {
			// implement node event listeners here
			config = dotenvPlugin(config);
			allureWriter(on, config);
			return config;
		},
	},
});
