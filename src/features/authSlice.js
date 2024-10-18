import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db, storage } from "../firebase"; // Ensure the correct firebase imports
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

// Thunk for registering a user
export const registerUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password, role }, { rejectWithValue }) => {
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; 

      // Determine the collection based on the role
      const collection = role === 'admin' ? 'admins' : 'users';
      await setDoc(doc(db, collection, user.uid), {
        email: user.email,
        role: role,
        createdAt: new Date() // Store the creation date
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
  async ({ email, password, role }, { rejectWithValue }) => {
    try {
      // Authenticate the user with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if the user exists in Firestore based on role
      const collection = role === 'admin' ? 'admins' : 'users';
      const userDocRef = doc(db, collection, user.uid);
      const userDoc = await getDoc(userDocRef);

      // If the user does not exist in Firestore, reject the login
      if (!userDoc.exists()) {
        throw new Error("User does not exist in the database.");
      }

      const userData = userDoc.data();
      return { user, role: userData.role || role }; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to handle accommodation addition
export const addAccommodation = createAsyncThunk(
  'accommodation/addAccommodation',
  async ({ name, location, description, images }, { rejectWithValue }) => {
    try {
      // Upload images to Firebase Storage and get their URLs
      const imageUploadPromises = images.map(async (file) => {
        const imageRef = storageRef(storage, `images/${file.name + uuidv4()}`);
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        return url;
      });

      const imageUrls = await Promise.all(imageUploadPromises);

      // Create accommodation data to be stored
      const newAccommodation = {
        name,
        location,
        description,
        images: imageUrls, 
      };

      const accommodationId = uuidv4(); // Generate unique ID
      await setDoc(doc(db, 'accommodations', accommodationId), newAccommodation);

      return newAccommodation;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Auth slice
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
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.role = action.payload.role;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.role = action.payload.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Accommodation slice
const accommodationSlice = createSlice({
  name: 'accommodation',
  initialState: {
    loading: false,
    accommodations: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Accommodation
      .addCase(addAccommodation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAccommodation.fulfilled, (state, action) => {
        state.loading = false;
        state.accommodations.push(action.payload);
      })
      .addCase(addAccommodation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducers
export const { logout } = authSlice.actions;
export default authSlice.reducer;
export const accommodationReducer = accommodationSlice.reducer;
