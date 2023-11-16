import { PRODUCTS_URL } from '../../constants';

/* ELEMENTS */

const ADD_PRODUCT_MODAL = '#addCar';
const PRODUCT_NAME_INPUT = 'input[name="name"]';
const PRODUCT_MODEL_INPUT = 'input[name="model"]';
const PRODUCT_DESC_INPUT = 'textarea[name="description"]';
const PRODUCT_IMAGES_INPUT = 'input[name="files"]';
const PRODUCT_PRICE_INPUT = 'input[name="price"]';
const PRODUCT_CATEGORY_DDL = 'select[name="category"]';
const PRODUCT_FEATURES_DDL = 'select[name="feature"]';
const DDL_FIRST_OPTION = 'option[value=""]';

/* TEXTS */

const ADD_PRODUCT_MODAL_TITLE_TXT = 'AGREGAR PRODUCTO';
const PRODUCT_NAME_INPUT_TXT = 'Ingrese Nombre';
const PRODUCT_MODEL_INPUT_TXT = 'Ingrese Modelo';
const PRODUCT_DESC_INPUT_TXT = 'Ingrese descripción del automóvil';
const PRODUCT_PRICE_INPUT_TXT = 'Ingrese Precio';
const PRODUCT_PRICE_HEADER_TXT = 'Ingrese precio';
const PRODUCT_CATEGORY_HEADER_TXT = 'Selecciona una categoría:';
const PRODUCT_FEATURES_HEADER_TXT = 'Selecciona una característica:';
const DDL_DEFAULT_OPTION_TXT = 'Selecciona...';
const ADD_PRODUCT_BTN_TXT = 'Cargar auto';
const CLOSE_MODAL_BTN_TXT = 'Cerrar';
const CONFIRMATION_MSG = 'Gracias, tu nuevo auto está listo para rentar';

class AddProduct {
	isAddProductModalDisplayed() {
		cy.get(ADD_PRODUCT_MODAL)
			.should('be.visible')
			.find('h3')
			.should('be.visible')
			.and('contain.text', ADD_PRODUCT_MODAL_TITLE_TXT);
		cy.get(ADD_PRODUCT_MODAL)
			.find(PRODUCT_NAME_INPUT)
			.should('be.visible')
			.and('have.attr', 'placeholder', PRODUCT_NAME_INPUT_TXT);
		cy.get(ADD_PRODUCT_MODAL)
			.find(PRODUCT_MODEL_INPUT)
			.should('be.visible')
			.and('have.attr', 'placeholder', PRODUCT_MODEL_INPUT_TXT);
		cy.get(ADD_PRODUCT_MODAL)
			.find(PRODUCT_DESC_INPUT)
			.should('be.visible')
			.and('have.attr', 'placeholder', PRODUCT_DESC_INPUT_TXT);
		cy.get(ADD_PRODUCT_MODAL).find(PRODUCT_IMAGES_INPUT).should('be.visible');
		cy.get(ADD_PRODUCT_MODAL).contains('h4', PRODUCT_PRICE_HEADER_TXT).should('be.visible');
		cy.get(ADD_PRODUCT_MODAL)
			.find(PRODUCT_PRICE_INPUT)
			.should('be.visible')
			.and('have.attr', 'placeholder', PRODUCT_PRICE_INPUT_TXT);
		cy.get(ADD_PRODUCT_MODAL).contains('label', PRODUCT_CATEGORY_HEADER_TXT).should('be.visible');
		cy.get(ADD_PRODUCT_MODAL)
			.find(PRODUCT_CATEGORY_DDL)
			.should('be.visible')
			.find(DDL_FIRST_OPTION)
			.should('contain.text', DDL_DEFAULT_OPTION_TXT);
		cy.get(ADD_PRODUCT_MODAL).contains('label', PRODUCT_FEATURES_HEADER_TXT).should('be.visible');
		cy.get(ADD_PRODUCT_MODAL)
			.find(PRODUCT_FEATURES_DDL)
			.should('be.visible')
			.find(DDL_FIRST_OPTION)
			.should('contain.text', DDL_DEFAULT_OPTION_TXT);

		cy.contains('button', ADD_PRODUCT_BTN_TXT).should('be.visible');
		cy.contains('button', CLOSE_MODAL_BTN_TXT).should('be.visible');
	}

	/**
	 *
	 * @param {int} imagesAmt
	 */
	addProduct(imagesAmt) {
		cy.generateRandomProductName().then((productName) => {
			cy.get(ADD_PRODUCT_MODAL).find(PRODUCT_NAME_INPUT).type(productName);
			cy.get(ADD_PRODUCT_MODAL).find(PRODUCT_MODEL_INPUT).type('Auto Test Model');
			cy.get(ADD_PRODUCT_MODAL).find(PRODUCT_DESC_INPUT).type('Auto Test Description');
			cy.get(ADD_PRODUCT_MODAL).find(PRODUCT_PRICE_INPUT).type(200);
			cy.get(ADD_PRODUCT_MODAL).find(PRODUCT_CATEGORY_DDL).select('Test Category 1');
			cy.get(ADD_PRODUCT_MODAL).find(PRODUCT_FEATURES_DDL).select('Techo Solar');
			if (imagesAmt == 1) {
				cy.get(ADD_PRODUCT_MODAL).find(PRODUCT_IMAGES_INPUT).attachFile('Car1.jpeg');
			} else if (imagesAmt == 2) {
				cy.get(ADD_PRODUCT_MODAL).find(PRODUCT_IMAGES_INPUT).attachFile(['Car1.jpeg', 'Car2.jpeg']);
			}

			cy.intercept('POST', PRODUCTS_URL).as('addProduct');
			cy.contains('button', ADD_PRODUCT_BTN_TXT).click();
			cy.wait('@addProduct').its('response.statusCode').should('eq', 201);
			cy.contains('h4', CONFIRMATION_MSG).should('be.visible');
		});
	}
}

export default AddProduct;
