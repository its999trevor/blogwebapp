Blogspot

Blogspot is a simple blogging platform built using Node.js, Express, and MongoDB. It allows users to view, create, edit, and delete blog posts. Users can also filter posts by category and add new posts after logging in.

Getting Started

Follow these instructions to set up and run the project locally on your machine.

Prerequisites
Node.js and npm installed
MongoDB installed and running
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/blogspot.git
Navigate to the project directory:

bash
Copy code
cd blogspot
Install dependencies:

bash
Copy code
npm install
Set up MongoDB:

Ensure MongoDB is running on your machine.
Update the MongoDB connection string in app.js to match your local setup.
Start the server:

bash
Copy code
npm start
Open your browser and go to http://localhost:3333 to access Blogspot.

Usage
Visit http://localhost:3333 to view all blog posts.
Click on a post to view details.
Filter posts by category using the dropdown filter.
Log in to create new posts or edit existing ones.
To log in, go to http://localhost:3333/login.
Features
View all blog posts.
Filter posts by category.
User authentication for creating and editing posts.
Add new posts with images, descriptions, and categories.
Edit and delete existing posts.
Responsive design for a seamless user experience.
Technologies Used
Node.js
Express.js
MongoDB
Mongoose
Express Sessions
Handlebars (hbs) for templating
Bootstrap for styling
Contributing
Feel free to contribute to this project by opening issues or pull requests. Follow the Contributing Guidelines for more details.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Special thanks to OpenAI for providing the GPT-3 model used to generate this README template.
