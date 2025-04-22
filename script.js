// Import the Supabase client library (we'll use a CDN link)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Your Supabase project URL and Anon key
const SUPABASE_URL = 'https://uwhiizmwjirfivzbnujr.supabase.co'; // Replace with your actual URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3aGlpem13amlyZml2emJudWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMjc3MDIsImV4cCI6MjA2MDkwMzcwMn0.T3rkvFHzUVYLqrFDFDk9ara3zipciHnM91CteMxJe80'; // Replace with your actual anon key

// Create the Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log("Supabase Initialized!", supabase); // Verify client object creation

// --- DOM Element References ---
const signupForm = document.getElementById('signup-form');
const signupEmailInput = document.getElementById('signup-email');
const signupPasswordInput = document.getElementById('signup-password');
const signupButton = document.getElementById('signup-button');

const loginForm = document.getElementById('login-form');
const loginEmailInput = document.getElementById('login-email');
const loginPasswordInput = document.getElementById('login-password');
const loginButton = document.getElementById('login-button');

const logoutButton = document.getElementById('logout-button');
const userStatus = document.getElementById('user-status');
const userEmailSpan = document.getElementById('user-email');

const notesContainer = document.getElementById('notes-container');
const authContainer = document.getElementById('auth-container');

const addNoteForm = document.getElementById('add-note-form');
const noteInput = document.getElementById('note-input');
const addNoteButton = document.getElementById('add-note-button');
const notesList = document.getElementById('notes-list');

console.log("DOM elements referenced."); // Optional confirmation
      

    // --- Signup Logic ---
    signupButton.addEventListener('click', async (e) => {
    e.preventDefault(); // Prevent default form submission (page reload)
    const emailValue = signupEmailInput.value;
    const passwordValue = signupPasswordInput.value;
    await handleSupabaseSignup(emailValue, passwordValue);
});

    
async function handleSupabaseSignup(email, password) {
    try {
        // Use Supabase Auth SDK to sign up
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            // If Supabase returns an error object, throw it
            throw error;
        }

        console.log("Supabase signup initiated successfully:", data);
        // Alert user about potential email confirmation step
        alert("Signup successful! Please check your email inbox (and maybe spam folder) to confirm your account registration.");

        // Clear the form fields after successful initiation
        signupEmailInput.value = '';
        signupPasswordInput.value = '';

    } catch (error) {
        // Catch any thrown errors (from Supabase or elsewhere)
        console.error("Supabase Signup Error:", error.message);
        alert("Signup Failed: " + error.message); // Show feedback to user
    }
}


// --- Login Logic ---
loginButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const emailValue = loginEmailInput.value;
    const passwordValue = loginPasswordInput.value;
    await handleSupabaseLogin(emailValue, passwordValue);
});

async function handleSupabaseLogin(email, password) {
    try {
        // Use Supabase Auth SDK to sign in
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            throw error;
        }

        console.log("Supabase login successful:", data.user);
        // Clear the form fields
        loginEmailInput.value = '';
        loginPasswordInput.value = '';
        // Note: UI changes based on login state are handled by onAuthStateChange

    } catch (error) {
        console.error("Supabase Login Error:", error.message);
        alert("Login Failed: " + error.message);
    }
}



 // --- Logout Logic ---
 logoutButton.addEventListener('click', async () => {
    await handleSupabaseLogout();
});

async function handleSupabaseLogout() {
    try {
        // Use Supabase Auth SDK to sign out
        const { error } = await supabase.auth.signOut();

        if (error) {
            throw error;
        }

        console.log("Supabase logged out successfully");
        // UI changes handled by onAuthStateChange

    } catch (error) {
        console.error("Supabase Logout Error:", error.message);
        alert("Logout Failed: " + error.message);
    }
}




