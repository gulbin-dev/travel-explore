import Facebook from "/social-icons/Facebook.svg";
import Instagram from "/social-icons/Instagram.svg";
import { Link, MapPinIcon } from "lucide-react";

export const FacebookIcon = function FacebookIcon() {
  return <img src={Facebook} alt="Share tourist site on Facebook" />;
};

export const InstagramIcon = function InstagramIcon() {
  return <img src={Instagram} alt="Share tourist site on Instagram" />;
};

export const LinkIcon = <Link size={48} />;
export const LocataionPinIcon = (
  <MapPinIcon size={24} color="var(--color-cta)" />
);
