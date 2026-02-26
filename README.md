# AI Code Explainer

AI Code Explainer is a production-ready web application that helps developers understand code snippets instantly using AI. It provides summaries, line-by-line explanations, complexity analysis, and optimization suggestions.

## Features

- **User Authentication**: Secure JWT-based registration and login.
- **Code Explanation**: Generate AI-powered explanations for various programming languages.
- **Complexity Analysis**: Get Time and Space complexity insights.
- **Optimization Suggestions**: View improved and refactored versions of your code.
- **History Tracking**: Save and retrieve past explanations.
- **Analytics Dashboard**: Visualize your usage and language preferences.
- **Dark Mode**: Seamless toggle between light and dark themes.
- **Responsive Design**: Works perfectly on desktop and mobile.

## Tech Stack

### Backend
- **Node.js & Express.js**: Server-side runtime and framework.
- **MongoDB & Mongoose**: NoSQL database for flexible data storage.
- **JWT & BCrypt**: Secure authentication and password hashing.
- **OpenAI API**: Powering the code analysis engine.

### Frontend
- **React.js (Vite)**: Fast and modern frontend library.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Monaco Editor**: VS Code-like code editing experience.
- **Chart.js**: Data visualization.
- **Framer Motion**: Smooth animations.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local or Atlas)
- OpenAI API Key

### Installation

1.  **Clone the repository** (if not already done)
    ```bash
    git clone <repository-url>
    cd ai-code-explainer
    ```

2.  **Backend Setup**
    ```bash
    cd server
    npm install
    cp .env.example .env
    # Edit .env with your MongoDB URI and OpenAI API Key
    npm run dev
    ```

3.  **Frontend Setup**
    ```bash
    cd client
    npm install
    npm run dev
    ```

4.  **Access the App**
    Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment

Refer to `DEPLOYMENT.md` for detailed deployment instructions on services like Render, Vercel, and MongoDB Atlas.
