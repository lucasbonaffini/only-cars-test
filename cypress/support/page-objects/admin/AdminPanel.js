import Navbar from '../Navbar';

/* ELEMENTS */

const WELCOME_CARD = 'div.welcome-admin';
const OPTIONS_CAROUSEL = 'div.add-product';

/* TEXTS */

class AdminPanel extends Navbar {
	isAdminPanelPageDisplayed(username) {
		this.isNavbarDisplayed(true, username);
		cy.get(WELCOME_CARD).should('be.visible');
	}

	openAdminOption(option) {
		cy.contains(OPTIONS_CAROUSEL, option).click();
	}
}

export default AdminPanel;
