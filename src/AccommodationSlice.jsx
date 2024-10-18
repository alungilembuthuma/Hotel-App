import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from './firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

// Async thunk to handle accommodation addition
export const addAccommodation = createAsyncThunk(
  'accommodation/addAccommodation',
  async ({ name, location, description, images }, { rejectWithValue }) => {
    try {
      // Step 1: Upload images to Firebase Storage and get their URLs
      const imageUploadPromises = images.map(async (file) => {
        const imageRef = storageRef(storage, `accommodations/${file.name + uuidv4()}`);
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        return url;
      });

      const imageUrls = await Promise.all(imageUploadPromises);

      // Step 2: Create accommodation data to be stored
      const newAccommodation = {
        name,
        location,
        description,
        images: imageUrls, // Store the image URLs
        createdAt: new Date(),
      };

      // Step 3: Save accommodation details to Firestore under 'accommodations' collection
      const docRef = await addDoc(collection(db, 'accommodations'), newAccommodation);

      return { ...newAccommodation, id: docRef.id }; // Return new accommodation along with the doc ID
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Accommodation slice
const accommodationSlice = createSlice({
  name: 'accommodation',
  initialState: {
    accommodations: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Optional reducers can be added here
  },
  extraReducers: (builder) => {
    // Handle addAccommodation thunk
    builder
      .addCase(addAccommodation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAccommodation.fulfilled, (state, action) => {
        state.loading = false;
        state.accommodations.push(action.payload); // Add the new accommodation to the state
      })
      .addCase(addAccommodation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message
      });
  },
});

// Export the accommodation reducer to be used in the store
export default accommodationSlice.reducer;
