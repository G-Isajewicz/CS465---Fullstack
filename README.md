# CS465---Fullstack
CS-465 Full Stack Development with MEAN

##**Architecture**
  This application was built using MongoDB, Express, Angular, and Node - also known as a MEAN stack. Within the MEAN stack, Node.js will function as the runtime environment for the webpage. The application will comprise of two sides, a customer-facing side, and an administrator single-page application (SPA). 
  
  The administrator page was created as a single-page application - SPA - using Angular in order to allow the performance of various administrative duties. Access to the administrator SPA will be controlled through an authentication login method. Once an administrator has been authenticated, the administrator will have access to the page for the purpose of modifying the content that the customer sees. 
 
  In creating the customer-facing side of the page, in addition to Angular on the front-end, the Express.js framework is used along with Handlebars to dynamically populate the content within static page according to the template on the back-end. The content for the webpage is stored within a MongoDB database. With the MEAN stack implementation, the customer will be able to interact with the webpage and the database in a smooth and reliable manner.
   The backend of this application uses a NoSQL MongoDB database because of its ability to quickly perform queries, as well as its ability to scale efficiently. 

## Functionality
  JSON and JavaScript are two distinct things. JSON is a data-interchange format that is independent of programming language. While JSON is derived from JavaScripts object literal syntax, it is distinct from it and supports only a subset of the syntax of JavaScript - primarily that of data structures like arrays. JavaScript on the other hand is its own complete programming language. The two work together to connect the frontend of an application with the backend. JavaScript is used within the front end to handle user interactions, modeling, events, and to make requests to the backend. Meanwhile, JSON is often used to format data for APIs. JSON messages can be used to send data request responses to the frontend, especially containing data queried from a database. In this capacity, JSON acts as a bridge between the backend database and the frontend interface that the user sees. 

  Within this developement process, several aspects of the code were refactored in order to improve functionality and efficiency. One such example is the compartmentalization of components. Some of the included components you will see in this code are: Trip-Listing, Trip-Card, and Navbar. These three components are independent from one another, but still work together to produce fully developed and functional user interfaces. For Example, each trip contains trip data which is handled and populated to a trip-card. If the user wishes to see a list of all the trips available, the program produces this by populating the Navbar component at the top of the page, the displaying each individual trip-card dynamically on the page. This view is controlled and implemented by the trip-listing and app components which call and organize the necessary sub-components. 
  
  Another smaller scale example of refactoring for efficiency is the enclosure of commonly used HTML pages into templates implemented with Handlebars. One direct example of this is the HTML to create the page header. The header is used frequently in the user-facing side of the application. However we want to reduce redundancy in code and create a more modularized application. To that end, the HTML for creating the header is turned into a header template which Handlebars can then implement with a simple reference to that template within any HTML page where it is needed. The make this into a physical concept, I consider a person sending many letters to different people. The mailing address of each person may be different and so the individual may need to write each out on the envelope; however, the return address will be the same. In order to save time then, the individual creates a stamp with their return address so that each envelop can simple be stamped.

## Testing 
   In a fullstack application, a strong understanding of the methods, endpoints, and security is crucial for developing and testing robust and secure APIs. Firstly, The actions performed on resources such as a database through the API are defined within the HTTP methods:
* GET: Used to retrieve data from a server or database
* POST: Used to send data to create a new resource or entry into a database
* PUT: Used for updating existing data, OR creates a new entry if none exists
* DELETE: Used to delete resources 
* PATCH: Used to partially update a resource
* OPTIONS: Returns HTTP methods supported in the server
  
  Within this application, the HTTP methods used are GET, POST, PUT, and DELETE. It is important that the appropriate method be used to perform the desired operation. These methods can operate on different endpoints as needed. For example, to retrieve a list of trips - assuming an API endpoint exists called 'Trips' that contains record of all Trips - 'GET /Trips' can be used to interact with that endpoint. Furthermore, a single trip can be found within that endpoint (assuming functionality has been implemented within the endpoint) based on some search criteria such as '_ID' by expanding the reference to GET /Trips/{_ID}.
  
   Security in APIs is critical to protect the integrity of the data contained within or interacted with. The implementation of robust security features and practices including Triple A - Authentication, Authorization, Accounting -, parameterization of queries, and encryption can all help to maintain robust security within our applciation. The security of an application and API should be tested with vulnerability assessments, code reviews, automated testing, and penetration testing in order to mitigate potential security threats.
  
  Testing APIs can be conducted in a number of ways according to the purpose. The functionality of an individual endpoint can be tested with unit tests and other automated or non-automated methods to ensure they perform as expected. Integration testing of APIs is also critical to ensure that the APIs and components within the application interact properly with eachother. Security testing should be included in each of these - and really throughout the entire application. Robust testing includes both positive and negative tests - not only ensuring that the encryption ok tokenization is implemented and decrypted properly, but that the application properly and safely handles failures such as an invalid token. In this application, testing of API interactions and method calls was conducted using postman.

  ## Reflection
    This course has helped me to develop additional skills as an aspiring software developer. It has enhanced my understanding of - and skill in working with APIs, security implementation, and Web development. A major benefit that I found from this course in full-stack development is that ability to envision the entire application and the logic behind it. Looking at individual code, implementing methods and classes is critical, however in this course, I have been able to develop the bigger picture understanding of how each individual code interacts with the others to produce a fully developed web application. 
