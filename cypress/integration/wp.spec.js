
import Profile from './PageObjects/profile';

describe('WP My profile tests', function(){
const profile = new Profile();

    beforeEach(function () {
        cy.fixture( 'example.json' ).as( 'textData' )
        cy.visit( '/' )
        cy.get( '#usernameOrEmail' )
            .clear()
            .type( "versallly" );
        cy.get( 'form[method="post"]' ).submit();
        cy.get( '#password' )
            .clear()
            .type( "wJ/CU,E+GVp7r)>" );
        cy.get( 'form[method="post"]' ).submit();
    })

    it('Change First name', function(){
        profile.firstName().clear()
        profile.firstName().type( this.textData.firstName );
        profile.saveProfileDetails().click();
        profile.successMessage().should( 'be.visible' );
        cy.reload();
        profile.firstName()
            .should( 'have.attr', 'value' )
            .and( 'contain', this.textData.firstName );
        profile.firstName().clear()
        profile.saveProfileDetails().click();
    })
    
    it('Change Last name', function(){
        profile.lastName().type( this.textData.lastName );
        profile.saveProfileDetails().click();
        profile.successMessage().should( 'be.visible' );
        cy.reload();
        profile.lastName()
            .should( 'have.attr', 'value' )
            .and( "contain", this.textData.lastName );
        profile.lastName().clear()
        profile.saveProfileDetails().click();
    })

    it('Change Public display name', function(){
        profile.displayName()
            .clear()
            .type( this.textData.publicDisplayName );
        profile.saveProfileDetails().click();
        profile.successMessage().should( 'be.visible' );
        cy.reload();
        profile.displayName()
            .should( 'have.attr', 'value' )
            .and( 'contain', this.textData.publicDisplayName );
        profile.displayName().clear()
        profile.displayName().type(`${this.textData.publicDisplayName}1`)
        profile.saveProfileDetails().click();
    })

    it('Change About me section', function(){
        cy.wait(1000)
        profile.aboutMe().type( this.textData.aboutText );
        profile.saveProfileDetails().click();
        profile.successMessage().should( 'be.visible' );
        cy.reload();
        profile.aboutMe().contains( this.textData.aboutText );
        profile.aboutMe().clear()
        profile.saveProfileDetails().click();
        
    })

    it('Toggle ON/OFF Hide my Gravatar profile', function(){ 
        profile.toggleOff().should( 'be.visible' );
        cy.wait(1000)
        profile.toggleOff().click();
        profile.toggleOn().should( 'be.visible' );
        profile.saveProfileDetails().click();
        profile.successMessage().should( 'be.visible' );
        cy.reload();
        cy.wait(1000)
        profile.toggleOn().click();
        profile.toggleOff().should( 'be.visible' );
        profile.saveProfileDetails().click();
        profile.successMessage().should( 'be.visible' );
        cy.reload();
        profile.toggleOff().should( 'be.visible' );
    })

    it('Change photo', function(){
        const fileName = 'test.png'
        profile.dragAndDropZone().attachFile( fileName, { subjectType: 'drag-n-drop' });
        cy.wait( 3000 )
        profile.changeMyPhoto().click()
    })
    
    it('Add/Remove WordPress Site', function(){
       profile.profileLinksAdd().click()
       profile.addWordPressSite().click()
       profile.wordPressSiteCheckbox().click()
       profile.addSite().click()
       profile.removeSite().click()
    })

    it('Add/Remove URL', function(){
        profile.profileLinksAdd().click()
        profile.addUrl().click()
        profile.urlInput().type( this.textData.urlToPaste );
        profile.descriptionInput().type( this.textData.siteDescription );
        profile.addSite().click()
        profile.siteDescr()
            .contains(this.textData.siteDescription)
            .should( 'be.visible' );
        profile.siteUrl()
            .contains(this.textData.urlToPaste)
            .should( 'be.visible' );
        profile.removeSite().click()
    })
});