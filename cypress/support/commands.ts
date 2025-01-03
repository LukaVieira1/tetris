/// <reference types="cypress" />

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    waitForSplashScreen(): Chainable<void>;

    startNewGame(): Chainable<void>;
  }
}

Cypress.Commands.add("waitForSplashScreen", () => {
  cy.wait(2500);
});

Cypress.Commands.add("startNewGame", () => {
  cy.waitForSplashScreen();
  cy.contains("Iniciar Jogo").click();
});
