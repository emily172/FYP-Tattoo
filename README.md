# INKPOTS TATTOO STUDIO – FINAL YEAR PROJECT – EMILY HALLEY - 20092335
![alt text](image-2.png)

INKPOTS TATTOO STUDIO enhances the UX and UI for a tattoo studio's online presence in the South East by improving client engagement and centralizing the studio in Waterford City as a web application. <br>This final project modernizes the studio's online presence using technologies to enhance how it showcases its talented artists tattoo portfolios, all while being mindful of the studio's budget constraints.

Tattoos have a rich history, dating back thousands of years, serving as a form of personal expression, cultural significance, and art using many different forms of techniques and methods for inserting inks into a fixed place on the body. 

Despite their popularity, many studios face the common issue of not having a proper online presence. If they do, it’s often an outdated WordPress or Wix website that is broken, insecure, and not visually pleasing or easy to navigate, or they rely on social media sites such as Facebook, Instagram, or WhatsApp. This makes it difficult for clients to find reliable information about the studio, view artists’ portfolios, and get in touch with the studio and their favourite tattoo artist. 

As a developer, I wanted to help a tattoo studio improve its online presence, much like a web solutions company would, enabling them to move away from relying solely on outdated websites or social media platforms. It targets towards studios operating on a budget, ensuring that cost-effective advanced technologies solutions are included keeping up the studios work quality. Thereby, This project involves creating a modern, centralized web application that enhances the studio’s online presence and client engagement using the latest technologies.


## OVERVIEW - INKPOTS TATTOO STUDIO
INKPOTS TATTOO STUDIO is a Web application created for people who are interested in getting a tattoo. This web app is managed by the studio admins and artists to update all of the content to efficiently manage studio details, services, team members, testimonials, events, gallery, pricing, FAQs, and contact information and lots more. This gives new clients and existing clients to  browse through the site and gain information about styles, artists, testimonials and can send messages using the contact page. If a client has picked an artist they want to work with, between the client and artist and admin. They can sign up to a communications app to message each other about their tattoo goals, ideas, aftercare etc. This studio is designed constantly throughout making it easy to use and visually appealing. 

![alt text](image.png)


## ROLE BASED ACCESS CONTOL 

- **Studio Admins and Artists** – They manage all studio-related information, including services, team members, events, gallery updates, and pricing etc.
- **Clients/Visitors** – They browse studio details, services, and events, access FAQs, and contact the studio etc.


## METHODOLOGIES
![alt text](image-4.png)
- **Scrum**– Iterative and incremental software development framework for collaboration and continuous delivery.
- **Trello** – Visual project management and task management tracking to focus for tasks needed to be completed, pending, backlogging or started.
- **Sprints** – Short development cycles for rapid delivery taking from 1 to 4 weeks for each software development cycle for planning, execution, review, and retrospective.
- **Agile** – Flexible and collaborative software development methodology for incremental releases for each feature, with project evolvement based on feedback requirements and expectations.




## TECHNOLOGIES

### CORE TECHNOLOGIES 
![alt text](CoreTech.png)
- **MERN Stack** – Full-stack JavaScript framework using MongoDB, Express, React and Node.js
- **Postman** – API testing and development tool for sending, inspecting and debugging endpoints, providing a GUI for RESTful API services.
- **VS Code** – Lightweight code editor for development for accessing tools such as command prompt, downloadable extensions, Git integration and autocomplete debugging tools. 
- **Chrome** – Web browser optimized for performance and rendering interactive web applications.
- **Chrome DevTools** – Built-in debugging tools for live editing CSS/JS, Performance profiling, Network request monitoring, API calls, local storage.
- **Firefox** – Privacy-focused web browser for memory efficiently and incognito mode.
- **Firefox Devtools** – Advanced Debugging
- **NPM (Node Package Manager)** – Dependency management tool for installing, updating, and managing JavaScript libraries for Node.js applications. 
- **GitHub** – Version control and collaboration platform for pushing, pulling requests for changes in code.
- **GitHub Pages** – Hosting application as a live website from configuring the repo.
- **Nodemon** – Automatic server restart for Node.js during development changes in realtime for rapid debugging. 
- **JavaScript** – Core programming language for web development back and frontend for React, Node, Express and MongoDB for event-driven programming<br> for interactivity and asynchronous data handling with APIs.
- **CSS / Tailwind CSS** - Styling language for web design.
- **HTML** – Markup language for structuring web pages.


