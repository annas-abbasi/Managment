Time Management App
Introduction
This Time Management app allows users to assign tasks, track time on ongoing projects, and manage tasks for individual users or teams. The app features role-based access, with only one admin who has the authority to approve or reject tasks. The dashboard is secured and accessible only to authenticated users.

Prerequisites
Node.js installed on your machine
MongoDB instance (local or cloud-based)
Getting Started
1. Install Dependencies
First, ensure that the node_modules folder is deleted (if it exists) to prevent any potential conflicts.

Then, install the necessary dependencies by running:
$ npm install

2. Create a .env File
Create a .env file in the root directory of your project. Add your secret keys with the following names:
MONGO_URI=<Your MongoDB URI>
ServerApi=<Your Frontend Local Path>

MONGO_URI: This should be your MongoDB connection string, which will be used to store tasks and login information.
ServerApi: This should be the local path of your frontend application, typically something like http://localhost:3000.


3. Start the Application
Once the environment variables are set, start the application by running:
$ npm start

This command will start your app, making it accessible at the specified ServerApi URL. The app should now be running and ready to use.
