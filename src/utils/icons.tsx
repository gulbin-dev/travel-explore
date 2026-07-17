import Facebook from "/social-icons/Facebook.svg";
import Instagram from "/social-icons/Instagram.svg";
import {
  IconBrandGithubFilled,
  IconLink,
  IconMapPinFilled,
  IconLoader4,
  IconPhotoAlt,
  IconX,
  IconWorld,
} from "@tabler/icons-react";

export const FacebookIcon = function FacebookIcon() {
  return <img src={Facebook} alt="Share tourist site on Facebook" />;
};

export const InstagramIcon = function InstagramIcon() {
  return <img src={Instagram} alt="Share tourist site on Instagram" />;
};

export const LinkIcon = <IconLink size={48} color="black" />;
export const LoaderIcon = <IconLoader4 size={24} color="var(--color-cta)" />;
export const ErrorThumbnailIcon = <IconPhotoAlt size={90} color="white" />;
export const XButton = <IconX size={24} color="white" />;
export const WebsiteIcon = <IconWorld size={24} color="var(--color-cta)" />;
export const GithubIcon = (
  <IconBrandGithubFilled size={24} color="var(--color-cta)" />
);

export const LocataionPinIcon = (
  <IconMapPinFilled size={24} color="var(--color-cta)" />
);