### FRONTEND TECHNOLOGIES 
![alt text](FrontTech.png)
- **React.js** – Component-based UI framework builds with JavaScript using a virtual DOM to enhance rendering efficiency with declarative syntax. 
- **Tailwind CSS** – Utility-first CSS framework for design for customisable use of JSX using utility classes, no need to write custom styles as its built-in responsive grid system and pre-defined utility classes.
- **Axios** – Promise-based HTTP client for JavaScript for asynchronous HTTP requests to API to enable for data fetching, error handling, and response processing, supporting automatic JSON conversion between the backend(Node.js) and frontend(React.js)
- **FontAwesome** – Scalable vector icons for UI components for buttons, navigation, alerts, and interactive elements, making the UI more engaging with CSS. 
- **Tailwind Vite** – Tailwind CSS optimized for Vite.js making the layouts load quicker on the app when loading up with fater development speeds and instant updates in development mode.
- **Vite.js** – Lightweight development server for React using the lightning-fast hot module replacement (HMR),<br> reducing startup time and enhancing build performance for modern web applications seeing realtime changes to your code without the need to restart or refresh the application starts up or browser.
- **React DOM** – React’s interface with the browser and it effectively is interacting with HTML elements dynamically.
- **React Icons** – Customizable icons for React applications providing scalable and customizable vector icons
- **React Vertical Timeline Component** – Timeline visualization for events with interactive elements for marking a timeline event such as showcasing studio history, upcoming events, or project milestones.
- **Socket.io Client** – Real-time communication for React to allow it to communicate with the backend to the frontend with live chatting systems and real-time updates.


### BACKEND TECHNOLOGIES 
![alt text](BackTech.png)
- **Node.js** – JavaScript runtime for backend development to create server-side applications for handling multiple requests that’s non-blocking and event driven.
- **Express.js** – Web framework for Node.js that simplifies the creation of APIs for backend logic. It gives tools for routing, middleware integration, and request handling, making backend development more streamlined. 
- **MongoDB** – NoSQL document-oriented database for storing data in as a JSON format giving a flexible schema design to store, text, files, images etc.
- **bcrypt** – Password hashing for security to ensure that all of the users passwords are not a readable plaintext file for others to read stored in the database. It uses a strong one-way encryption algorithm, making passwords resistant to brute-force attacks.
- **CORS (Cross-Origin Resource Sharing)**– Middleware for API security which checks who is allowed to view the parts of the API. Powered by RBAC roles and crucial in web applications where the frontend and backend communicate across different domains.
- **dotenv** – Environment variable management in Node.js to secure access to sensitive parts of the application, ie, secure access to API keys, database credentials, and other sensitive information without exposing them in the codebase.
- **jsonwebtoken (JWT)** – Authentication & user session security for managing session handling for each user logged in on the system, without storing sensitive user data on the server, making authentication more efficient and setting a limit to how long they can be - logged in for. If the user is logged in and the token was set to 2hrs they would be able to use the app for two hours and after the time is up they would be automatically logged out and need to login again to start another session.
- **Mongoose** – ODM (Object Data Modeling) for MongoDB, making it easier for interacting with MongoDB with models, validation, and schema definitions, while maintaining its structure.
- **Multer** – File upload handling for images and media using API requests.
- **Socket.io** – Real-time bi-directional communication for live updates and chatting functionalities.
- **WebRTC** – Peer-to-peer streaming for video & audio communication in the browser.


