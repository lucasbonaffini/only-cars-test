import filterTests from '../support/filterTests';
import Home from '../support/page-objects/Home';

filterTests(['regression'], function () {
	describe('Verify home page visibility and behavior', function () {
		const allure = Cypress.Allure.reporter.getInterface();
		const home = new Home();

		beforeEach('Open OnlyCars home page', function () {
			home.openOnlyCars();
		});

		allure.parentSuite('User');
		allure.suite('Home');

		it('Verify the content of the Home page', function () {
			home.isHomePageDisplayed(false);
		});
	});
});
