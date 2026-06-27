import type { ItemProp } from "@utils/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ToggleState {
  isToggled: boolean;
  location: ItemProp | null;
}

const initialState: ToggleState = {
  isToggled: false,
  location: null,
};

export const isMapOnViewSlice = createSlice({
  name: "isMapOnView",
  initialState,
  reducers: {
    setMapOnView: (state, action: PayloadAction<ItemProp | null>) => {
      if (action.payload === null) {
        state.isToggled = false;
        state.location = null;
      } else {
        // Toggle the view state
        state.isToggled = !state.isToggled;
        // Sync the item based on the new toggled state
        state.location = state.isToggled ? action.payload : null;
      }
    },
  },
});

export const { setMapOnView } = isMapOnViewSlice.actions;
export default isMapOnViewSlice.reducer;
