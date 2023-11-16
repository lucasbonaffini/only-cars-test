/* ELEMENTS */

const NAVBAR_LOGO = 'img[alt="Logo"]';
const NAVBAR_BTNS = 'div.navButton';
const USER_MENU_ITEM = 'a[role="menuitem"]';
const NAVBAR_OVERLAY = 'div.MuiBackdrop-root';

/* TEXTS */

const LOGO_URL = '/assets/OnlyCars_1-fc716688.png';
const NAVBAR_BTNS_TXT = ['Iniciar sesión', 'Crear usuario'];

class Navbar {
	/**
	 *
	 * @param {boolean} isLoggedIn
	 * @param {string} username
	 */
	isNavbarDisplayed(isLoggedIn, username) {
		cy.get(NAVBAR_LOGO).should('be.visible').and('have.attr', 'src', LOGO_URL);
		if (isLoggedIn) {
			NAVBAR_BTNS_TXT.forEach((navBtnTxt) => {
				cy.log(navBtnTxt);
				cy.get('nav').contains('button', navBtnTxt).should('not.exist');
			});

			cy.get(NAVBAR_BTNS).should('be.visible').find('button').should('be.visible').and('contain.text', username[0]);
		} else {
			cy.get(NAVBAR_BTNS)
				.should('be.visible')
				.find('button')
				.each((navBtn, index) => {
					cy.wrap(navBtn).should('be.visible').and('contain.text', NAVBAR_BTNS_TXT[index]);
				});
		}
	}

	openLoginModal() {
		cy.contains('nav button', NAVBAR_BTNS_TXT[0]).click();
	}

	openUserMenu() {
		cy.get('nav button').click();
	}

	closeUserMenu() {
		cy.get(NAVBAR_OVERLAY).click({ force: true });
	}

	selectUserMenuOption(option) {
		cy.contains(USER_MENU_ITEM, option).click();
	}
}

export default Navbar;
