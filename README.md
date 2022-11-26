# real_estate_website

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

API KEY: RbDNuE6lWJoZq_S3KL5ywHpgd8eatM7z

HOURS LOG:

date hour task
date hour task
15 november 1 Create navBar, HouseCard component, About Page
15 november 3 get request for houses from api and show houses
16 november 2 new house path / page (form) added
16 november 2 getting single house with props from store(logic)
17 november 1 show house details
17 november 1 search logic
17 november 0,5 blur background image added
17 november 1 searchBar component added
17 november 1 searchBar functions added to the store
21 november 1,5 sign-up page created, token set to reach out users' own houses for showing delete and edit buttons for their house.
21 november 0,5 logic establish in a wrong way to see buttons. realised there is no need to
21 november 1,5 delete function created
22 november 2 new house comp done in store and in newHouse page
22 november 2 picture upload component
23 november 2 Promise((resolve, reject) added in store and then-catch in the page to get the resulsts as succes and failed. in this way, can get id and then can upload image with this id because for uploading image id is necessarry
23 november 2 upload image connected to the form and child ref used for this connection. I can send form with image finally.
23 november 1 searching how create a form component
24 november 0,5 Routerlink moved from home to housecard comp. + tooltip add for delete button
24 november 0,5 recommended house added
24 november 0,5 v-if-house added to h.card, computed used instead of setup
25 november 2,5 added edit route to router and button to housecard + create and update in the same page. isUpdating added to store + data disassembly (location) for updating + skip photo upddating, it can be added just for a new house.

26 november 2,5 responsive design added to pages ( still things to do but time is up; I even spent 1,5 hour more than told)
---SUM: 31,5 HOURS----

"User story 1: As a user, I want to be able to see a fixed navigation header, so that I can easily navigate through the app.
■ I want to be able to navigate to the Houses page.
■ I want to be able to see what page is currently active."
"User story 2: As a user, I want to be able to see an overview of all available houses as the homepage of the web app, so that I can see what the app has to offer.
■ I want to be able to see the address, postal code and city of the listing.
■ I want to be able to see the image, size and the number of bedrooms and
bathrooms of the listing."
"User story 3: As a user, I want to be able to search through the available houses by at least one of the house listing properties, so that I can find specific houses based on search criteria.
■ I want to be able to clear my search input, after I start typing.
■ I want to be able to see a result indication, informing me about If my search input did not match any results."
User story 4: As a user, I want to be able to sort the available houses shown on the Homepage by at least one option (price or size), so that I can sort based on my preference.
"User story 5: As a user, I want to be able to access the details of a house, so that I can read more in-depth information about my selected house.
■ I want to be able to see the address, postal code and city of the listing.
■ I want to be able to see the description, image, number of bedrooms and
bathrooms, the size, construction and if the listing has a garage or not.
■ I want to be able to delete and edit the listing, in case it is my listing."
"User story 6: As a user, I want to be able to create my listing(s), by completing all the required fields in a form.
■ I want to be able to add the address (street name, House number, Addition, Postal Code and City) of my listing.
■ I want to be able to set an image, a description, a price, the size, the amount of bedrooms and bathrooms, the construction date whether my listing has a garage or not.
■ If I have not completed all the required fields or there is a validation error in the form, I should see an appropriate error message.
■ After completing the form and creating the listing, I should be redirected to the
newly created listing detail page."
User story 7: As the owner of a listing, I want to be able to have an edit and delete button on the detail page of a house that I own, so that I can navigate to the edit page of my listing or delete the listing.
"User story 8: As the owner of a listing, I want to be able to edit my listing(s).
■ I want to be able to edit the address (street name, House number, Addition, Postal
Code and City) of my listing.
■ I want to be able to edit the image (is not editible in my case ), description, price, size, amount of bedroomsand bathrooms, the construction date and whether my listing has a garage or
not.
■ If I have not completed all the required fields or there is a validation error in the form, I want to be able to see an appropriate error message."
"User story 9: As the owner of a listing, I want to be able to delete my listing(s).
■ I want to be able to see a warning before the successful deletion of my listing."
