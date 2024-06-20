/// <reference types="cypress" />

import globalData from '../fixtures/globalData.json'
import DemoPage from '../pages/way2automation/DemoPage'
import DummyRegistrationPage from '../pages/way2automation/DummyRegistrationPage'
import LifeTimeMembershipPage from '../pages/way2automation/LifeTimeMembershipPage'

context('Cypress technical exam - way2automation.com', () => {
    before(() => {
        // Step #1
        cy.visit('https://www.way2automation.com/demo.html')
    })

    it('List each of the action name for each category in JSON format', () => {           

        let categories = {}
        const demoPage = new DemoPage()

        demoPage.getCategoryNames().then(categoryNames => {
            // set all categories as keys
            categoryNames.forEach(val => categories[val] = null)
        })

        demoPage.getCategoryElements().each($categories => {

            // get next element to loop over each <li a> to
            let $dropdown = $categories.next()
            if ($dropdown.length === 1) {
                let actions = []

                // get all action names for each category
                $dropdown.find('li a').each((idx, $action) => {
                    // Step #3 get link
                    if ($action.innerText === 'Submit Button Clicked') {
                        globalData.submitButtonClickedUrl = $action.getAttribute('href')
                    }
                    actions.push($action.innerText)
                })

                categories[$categories.text()] = actions
            }
        })

        cy.wrap(null).then(() => {
            // handling async commands
            // # Step 2
            console.log(categories)
            Cypress.log({
                displayName: "List of categories",
                message: JSON.stringify(categories)
            })
        })
    })

    it('Dummy registration', () => {
        // Step #4
        cy.visit(globalData.submitButtonClickedUrl)

        const dummyRegistrationPage = new DummyRegistrationPage()
        // Step #5
        dummyRegistrationPage.fillUpDummyRegistration({ fixture: 'dummyRegistration' })

        // assert that form alert is empty and loading spinner is not visible
        dummyRegistrationPage.assertFormStateIsSubmitted(false, '')
        dummyRegistrationPage.clickSubmit()

        // verify actions after clicking submit
        dummyRegistrationPage.assertFormStateIsSubmitted(true, 'This is just a dummy form, you just clicked SUBMIT BUTTON')

        // Step #6
        dummyRegistrationPage.clickExploreLifetimeMembership()

        cy.url().should('eq', 'https://www.way2automation.com/lifetime-membership-club/')
    })

    it('Lifetime membership and Navigate to 7 live projects through carousel', () => {
        const lifetimeMembershipPage = new LifeTimeMembershipPage()
        
        // Step #7
        lifetimeMembershipPage.scrollToCoursesVideoLibraryHeader()

        // simulate a user interaction in the page to properly load carousel
        lifetimeMembershipPage.doubleClickCoursesVideoLibraryHeader()
        lifetimeMembershipPage.waitForCarouselToLoad()

        // Step #8
        lifetimeMembershipPage.findItemInCarousel('Automation Architect Selenium with 7 live projects', 'prev', 1, 20)
        // Step #9
        lifetimeMembershipPage.clickActiveCarouselGetStartedBtn()
        // Step #10
        cy.url().should('eq', 'https://www.selenium-tutorial.com/p/automation-architect-in-selenium-7-live-projects')
    })
    
    it('Automation Architect in Selenium - 7 Live Projects', () => {
        
        cy.get('body').then($body => {
            console.log('find', $body.find('a[data-ss-lecture-id="5575689"]').length)
        })
        cy.get('a[data-ss-lecture-id="5575689"]').then($item => {
            console.log('visible', $item.is(':visible'))
        })

        // check first if lecture is found

        // click expand
        cy.get('#more_lecture_sections').click()
        // Step #11
        cy.get('a[data-ss-lecture-id="5575689"] div').scrollIntoView()

        // click start
        // Step #12
        cy.get('a[data-ss-lecture-id="5575689"] div').click()

        // wait for leacure content to load
        // Step #13
        cy.get('#lecture_heading', { timeout: 60000 }).should('be.visible')

        // return back to course page
        // Step #14
        cy.get('a.nav-icon-back').click()

        // Step #15
        // pay in usd
        cy.get('label.product_4632690').click({ scrollBehavior: 'center' })

        // Step #16
        // verify value equal to 29
        cy.get('label.product_4632690 span.default-product-price').should('have.text', '$29')

        // Step #17
        // click enroll
        cy.get('#enroll-button')
            .then($btn => {
                expect($btn.text().trim()).to.be.eq('Enroll in Course')
            })
            .click()
            // Step #18
            .should('have.text', 'Processing...')
    })
})