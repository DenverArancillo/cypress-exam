class SeleniumTutorialsPage {

    constructor() {
        this.lectureId = null

        this.curriculumItems = 'a.item'
        this.expandCurriculumBtn = '#more_lecture_sections'
        this.payInUsdOption = 'label.product_4632690'
        this.payInUsdPriceLabel = 'label.product_4632690 span.default-product-price'
        this.enrollBtn = '#enroll-button'
    }

    getCurrentCurriculumMapping() {
        return new Cypress.Promise(resolve => {
            cy.wrap(null).then(() => resolve(`a[data-ss-lecture-id="${this.lectureId}"]`))
        })
    }

    findLectureId(curriculumToFind) {
        let getLectureId = new Cypress.Promise(resolve => {
            cy.get(this.curriculumItems).each($item => {
                let curriculumName = $item.text().trim().split('\n')[2]
                if (curriculumName.includes(curriculumToFind)) {
                    resolve($item.attr('data-ss-lecture-id'))
                }
            })
        })

        getLectureId.then(id => this.lectureId = id)
    }

    isCurrentCurriculumVisible() {
        return new Cypress.Promise(resolve => {
            this.getCurrentCurriculumMapping().then(mapping => {
                cy.IsVisible(mapping, condition => resolve(condition))
            })
        }) 
    }

    clickExpandCurriculumBtn() {
        cy.get(this.expandCurriculumBtn).click()
    }

    scrollToCurrentCurriculum() {
        this.getCurrentCurriculumMapping().then(mapping => {
            cy.get(mapping).scrollIntoView()
        })
    }

    startCurrentCurriculum() {
        this.getCurrentCurriculumMapping().then(mapping => {
            cy.get(`${mapping} div`).click()
        })
    }

    clickPayInUsd() {
        cy.get(this.payInUsdOption).click({ scrollBehavior: 'center' })
    }

    payInUsdPriceShouldBe(value) {
        cy.get(this.payInUsdPriceLabel).should('have.text', value)
    }

    enrollButtonTextShouldBe(text) {
        cy.get(this.enrollBtn).then($btn => {
            expect($btn.text().trim()).to.be.eq(text)
        })
    }

    clickEnrollButtonAndTextShouldBe(text) {
        cy.get(this.enrollBtn).click().then($btn => {
            expect($btn.text().trim()).to.be.eq(text)
        })
    }
}

export default SeleniumTutorialsPage