### GRAPHIC DESIGN & MEDIA 
![alt text](GAM.png)
- **Microsoft Designer** – AI-powered graphic design tool to create images quickly and easily by typing in a suggestion prompt using advanced machine learning to generate templates, images, and custom branding tailored to user input.
- **Canva** – Online graphic design platform for easy content creation or creating imagery, posters. Videos etc.
- **Figma** – Collaborative UX/UX design tool for prototyping
- **YouTube Studio** – Video content creation and management platform video editing tools, thumbnails customization,
- **Linktree** – Centralized bio link tool for creating custom landing pages with relevant links under a single, shareable link website for easy navigation.


## Installation

## 1. Clone the repository:
   ```bash
   git clone https://github.com/emily172/FYP-Tattoo.git
   ```

```bash
cd tattoo-web-app
 ```


## 2. Install Dependencies
INKPOTS TATTOO STUDIO consists of a frontend (React.js) and backend (Node.js & Express.js). <br>Install dependencies for both each in two separate command line windows.

### Frontend (React.js Setup)
Navigate to the frontend directory:
```bash
cd tattoo-website
```
Install required packages:
```bash
npm install
```


### Backend (Node.js & Express Setup)

Navigate to the backend folder:
```bash
cd server
```
Install backend dependencies:
```bash
npm install
```


## 3. Configure Environment Variables
Create a .env file in the backend folder and define sensitive configurations:
```bash
MONGO_URI=mongodb://localhost:27017/inkpots-studio
JWT_SECRET=yourjwtsecret
```

## 4. Start the Development Server

### Frontend
```bash
npm run dev
```

### Backend
(Nodemon will restart the backend automatically on file changes.)
```bash
nodemon server.js
```


##  5. Testing API Endpoints
Use Postman to test API sample requests(you can test any endpoint):
<br>
NOTE YOU NEED TO GET THE ID TO PUT AND DELETE
```bash
GET → Retrieve tattoos
http/localhost:5000/tattoos

POST → Add tattoos
http/localhost:5000/tattoos 

PUT → Edit a tattoo
http/localhost:5000/tattoos/id 

DELETE → Remove a tattoo
http/localhost:5000/tattoos/id
```


##  6. User Guide
### For Administrators or Tattoo Artitsts
1. Register to the Admin Panel
2. Login to the Admin Panel
3. Update Studio Information
4. Manage Services, Team, and Events
5. Modify Pricing & Gallery
6. Update FAQs & Contact Details
7.Save Changes & Publish Updates

### For Clients & Visitors
1. Browse Studio Details
2. Check Available Services
3. Learn About the Team, artists and styles
4. Read Testimonials
5. View Upcoming Events
6. Explore the Gallery
7. Check Pricing
8. Read FAQs
9. Use Contact Section to Reach Out
10. Sign up and Chat with an artist



## Acknowledgments 💡
I would like acknowledge and Special thanks to:

- **My supervisor Sinead O'Neill** <br> who has guided me every step of the way to provide suggestions and feedback on my project maintaining contact, project management through regular scrum meetings.

- **My Self** <br>  who took the leverage to work hard and develop my project successfully and effectively through every step. 

- **Leactures** <br> who have guided me throughout my university journey giving the best support and help with every module taken, this has lead me to develop my final year project.


## References
https://github.com/emily172/FYP-Tattoo

https://jwt.io/

https://docs.secureauth.com/ciam/en/json-web-tokens.html

https://www.blindtextgenerator.com/lorem-ipsum

https://www.youtube.com/playlist?list=PL4cUxeGkcC9iVKmtNuCeIswnQ97in2GGf

https://www.youtube.com/playlist?list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT

https://www.youtube.com/watch?v=98BzS5Oz5E4&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE

