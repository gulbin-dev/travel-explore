import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ItemProp } from "@utils/types";

interface ToggleState {
  isToggled: boolean;
  activeItem: ItemProp | null;
}

const initialState: ToggleState = {
  isToggled: false,
  activeItem: null,
};

export const isImageOnViewSlice = createSlice({
  name: "isImageOnView",
  initialState,
  reducers: {
    setImageOnView: (state, action: PayloadAction<ItemProp | null>) => {
      if (action.payload === null) {
        state.isToggled = false;
        state.activeItem = null;
      } else {
        state.isToggled = !state.isToggled;
        state.activeItem = state.isToggled ? action.payload : null;
      }
    },
  },
});

export const { setImageOnView } = isImageOnViewSlice.actions;
export default isImageOnViewSlice.reducer;
