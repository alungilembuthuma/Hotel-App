import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';

// Async thunk for booking an accommodation
export const bookAccommodation = createAsyncThunk(
  'booking/bookAccommodation',
  async ({ accommodationId, userId, bookingDetails }, { rejectWithValue }) => {
    try {
      const bookingData = {
        accommodationId,
        userId,
        ...bookingDetails,
        bookedAt: new Date(),
      };

      const docRef = await addDoc(collection(db, 'bookings'), bookingData);
      return { ...bookingData, id: docRef.id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    bookings: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookAccommodation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookAccommodation.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload); // Add booking to state
      })
      .addCase(bookAccommodation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message
      });
  },
});

export default bookingSlice.reducer;
