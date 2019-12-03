# LAB - 11

## OAuth

### Author: Martin Balke

### Links and Resources
* [submission PR](https://github.com/martinbalke-401-adavanced-js/401-lab-11/pull/1)
* [travis](https://www.travis-ci.com/martinbalke-401-adavanced-js/401-lab-11)
* [front-end / Heroku](https://martin-lab-11.herokuapp.com/)


### Questions

  ` Now that we have some data about the user, how would we go about adding this user to our database?`
    We can save them to our database using their account information and store their token for future use
   `What data should we save?`
   We should save the data we need for our own User model that is given to us by Google
   `What data is missing?`
   Password, Username 
   `What considerations about storing this data do we need to take?`
   We should protect their Oauth token


#### UML
Link to an image of the UML for your application and response to events