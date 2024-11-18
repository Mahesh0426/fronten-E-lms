export const signUpFormControls = [
  {
    name: "userName",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full Name",
    autoComplete: "name",
  },
  {
    name: "userEmail",
    label: "Email Address",
    type: "email",
    placeholder: "Enter  your email address",
    autoComplete: "email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter  your password",
    autoComplete: "password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: " Enter confirm password",
    autoComplete: "password",
  },
];

export const LogInFormControls = [
  {
    name: "userEmail",
    label: "Email Address",
    type: "email",
    placeholder: "Enter  your email address",
    autoComplete: "email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter  your password",
    autoComplete: "current-password",
  },
];

//initial login form
export const initialLoginFormData = {
  userEmail: "",
  password: "",
};

//initial sigin form
export const initialSignUpFormData = {
  userName: "",
  userEmail: "",
  password: "",
  confirmPassword: "",
};

//language options
export const languageOptions = [
  { id: "english", label: "English", value: "english" },
  { id: "hindi", label: "Hindi", value: "hindi" },
  { id: "nepali", label: "Nepali", value: "nepali" },
  { id: "bengali", label: "Bengali", value: "Bengali" },
  { id: "urdu", label: "Urdu", value: "urdu" },
  { id: "french", label: "French", value: "french" },
];

//course level options for students
export const courseLevelOptions = [
  { id: "beginner", label: "Beginner", value: "beginner" },
  { id: "intermediate", label: "Intermediate", value: "intermediate" },
  { id: "advanced", label: "Advanced", value: "advanced" },
];

//course categories
export const courseCategories = [
  {
    id: "web-development",
    label: " Full Stack Web Development",
    value: "web-development",
  },
  {
    id: "backend-development",
    label: "Backend Development",
    value: "backend-development",
  },
  {
    id: "fronten-development",
    label: "Fronten Development",
    value: "fronten-development",
  },
  { id: "data-science", label: "Data Science", value: "data-science" },
  {
    id: "machine-learning",
    label: "Machine Learning",
    value: "machine-learning",
  },

  {
    id: "artificial-intelligence",
    label: "Artificial Intelligence",
    value: "artificial-intelligence",
  },
  { id: "cloud-computing", label: "Cloud Computing", value: "cloud-computing" },
  { id: "cyber-security", label: "Cyber Security", value: "cyber-security" },
  {
    id: "mobile-development",
    label: "Mobile Development",
    value: "mobile-development",
  },
  {
    id: "game-development",
    label: "Game Development",
    value: "game-development",
  },
  {
    id: "software-engineering",
    label: "Software Engineering",
    value: "software-engineering",
  },
];

//course courseDetails form controls
export const courseDetailsFormControls = [
  {
    name: "title",
    label: "Title",

    type: "text",
    placeholder: "Enter course title",
  },
  {
    name: "category",
    label: "Category",

    type: "select",
    placeholder: "",
    options: courseCategories,
  },
  {
    name: "level",
    label: "Level",

    type: "select",
    placeholder: "",
    options: courseLevelOptions,
  },
  {
    name: "primaryLanguage",
    label: "Primary Language",

    type: "select",
    placeholder: "",
    options: languageOptions,
  },
  {
    name: "subtitle",
    label: "Subtitle",

    type: "text",
    placeholder: "Enter course subtitle",
  },
  {
    name: "description",
    label: "Description",

    type: "textarea",
    placeholder: "Enter course description",
  },
  {
    name: "pricing",
    label: "Pricing",

    type: "number",
    placeholder: "Enter course pricing",
  },
  {
    name: "objectives",
    label: "Objectives",

    type: "textarea",
    placeholder: "Enter course objectives",
  },
  {
    name: "welcomeMessage",
    label: "Welcome Message",
    type: "textarea",
    placeholder: "Welcome message for students",
  },
];

//course ourseDetails initial form data
export const initialCourseDetailsFormData = {
  title: "",
  category: "",
  level: "",
  primaryLanguage: "",
  subtitle: "",
  description: "",
  pricing: "",
  objectives: "",
  welcomeMessage: "",
};

// course curriculum initial form data
export const courseContentInitialFormData = [
  {
    title: "",
    videoUrl: "",
    freePreview: false,
    public_id: "",
  },
];

// sort option
export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

//filter options
export const filterOptions = {
  category: courseCategories,
  level: courseLevelOptions,
  primaryLanguage: languageOptions,
};
