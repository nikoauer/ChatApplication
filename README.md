# <ChatApp>

## Description

This is a real-time chat application that would be used inside an internal Company. After using Microsoft teams at my current job as an internal chat tool, I was curious to see if this was possible to build.  The app allows multiple users to chat in real-time, featuring a modern user interface with smooth animations. The biggest challenge I found was fixing the styling with the prebuilt components that GetStream offers and making it responsive in conjuction with them. 

## Features
Real-time messaging: Messages appear instantly for all connected users.
User authentication: Secure login and registration system.
Responsive design: The UI is fully responsive and optimized for both mobile and desktop screens.
Tailwind CSS styling: Custom and utility-first styles provided by Tailwind.
Smooth animations and transitions for a better user experience.

## Technologies Used
Frontend:

React
Tailwind CSS
Getstream.io

Backend:

Node.js
Express.js
Getstream.io

## Installation

Clone the repository:
git clone https://github.com/your-username/chat-app.git
cd chat-app
Install dependencies for both the frontend and backend:

# Install server-side dependencies
- cd server
- npm install

# Install client-side dependencies
- cd ../client
- npm install

# Start the development servers:

Backend: Start the server from the server directory
- npm run dev
Frontend: Start the client from the client directory
- npm run start

Open the app in your browser

## Usage

Users can sign up or log in.
Once authenticated, users can join chat rooms or start direct conversations. Additionally users can react to messages, respond to individual messages and send photos. 
All messages are broadcast in real-time.

![ChatApp](/chatapp.png)

