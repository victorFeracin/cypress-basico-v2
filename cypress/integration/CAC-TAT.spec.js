// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

import "../support/commands.js";

describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(function () {
    cy.visit("../../src/index.html");
  });

  it("Verifica o titulo da aplicacao", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("Preenche os campos obrigatorios e envia o formulario", function () {
    const longText = "I would like to know where can I find more information about this product.";

    cy.get("#firstName")
      .should("be.visible")
      .type("Firstname")
      .should("have.value", "Firstname");

    cy.get("#lastName")
      .should("be.visible")
      .type("Lastname")
      .should("have.value", "Lastname");

    cy.get("#email")
      .should("be.visible")
      .type("test@mail.com")
      .should("have.value", "test@mail.com");

    cy.get("#open-text-area")
      .should("be.visible")
      .type(longText, { delay: 0 })
      .should("have.value", longText);

    cy.contains("button", "Enviar")
      .should("be.visible")
      .click();

    cy.get(".success")
      .should("be.visible");
  });

  it("Exibe mensagem de erro ao submeter o formulario com um email com formatacao invalida", function() {
    const longText = "I would like to know where can I find more information about this product.";

    cy.get("#firstName")
      .should("be.visible")
      .type("Firstname")
      .should("have.value", "Firstname");

    cy.get("#lastName")
      .should("be.visible")
      .type("Lastname")
      .should("have.value", "Lastname");

    cy.get("#email")
      .should("be.visible")
      .type("test")
      .should("have.value", "test");

    cy.get("#open-text-area")
      .should("be.visible")
      .type(longText, { delay: 0 })
      .should("have.value", longText);

    cy.contains("button", "Enviar")
      .should("be.visible")
      .click();

    cy.get(".error")
      .should("be.visible");
  });

  it("Verifica se o input de telefone e preenchido com caracteres nao numericos, o campo continua vazio", function() {
    cy.get("#phone")
      .should("be.visible")
      .type("test#@example")
      .should("have.value", "");
  });

  it("Exibe mensagem de erro quando o telefone se torna obrigatorio mas nao e preenchido antes do envio do formulario", function() {
    const longText = "I would like to know where can I find more information about this product.";

    cy.get("#firstName")
      .should("be.visible")
      .type("Firstname")
      .should("have.value", "Firstname");

    cy.get("#lastName")
      .should("be.visible")
      .type("Lastname")
      .should("have.value", "Lastname");

    cy.get("#email")
      .should("be.visible")
      .type("test")
      .should("have.value", "test");

    cy.get("#phone-checkbox")
      .should("be.visible")
      .check()
      .should("be.checked"); 

    cy.get("#open-text-area")
      .should("be.visible")
      .type(longText, { delay: 0 })
      .should("have.value", longText);

    cy.contains("button", "Enviar")
      .should("be.visible")
      .click();

    cy.get(".error")
      .should("be.visible");
  });

  it("Preenche e limpa os campos nome, sobrenome, email e telefone", function() {
    cy.get("#firstName")
      .should("be.visible")
      .type("Firstname")
      .should("have.value", "Firstname")
      .clear()
      .should("have.value", "");

    cy.get("#lastName")
      .should("be.visible")
      .type("Lastname")
      .should("have.value", "Lastname")
      .clear()
      .should("have.value", "");

    cy.get("#email")
      .should("be.visible")
      .type("test")
      .should("have.value", "test")
      .clear()
      .should("have.value", "");

    cy.get("#phone")
      .should("be.visible")
      .type("9999999999")
      .should("have.value", "9999999999")
      .clear()
      .should("have.value", "");
  });

  it("Exibe mensagem de erro ao submeter o formulario sem preencher os campos obrigatorios", function() {
    cy.contains("button", "Enviar")
      .should("be.visible")
      .click();

    cy.get(".error")
      .should("be.visible");
  });

  it("Envia o formulario com sucesso usando um comando customizado", function() {
    const longText = "I would like to know where can I find more information about this product.";

    cy.fillMandatoryFieldsAndSubmit("Firstname", "Lastname", "test@mail.com", longText);

    cy.get(".success")
      .should("be.visible");
  });

  //Exercicios campos de selecao suspensa
  it("Seleciona um produto (YouTube) por seu texto", () => {
    cy.get("#product")
      .select("YouTube")
      .should("have.value", "youtube");
  });

  it("Seleciona um produto (Mentoria) por seu valor", () => {
    cy.get("#product")
      .select("mentoria")
      .should("have.value", "mentoria");
  });

  it("Seleciona um produto (Blog) por seu indice", () => {
    cy.get("#product")
      .select(1)
      .should("have.value", "blog");
  });

  //Exercicios campos radio
  it("Marca o tipo de atendimento \"Feedback\"", () => {
    cy.get("[type=\"radio\"]")
      .check("feedback")
      .should("be.checked", "feedback");
  });

  it("Marca cada tipo de atendimento", () => {
    cy.get("[type=\"radio\"]")
      .should("have.length", 3)
      .each(($radio) => {
        cy.wrap($radio).check();
        cy.wrap($radio).should("be.checked");
      });

    //Versão simplificada de:
    /*
    cy.get("[type=\"radio\"]")
      .check("ajuda")
      .should("be.checked", "ajuda");

    cy.get("[type=\"radio\"]")
      .check("elogio")
      .should("be.checked", "elogio");
    
    cy.get("[type=\"radio\"]")
      .check("feedback")
      .should("be.checked", "feedback");
    */
  });

  //Exercicio checkbox
  it("Marca ambos checkboxes, depois desmarca o ultimo", () => {
    cy.get("input[type=\"checkbox\"]")
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  //Exercicios de upload de arquivos
  it("Seleciona um arquivo da pasta fixtures", () => {
    cy.get("#file-upload")
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.txt")
      .should(($input) => {
        expect($input[0].files[0].name).to.equal("example.txt");
      });
  });

  it("Seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get("#file-upload")
      .should("not.have.value")
      .selectFile({
        contents: "./cypress/fixtures/example.txt",
        action: "drag-drop"
      })
      .should(($input) => {
        expect($input[0].files[0].name).to.equal("example.txt");
      });
  });

  it("Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () =>{
    cy.fixture("example.txt").as("exampleFile");

    cy.get("#file-upload")
      .should("not.have.value")
      .selectFile("@exampleFile")
      .should(($input) => {
        expect($input[0].files[0].name).to.equal("example.txt");
      });
  });
});
