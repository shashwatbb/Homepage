// Ported 1:1 from the dev-provided React Native prototype
// (housing-onboarding-prototype: src/strings.ts, src/login/constants.ts,
// src/login/api/mockApi.ts). Copy, demo credentials and validation rules
// are the real spec, not approximations.

export const STRINGS = {
  "common.continue": "Continue",
  "common.skip": "Skip",
  "common.or": "OR",
  "common.whatsapp": "WhatsApp",

  "onboarding.splashQuotes": [
    "Mohali's 10 storey house was built in 48 hours, recorded fastest built in India",
    "Indian real estate is the second-largest job-creating industry, after agriculture",
    "Digital home searches and virtual property tours are transforming homebuying journeys",
  ],
  "onboarding.welcome": "Welcome to Housing!",
  "onboarding.title": "What are you looking for?",
  "onboarding.subtitle": "Choose a service which can be changed later",
  "onboarding.buyTitle": "Buy a Home",
  "onboarding.buySubtitle": "10 Lakh+ verified home listings",
  "onboarding.rentTitle": "Rent as a Tenant",
  "onboarding.rentSubtitle": "8 Lakh+ verified home listings",
  "onboarding.sellTitle": "Sell/Rent Property",
  "onboarding.sellSubtitle": "Get verified enquiries in 24 hours",
  "onboarding.sellTag": "FREE",

  "login.phoneEntry.title": "Log in or sign up to Housing",
  "login.phoneEntry.subtitle": ["Buy", "Rent", "Sell"],
  "login.phoneEntry.whatsappUpdatesPrefix": "Get updates on",
  "login.phoneEntry.continueWithWhatsapp": "Continue with WhatsApp",
  "login.phoneEntry.termsPrefix": "By clicking you agree to our",
  "login.phoneEntry.termsLink": "terms and conditions",
  "login.phoneEntry.phonePlaceholder": "Phone number",

  "login.otp.title": "Enter OTP to verify details",
  "login.otp.sentTo": "OTP sent to",
  "login.otp.fetchingOtp": "Fetching OTP...",
  "login.otp.resendCountdown": "Resend OTP in {seconds} seconds",
  "login.otp.resend": "Resend OTP",
  "login.otp.resendPrefix": "Send OTP on ",
  "login.otp.resendCall": "call",
  "login.otp.verify": "Verify OTP",
  "login.otp.verified": "OTP verified",

  "login.addDetails.title": "Finish signing up",
  "login.addDetails.subtitle": "This will help us stay in touch",
  "login.addDetails.namePlaceholder": "Full name",
  "login.addDetails.emailPlaceholder": "Email",
  "login.addDetails.nameError": "Enter a valid name",
  "login.addDetails.emailError": "Enter a valid email id",
  "login.addDetails.googleCaption": "Use Google to fill details instead",
  "login.addDetails.googlePill": "Continue with Google",

  "login.blockedAccount.title": "Hey! Your account is blocked",
  "login.blockedAccount.supportText": "You can contact customer support anytime to",
  "login.blockedAccount.createTicket": "Create ticket",
  "login.blockedAccount.orEmail": "or drop an email at",

  "login.flow.otpNotMatched": "Incorrect OTP",
  "login.flow.loggedIn": "You have been logged in",
};

export const OTP_RESEND_COUNTDOWN_SECONDS = 30;
export const OTP_LENGTH = 4;
export const DEFAULT_COUNTRY_CODE = "91";

export const TERMS_AND_CONDITIONS_URL = "https://housing.com/terms-of-use?source=web";
export const SUPPORT_HOUSING_URL = "https://support.housing.com/";
export const SUPPORT_EMAIL = "support@housing.com";

export const EMAIL_SUGGESTION_DOMAINS = ["gmail.com", "yahoo.com", "rediff.com"];

export const isValidPhone = (phone) => /^\d{10}$/.test(phone);
export const isValidName = (name) => name.trim().length > 0 && /^[\p{L}\s]+$/u.test(name);
export const isValidEmail = (email) =>
  /^[a-zA-Z0-9+._%-]{1,256}@[a-zA-Z0-9][a-zA-Z0-9-]{0,64}(\.[a-zA-Z0-9][a-zA-Z0-9-]{0,25})+$/.test(email);

