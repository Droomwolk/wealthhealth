# 💼 WealthHealth — React Application

## 🏗️ Description du projet

**WealthHealth** est une application React moderne construite avec **Vite**, **Redux Toolkit** et **React Hook Form**.  
Elle permet de **créer, gérer et visualiser** des employés dans un tableau interactif.  
Le projet intègre des composants personnalisés (`Input`, `Form`, `PikadayField`, `Table`) et une interface fluide basée sur **MUI** et **Sass (SCSS)**.

---

## ⚙️ Stack technique

| Domaine | Technologies principales |
|----------|--------------------------|
| Frontend | React 18 + Vite |
| État global | Redux Toolkit |
| Formulaires | React Hook Form |
| UI & Tableaux | MUI (`@mui/material`, `@mui/x-data-grid`) |
| Sélecteur de date | Pikaday (i18n FR) |
| Styles | Sass (SCSS) |
| Tests unitaires | Vitest + React Testing Library |
| Build | vite-plugin-compression |
| Linter | ESLint (config Airbnb) |

---

## 🧩 Structure du projet
~~~text
src/
├── App/                     # Point d’entrée principal
├── components/
│   ├── input/               # Champ texte avec validation locale
│   ├── form/                # Composant générique
│   ├── datePickerContainer/ # Composant PikadayField (sélecteur de date)
│   ├── table/               # Table MUI des employés
│   └── …                    # Autres composants réutilisables
├── pages/
│   ├── createEmployee/      # Formulaire de création d’employé
│   └── employeeList/        # Liste des employés enregistrés
├── redux/
│   ├── employeeSlice.js     # Slice Redux pour les employés
│   └── store.js             # Configuration du store global
├── scss/                    # Styles globaux et partiels SCSS
├── test/
│   └── setupTests.js        # Configuration des tests Vitest
└── main.jsx                 # Entrée principale ReactDOM
~~~

## 🚀 Installation & exécution

### 1️⃣ Installer les dépendances
```bash```
yarn install

## 2️⃣ Lancer le projet en mode développement
```bash```
yarn dev

## 4️⃣ Prévisualiser le build
```bash```
yarn preview

## 🧠 Gestion d’état — Redux Toolkit
L’état global des employés est géré via Redux Toolkit :

~~~bash
// src/redux/employeeSlice.js
export const employeeSlice = createSlice({
  name: "employee",
  initialState: [],
  reducers: {
    createEmployee: (state, action) => {
      state.push(action.payload);
    },
  },
});

~~~

## 🧾 Formulaires avec React Hook Form
~~~text
<Controller
  name="startDate"
  control={control}
  rules={{ required: "Start date is required" }}
  render={({ field, fieldState }) => (
    <PikadayField
      id="startDate"
      labelText="Start Date"
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      rhfError={fieldState.error?.message}
    />
  )}
/>
~~~

## 📅 Sélecteur de date — PikadayField
~~~text
<PikadayField
  id="dob"
  name="dob"
  labelText="Date of Birth"
  value={dateOfBirth}
  onChange={(d) => setDateOfBirth(d)}
/>
~~~

## 🧪 Tests unitaires (Vitest + React Testing Library)
📁 Organisation
~~~text
src/components/input/__tests__/Input.test.jsx
src/components/PikadayFieldContainer/__tests__/PikadayField.test.jsx
~~~

## 🧩 Setup global (src/test/setupTests.js)
~~~text
process.env.TZ = "UTC"; // Fixe le fuseau pour éviter les décalages de date
import "@testing-library/jest-dom/vitest";
~~~

## ▶️ Lancer les tests
~~~text
yarn test
~~~

## 📇 Auteur & contact
~~~text
Auteur : Mickael Beljio
Rôle : Dev
Email : mbeljio@gmail.com
Date : Octobre 2025
Version : 1.0.0
~~~