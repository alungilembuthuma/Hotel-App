import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../firebase"; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; 

// Thunk for registering a user
export const registerUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password, role }, { rejectWithValue }) => {
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; 

      // Determine the collection based on the role
      const collection = role === 'Admin' ? 'admins' : 'users';
      await setDoc(doc(db, collection, user.uid), {
        email: user.email,
        role: role,
        createdAt: new Date() // Store the date user was created
      });

      return { user, role }; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for logging in a user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Sign in the user with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if the user exists in Firestore
      const userDocRef = doc(db, "users", user.uid); // Assuming "users" collection
      const userDoc = await getDoc(userDocRef);

      // If the user does not exist, reject the login
      if (!userDoc.exists()) {
        throw new Error("User does not exist in the database.");
      }

      // Get the role from Firestore
      const userData = userDoc.data();
      const role = userData.role || "User"; // Default role if not defined

      return { user, role }; // Return user data and role from Firestore
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create a slice for auth
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    role: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.role = null; 
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle register actions
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.role = action.payload.role; 
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle login actions
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.role = action.payload.role; 
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
