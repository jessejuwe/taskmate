# Taskmate

Taskmate is a modern and intuitive task management system built with [Next.js](https://nextjs.org), designed to help individuals and teams organize, prioritize, and manage their tasks efficiently. Its user-friendly interface and robust features make it a powerful tool for boosting productivity.

---

## Table of Contents

- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Key Features

- **Task Management:** Create, edit, and delete tasks seamlessly.
- **Drag and Drop:** Reorder tasks easily with a drag-and-drop interface powered by **DnD Kit**.
- **Task Filtering:** Quickly filter tasks based on status or category.
- **Responsive Design:** Fully responsive layout built with **Chakra UI** for a great user experience on all devices.
- **State Management:** Efficiently manage app state using **React Context**.
- **Data Fetching and Caching:** Robust server-side state management with **Tanstack Query**.
- **Dark Mode**: Toggleable dark mode for an improved user experience.

---

## Tech Stack

The application is built using the following technologies and libraries:

- **Next.js 15**: Framework for server-rendered React applications.
- **Chakra UI**: Component library for building responsive and accessible UIs.
- **DnD Kit**: A modern drag-and-drop library for React.
- **Tanstack Query**: Library for data fetching, caching, and synchronization.
- **React Context**: For managing global application state.

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Git](https://git-scm.com/)

### Steps

Follow these steps to set up Taskmate on your local machine:

1. **Clone the Repository**

   Use the following command:

```bash
   git clone https://github.com/jessejuwe/taskmate.git
```

2. Navigate to the project directory:

   Use the following command:

```bash
   cd taskmate
```

3. Install dependencies:

   Use the following command:

```bash
   npm install
```

4. Start the Development Server:

Start the app in development mode:

```bash
   npm run dev
```

Or start the app in development mode with turbopack:

```bash
   npm run dev:turbo
```

Or start the app in development mode with turbopack and the JSON server:

```bash
   npm run dev:concurrent
```

5. Access the App:

The server will start at [http://localhost:3080](http://localhost:3080).

6. Production Build:

Build the app for production:

```bash
   npm run build
```

Start the production server:

```bash
   npm start
```

## Usage

After installing and running the application, you can:

- **Create Tasks**: Use the “Add Task” button to create new tasks.
- **Edit Tasks**: Click on a task to edit its details.
- **Delete Tasks**: Remove tasks using the delete option.
- **Drag and Drop**: Drag and rearrange tasks to adjust priorities.
- **Filter Tasks**: Use the filter menu to display tasks by specific criteria.

## Folder Structure

Below is an overview of the project folder structure for easy navigation.

```
taskmate/
├── app/                # Application routing (Next.js App Router)
├── components/         # Reusable UI components
├── config/             # Environment configuration
├── constants/          # Colors and Themes
├── contexts/           # React context for state management
├── exports/            # Reducing component import complexity
├── helpers/            # Files for storing dummy data
├── hooks/              # Custom React hooks
├── lib/                # Data fetching logic and library configuration
├── providers/          # Providing context or state to sections of the app
├── public/             # Static files
├── queries/            # Data fetching and caching using Tanstack Query
├── services/           # API calls and data services
├── types/              # Data typing for enhanced type-safety check
├── styles/             # Global styles and theming
├── utils/              # Utility functions
```

## Configuration

Set environment variables in a `.env` file:

```plaintext
API_BASE_URL=http://localhost:3081/api
```

## Scripts

| Command                  | Description                                                      |
| ------------------------ | ---------------------------------------------------------------- |
| `npm run dev`            | Runs the app in development mode                                 |
| `npm run dev:turbo`      | Runs the app in devevelopment with turbopack                     |
| `npm run dev:concurrent` | Runs the app in devevelopment with turbopack and the JSON server |
| `npm run build`          | Builds the app for production                                    |
| `npm start`              | Runs the built app in production mode                            |
| `npm test`               | Runs tests                                                       |
| `npm run lint`           | Lints the code                                                   |
| `npm run lint:fix`       | Fixes linting issues                                             |

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

## Contributing

We welcome contributions to make this project better! If you'd like to contribute, please follow these steps:

1. **Fork the repository**: Click the "Fork" button at the top right of the page to create a copy of the repo on your GitHub account.
2. **Clone your fork**: Clone the forked repository to your local machine.

```bash
   git clone https://github.com/jessejuwe/taskmate.git
```

3. **Create a new branch**: Create a branch for your feature or fix.

```bash
   git checkout -b feature/your-feature-name
```

4. **Make your changes**: Implement your feature or fix, making sure to follow the code style and guidelines.
5. **Commit your changes**: Commit your changes with a descriptive commit message.

```bash
   git commit -m "Add feature: your feature name"
```

6. **Push to your fork**: Push your changes to your forked repository.

```bash
   git push origin feature/your-feature-name
```

7. **Create a Pull Request**: Open a pull request on the main repository to merge your changes. Include a clear description of your changes and any relevant details.

**Note**: Please ensure your code is well-documented, and all tests are passing.

## License

You are not licensed to use, modify, and distribute this software unless agreed upon.