https://www.youtube.com/watch?v=QyFcl_Fba-k&list=PL4cUxeGkcC9jjuXmnTyPSMo5NZ8dANHSW&index=1

https://www.youtube.com/playlist?list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp

https://github.com/iamshaunjp/react-router-in-depth/tree/lesson-12

https://github.com/iamshaunjp/react-router-in-depth/tree/lesson-12

https://github.com/iamshaunjp/MERN-Stack-Tutorial/tree/lesson-14

https://www.youtube.com/watch?v=QyFcl_Fba-k&list=PL4cUxeGkcC9jjuXmnTyPSMo5NZ8dANHSW&index=1

https://github.com/iamshaunjp/node-express-jwt-auth/tree/lesson-18

https://www.youtube.com/watch?v=mYy-d6BtqmU

https://github.com/dejwid/mern-chat

https://github.com/coding-with-chaim/toggle-cam-final

https://www.youtube.com/playlist?list=PLK0STOMCFms7jQEKo89pHdkO_QdSjDs0t


https://www.youtube.com/watch?v=Uk5DbEnFNP0


https://github.com/coding-with-chaim/webrtc-screen-share


https://stackoverflow.com/questions/77026760/how-do-i-make-a-collaborative-whiteboard-using-webrtc-or-websocket


https://dev.to/nyxtom/realtime-collaborative-drawing-with-canvas-and-webrtc-2d01

http://medium.com/@techsuneel99/jwt-authentication-in-nodejs-refresh-jwt-with-cookie-based-token-37348ff685bf


http://stackoverflow.com/questions/61604379/req-headersauthorization-is-undefined-in-nodejs-jwtjson-web-token


https://stackoverflow.com/questions/43915379/i-need-to-replace-bearer-from-the-header-to-verify-the-token

https://github.com/nextauthjs/next-auth/discussions/1290

https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs


https://apidog.com/blog/bearer-token-nodejs-express/

https://article.arunangshudas.com/understanding-documents-objects-and-collections-in-mongoose-39a57a4e8a40

https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/


https://www.geekster.in/articles/schema-data-types-in-mongoose/

https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj

https://www.npmjs.com/package/@fortawesome/free-brands-svg-icons

https://www.npmjs.com/package/cors

https://www.npmjs.com/package/dotenv

https://www.npmjs.com/package/express

https://www.npmjs.com/package/jsonwebtoken

https://www.npmjs.com/package/multer

https://www.npmjs.com/package/socketio

https://www.npmjs.com/package/socket.io-client

https://www.pluralsight.com/resources/blog/guides/getting-started-with-nodejs

https://runjs.app/blog/how-to-start-a-node-server

https://stackoverflow.com/questions/31592726/how-to-store-a-file-with-file-extension-with-multer



https://forum.freecodecamp.org/t/handling-the-files-in-express-using-multer/673882

https://github.com/expressjs/multer/issues/150


https://betterstack.com/community/guides/scaling-nodejs/multer-in-nodejs/


https://dev.to/wildanzr/express-file-upload-using-multer-1a47

https://stackoverflow.com/questions/59649056/mongoose-error-when-trying-to-connect-to-mongo-db

https://medium.com/@stinachinma/mongodb-database-connections-using-mongoose-in-node-js-caec4f890717

https://medium.com/@finnkumar6/how-to-connect-mongodb-using-mongoose-in-node-js-like-a-pro-a-fresh-and-modern-approach-6470c69aec16

https://dev.to/kjdowns/building-a-basic-api-using-express-node-and-mongodb-160f

https://stackoverflow.com/questions/24058157/socket-io-node-js-cross-origin-request-blocked

https://socket.io/docs/v3/handling-cors/


https://socket.io/docs/v4/handling-cors/

https://stackoverflow.com/questions/77421616/getting-req-file-when-trying-to-upload-file-from-react-to-express-js-using-multe

https://stackoverflow.com/questions/9177049/express-js-req-body-undefined/57014005#57014005

