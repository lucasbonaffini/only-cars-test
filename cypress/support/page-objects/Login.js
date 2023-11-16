import Navbar from './Navbar';

/* ELEMENTS */

const LOGIN_MODAL = 'div.MuiDialog-container';

/* TEXTS */

const LOGIN_MODAL_BTNS_TXT = ['Cancelar', 'Iniciar sesión'];
const LOGIN_MODAL_INPUTS_TXT = ['Nombre de usuario', 'Contraseña'];

class Login extends Navbar {
	#isLoginModalDisplayed() {
		cy.get(LOGIN_MODAL)
			.find('input')
			.each((loginInput, index) => {
				cy.wrap(loginInput).should('be.visible').and('have.value', '');
				cy.wrap(loginInput).click();
				cy.wrap(loginInput)
					.parent('div')
					.prev('label')
					.should('be.visible')
					.and('contain.text', LOGIN_MODAL_INPUTS_TXT[index]);
			});

		cy.get(LOGIN_MODAL)
			.find('button')
			.each((loginBtn, index) => {
				cy.wrap(loginBtn).should('be.visible').and('contain.text', LOGIN_MODAL_BTNS_TXT[index]);
			});
	}

	doLogin(username, password) {
		this.openLoginModal();
		this.#isLoginModalDisplayed();

		cy.get(LOGIN_MODAL).find('input').first().type(username);
		cy.get(LOGIN_MODAL).find('input').last().type(password);
		cy.get(LOGIN_MODAL).find('button').last().click();
	}
}

export default Login;
