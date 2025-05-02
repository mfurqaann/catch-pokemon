# 🎮 Catch Your Pokemon

**Catch Your Pokemon** is an interactive web application that allows users to browse, view details, and catch their favorite Pokémon. This project was built as a personal practice to develop a modern frontend application using Angular, Material UI, and TailwindCSS.

---

## 🔧 Tech Stack

- ⚙️ **Angular** — Main framework for building the app
- 🎨 **Material UI** — Ready-to-use UI components
- 💨 **TailwindCSS** — Utility-first CSS framework for styling

---

## ✨ Main Features

- 🏠 **Home Page**  
  Displays a list of Pokémon that users can browse and select.

- 📖 **Detail Page**  
  Shows complete details of the selected Pokémon and includes a button to catch it.

- 📦 **My Pokémon Page**  
  Displays a list of Pokémon successfully caught by the user.

- 🔍 **Search Pokémon**  
  Users can search for Pokémon by name using the search feature.

- 🌐 **Language Switcher**  
  A toggle that lets users switch between English and Bahasa Indonesia.

---

## 🌐 Language Support

- 🇬🇧 English  
- 🇮🇩 Bahasa Indonesia  

Users can easily switch languages from any page via the language toggle button.

---

## 📦 How to Run the Project

```bash
# 1. Clone the repository
git clone https://github.com/username/catch-your-pokemon.git
cd catch-your-pokemon

# 2. Install dependencies
npm install

# 3. Run the app
ng serve

# 4. Open the app in your browser
http://localhost:4200
```

## 📁 Project Structure
```bash
└── src/
    ├── app/
    │   ├── common/
    │   │   ├── constant # Constant values (e.g. API URLs, labels and menus)
    │   │   └── pipe # Custom pipes (e.g. capitalize)
    │   └── pokemon/
    │       ├── my-pokemon # Page for displaying caught Pokémon
    │       ├── pokemon-item # Reusable component for listing Pokémon
    │       ├── pokemon-detail # Page showing detailed Pokémon info
    │       └── shared/ # Shared services related to Pokémon
    │           ├── pokemon-detail.service
    │           └── pokemon.service
    ├── assets/
    │   ├── i18n # Language translation files (for i18n)
    │   └── img # Static image assets
    └── styles # Global styles and Tailwind configuration
```
