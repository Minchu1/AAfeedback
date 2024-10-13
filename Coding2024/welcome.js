// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAe3Ds40992d55G9_H0zqDff0nbi9zkS4I",
    authDomain: "aviaa-e4a59.firebaseapp.com",
    projectId: "aviaa-e4a59",
    storageBucket: "aviaa-e4a59.appspot.com",
    messagingSenderId: "41825275937",
    appId: "1:41825275937:web:e1ce96aecaa5dd8fff9360"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Function to handle user sign out
function handleSignOut() {
    const user = auth.currentUser; // Get current user

    if (user) {
        const userRef = ref(database, 'users/' + user.uid);

        // Update user's last sign-out time
        update(userRef, {
            last_signout: Date.now()
        })
        .then(() => {
            // Sign out the user
            return signOut(auth);
        })
        .then(() => {
            // Redirect to sign-in page after sign-out
            window.location.href = 'signIn.html'; // Change to your sign-in page
        })
        .catch((error) => {
            console.error("Error signing out: ", error);
            alert("An error occurred while signing out. Please try again.");
        });
    } else {
        console.log("No user is signed in.");
    }
}

// Attach the sign out functionality to the button
document.getElementById('signOutButton').addEventListener('click', handleSignOut);