// --- Auth State Change Listener ---
supabase.auth.onAuthStateChange((_event, session) => {
    // _event gives info like 'SIGNED_IN', 'SIGNED_OUT', 'TOKEN_REFRESHED', etc.
    // session object contains user details if logged in, null otherwise.
    console.log(`Supabase Auth State Change Event: ${_event}`, session);

    const currentUser = session?.user; // Get user object from session, null if not logged in

    if (currentUser) {
        // User IS logged in
        console.log("User is logged IN:", currentUser);

        // --- DEBUGGING LOGOUT BUTTON ---
        console.log("Attempting to update UI for logged-in state...");
        try {
            console.log("1. Checking authContainer:", authContainer);
            authContainer.style.display = 'none';

            console.log("2. Checking notesContainer:", notesContainer);
            notesContainer.style.display = 'block';

            console.log("3. Checking logoutButton variable:", logoutButton); // Check if variable holds the element
            if (logoutButton) {
                logoutButton.style.display = 'block'; // Set display style
                console.log("   Set logoutButton display to block.");
            } else {
                console.error("   logoutButton variable is NULL or undefined!"); // Big warning if element not found
            }

            console.log("4. Checking userStatus:", userStatus);
            userStatus.style.display = 'block';

            console.log("5. Checking userEmailSpan:", userEmailSpan);
            userEmailSpan.textContent = currentUser.email;
            console.log("   Set user email text.");

        } catch (uiError) {
            console.error("!!! ERROR during UI update !!!", uiError); // Catch any errors during UI manipulation
        }
        // --- END DEBUGGING ---


        // Temporarily comment out the fetch call to avoid the known ReferenceError for now
        // fetchAndDisplaySupabaseNotes(currentUser.id);
        notesList.innerHTML = '<li>Notes would load here... (Function call commented out)</li>';


    } else {
        // User IS logged OUT (Keep this logic as is)
        console.log("User is logged OUT");
        authContainer.style.display = 'block';
        notesContainer.style.display = 'none';
        // IMPORTANT: Ensure logoutButton variable exists before trying to set its style
        if(logoutButton) {
           logoutButton.style.display = 'none';
        } else {
           console.error("Cannot hide logoutButton on logout - variable is null!");
        }
        if(userStatus) {
            userStatus.style.display = 'none';
        }
         if(userEmailSpan){
             userEmailSpan.textContent = '';
         }
        notesList.innerHTML = '';
    }
});


// --- Note Creation Logic ---
addNoteButton.addEventListener('click', async (e) => {
    e.preventDefault(); // Stop page reload
    const noteText = noteInput.value.trim(); // Get text, remove leading/trailing spaces

    // Get current user session to access user ID safely
    const sessionResponse = await supabase.auth.getSession();
    const user = sessionResponse.data.session?.user; // Access user object within session data

    if (noteText && user) {
        // If note has text and user is logged in, call the save function
        console.log(`Attempting to add note for user: ${user.id}`);
        await addSupabaseNote(user.id, noteText);
    } else if (!user) {
        // If user is not logged in
        console.warn("Add Note attempt failed: User not logged in.");
        alert("Hold on! You need to be logged in to save notes.");
    } else {
        // If note text is empty
        console.warn("Add Note attempt failed: Note text is empty.");
        alert("Whoops! Please type something in the note before saving.");
    }
});



async function addSupabaseNote(userId, text) {
    console.log(`addSupabaseNote called with userId: ${userId}, text: ${text.substring(0, 20)}...`); // Log input
    try {
        // Use the Supabase client to insert into the 'notes' table
        const { data, error } = await supabase
            .from('notes') // Specify the table name
            .insert([ // Pass an array of objects (rows) to insert
                {
                    text: text,       // The note content
                    user_id: userId   // The ID of the owner (MUST match logged-in user for RLS)
                    // 'id' and 'created_at' are handled automatically by Postgres defaults
                }
            ]);
            // We can add .select() here if we wanted the newly created row back, e.g. .insert([...]).select()

        // Check if Supabase returned an error (e.g., RLS violation)
        if (error) {
            console.error("Supabase insert error details:", error);
            throw error; // Rethrow the error to be caught by the catch block
        }

        // If successful (no error thrown)
        console.log("Supabase note added successfully. Response data:", data); // Data is often null unless .select() used
        noteInput.value = ''; // Clear the textarea input field

        // Refresh the notes list on the page immediately
        console.log("Refreshing notes list after adding new note.");
        fetchAndDisplaySupabaseNotes(userId); // Trigger display update

    } catch (error) {
        // Catch any error thrown from the try block or by Supabase
        console.error("Detailed Error Adding Supabase Note:", error);
        alert("Couldn't save your note. Reason: " + error.message); // User feedback
    }
}
