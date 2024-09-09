# SycoFusion - Social Media Platform

Welcome to **SycoFusion**, a social media platform where users can upload posts, like, and comment on them. This repository contains the frontend of the SycoFusion platform, built using Next.js. The backend is built using Express.js, with Firebase for storage and MongoDB as the database.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Backend Repository](#backend-repository)
- [Contributing](#contributing)
- [Contact](#contact)

## Project Overview

SycoFusion is a modern social media platform designed to allow users to share their thoughts and interact with others. Users can upload posts with images or text, like posts from others, and engage in discussions through comments.

## Features

- **User Authentication:** Sign up and log in to access the platform.
- **Post Creation:** Upload text and image posts.
- **Like and Comment:** Interact with posts by liking them and leaving comments.
- **Responsive Design:** Works seamlessly across different devices.

## Technologies Used

### Frontend

- **Next.js:** React framework for building server-side rendered applications.
- **Tailwind CSS:** For styling.
- **ShadCN UI:** For UI components.
- **Firebase Storage:** For storing and retrieving post images.

### Backend

- **Express.js:** Web framework for Node.js, handling API requests.
- **MongoDB:** NoSQL database for storing user data, posts, likes, and comments.
- **Firebase Storage:** For securely storing and serving user-uploaded images.

## Installation

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later) or Yarn
- MongoDB Atlas or a local MongoDB instance
- Firebase account

### Clone the Repository

```bash
git clone https://github.com/your-username/sycofusion-client.git
cd sycofusion-client
```

### Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

### Environment Variables

Create a `.env.local` file in the root directory of the project and add your environment variables as shown in the `.env.example` file. This should include Firebase credentials, MongoDB connection string, and any API keys.

### Running the Development Server

```bash
npm run dev
```

or

```bash
yarn dev
```

The development server will be available at `http://localhost:3000`.

## Usage

- **Sign up** for an account or **log in** with an existing account.
- **Upload posts** by clicking on the "Create Post" button.
- **Like** posts and **leave comments** to interact with other users.
- **Explore** the platform to view posts from different users.

## Backend Repository

The backend API for SycoFusion is hosted in a separate repository. You can find it [here](https://github.com/zohaibsaeed117/SycoFusion-server).

## Contributing

Contributions are welcome! If you'd like to contribute to SycoFusion, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a Pull Request.


## Contact

For any inquiries or support, please contact the project maintainer:

- **Zohaib Saeed**
- Email: [zohaib.saeed1259@gmail.com](mailto:zohaib.saeed1259@gmail.com)

---

This README provides an overview of the SycoFusion project, how to set it up, and links to the backend repository. Make sure to update the links and contact information with your actual details.
