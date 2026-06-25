import {
  FacebookIcon,
  InstagramIcon,
  LinkIcon,
  LocataionPinIcon,
} from "@utils/icons";
import { Link } from "@tanstack/react-router";
import ButtonCtaLink from "@/components/UI/ButtonCtaLink";
import { useAppSelector, useAppDispatch } from "@/hooks/redux-hooks";
import { setImageOnView } from "@utils/redux-toolkit/feature/viewImageSlice"; // Adjust path
import { Image } from "@unpic/react";
import type { ItemProp } from "@utils/types";
import { useEffect } from "react";

function ModalViewImage({
  isToggled,
  item,
  onClose,
}: {
  item: ItemProp | null;
  isToggled: boolean;
  onClose: () => void;
}) {
  if (!isToggled || !item) return null;

  return (
    <div className="bg-font-dark/90 fixed inset-0 z-50 grid h-screen w-screen grid-cols-4 grid-rows-[max-content_max-content_1fr]">
      <button
        onClick={onClose}
        className="col-start-4 justify-self-end p-4 text-4xl font-bold text-white hover:text-gray-300"
      >
        X
      </button>

      <div className="col-span-full flex">
        <Image
          src={item.images[2]?.image || "/card-img/camiguin/camiguin.webp"}
          layout="constrained"
          alt=""
          width={1280}
          height={990}
          loading="lazy"
          decoding="async"
          breakpoints={[
            380, 430, 560, 680, 768, 992, 1080, 1240, 1440, 2880, 3680,
          ]}
          className="object-cover"
        />
      </div>
      <div className="flex h-3">
        <header className="px-3 py-5">
          <div className="overflow-hidden">
            <div className="bg-cta desktop:block progress-scroll-bar__div--animate mb-3 hidden h-1 origin-left scale-x-0 rounded-2xl"></div>
          </div>

          <h2 id="name" className="text-size-xl">
            {item.name}
          </h2>
          <div className="bg-cta desktop:hidden my-1 block h-0.5 rounded-2xl"></div>
          <p className="flex gap-0.5 pt-1">
            <span className="h-fit">{LocataionPinIcon}</span>
            {item.details.location}
          </p>
        </header>

        <article className="line-clamp-6 px-3">
          <p className="duration-0!">{item.details.description}</p>
          <p className="duration-0!">{item.details.activities}</p>
        </article>
        <footer className="tablet:justify-normal desktop:gap-6 mt-4 flex justify-between px-3">
          <ButtonCtaLink to="" className="bg-cta text-primary">
            See Map
          </ButtonCtaLink>

          <ul aria-label="Social links" className="flex gap-3">
            <li>
              <Link to="/">
                <FacebookIcon />
              </Link>
            </li>
            <li>
              <Link to="/">
                <InstagramIcon />
              </Link>
            </li>
            <li>
              <Link to="/">{LinkIcon}</Link>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}

export default function ModalWrapper() {
  const dispatch = useAppDispatch();

  // Extract both variables from the global store
  const isToggled = useAppSelector((state) => state.isImageOnView.isToggled);
  const activeItem = useAppSelector((state) => state.isImageOnView.activeItem);

  useEffect(() => {
    if (isToggled) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  });
  return (
    <ModalViewImage
      isToggled={isToggled}
      item={activeItem}
      onClose={() => dispatch(setImageOnView(null))} // Pass null to reset and close
    />
  );
}
