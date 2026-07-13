import Facebook from "/social-icons/Facebook.svg";
import Instagram from "/social-icons/Instagram.svg";
import {
  Link,
  MapPinIcon,
  LoaderCircle,
  LoaderCircleIcon,
  ImageOffIcon,
} from "lucide-react";

export const FacebookIcon = function FacebookIcon() {
  return <img src={Facebook} alt="Share tourist site on Facebook" />;
};

export const InstagramIcon = function InstagramIcon() {
  return <img src={Instagram} alt="Share tourist site on Instagram" />;
};

export const LinkIcon = <Link size={48} />;
export const LoaderIcon = <LoaderCircle size={24} />;
export const ErrorThumbnailIcon = <ImageOffIcon size={90} />;
export const LoaderThumbnailIcon = (
  <LoaderCircleIcon size={90} width={3} className="text-primary" />
);
export const LocataionPinIcon = (
  <MapPinIcon size={24} color="var(--color-cta)" />
);
