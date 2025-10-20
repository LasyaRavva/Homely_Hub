import { createSlice } from "@reduxjs/toolkit";

const propertySlice = createSlice({
  //Slice name:
  name: "property",
  //Intial state for the property slice

  initialState: {
    properties: [],
    totalProperties: 0,
    searchParams: {}, //Parameters used to search
    error: null, //Error State
    loading: false, //loading state for the property
  },

  //reducers functions to handle different functions
  reducers: {
    getRequest(state) {
      state.loading = true;
    },
    //Action to update properties state with fetch data
    getProperties(state, action) {
      console.log('Reducer received payload:', action.payload);
      console.log('Payload data:', action.payload?.data);
      console.log('Payload all_properties:', action.payload?.all_properties);
      
      // Defensive: fallback if payload or data is missing
      state.properties = action.payload?.data || [];
      state.totalProperties = action.payload?.all_properties || 0;
      state.loading = false;
      state.error = null; // Clear any previous errors
      
      console.log('State after update - properties count:', state.properties.length);
    },

    //Action to search parameters
    updateSearchParams: (state, action) => {
      state.searchParams =
        Object.keys(action.payload).length === 0
          ? {}
          : {
              ...state.searchParams,
              ...action.payload,
            };
    },

    //Action to update  error state
    getErrors(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.properties = [];
      state.totalProperties = 0;
    },
  },
});

export const propertyAction = propertySlice.actions;

export default propertySlice;
