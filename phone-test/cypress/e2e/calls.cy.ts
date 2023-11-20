describe('Open call details', () => {
  it('should open first calls card', () => {
    cy.visit('http://localhost:3000/');

    cy.get('input[name="email"]').type('{selectall}{backspace}test@aircall.io');
    cy.get('input[name="password"]').type('password123');
    cy.get('[data-testid="login-button"]').click();

    cy.url().should('include', '/calls');
    cy.contains('Calls History');

    const firstItem = cy.get('[data-testid="call-item"]').first();
    firstItem.click();

    cy.contains('Calls Details');
  });
});
