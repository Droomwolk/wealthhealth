## Migration jQuery → React — WealthHealth (HRNet Modernization)

🧭 Objectif de la refonte

Ce document détaille la migration complète du projet HRNet (jQuery) vers React, dans le cadre de la modernisation de l’application WealthHealth.
L’objectif a été de remplacer les plugins jQuery vieillissants par des composants React modernes, testables et performants.

## 🏗️ Ancienne stack vs Nouvelle stack

| Domaine                | Ancienne version (jQuery) | Nouvelle version (React)       |
| :--------------------- | :------------------------ | :----------------------------- |
| **Framework**          | jQuery + HTML + CSS       | React 18 + Vite                |
| **Gestion d’état**     | localStorage              | Redux Toolkit                  |
| **Formulaire**         | DOM / jQuery              | React Hook Form                |
| **Sélecteur de date**  | jQuery.datetimepicker     | PikadayField (React)           |
| **Tableau de données** | DataTables                | MUI DataGrid                   |
| **Modale**             | jQuery Modal              | Modal React (package externe)  |
| **Validation**         | Manuelle / DOM            | RHF + PropTypes                |
| **Tests**              | Aucun                     | Vitest + React Testing Library |
| **Build**              | Statique                  | Vite + Compression             |

## Migration jQuery → React — WealthHealth (HRNet Modernization)

🧭 Objectif de la refonte

Ce document détaille la migration complète du projet HRNet (jQuery) vers React, dans le cadre de la modernisation de l’application WealthHealth.
L’objectif a été de remplacer les plugins jQuery vieillissants par des composants React modernes, testables et performants.

🏗️ Ancienne stack vs nouvelle stack

## ⚙️ Comparatif technique

| Domaine                | Ancienne version (jQuery) | Nouvelle version (React)       |
| ---------------------- | ------------------------- | ------------------------------ |
| **Framework**          | jQuery + HTML + CSS       | React 18 + Vite                |
| **Gestion d’état**     | localStorage              | Redux Toolkit                  |
| **Formulaire**         | DOM / jQuery              | React Hook Form                |
| **Sélecteur de date**  | jQuery.datetimepicker     | PikadayField (React)           |
| **Tableau de données** | DataTables                | MUI DataGrid                   |
| **Modale**             | jQuery Modal              | Modal React (package externe)  |
| **Validation**         | Manuelle / DOM            | RHF + PropTypes                |
| **Tests**              | Aucun                     | Vitest + React Testing Library |
| **Build**              | Statique                  | Vite + Compression             |

## 🧩 Exemple 1 — Création d’un employé

### 💻 Exemple de code — Comparatif entre l’ancienne et la nouvelle version

### 🧩 Ancienne version (jQuery)

```javascript
$("#save").on("click", function (e) {
  e.preventDefault();
  const employee = {
    firstName: $("#first-name").val(),
    lastName: $("#last-name").val(),
    dateOfBirth: $("#date-of-birth").val(),
  };
  const employees = JSON.parse(localStorage.getItem("employees")) || [];
  employees.push(employee);
  localStorage.setItem("employees", JSON.stringify(employees));
  $("#confirmation").modal();
});
```

💡 Explication :

Dans cette ancienne version, la logique repose sur jQuery et le DOM impératif.
Chaque élément du formulaire est manipulé directement via des sélecteurs ($('#id')),
et les données sont stockées dans le localStorage.

Les interactions (comme l’ouverture de la modale) sont gérées de manière manuelle,
ce qui rend le code plus difficile à maintenir et à tester.

### ⚛️ Nouvelle version (React + Redux Toolkit + React Hook Form)

```jsx
const dispatch = useDispatch();
const [isDisplayed, setModalDisplay] = useState(false);

<Form
  defaultValues={defaultValues}
  onSubmit={(data) => {
    dispatch(createEmployee(data));
    setModalDisplay(true);
  }}
>
  <Input name="firstName" labelText="First Name" />
  <Input name="lastName" labelText="Last Name" />
  <PikadayField name="dateOfBirth" labelText="Date of Birth" />
</Form>;

{
  isDisplayed && (
    <Modal setModalState={setModalDisplay} title="Employee added">
      <p>A new employee has been created</p>
    </Modal>
  );
}
```

⚙️ Explication :

