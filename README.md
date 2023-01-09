# Bus Error - Taiwanese Technical Forum 🚌


<img width="1438" alt="Screen Shot 2023-01-10 at 12 09 37 AM" src="https://user-images.githubusercontent.com/105915352/211354092-ad149226-d71d-4739-81ad-de99aab8e6d8.png">

- We have created a forum for software developers to communicate. On this website, users can:

    ****Ask freely**** - Stuck with a problem? Why not ask your community partners for help and find a solution together.

    ****Discuss freely**** - Find people who have encountered the same difficulties as you here and discuss problems and share insights to find the best solution.

- **Demo video:** [https://youtu.be/k_5798L-jHE](https://youtu.be/k_5798L-jHE)
- **Deployed link:** [Bus Error - Taiwanese Technical Forum Discussion Area 🚌](https://bus-error-production.up.railway.app/)


### 🚌 Feature Introduction

- **User:**
    - Google OAuth2.0 login
    - Update personal name
    - User information statistics (days in community / number of posts/number of comments / number of adopted comments)
- **Articles:**
    - List all articles and filter articles by topic
    - Display total rating / number of comments/number of views for each article
    - Sort articles by newest/most popular/unresolved
    - Support Markdown syntax for adding articles and preview before publishing
    - Delete and upvote / downvote articles
- **Comments:**
    - Upvote/downvote comments
    - Sort by highest rating / created time
    - Support Markdown syntax for adding comments and preview before publishing
    - Authors of articles can adopt comments
- **Interface:**
    - Dark Mode

### 🚌 Frameworks / Modules / Source Code / Third-Party Packages Used and Referenced

- **Frontend:**
    - React.js, antd, Axios, FortAwesome, PropTypes
    - Date formatting and calculations: Day.js
    - Article display: React-Markdown (also used with KaTeX, remark-gfm, rehype-katex, remark-math)
    - Code linting: ESLint
- **Backend:**
    - Node.js, Express, cors
    - Authentication: Google Auth Library, JsonWebToken
- **Database:**
    - MongoDB

### 🚌 **How to Install and Test on Localhost**

1. Create a **clientID** and **secret** for Google OAuth 2.0 *(can be skipped and use the provided information)*
    - In the [Google Cloud Console](https://console.cloud.google.com/), create a new project
    
    
    - In the side panel, select **APIs & Services**
    
    
    - In the **OAuth consent screen**, select **External** and create
    
    
    - Fill in the application name and email address
    
    
    - On the **Credentials** page, click **Create credentials > OAuth client ID**
    
    
    - For the application type, select **Web application** and fill in any name. For authorized JavaScript origins, enter **http://localhost:3000, http://localhost:4000, http://localhost**
    
    
    - Click the download button to obtain the clientID and secret.

2. Within the root directory of this project:
    - Install required packages: `yarn install:all`
    - Add a backend environment variables file: `cp ./backend/.env.defaults ./backend/.env`
    - Fill in the `./backend/.env` file with the clientID and secret obtained in step 1, and fill in the MONGO_URL
        ```bash
        # in ./backend/.env
        MONGO_URL=[your mongo db url]
        GOOGLE_CLIENT_ID=[clientID]
        JWT_SECRET=[secret]
        MODE=[mode]
        ```
    - Before using for the first time, the database needs to be initialized. Follow these steps:
        1. Set `MODE=Reset` in the snippet above, and run `yarn backend` in the root directory. The details of the execution will be printed to the console.
        2. After initialization is complete, set `MODE=` (blank) again to avoid resetting the database every time it is run later.

    - Modify line 43 of `./frontend/src/container/PageAuthButton.js` to include the clientID
    ```jsx
    // Modify ./frontend/src/container/PageAuthButton.js Line 43 client_id
    if (window.google) {
         window.google.accounts.id.initialize({
         client_id: '[clientID].apps.googleusercontent.com', // Modify to your clientID
         callback: handleGoogle,
    });
    ```

    - Start the backend: `yarn backend`
    - Start the frontend: `yarn frontend`
    - View the website at `http://localhost:3000`
