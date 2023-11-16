import filterTests from '../support/filterTests';
import Home from '../support/page-objects/Home';
import Login from '../support/page-objects/Login';
import { ADMIN_PANEL_OPTION, ADD_PRODUCT_ACTION } from '../support/constants';
import AdminPanel from '../support/page-objects/admin/AdminPanel';
import AddProduct from '../support/page-objects/admin/AddProduct';

filterTests(['regression', 'admin'], function () {
	describe('Verify an Admin user can add new products', function () {
		const allure = Cypress.Allure.reporter.getInterface();
		const home = new Home();
		const login = new Login();
		const adminPanel = new AdminPanel();
		const addProduct = new AddProduct();

		beforeEach('Open OnlyCars home page', function () {
			home.openOnlyCars();
		});

		allure.parentSuite('Admin');
		allure.suite('Products');

		it('Verify an Admin user can add a new product with one image', function () {
			home.isHomePageDisplayed(false, Cypress.env('ADMIN_USERNAME'));
			login.doLogin(Cypress.env('ADMIN_USERNAME'), Cypress.env('ADMIN_PASSWORD'));
			home.isHomePageDisplayed(true, Cypress.env('ADMIN_USERNAME'));
			home.openUserMenu();
			home.selectUserMenuOption(ADMIN_PANEL_OPTION);
			adminPanel.closeUserMenu();
			adminPanel.isAdminPanelPageDisplayed(Cypress.env('ADMIN_USERNAME'));
			adminPanel.openAdminOption(ADD_PRODUCT_ACTION);
			addProduct.isAddProductModalDisplayed();
			addProduct.addProduct(1);
		});

		allure.parentSuite('Admin');
		allure.suite('Products');

		it('Verify an Admin user can add a new product with many images', function () {
			home.isHomePageDisplayed(false, Cypress.env('ADMIN_USERNAME'));
			login.doLogin(Cypress.env('ADMIN_USERNAME'), Cypress.env('ADMIN_PASSWORD'));
			home.isHomePageDisplayed(true, Cypress.env('ADMIN_USERNAME'));
			home.openUserMenu();
			home.selectUserMenuOption(ADMIN_PANEL_OPTION);
			adminPanel.closeUserMenu();
			adminPanel.isAdminPanelPageDisplayed(Cypress.env('ADMIN_USERNAME'));
			adminPanel.openAdminOption(ADD_PRODUCT_ACTION);
			addProduct.isAddProductModalDisplayed();
			addProduct.addProduct(2);
		});
	});
});
