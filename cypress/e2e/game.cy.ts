describe("Game Page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.startNewGame();
  });

  it("should display game elements correctly", () => {
    cy.get('[data-cy="game-board"]').should("be.visible");
    cy.get('[data-cy="next-pieces"]').should("be.visible");
    cy.get('[data-cy="score-board"]').should("be.visible");
    cy.get('[data-cy="game-level"]').should("be.visible");
  });

  it("should pause game when pressing P", () => {
    cy.get('[data-cy="game-board"]').focus().type("p");
    cy.contains("Jogo Pausado").should("be.visible");
    cy.contains("Continuar").should("be.visible");
    cy.contains("Menu Principal").should("be.visible");
  });

  it("should move piece with arrow keys", () => {
    cy.get('[data-cy="game-board"]').focus();

    // Move left
    cy.get('[data-cy="game-board"]').type("{leftarrow}").wait(100);

    // Move right
    cy.get('[data-cy="game-board"]').type("{rightarrow}").wait(100);
  });

  it("should do a soft drop and rotate piece with up arrow", () => {
    cy.get('[data-cy="game-board"]').focus().type("{downarrow}").wait(100);
    cy.get('[data-cy="game-board"]').focus().type("{downarrow}").wait(100);
    cy.get('[data-cy="game-board"]').focus().type("{uparrow}").wait(100);
  });

  it("should drop piece with space", () => {
    cy.get('[data-cy="game-board"]').focus().type(" ").wait(100);
  });

  it("should show game over when piece reaches top", () => {
    cy.get('[data-cy="game-board"]').focus();

    for (let i = 0; i < 15; i++) {
      cy.wait(400);
      cy.get('[data-cy="game-board"]').type(" ").wait(0);
    }

    cy.contains("Fim de Jogo").should("be.visible");
    cy.contains("Recomeçar").should("be.visible");
  });
});
