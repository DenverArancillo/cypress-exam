class DemoPage {

    constructor() {
        this.categoriesMenu = '#toggleNav > li > a'
    }

    getCategoryNames() {
        let categoryNames = []
        cy.Each(this.categoriesMenu, $categories => {
            categoryNames.push($categories.text())
        })
        return new Cypress.Promise(resolve => resolve(categoryNames))
    }

    getCategoryElements() {
        return cy.get(this.categoriesMenu)
    }
}

export default DemoPage