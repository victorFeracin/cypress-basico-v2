describe("Politica de Privacidade CAC TAT", () => {
  beforeEach(function () {
    cy.visit("../../src/privacy.html")
  });

  it("Testa a pagina da politica de privacidade de forma independente", () => {
    cy.title()
      .should("be.equal", "Central de Atendimento ao Cliente TAT - Política de privacidade")
  });
});