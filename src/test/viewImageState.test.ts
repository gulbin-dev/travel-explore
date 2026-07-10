import { describe, expect, it } from "vitest";
import reducer, {
  setFullScreenView,
  setImageOnView,
} from "@utils/redux-toolkit/feature/viewImageSlice";
import type { ActiveItemProp } from "../utils/types";

const mockItem: NonNullable<ActiveItemProp> = {
  item: {
    id: 1,
    images: [
      {
        image: "image.jpg",
        attribution: {
          photographer: {
            profile: "https://example.com/profile",
            name: "Jane Doe",
          },
          source: "Unsplash",
          provider: "Unsplash",
        },
      },
    ],
    name: "Boracay",
    details: {
      location: "Philippines",
      mapLocation: "Visayas",
      description: "A beautiful island",
      activities: "Swimming",
    },
    socials: "https://example.com/boracay",
  },
  itemIndex: 0,
};

describe("image view reducer", () => {
  it("returns the initial state when no action is provided", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual({
      isToggled: false,
      isFullScreen: false,
      activeItem: null,
    });
  });

  it("enables the image viewer when an item is selected", () => {
    const state = reducer(undefined, setImageOnView(mockItem));

    expect(state.isToggled).toBe(true);
    expect(state.activeItem).toEqual(mockItem);
    expect(state.isFullScreen).toBe(false);
  });

  it("clears the image viewer state when the payload is null", () => {
    const state = reducer(
      {
        isToggled: true,
        isFullScreen: true,
        activeItem: mockItem,
      },
      setImageOnView(null),
    );

    expect(state.isToggled).toBe(false);
    expect(state.activeItem).toBeNull();
    expect(state.isFullScreen).toBe(true);
  });

  it("enables fullscreen mode for the selected item", () => {
    const state = reducer(undefined, setFullScreenView(mockItem));

    expect(state.isFullScreen).toBe(true);
    expect(state.activeItem).toEqual(mockItem);
    expect(state.isToggled).toBe(false);
  });
});