La version React adopte une approche déclarative et structurée :

    •	Le formulaire est géré avec React Hook Form pour la validation et la simplification des champs.
    •	La logique métier est centralisée dans Redux Toolkit via dispatch(createEmployee).
    •	L’affichage de la modale est contrôlé par l’état React (isDisplayed).

✅ Résultat : un code plus modulaire, maintenable, et facile à tester.

## 📅 Exemple 2 — Sélecteur de date

### Avant (jQuery)

```javascript
$("#date-of-birth").datetimepicker({
  timepicker: false,
  format: "m/d/Y",
});
```

### Après (React)

```jsx
<PikadayField
  id="dateOfBirth"
  name="dateOfBirth"
  labelText="Date of Birth"
  value={field.value ?? null}
  onChange={field.onChange}
  format="DD/MM/YYYY"
  yearRange={[1900, new Date().getFullYear()]}
  firstDay={1}
/>
```

### ✅ Améliorations :

    •	Suppression du timepicker inutile
    •	Localisation complète en français
    •	Contrôle de la valeur via React Hook Form
    •	Code testable et réutilisable

## 🧮 Exemple 3 — Tableau des employés

### 🧩 Avant — DataTables (jQuery)

```javascript
$("#employee-table").DataTable({
  data: JSON.parse(localStorage.getItem("employees")),
  columns: [
    { title: "First Name", data: "firstName" },
    { title: "Last Name", data: "lastName" },
    { title: "Start Date", data: "startDate" },
  ],
});
```

### ⚛️ Après — React MUI DataGrid

```jsx
import { DataGrid } from "@mui/x-data-grid";

const employees = useSelector((state) => state.employee);

<DataGrid
  rows={employees}
  columns={[
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
  ]}
  paginationModel={{ pageSize: 10 }}
  rowsPerPageOptions={[5, 10, 25, 50]}
  disableRowSelectionOnClick
/>;
```

### ✅ Améliorations :

    •	Pagination native et dynamique
    •	Virtualisation (affichage instantané même avec gros volumes)
    •	Synchronisation automatique avec Redux
    •	Aucune manipulation du DOM

## 💾 Exemple 4 — Gestion d’état

### 🧩 Avant — LocalStorage

```javascript
const employees = JSON.parse(localStorage.getItem("employees")) || [];
employees.push(newEmployee);
localStorage.setItem("employees", JSON.stringify(employees));
```

### ⚛️ Après — Redux Toolkit

```jsx
export const employeeSlice = createSlice({
  name: "employee",
  initialState: [],
  reducers: {
    createEmployee: (state, action) => {
      state.push(action.payload);
    },
  },
});
```

### ✅ Avantages :

    •	État centralisé et prévisible
    •	Debug facile via Redux DevTools
    •	Aucune dépendance au navigateur

## 🧪 Tests unitaires

### ✅ Exemple — Input.test.jsx

```jsx
test("affiche une erreur si la validation échoue", async () => {
  render(<Input id="name" labelText="Name" validation="^[A-Z]+$" />);
  const input = screen.getByLabelText(/name/i);
  await userEvent.type(input, "john");
  expect(await screen.findByText(/invalid/i)).toBeInTheDocument();
});
```

### ✅ Exemple — PikadayField.test.jsx

```jsx
test("sélectionne une date et met à jour l’input", () => {
  render(<PikadayField labelText="Date of Birth" />);
  const input = screen.getByLabelText(/date of birth/i);
  expect(input).toBeInTheDocument();
});
```

### 🧠 Bénéfices globaux de la migration

### 📊 Comparatif global

| Aspect              | Ancienne version         | Nouvelle version               |
| :------------------ | :----------------------- | :----------------------------- |
| 🧩 **Architecture** | Fichiers isolés, couplés | Composants modulaires          |
| ⚡ **Performance**  | Lourde, lente à charger  | Rapide et fluide               |
| 🧱 **Maintenance**  | Difficulté à déboguer    | Code lisible, testable         |
| 🧮 **Données**      | localStorage             | Redux Toolkit                  |
| 🧪 **Tests**        | Aucun                    | Vitest + React Testing Library |
| 🖋️ **Style**        | CSS global               | SCSS modulaire                 |

## 📇 Auteur

```text
Auteur : Mickael Beljio
Rôle : Dev
Email : mbeljio@gmail.com
Date : Octobre 2025
Version : 1.0.0
```
