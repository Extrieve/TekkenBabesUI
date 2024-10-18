# Tekken Hotness Battle App

Welcome to the **Tekken Hotness Battle App**! This application allows users to decide who the hottest Tekken character is through engaging battles and a global leaderboard.

## Table of Contents

- [Tekken Hotness Battle App](#tekken-hotness-battle-app)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
      - [Clone the Repository](#clone-the-repository)
      - [Frontend Setup](#frontend-setup)
      - [Backend Setup](#backend-setup)
  - [Usage](#usage)
  - [Project Structure](#project-structure)
  - [API Documentation](#api-documentation)
    - [Base URL](#base-url)
    - [Endpoints](#endpoints)
      - [Battle Endpoints](#battle-endpoints)
      - [Character Endpoint](#character-endpoint)
      - [Leaderboard Endpoint](#leaderboard-endpoint)
  - [Known Issues](#known-issues)
    - [shadcn/ui Installation on Windows with pnpm](#shadcnui-installation-on-windows-with-pnpm)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)
  - [Acknowledgments](#acknowledgments)
  - [Additional Resources](#additional-resources)

---

## Project Overview

The **Tekken Hotness Battle App** is a web application where users can:

- Vote between two randomly presented Tekken characters to determine who is hotter.
- Experience an engaging battle system where a character needs 5 consecutive wins to be declared the winner.
- View detailed character profiles upon victory.
- Access a global leaderboard tracking the hottest characters based on user votes.

## Features

- **Landing Page**: A welcoming page with options to start battling or view the leaderboard.
- **Battle System**: Users are presented with two characters side by side to vote on.
- **Win Streaks**: Characters need 5 consecutive wins to be declared the winner in a session.
- **Character Profiles**: Detailed pages for each character, including images and bios.
- **Global Leaderboard**: Displays rankings based on total wins across all users.
- **Responsive Design**: Accessible on both desktop and mobile devices.

## Technologies Used

### Frontend

- **Vite**: Fast build tool for modern web projects.
- **React**: Library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript for enhanced code quality.
- **Tailwind CSS**: Utility-first CSS framework.
- **shadcn/ui**: Component library built on Radix UI and Tailwind CSS.
- **pnpm**: Fast, disk space-efficient package manager.

### Backend

- **Go (Golang)**: Backend programming language.
- **Gin**: HTTP web framework for Go.
- **PostgreSQL**: Relational database for storing character and battle data.

---

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **pnpm** package manager
- **Go** (v1.16 or higher)
- **PostgreSQL** database

### Installation

#### Clone the Repository

```bash
git clone https://github.com/yourusername/tekken-hotness-app.git
cd tekken-hotness-app
```

#### Frontend Setup

1. **Navigate to the frontend directory**:

   ```bash
   cd frontend
   ```

2. **Install Dependencies**:

   ```bash
   pnpm install
   ```

3. **Set Up Environment Variables**:

   - Create a `.env` file in the `frontend` directory.
   - Add any necessary environment variables (e.g., API base URL).

4. **Run the Development Server**:

   ```bash
   pnpm dev
   ```

   - Open your browser at `http://localhost:5173`.

#### Backend Setup

1. **Navigate to the backend directory**:

   ```bash
   cd backend
   ```

2. **Install Dependencies**:

   ```bash
   go mod download
   ```

3. **Set Up Environment Variables**:

   - Create a `.env` file in the `backend` directory.
   - Configure database connection strings and other settings.

4. **Run the Server**:

   ```bash
   go run main.go
   ```

   - The backend server should start on `http://localhost:8080`.

5. **Apply Database Migrations**:

   - Use a migration tool or run SQL scripts to set up the database schema.

---

## Usage

- **Start Battling**: On the landing page, click "Start Battle" to begin.
- **Vote**: Click on the character you think is hotter.
- **Win Streaks**: Continue voting to help a character achieve a 5-win streak.
- **View Profiles**: When a character wins 5 consecutive battles, you'll be redirected to their profile page.
- **Leaderboard**: Navigate to the leaderboard to see the hottest characters globally.

---

## Project Structure

```
tekken-hotness-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── main.go
│   ├── go.mod
│   └── ...
├── README.md
└── ...
```

---

## API Documentation

### Base URL

- **Local Development**: `http://localhost:8080/api`

### Endpoints

#### Battle Endpoints

- **GET `/battle`**

  - **Description**: Fetch two random characters for a new battle.
  - **Response**:

    ```json
    {
      "characterOne": { "id": "uuid", "name": "Name", "image_url": "url" },
      "characterTwo": { "id": "uuid", "name": "Name", "image_url": "url" }
    }
    ```

- **POST `/battle/vote`**

  - **Description**: Submit a vote for the hotter character.
  - **Request Body**:

    ```json
    {
      "winnerId": "uuid",
      "loserId": "uuid",
      "currentStreak": 3
    }
    ```

  - **Response**:

    - If win streak < 5:

      ```json
      { "message": "Vote recorded", "newStreak": 4 }
      ```

    - If win streak == 5:

      ```json
      { "message": "Character wins!", "characterId": "uuid" }
      ```

#### Character Endpoint

- **GET `/characters/{id}`**

  - **Description**: Get detailed info about a character.
  - **Response**:

    ```json
    {
      "id": "uuid",
      "name": "Name",
      "image_url": "url",
      "bio": "Character bio",
      "total_wins": 150
    }
    ```

#### Leaderboard Endpoint

- **GET `/leaderboard`**

  - **Description**: Retrieve the top-ranked characters.
  - **Response**:

    ```json
    [
      { "rank": 1, "name": "Name", "total_wins": 200 },
      { "rank": 2, "name": "Name", "total_wins": 180 },
      ...
    ]
    ```

---

## Known Issues

### shadcn/ui Installation on Windows with pnpm

- **Issue**: Errors occur when using `pnpm` to install `shadcn/ui` on Windows due to binary creation failures.

- **Solution**:

  1. **Use `npx` Instead of `pnpm dlx`**:

     ```bash
     npx shadcn-ui@latest init
     npx shadcn-ui@latest add button
     ```

  2. **Install `shadcn-ui` Globally (Temporary Workaround)**:

     ```bash
     npm install -g shadcn-ui
     shadcn-ui init
     shadcn-ui add button
     ```

  3. **Switch to npm or yarn**: If issues persist, consider using `npm` or `yarn` instead of `pnpm`.

- **Reference**: See the [shadcn/ui GitHub Issues](https://github.com/shadcn/ui/issues) for more details.

---

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**: Click the "Fork" button at the top right of this page.
2. **Clone Your Fork**:

   ```bash
   git clone https://github.com/yourusername/tekken-hotness-app.git
   ```

3. **Create a Feature Branch**:

   ```bash
   git checkout -b feature/YourFeatureName
   ```

4. **Commit Your Changes**:

   ```bash
   git commit -m "Add Your Feature"
   ```

5. **Push to Your Fork**:

   ```bash
   git push origin feature/YourFeatureName
   ```

6. **Submit a Pull Request**: Go to the original repository and open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

- **Project Maintainer**: [Your Name](mailto:youremail@example.com)
- **GitHub Repository**: [https://github.com/yourusername/tekken-hotness-app](https://github.com/yourusername/tekken-hotness-app)

---

## Acknowledgments

- **Tekken Franchise**: All character images and names are properties of Bandai Namco Entertainment.
- **shadcn/ui**: For providing an excellent component library.
- **Community Contributors**: Thanks to everyone who has contributed to this project.

---

## Additional Resources

- **Vite Documentation**: [https://vitejs.dev/guide/](https://vitejs.dev/guide/)
- **React Documentation**: [https://reactjs.org/docs/getting-started.html](https://reactjs.org/docs/getting-started.html)
- **TypeScript Documentation**: [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)
- **Tailwind CSS Documentation**: [https://tailwindcss.com/docs/installation](https://tailwindcss.com/docs/installation)
- **shadcn/ui Documentation**: [https://ui.shadcn.com/](https://ui.shadcn.com/)
- **Gin Web Framework**: [https://gin-gonic.com/docs/](https://gin-gonic.com/docs/)
- **pnpm Documentation**: [https://pnpm.io/motivation](https://pnpm.io/motivation)

---

Happy coding!