https://medium.com/@muh__hizbullah/multer-req-body-null-object-when-send-file-with-other-field-string-using-formdata-b275b4364404


https://stackoverflow.com/questions/51535455/express-js-use-async-function-on-requests/51538169


https://stackoverflow.com/questions/68770871/some-question-about-the-async-function-with-express-js-nodejs-and-mongo-db


https://stackoverflow.com/questions/74227591/socket-io-sends-2-messages-on-receiving-end


https://medium.com/dev-simplified/simple-guide-to-socket-io-a-deep-dive-into-real-time-communication-36a960b8ccfb


https://socket.io/docs/v4/client-socket-instance/

https://medium.com/@sasindusathiska/building-real-time-notifications-with-react-socket-io-node-js-12757a032e0d


https://stackoverflow.com/questions/67469795/error-disconnect-is-a-reserved-event-name-why-am-i-getting-this-error

https://github.com/react-native-webrtc/react-native-webrtc/issues/1551

https://stackoverflow.com/questions/55155548/how-to-get-the-socket-id-of-a-disconnected-client-on-the-disconnect-event-in-soc/55156610

https://stackoverflow.com/questions/8788790/list-of-connected-clients-username-using-socket-io


https://www.reddit.com/r/node/comments/v9338t/socketio_emit_to_specific_socket_ids/


https://github.com/socketio/socket.io/discussions/4470


https://stackoverflow.com/questions/45951126/socket-tosocket-id-emit-does-not-work


https://ably.com/topic/socketio

https://medium.com/@valentinog/going-real-time-with-socket-io-node-js-and-react-3e0f02d3d447

https://socket.io/docs/v3/emit-cheatsheet/

https://medium.com/@smubashir655/responding-to-url-parameters-handling-patch-requests-and-delete-requests-in-express-js-f6fccce23fc7

https://devendrajohari9.medium.com/nodejs-authentication-authorisation-ee04ff744c80


https://stackoverflow.com/questions/53915510/req-body-username-and-req-body-password-are-undefined/53916160#53916160

https://www.mongodb.com/community/forums/t/how-can-i-accept-user-input-if-he-only-wants-to-change-a-specific-input/194220

https://prkjha25.medium.com/node-js-and-express-js-part-7-8db2aef18c50

https://stackoverflow.com/questions/74509384/not-getting-req-body-results-in-login-function-despite-it-working-in-the-registr

https://dev.to/ronyfr3/express-js-authentication-authorization-code-4cdd

https://www.linkedin.com/pulse/building-simple-secure-api-rest-nodejs-carlos-s%C3%A1nchez-valdez

https://medium.com/geekculture/rest-api-login-and-register-node-js-with-jwt-8cb6755f5a6b

https://www.mongodb.com/community/forums/t/error-e11000-when-trying-to-register-a-new-user/262722

https://medium.com/@ravipatel.it/building-a-secure-user-registration-and-login-api-with-express-js-mongodb-and-jwt-10b6f8f3741d


https://developerchandan.medium.com/login-register-api-route-and-schema-in-nodejs-b80e81fe4110

https://medium.com/@alicantorun/build-a-rest-api-with-mongodb-mongoose-and-node-js-3a5afc4a0431

https://www.mongodb.com/community/forums/t/cant-show-data-after-api-request-i-use-postman/225143

https://medium.com/@it.ermias.asmare/user-authentication-and-authorization-in-express-and-mongodb-using-jwt-643503a23452

https://dev.to/eidorianavi/node-js-mongodb-and-express-rest-api-part-2-1g7j

https://www.reddit.com/r/node/comments/14di15y/new_to_node_and_express/

https://stackoverflow.com/questions/50555343/async-await-mongoose-doesnt-always-run-correctly

https://stackoverflow.com/questions/50332384/mongodb-populate-performance/50336552#50336552

https://as510891328.medium.com/regular-expression-with-mongodb-bbbf813d5309