// Mock API (src/login/api/mockApi.ts) — same demo credentials.
export const LATENCY_MS = 800;
export const DEMO_OTP = { wrong: "0000", blocked: "9999" };
export const DEMO_RETURNING_USER_PHONE = "9999999999";
export const DEMO_GOOGLE_ACCOUNT = { name: "Demo User", email: "demo.user@gmail.com" };

const respond = (value) => new Promise((resolve) => setTimeout(() => resolve(value), LATENCY_MS));

export const sendOtp = (_phone) => respond(true);
export const isWhatsAppSubscribed = (_phone) => respond(false);
export const verifyOtp = (otp) =>
  respond(otp === DEMO_OTP.wrong ? "wrong" : otp === DEMO_OTP.blocked ? "blocked" : "verified");
export const fetchUserDetails = (phone) =>
  respond(
    phone === DEMO_RETURNING_USER_PHONE
      ? { name: "Returning User", email: "returning.user@gmail.com" }
      : { name: "", email: "" }
  );
export const saveUserDetails = (_details) => respond(true);
export const signInWithWhatsApp = () => respond(true);

export const SERVICE_OPTIONS = [
  {
    id: "buy",
    icon: "onboarding-buy",
    title: STRINGS["onboarding.buyTitle"],
    subtitle: STRINGS["onboarding.buySubtitle"],
    delayMs: 200,
  },
  {
    id: "rent",
    icon: "onboarding-rent",
    title: STRINGS["onboarding.rentTitle"],
    subtitle: STRINGS["onboarding.rentSubtitle"],
    delayMs: 400,
  },
  {
    id: "sell",
    icon: "onboarding-seller",
    title: STRINGS["onboarding.sellTitle"],
    subtitle: STRINGS["onboarding.sellSubtitle"],
    offerTag: STRINGS["onboarding.sellTag"],
    delayMs: 800,
  },
];

export const POPULAR_CITIES = ["Delhi", "Mumbai", "Bengaluru", "Noida", "Gurgaon", "Hyderabad"];

/** Alphabetically sorted city index for the A–Z browser (subset — not the full 330+ list). */
export const CITY_INDEX = [
  "Abohar", "Adilabad", "Agartala", "Agra", "Ahmedabad", "Aizawl", "Ajmer", "Akola", "Alappuzha", "Aligarh",
  "Allahabad", "Amritsar", "Anand", "Asansol", "Aurangabad",
  "Bengaluru", "Bhopal", "Bhubaneswar", "Bikaner", "Bilaspur",
  "Chandigarh", "Chennai", "Coimbatore", "Cuttack",
  "Dehradun", "Delhi", "Dhanbad", "Durgapur",
  "Erode",
  "Faridabad", "Firozabad",
  "Gandhinagar", "Ghaziabad", "Goa", "Gorakhpur", "Gurgaon", "Guwahati", "Gwalior",
  "Hubli", "Hyderabad",
  "Imphal", "Indore",
  "Jabalpur", "Jaipur", "Jalandhar", "Jammu", "Jamshedpur", "Jhansi", "Jodhpur",
  "Kanpur", "Kochi", "Kolhapur", "Kolkata", "Kota", "Kozhikode",
  "Lucknow", "Ludhiana",
  "Madurai", "Mangalore", "Meerut", "Moradabad", "Mumbai", "Mysore",
  "Nagpur", "Nashik", "Noida",
  "Panaji", "Patiala", "Patna", "Prayagraj", "Pune",
  "Raipur", "Rajkot", "Ranchi", "Rourkela",
  "Salem", "Shimla", "Siliguri", "Solapur", "Srinagar", "Surat",
  "Thane", "Thiruvananthapuram", "Thrissur", "Tiruchirappalli", "Tirupati",
  "Udaipur", "Ujjain", "Vadodara", "Varanasi", "Vijayawada", "Visakhapatnam",
  "Warangal",
];
