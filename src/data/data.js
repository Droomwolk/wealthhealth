const states = [
  {
    name: "Alabama",
    abbreviation: "AL",
  },
  {
    name: "Alaska",
    abbreviation: "AK",
  },
  {
    name: "American Samoa",
    abbreviation: "AS",
  },
  {
    name: "Arizona",
    abbreviation: "AZ",
  },
  {
    name: "Arkansas",
    abbreviation: "AR",
  },
  {
    name: "California",
    abbreviation: "CA",
  },
  {
    name: "Colorado",
    abbreviation: "CO",
  },
  {
    name: "Connecticut",
    abbreviation: "CT",
  },
  {
    name: "Delaware",
    abbreviation: "DE",
  },
  {
    name: "District Of Columbia",
    abbreviation: "DC",
  },
  {
    name: "Federated States Of Micronesia",
    abbreviation: "FM",
  },
  {
    name: "Florida",
    abbreviation: "FL",
  },
  {
    name: "Georgia",
    abbreviation: "GA",
  },
  {
    name: "Guam",
    abbreviation: "GU",
  },
  {
    name: "Hawaii",
    abbreviation: "HI",
  },
  {
    name: "Idaho",
    abbreviation: "ID",
  },
  {
    name: "Illinois",
    abbreviation: "IL",
  },
  {
    name: "Indiana",
    abbreviation: "IN",
  },
  {
    name: "Iowa",
    abbreviation: "IA",
  },
  {
    name: "Kansas",
    abbreviation: "KS",
  },
  {
    name: "Kentucky",
    abbreviation: "KY",
  },
  {
    name: "Louisiana",
    abbreviation: "LA",
  },
  {
    name: "Maine",
    abbreviation: "ME",
  },
  {
    name: "Marshall Islands",
    abbreviation: "MH",
  },
  {
    name: "Maryland",
    abbreviation: "MD",
  },
  {
    name: "Massachusetts",
    abbreviation: "MA",
  },
  {
    name: "Michigan",
    abbreviation: "MI",
  },
  {
    name: "Minnesota",
    abbreviation: "MN",
  },
  {
    name: "Mississippi",
    abbreviation: "MS",
  },
  {
    name: "Missouri",
    abbreviation: "MO",
  },
  {
    name: "Montana",
    abbreviation: "MT",
  },
  {
    name: "Nebraska",
    abbreviation: "NE",
  },
  {
    name: "Nevada",
    abbreviation: "NV",
  },
  {
    name: "New Hampshire",
    abbreviation: "NH",
  },
  {
    name: "New Jersey",
    abbreviation: "NJ",
  },
  {
    name: "New Mexico",
    abbreviation: "NM",
  },
  {
    name: "New York",
    abbreviation: "NY",
  },
  {
    name: "North Carolina",
    abbreviation: "NC",
  },
  {
    name: "North Dakota",
    abbreviation: "ND",
  },
  {
    name: "Northern Mariana Islands",
    abbreviation: "MP",
  },
  {
    name: "Ohio",
    abbreviation: "OH",
  },
  {
    name: "Oklahoma",
    abbreviation: "OK",
  },
  {
    name: "Oregon",
    abbreviation: "OR",
  },
  {
    name: "Palau",
    abbreviation: "PW",
  },
  {
    name: "Pennsylvania",
    abbreviation: "PA",
  },
  {
    name: "Puerto Rico",
    abbreviation: "PR",
  },
  {
    name: "Rhode Island",
    abbreviation: "RI",
  },
  {
    name: "South Carolina",
    abbreviation: "SC",
  },
  {
    name: "South Dakota",
    abbreviation: "SD",
  },
  {
    name: "Tennessee",
    abbreviation: "TN",
  },
  {
    name: "Texas",
    abbreviation: "TX",
  },
  {
    name: "Utah",
    abbreviation: "UT",
  },
  {
    name: "Vermont",
    abbreviation: "VT",
  },
  {
    name: "Virgin Islands",
    abbreviation: "VI",
  },
  {
    name: "Virginia",
    abbreviation: "VA",
  },
  {
    name: "Washington",
    abbreviation: "WA",
  },
  {
    name: "West Virginia",
    abbreviation: "WV",
  },
  {
    name: "Wisconsin",
    abbreviation: "WI",
  },
  {
    name: "Wyoming",
    abbreviation: "WY",
  },
];

const departments = [
  {
    name: "Sales",
    abbreviation: "Sales",
  },
  {
    name: "Marketing",
    abbreviation: "Marketing",
  },
  {
    name: "Engineering",
    abbreviation: "AS",
  },
  {
    name: "Human Resources",
    abbreviation: "Human Resources",
  },
  {
    name: "Legal",
    abbreviation: "Legal",
  },
];

const employee = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    startDate: "15/02/2022",
    department: "Human Resources",
    dateOfBirth: "15/02/1983",
    street: "Death Row",
    city: "Maison Stark",
    state: "Nord",
    zipCode: "97122",
  },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    startDate: "01/01/2022",
    department: "Marketing",
    dateOfBirth: "09/03/1972",
    street: "Winter is coming",
    city: "Maison Lannister",
    state: "Westeros",
    zipCode: "97190",
  },
  {
    id: 3,
    LastName: "Jaime",
    FirstName: "Lannister",
    startDate: "01/01/2022",
    department: "Consulting",
    dateOfBirth: "09/03/1972",
    street: "Winter is coming",
    city: "Maison Lannister",
    state: "Westeros",
    zipCode: "97190",
  },
  {
    id: 4,
    LastName: "Arya",
    FirstName: "Stark",
    startDate: "10/01/2022",
    department: "Engineering",
    dateOfBirth: "27/03/1989",
    street: "Death Row",
    city: "Maison Stark",
    state: "Nord",
    zipCode: "97115",
  },
  {
    id: 5,
    LastName: "Daenerys",
    FirstName: "Targaryen",
    startDate: "01/01/2022",
    department: "Legal",
    dateOfBirth: "19/08/1978",
    street: "Drakarys",
    city: "Maison Targaryen",
    state: "Essos",
    zipCode: "97170",
  },
  {
    id: 6,
    LastName: "Drogo",
    FirstName: "Khal",
    startDate: "01/01/2022",
    department: "Sales",
    dateOfBirth: "21/07/1975",
    street: "Barbarian",
    city: "Dothraki",
    state: "Free City",
    zipCode: "97160",
  },
  {
    id: 7,
    LastName: "H ghar",
    FirstName: "Jaqen",
    startDate: "01/06/2022",
    department: "Engineering",
    dateOfBirth: "12/05/1981",
    street: "Assassin",
    city: "Faceless Men",
    state: "Prison Riot",
    zipCode: "97140",
  },
];

const columns = [
  { field: "firstName", headerName: "First name", width: 130, editable: true },
  { field: "lastName", headerName: "Last name", width: 130, editable: true },
  { field: "startDate", headerName: "Start date", width: 120, editable: true },
  { field: "department", headerName: "Department", width: 130, editable: true },
  {
    field: "dateOfBirth",
    headerName: "Date of birth",
    width: 130,
    editable: true,
  },
  { field: "street", headerName: "Street", width: 160, editable: true },
  { field: "city", headerName: "City", width: 120, editable: true },
  { field: "state", headerName: "State", width: 90, editable: true },
  {
    field: "zipCode",
    headerName: "Zip Code",
    width: 100,
    type: "number",
    editable: true,
  },
];

export { states, departments, employee, columns };
