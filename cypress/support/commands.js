import 'cypress-file-upload';

Cypress.Commands.add('generateRandomProductName', () => {
	let currentDate = new Date();
	return 'Auto Test Product ' + currentDate.getTime();
});
