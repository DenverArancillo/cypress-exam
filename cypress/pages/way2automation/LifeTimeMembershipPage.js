class LifeTimeMembershipPage {

    constructor() {
        this.coursesVideoLibraryHeader = 'div[data-id="dcd562e"]'
        this.carouselSlides = 'div.pp-info-box-carousel-wrap div.swiper-wrapper div.swiper-slide'
        this.carouselActiveSlideLabel = `${this.carouselSlides}-active div.pp-info-box-title-wrap`
        this.carouselActiveSlideGetStartedBtn = `${this.carouselSlides}-active div.pp-info-box-footer span`
        this.carouselPrevBtn = 'div.swiper-button-prev-3a5d4b8'
        this.carouselNextBtn = 'div.swiper-button-next-3a5d4b8'
    }

    scrollToCoursesVideoLibraryHeader() {
        cy.get(this.coursesVideoLibraryHeader).should('be.visible').scrollIntoView()
    }

    waitForCarouselToLoad() {
        cy.get(this.carouselActiveSlideLabel, { timeout: 90000 })
    }

    getActiveCarouselLabel() {
        return new Cypress.Promise(resolve => {
            cy.get(this.carouselActiveSlideLabel).then($slide => resolve($slide.text().trim()))
        })
    }

    findItemInCarousel(itemToFind, direction, attempt, maxAttempt) {
        if (attempt === maxAttempt) {
            throw new Error("Func <findCarouselItemLink> reached max attempts")
        }

        // direction param either 'next' or 'prev'
        let directionMapping = (direction === 'next') ? this.carouselNextBtn : this.carouselPrevBtn

        this.getActiveCarouselLabel().then(slideText => {
            if (slideText !== itemToFind) {
                // click carousel navigation button and check again
                cy.get(directionMapping).click({ scrollBehavior: 'center' })
                // wait for carousel animation to finish
                cy.wait(1000)
                this.findItemInCarousel(itemToFind, direction, attempt + 1, maxAttempt)
            }
        })
    }

    clickActiveCarouselGetStartedBtn() {
        cy.get(this.carouselActiveSlideGetStartedBtn).click({ scrollBehavior: 'center' })
    }

    doubleClickCoursesVideoLibraryHeader() {
        cy.get(this.coursesVideoLibraryHeader).dblclick({ force: true })
    }

}

export default LifeTimeMembershipPage