https://www.mongodb.com/community/forums/t/mongoose-req-query-search-not-working-inside-populated-document-help-me-so-that-i-can-search-by-client-name/219733

https://stackoverflow.com/questions/53520126/app-post-is-not-working-i-am-not-getting-the-output


https://stackoverflow.com/questions/54393139/how-can-i-console-log-the-res-body-in-express-nodejs/54393254#54393254

https://www.reddit.com/r/react/comments/1bbanrh/trying_to_post_a_login_request_to_backend_using/

https://stackoverflow.com/questions/71539829/why-does-req-params-id-return-undefined

https://visheshism.medium.com/simplifying-data-input-in-express-an-overview-of-req-params-req-query-and-req-body-179ab07b2256

https://stackoverflow.com/questions/52282799/how-to-create-a-query-string-filtering-the-search-by-specific-parameters

https://www.reddit.com/r/node/comments/m7x0ud/how_to_filter_based_on_reqquery_in_nodejs_and/

https://developerchandan.medium.com/implementing-pagination-search-and-filtering-in-a-node-js-api-eb87b4be3a52

https://developerchandan.medium.com/advanced-job-search-filter-api-with-node-js-and-mongodb-04a9d4fa2c5d

https://medium.com/@bhupendra_Maurya/password-hashing-using-bcrypt-e36f5c655e09

https://auth0.com/blog/cors-tutorial-a-guide-to-cross-origin-resource-sharing/

https://www.geeksforgeeks.org/steps-to-create-an-express-js-application/

https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/Introduction

https://blog.logrocket.com/multer-nodejs-express-upload-file/

https://expressjs.com/en/resources/middleware/multer.html

https://medium.com/@mohsinansari.dev/handling-file-uploads-and-file-validations-in-node-js-with-multer-a3716ec528a3

https://www.freecodecamp.org/news/simplify-your-file-upload-process-in-express-js/

https://medium.com/@awofesobipeace/axios-useeffect-and-api-application-with-props-4927d64bb875

https://dev.to/darkmavis1980/fetching-data-with-react-hooks-and-axios-114h

https://stackoverflow.com/questions/69140070/making-an-axios-get-request-and-using-react-usestate-but-when-logging-the-data-i/69140217#69140217


https://forum.freecodecamp.org/t/useeffect-cleanup-with-axios/518493

https://stackoverflow.com/questions/71205457/how-to-add-a-linear-gradient-to-text-in-tailwind-css

https://dev.to/mitchelln11/help-with-image-click-through-like-a-carousel-using-react-hooks-4njg

https://dev.to/jemmycodes/creating-an-image-slider-with-the-usestate-hook-3c8i

https://abidemi-dev.medium.com/react-hooks-usestate-with-previous-state-55b6272f1473

https://www.codementor.io/@damianpereira/how-to-use-clearinterval-inside-react-s-useeffect-and-why-it-is-important-1si7mztjlk

https://stackoverflow.com/questions/70710122/how-to-use-setinterval-with-react-useeffect-hook-correctly

https://medium.com/@garethdavisrogers/using-setinterval-and-clearinterval-with-react-hooks-7fcf26dc8fdb

https://stackoverflow.com/questions/39562317/react-js-redux-setinterval-and-clearinterval-in-reducers/39568014

https://diko-dev99.medium.com/fixing-grid-layout-issues-in-tailwind-css-preventing-overflow-and-ensuring-proper-spacing-4efd5887d902

https://kombai.com/tailwind/overflow/

https://stackoverflow.com/questions/69591431/how-to-fix-in-tailwindcss-div-height-overflows-parent-div

https://medium.com/@alexanie_/https-ocxigin-hashnode-dev-uselocation-hook-in-react-router-758a0a711308


https://tailwindcss.com/docs/justify-content

https://stackoverflow.com/questions/57046825/how-do-i-read-path-like-react-router-for-a-conditional-classname

