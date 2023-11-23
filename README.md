# Cocojambo

Hey party people! 🎉 We're Manuel, Laura, and Edoardo, the masterminds behind Cocojambo! 🚀

So, picture this: after 6 intense weeks of coding, we get it - everyone needs a good cocktail, right? That's where our Cocktail App comes in! 🍹 Dive in, search for the coolest cocktails, geek out on ingredient details, stash away your all-time favorites, and a whole lot more!

Welcome to Cocojambo, where the code is cool, and the cocktails are cooler! Cheers to coding adventures and mixology magic! 🌐🍸

## Table of Contents

- [Cocojambo](#cocojambo)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)

## Features

1. **Search Cocktails and Ingredients:**

   - Users can search for cocktails or ingredients to get a list of related cocktails.

2. **Random Cocktail:**

   - Users can generate a random cocktail recommendation.

3. **User Authentication:**

   - Secure user authentication using bcrypt to hash passwords.

4. **Profile Picture:**

   - Users can set and display a profile picture.

5. **Favorites:**

   - Users can add cocktails to their favorites list.

6. **Your Favorites:**
   - View a list of all the cocktails added to the favorites.

## Technologies Used

- HTML, CSS, JavaScript
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- BcryptJS
- Handlebars (hbs)
- Session Management: express-session, connect-mongo
- External API: The Cocktail DB (https://www.thecocktaildb.com/api.php)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/cocktail-app.git

   ```

2. Install dependencies

npm install axios bcryptjs connect-mongo cookie-parser dotenv express express-session hbs mongoose morgan serve-favicon

3. Get access

MONGODB_URI=your_mongodb_uri
SESS_SECRET=your_session_secret

4. Start!

npm run dev