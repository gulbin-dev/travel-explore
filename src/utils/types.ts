export interface ItemProp {
  id: number;
  images: {
    image: string;
    attribution: {
      photographer: {
        profile: string;
        name: string;
      };
      source: string;
    };
  }[];
  name: string;
  details: {
    location: string;
    description: string;
    activities: string;
  };
  socials: string;
}
