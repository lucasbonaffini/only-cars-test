/* ELEMENTS */

import Navbar from './Navbar';

const PRODUCT_CARD = 'article.car-card';
const PAGINATION_SECTION = 'div.pagination';

/* TEXTS AND CONSTANTS */

const DESKTOP_MAX_PRODUCTS = 10;

class Home extends Navbar {
	openOnlyCars() {
		cy.visit(Cypress.env('FRONTEND_URL'));
	}

	/**
	 *
	 * @param {boolean} isLoggedIn
	 */
	isHomePageDisplayed(isLoggedIn, username) {
		this.isNavbarDisplayed(isLoggedIn, username);

		cy.get(PRODUCT_CARD)
			.should('have.lengthOf', DESKTOP_MAX_PRODUCTS)
			.each((product) => {
				cy.wrap(product).should('be.visible');
			});

		cy.get(PAGINATION_SECTION).should('be.visible');
	}
}

export default Home;
