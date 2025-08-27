

YaYa Wallet - Full-Stack Transaction Dashboard

This project is a complete, production-quality solution for the YaYa Wallet Coding Test. It is a secure, responsive, and feature-rich web application that allows users to monitor transactions for a given account. The dashboard is built with a modern tech stack, prioritizing a professional user experience, robust security, and high-quality, maintainable code.

🌟 Key Features

This application goes beyond the basic requirements to deliver a truly premium user experience.

✅ Complete Core Functionality: All requirements from the test are implemented, including pagination, search, and a full, detailed transaction table.

🛡️ Security-First Architecture: A Nest.js Backend-for-Frontend (BFF) acts as a secure proxy. The API Key and Secret are never exposed to the client, and all authentication is handled securely on the server.

🎨 Light & Dark Mode Themes: A beautiful, animated theme switcher allows the user to toggle between a crisp Light Mode and a sophisticated "Midnight Blue" Dark Mode.

📱 Fully Responsive Design: The layout seamlessly adapts from a multi-column desktop view to a stacked, touch-friendly interface on mobile devices, ensuring a first-class experience on any screen.

modals Interactive Detail Modal: Clicking any transaction row opens an animated side panel with a rich, detailed breakdown of that transaction, including fee information and account numbers.

📊 Data Visualization: A static, high-level graph provides an at-a-glance overview of the account's balance history, serving as a stable visual anchor.

✨ Elegant Loading States: The application uses professional skeleton loaders to maintain the layout and provide a smooth, fast-feeling user experience while data is being fetched.

🚀 Architecture & Problem-Solving Approach

My approach was to treat this as a real-world product, focusing on three core principles:

Security First: The primary challenge was handling the API credentials. A Backend-for-Frontend (BFF) architecture was chosen as the most secure and robust pattern. The Nest.js server is the only part of the system that knows about the API Key and Secret. It is responsible for generating the required authentication headers for every request, ensuring the credentials never leave the server environment.

User-Centric Design: The final design prioritizes the most important information. The "Table-First" layout makes the transaction list the hero of the application, while the sidebar provides stable, high-level context with KPIs and a trend graph. Features like the detail modal and theme switcher were added to create a delightful and memorable user experience that feels like a native application.

Robust & Resilient Architecture: The application is architected to be stable and crash-proof.

It uses a dual data-fetching strategy: a larger, static dataset is fetched once for the overview components (KPIs, graph), while a dynamic, paginated dataset is used for the interactive table. This provides a fast, stable, and responsive experience.

Components are written defensively using modern JavaScript features like optional chaining (?.) to prevent "white screen" crashes that can occur from incomplete or unexpected API data.

Assumptions Made

Current User: The "current user" is assumed to be the account associated with the name "Yaya Wallet Pii" or "YaYa PII SC" for the purpose of determining transaction direction.

API Functionality: It is assumed that the find-by-user and search endpoints on the sandbox API are the primary methods for data retrieval. Since the API does not support advanced filtering (like by date), a larger dataset is fetched initially to power the overview components.

🛠️ How to Run the Project

You will need Node.js and npm installed. The project consists of two separate parts: the backend server and the frontend application. You must run them in two separate terminal windows.

1. Backend Setup (Nest.js)

First, get the secure proxy server running.

code
Bash
download
content_copy
expand_less

# 1. Navigate to the backend directory from the project root
cd yaya-wallet-backend

# 2. Install dependencies
npm install

# 3. Create the environment file
# Create a new file named .env in this directory (yaya-wallet-backend)

# 4. Start the development server
npm run start:dev

# The backend will now be running on http://localhost:3000
2. Frontend Setup (React.js)

In a new, separate terminal window, get the user interface running.

code
Bash
download
content_copy
expand_less
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END
# 1. Navigate to the frontend directory from the project root
cd yaya-wallet-frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm start

# The frontend application will open automatically in your browser.
# If not, navigate to http://localhost:3001```

The dashboard is now fully functional. You can search, paginate, click on rows to see the detail modal, and switch between light and dark themes.

---

## 💻 Tech Stack

*   **Frontend:** React.js, Chart.js, React Datepicker, ESLint
*   **Backend:** Nest.js, Axios
*   **Styling:** CSS with modern features (Grid, Variables)
*   **Language:** TypeScript (Backend), JavaScript (Frontend)