describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");
  });
});

it("loginAndChangeProfile", function () {
  cy.visit("http://localhost:8081/");

  cy.get(
    '#root a[href="/profile"] div:nth-child(2) div.r-userSelect-lrvibr'
  ).click();
  cy.get(
    "#root div.r-flex-13awgt0.r-overflow-1udh08x > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2)"
  ).click();
  cy.get('#root input[placeholder="Email"]').click();
  cy.get('#root input[placeholder="Email"]').type(
    "sergen.schoufs@student.ucll.be"
  );
  cy.get('#root input[placeholder="Password"]').click();
  cy.get('#root input[placeholder="Password"]').type("1234321");
  cy.get("#root div.r-fontSize-1i10wst").click();
  cy.get(
    '#root a[href="/profile"][aria-selected="false"] div.r-marginInlineStart-wizibn'
  ).click();
  cy.get(
    "#root div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div.r-flex-13awgt0.r-overflow-1udh08x > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div.css-text-146c3p1"
  ).click();
  cy.get('#root input[value="Ser"]').click();
  cy.get('#root input[value="Ser"]').type("gen");
  cy.get(
    "#root div:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)"
  ).click();
  cy.get(
    "#root div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div.r-flex-13awgt0.r-overflow-1udh08x > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div.css-text-146c3p1"
  ).click();
  cy.get('#root input[value="Sergen"]').click();
  cy.get('#root input[value="Sergen"]').clear();
  cy.get('#root input[value=""]').type("Ser");
  cy.get(
    "#root div:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)"
  ).click();
});
