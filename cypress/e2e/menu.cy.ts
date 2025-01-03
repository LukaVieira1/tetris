describe("Menu Page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait(2500);
  });

  it("should display the menu correctly", () => {
    cy.contains("TETRIS").should("be.visible");
    cy.contains("Clássico dos anos 80").should("be.visible");
    cy.contains("Iniciar Jogo").should("be.visible");
    cy.contains("Como Jogar").should("be.visible");
  });

  it("should navigate to game page when clicking start game", () => {
    cy.contains("Iniciar Jogo").click();
    cy.get('[data-cy="game-board"]').should("be.visible");
  });

  it("should navigate to how to play page", () => {
    cy.contains("Como Jogar").click();
    cy.contains("Controles").should("be.visible");
    cy.contains("Sistema de Pontuação").should("be.visible");
  });

  it("should switch language", () => {
    // Clica no botão de inglês
    cy.get('[data-cy="lang-en"]').click();
    cy.contains("80's Classic").should("be.visible");
    cy.contains("Start Game").should("be.visible");
    cy.contains("How to Play").should("be.visible");

    // Clica no botão de português
    cy.get('[data-cy="lang-pt"]').click();
    cy.contains("Clássico dos anos 80").should("be.visible");
    cy.contains("Iniciar Jogo").should("be.visible");
    cy.contains("Como Jogar").should("be.visible");
  });
});
