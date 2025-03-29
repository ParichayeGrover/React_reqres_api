# User Management System

## 📌 Project Overview
This is a simple **User Management System** built using **React (Vite) and TailwindCSS**. It includes authentication, user listing, editing, and deletion functionalities.

## 🚀 Features
- User login with authentication
- Fetching user list dynamically
- Editing user details
- Deleting users
- Proper navigation between pages
- Error handling for a smooth user experience

---

## 🛠️ Installation & Setup
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-repo/user-management.git
cd user-management
```
## 🏗️ Setting Up React with Vite & TailwindCSS
If you want to set up this project from scratch, follow these steps:

### 1️⃣ Create a New React Project with Vite
```bash
npm create vite@latest my-project --template react
cd setup
npm install
```

### 2️⃣ Install TailwindCSS
```bash
npm install tailwindcss @tailwindcss/vite
```

### 3️⃣ Configure the Vite plugin
Add the @tailwindcss/vite plugin to your Vite configuration.
```js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

### 4️⃣ Import Tailwind CSS
Add an @import to your CSS file that imports Tailwind CSS.
```css
@import "tailwindcss";
```

### 2️⃣ Start your build process
Run your build process with npm run dev or whatever command is configured in your package.json file.
```bash
npm run dev
```

### 3️⃣ Start using Tailwind in your HTML
Make sure your compiled CSS is included in the <head> (your framework might handle this for you), then start using 
Tailwind’s utility classes to style your content.
```html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/src/styles.css" rel="stylesheet">
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>
```

---


---

## 📜 License
This project is licensed under the **MIT License**. Feel free to modify and use it as needed.

---

## 🙌 Acknowledgments
- **React.js** for building the UI
- **Vite** for fast development
- **TailwindCSS** for styling

# User Management System

This React app uses the [reqres.in](https://reqres.in) mock API with local storage for user management.

## Key Features

### 🖊️ Edit Button
- **What it does**: Lets you modify user details
- **How it works**:
  - Fetches original data from `GET /api/users/{id}`
  - Saves your changes to browser storage
  - Shows edits immediately (won't change real API data)

### 🗑️ Delete Button 
- **What it does**: Removes users from your view
- **How it works**:
  - Calls `DELETE /api/users/{id}` (simulated)
  - Remembers deleted users in browser storage
  - Filters them from displayed lists

### 🔄 Reset Button
- **What it does**: Undoes all your changes
- **How it works**:
  - Clears browser storage
  - Fetches fresh data from the API
  - Restores original user list

## Important Notes
- Changes only appear for you (reqres.in is a test API)
- Your edits/deletes persist in your browser
- Reset returns everything to original state

## Technical Details
| Feature       | API Call         | Storage Used     |
|--------------|-----------------|-----------------|
| Edit User    | GET (read-only) | `userEdits`     |
| Delete User  | DELETE (simulated) | `deletedUsers` |
| Reset Data   | GET (fresh)     | Clears storage  |

