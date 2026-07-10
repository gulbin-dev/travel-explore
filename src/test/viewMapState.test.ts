import { describe, expect, it } from "vitest";
import reducer, {
  setMapOnView,
} from "@utils/redux-toolkit/feature/viewMapSlice";
import type { ItemProp } from "../utils/types";

const mockLocation: ItemProp = {
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
};

describe("map view reducer", () => {
  it("returns the initial state when no action is provided", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual({
      isToggled: false,
      location: null,
    });
  });

  it("opens the map view when a location is provided", () => {
    const state = reducer(undefined, setMapOnView(mockLocation));

    expect(state.isToggled).toBe(true);
    expect(state.location).toEqual(mockLocation);
  });

  it("toggles the map view closed when the same location is selected again", () => {
    const firstState = reducer(undefined, setMapOnView(mockLocation));
    const secondState = reducer(firstState, setMapOnView(mockLocation));

    expect(secondState.isToggled).toBe(false);
    expect(secondState.location).toBeNull();
  });

  it("clears the map view state when the payload is null", () => {
    const state = reducer(
      { isToggled: true, location: mockLocation },
      setMapOnView(null),
    );

    expect(state.isToggled).toBe(false);
    expect(state.location).toBeNull();
  });
});
