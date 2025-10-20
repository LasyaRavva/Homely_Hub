import axios from "../../api/axios";

import { propertyAction } from "./property-slice";

//action creator to fetch properties

export const getAllProperties = () => async (dispatch, getState) => {
  try {
    dispatch(propertyAction.getRequest());

    const { searchParams } = getState().properties;

    const response = await axios.get(`/api/v1/rent/listing`, {
      params: { ...searchParams },
    });

    console.log('API Response:', response);
    console.log('Response Data:', response.data);
    console.log('Response Data Type:', typeof response.data);
    
    // Defensive: check response and response.data
    if (!response || !response.data) {
      throw new Error("Could not fetch any properties");
    }

    const { data } = response;
    console.log('Dispatching to reducer:', data);
    dispatch(propertyAction.getProperties(data));
  } catch (error) {
    console.error('Error fetching properties:', error);
    dispatch(propertyAction.getErrors(error.message));
  }
};
