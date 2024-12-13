import { ref, set, get, child } from "firebase/database";
import { database } from "./Firebase";

// Sign up a user
export const signUpUser = async (email, password) => {
  const userId = email.replace(".", "_"); // Replace periods for database key
  await set(ref(database, `users/${userId}`), {
    email,
    password,
    loginTime: null,
  });
};

// Log in a user (fetch user details)
export const loginUser = async (email) => {
  const userId = email.replace(".", "_");
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, `users/${userId}`));
  return snapshot.exists() ? snapshot.val() : null;
};

// Update login time for a user
export const updateLoginTime = async (email) => {
  const userId = email.replace(".", "_");
  const loginTime = Date.now();
  await set(ref(database, `users/${userId}/loginTime`), loginTime);
  return loginTime;
};

// Get user session details (new function)
export const getUserSession = async (email) => {
  try {
    const userId = email.replace(".", "_");
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `users/${userId}`));

    if (snapshot.exists()) {
      const user = snapshot.val();
      return {
        email: user.email,
        loginTime: user.loginTime,
      };
    } else {
      console.error("User not found in the database.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user session:", error);
    throw error;
  }
};
