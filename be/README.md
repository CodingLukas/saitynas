The core classes, functions, and methods necessary for this project are:

1. `app.js`: This is the entry point of the application. It sets up the Express.js server and includes the necessary middleware for handling requests and responses.

2. `routes/category.js`: This file contains the routes for the CRUD operations related to the Category entity.

3. `routes/ad.js`: This file contains the routes for the CRUD operations related to the Ad entity.

4. `routes/comment.js`: This file contains the routes for the CRUD operations related to the Comment entity.

5. `controllers/categoryController.js`: This file contains the controller functions for handling the Category-related requests.

6. `controllers/adController.js`: This file contains the controller functions for handling the Ad-related requests.

7. `controllers/commentController.js`: This file contains the controller functions for handling the Comment-related requests.

8. `models/category.js`: This file defines the Category model.

9. `models/ad.js`: This file defines the Ad model.

10. `models/comment.js`: This file defines the Comment model.

11. `middleware/auth.js`: This file contains the middleware for handling authentication and authorization.

12. `utils/firestore.js`: This file contains utility functions for interacting with Firestore.

13. `utils/validator.js`: This file contains utility functions for validating and sanitizing incoming data.

14. `package.json`: This file contains the project's npm configuration, which includes the project's dependencies.

Now, let's write the code for each file.

`app.js`
