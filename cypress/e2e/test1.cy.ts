describe('map testing', () => {
  it('markers on map are visible', () => {
    cy.visit('http://localhost:3000/');

    const markerSelector = `.leaflet-marker-icon`;

    cy.get(markerSelector).should('be.visible');
  });

  it('popup is visible after clicking on marker', () => {
    cy.visit('http://localhost:3000/');

    const markerSelector = `.leaflet-marker-icon`;

    cy.get(markerSelector).first().click();

    const popupSelector = `.leaflet-popup-content-wrapper`;
    cy.get(popupSelector).should('be.visible');
  });
});

describe('admin testing', () => {
  it('admin login', () => {
    cy.visit('http://localhost:3000/admin-login');

    const emailInputSelector = `input[type="email"]`;
    const passwordInputSelector = `input[type="password"]`;
    const submitButtonSelector = `.login-button`;

    cy.get(emailInputSelector).type('pfas1@gmail.com');
    cy.get(passwordInputSelector).type('123456@');
    cy.get(submitButtonSelector).click();

    cy.get('h2').contains('Uppdatera PFAS-information');
  });

  it('edit pfas level', () => {
    cy.visit('http://localhost:3000/admin-login');

    const emailInputSelector = `input[type="email"]`;
    const passwordInputSelector = `input[type="password"]`;
    const submitButtonSelector = `.login-button`;
    const editPfasButtonSelector = `.edit-pfas__button`;
    const editPfasInputSelector = `.edit-pfas__input`;
    const pfasValueSelector = `.edit-pfas__value`;

    // log in
    cy.get(emailInputSelector).type('pfas1@gmail.com');
    cy.get(passwordInputSelector).type('123456@');
    cy.get(submitButtonSelector).click();

    // editing value
    cy.get(editPfasButtonSelector).contains('Redigera');
    cy.get(editPfasButtonSelector).click();
    cy.get(editPfasInputSelector).clear().type('50');
    cy.get(editPfasButtonSelector).contains('Spara');
    cy.get(editPfasButtonSelector).click();

    cy.get(pfasValueSelector).contains('50');
  });

  it('admin logout', () => {
    cy.visit('http://localhost:3000/admin-login');

    const emailInputSelector = `input[type="email"]`;
    const passwordInputSelector = `input[type="password"]`;
    const submitButtonSelector = `.login-button`;

    cy.get(emailInputSelector).type('pfas1@gmail.com');
    cy.get(passwordInputSelector).type('123456@');
    cy.get(submitButtonSelector).click();

    const logoutButtonSelector = '.logout-btn';
    const loginButtonSelector = '.login-btn';
    cy.get(logoutButtonSelector).click();
    cy.get(logoutButtonSelector).should('not.exist');
    cy.get(loginButtonSelector).should('be.visible');
    cy.url().should('eq', 'http://localhost:3000/');
  });
});

describe('superadmin testing', () => {
  it('superadmin login', () => {
    cy.visit('http://localhost:3000/login-superadmin');

    const emailInputSelector = `input[type="email"]`;
    const passwordInputSelector = `input[type="password"]`;
    const submitButtonSelector = '.login-container > button';

    cy.get(emailInputSelector).type('kholmatova403@gmail.com');
    cy.get(passwordInputSelector).type('123456@');
    cy.get(submitButtonSelector).click();

    cy.get('.superadmin-panel__title').contains('Superadmin Kontrollpanel');
  });
});