https://stackoverflow.com/questions/66527526/trying-to-remove-token-from-local-storage-on-logout-button

https://binarybeats.medium.com/understanding-local-storage-in-javascript-a-beginners-guide-660546fe6cee


https://medium.com/@nicholasstano/using-axios-and-fetch-in-react-app-f6a29555daf3

https://selcuk00.medium.com/common-mistakes-and-best-practices-with-reacts-usestate-hook-cd25ce2991ee

https://stackoverflow.com/questions/60420615/usestate-hook-not-updating-the-value-on-change

https://heyjoshlee.medium.com/using-the-usestate-hook-and-working-with-forms-in-react-js-2139869549d0

https://stackoverflow.com/questions/63286505/react-hooks-with-usestate

https://medium.com/@coadams9/react-hooks-usestate-cc527fdff604

https://forum.freecodecamp.org/t/help-with-axios-and-async/480637

https://stackoverflow.com/questions/70556656/i-am-getting-post-http-localhost5000-api-users-400-bad-request-response-w

https://stackoverflow.com/questions/53709142/best-way-to-pass-query-parameters-to-url-using-axios-in-vue

https://dev.to/mperon/axios-error-handling-like-a-boss-333d

https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm

https://stackoverflow.com/questions/73311592/delete-request-with-axios-getting-bad-request

https://medium.com/better-programming/handling-async-errors-with-axios-in-react-1e25c058a8c9

https://stackoverflow.com/questions/71073085/make-div-align-to-bottom-of-column-in-card-tailwind-css


https://stackoverflow.com/questions/27827234/how-to-handle-the-onkeypress-event-in-reactjs

https://tailwindcss.com/

https://stackoverflow.com/questions/73961527/im-trying-to-get-the-localstorage-but-encountering-an-error

https://www.clouddefense.ai/code/javascript/example/jwt-decode

https://tailwindcss.com/docs/animation


https://stackoverflow.com/questions/74237681/issues-with-setinterval-in-useeffect

https://stackoverflow.com/questions/70700712/how-can-i-compare-localecompare-numbers

https://stackoverflow.com/questions/37440408/how-to-detect-esc-key-press-in-react-and-how-to-handle-it


https://medium.com/@priyaeswaran/beginners-guide-to-closing-a-modal-in-react-on-outside-click-and-escape-keypress-9812b1d48b84


https://www.sitepoint.com/community/t/javascript-close-a-model-with-escape-key/339524


https://stackoverflow.com/questions/387736/how-to-stop-event-propagation-with-inline-onclick-attribute

https://medium.com/@moh.mir36/when-to-use-stoppropagation-9920f90af097

https://stackoverflow.com/questions/21308737/transform-an-option-list-into-stars


https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds

https://javascript.info/date

https://stackoverflow.com/questions/11642926/stop-close-webcam-stream-which-is-opened-by-navigator-mediadevices-getusermedia

https://dev.to/morinoko/stopping-a-webcam-with-javascript-4297

https://medium.com/@jainsnehasj6/a-video-call-application-using-react-and-express-with-socket-io-and-peer-to-peer-connections-59721461d7b5

https://stackoverflow.com/questions/71255795/webrtc-getting-error-i-cant-find-that-problem

https://www.reddit.com/r/WebRTC/comments/17g824g/find_a_bug_in_my_webrtc_code_if_you_can_please/

https://github.com/microsoft/MixedReality-WebRTC/issues/651


https://github.com/react-native-webrtc/react-native-webrtc/issues/1377


https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas

https://stackoverflow.com/questions/31495344/change-cursor-depending-on-section-of-canvas


https://stackoverflow.com/questions/10673122/how-to-save-canvas-as-an-image-with-canvas-todataurl



https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL


https://www.youtube.com/watch?v=bupetqS1SMU



https://www.npmjs.com/package/react-vertical-timeline-component