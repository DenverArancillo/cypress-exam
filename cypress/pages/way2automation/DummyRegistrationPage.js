import Utils from "../../support/Utils"

class DummyRegistration {
    
    constructor() {
        // page mappings
        this.nameTxtBox = 'input[name="name"]'
        this.phoneTxtBox = 'input[name="phone"]'
        this.emailTxtBox = 'input[name="email"]'
        this.countryDropdown = 'select[name="country"]'
        this.cityTxtBox = 'input[name="city"]'
        this.usernameTxtBox = '#load_box input[name="username"]'
        this.passwordTxtBox = '#load_box input[name="password"]'
        this.submitBtn = '#load_box input[type="submit"]'
        this.formAlert = 'p#alert'
        this.formSpinner = '#loader'
        this.exploreLifetimeMembershipBtn = '#load_box p.text_popup a.fancybox'
    }

    // page commands

    fillUpDummyRegistration(options) {
        const dummyRegistrationEntries = (options) => {
            cy.Type(this.nameTxtBox, options.name, { delay: 50 })
            cy.Type(this.nameTxtBox, options.name)
    
            cy.Type(this.phoneTxtBox, options.phone)
            cy.Type(this.emailTxtBox, options.email)
            cy.Select(this.countryDropdown, options.country)
            cy.Type(this.cityTxtBox, options.city)
            cy.Type(this.usernameTxtBox, options.username)
    
            if (!options.hasOwnProperty('password')) {
                options.password = Utils.getRandomNumber().toString()
            }
    
            cy.Type(this.passwordTxtBox, options.password)
        }

        if (options.hasOwnProperty('fixture')) {
            cy.fixture(options.fixture).then(data => {
                dummyRegistrationEntries(data)
            })
        } else {
            dummyRegistrationEntries(options)
        }
    }

    clickSubmit() {
        cy.get(this.submitBtn).click()
    }

    assertFormStateIsSubmitted(condition, textAlert) {
        if (condition) {
            cy.get(this.formSpinner).should('be.visible')
            cy.get(this.formSpinner).should('not.be.visible')    
        } else {
            cy.get(this.formSpinner).should('not.be.visible')    
        }
        cy.get(this.formAlert).should('have.text', textAlert)
    }

    clickExploreLifetimeMembership() {
        cy.get(this.exploreLifetimeMembershipBtn)
            .last()
            // verify first that correct <a> to be clicked after has the correct text
            .should('have.text', 'EXPLORE LIFETIME MEMBERSHIP')
            .click()
    }

}

export default DummyRegistration