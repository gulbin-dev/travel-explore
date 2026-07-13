import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ActiveItemProp } from "@utils/types";

interface ToggleState {
  isToggled: boolean;
  isFullScreen: boolean;
  activeItem: ActiveItemProp;
  fullScreenImageSource: string;
}

const initialState: ToggleState = {
  isToggled: false,
  isFullScreen: false,
  activeItem: null,
  fullScreenImageSource: "",
};

export const isImageOnViewSlice = createSlice({
  name: "isImageOnView",
  initialState,
  reducers: {
    setImageOnView: (state, action: PayloadAction<ActiveItemProp | null>) => {
      if (action.payload === null) {
        state.isToggled = false;
        state.activeItem = null;
        return;
      }
      state.isToggled = true;
      state.activeItem = action.payload;
    },
    setFullScreenView: (state, action: PayloadAction<string>) => {
      if (action.payload === "") {
        state.isFullScreen = false;
        state.fullScreenImageSource = "";
        return;
      }
      state.isFullScreen = true;
      state.fullScreenImageSource = action.payload;
    },
  },
});

export const { setImageOnView, setFullScreenView } = isImageOnViewSlice.actions;
export default isImageOnViewSlice.reducer;
