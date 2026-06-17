import Facebook from "../../public/social-icons/Facebook.svg";
import Instagram from "../../public/social-icons/Instagram.svg";
import { Link } from "lucide-react";

export const FacebookIcon = function FacebookIcon() {
  return <img src={Facebook} alt="Share tourist site on Facebook" />;
};

export const InstagramIcon = function InstagramIcon() {
  return <img src={Instagram} alt="Share tourist site on Instagram" />;
};

export const LinkIcon = <Link size={48} />;
