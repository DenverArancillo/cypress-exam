class LecturePage {
    
    constructor() {
        this.lectureHeading = '#lecture_heading'
        this.homeIcon = 'a.nav-icon-back'
    }

    waitForLecturePageToLoad() {
        cy.get(this.lectureHeading, { timeout: 30000 }).should('be.visible')
    }

    clickHomeIcon() {
        cy.get(this.homeIcon).click()
    }
}

export default LecturePage