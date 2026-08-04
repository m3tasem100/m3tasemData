// ===============================
// Firebase Configuration
// ===============================

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "XXXXXXXX",
    appId: "XXXXXXXXXXXXXXXXXXXX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Services
const auth = firebase.auth();
const db = firebase.firestore();

// Firestore Settings
db.settings({
    merge: true
});

// Collections
const USERS = db.collection("users");
const ROLES = db.collection("roles");
const SETTINGS = db.collection("settings");
const YEARS = db.collection("academicYears");
const SEMESTERS = db.collection("semesters");
const SECTIONS = db.collection("sections");
const SUBSECTIONS = db.collection("subSections");
const GRADES = db.collection("grades");
const SUBJECTS = db.collection("subjects");
const TEACHERS = db.collection("teachers");
const ASSIGNMENTS = db.collection("teacherAssignments");
const PLANS = db.collection("weeklyPlans");
const OBJECTIVES = db.collection("weeklyObjectives");
const PROGRESS = db.collection("teacherProgress");
const REPORTS = db.collection("reports");
const EVALUATIONS = db.collection("evaluations");

// Timestamp Helper
const serverTime = firebase.firestore.FieldValue.serverTimestamp;

// ===============================
// Current User
// ===============================

let currentUser = null;

auth.onAuthStateChanged(async(user)=>{

    if(!user){

        if(
            !window.location.pathname.endsWith("index.html") &&
            window.location.pathname !== "/"
        ){
            location.href="index.html";
        }

        return;
    }

    currentUser=user;

});