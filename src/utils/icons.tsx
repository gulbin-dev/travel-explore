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
  IconMailFilled,
} from "@tabler/icons-react";

export const FacebookIcon = function FacebookIcon() {
  return <img src={Facebook} alt="Share tourist site on Facebook" />;
};

export const InstagramIcon = function InstagramIcon() {
  return <img src={Instagram} alt="Share tourist site on Instagram" />;
};

const WebsiteIcon = IconWorld;
const LinkIcon = IconLink;
const LoaderIcon = IconLoader4;
const ErrorThumbnailIcon = IconPhotoAlt;
const XButton = IconX;
const GithubIcon = IconBrandGithubFilled;
const LocataionPinIcon = IconMapPinFilled;
const EmailIcon = IconMailFilled;

export {
  GithubIcon,
  LinkIcon,
  LocataionPinIcon,
  LoaderIcon,
  ErrorThumbnailIcon,
  XButton,
  WebsiteIcon,
  EmailIcon,
};
