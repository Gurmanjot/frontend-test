describe('Login and logout flow', () => {
  it('should login successfully and call history page should be visible', () => {
    cy.visit('http://localhost:3000/');

    // checking the disable button condition if email foemat is different
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('[data-testid="login-button"]').should('exist').should('be.disabled');

    cy.get('input[name="email"]').type('{selectall}{backspace}test@aircall.io');
    cy.get('[data-testid="login-button"]').should('be.enabled');
    cy.get('[data-testid="login-button"]').click();

    cy.url().should('include', '/calls');
    cy.contains('Calls History');
  });

  it('should logout successfully', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input[name="email"]').type('{selectall}{backspace}test@aircall.io');
    cy.get('input[name="password"]').type('password123');
    cy.get('[data-testid="login-button"]').click();

    // Check for logout button
    cy.get('[data-testid="logout-link"]').should('exist').click();
    cy.get('[data-testid="login-button"]').should('exist').should('be.disabled');
  });
});
