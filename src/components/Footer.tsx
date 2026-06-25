import Attribution from "./UI/Attribution";

export default function Footer() {
  return (
    <footer className="text-primary relative min-h-50">
      <div className="absolute inset-0">
        <div className="bg-font-dark/40 absolute inset-0 z-1"></div>
        <img
          src="/footer-1440.webp"
          srcSet="/footer-480.webp 480w, /footer-800.webp 800w, /footer-1440.webp 1440w, /footer-1440@2x.webp 2880w"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
          loading="lazy"
          alt=""
          className="absolute inset-0 z-1 h-full w-full object-cover blur-[2px]"
        />
        <Attribution>
          <p>
            Photo by{" "}
            <a
              href="https://unsplash.com/@xlexes?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              target="_blank"
            >
              <span className="text-cta underline">Alexes Gerard</span>
            </a>{" "}
            on{" "}
            <a
              href="https://unsplash.com/photos/city-skyline-under-blue-sky-during-daytime-vL2h7xYiIlk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              target="_blank"
            >
              <span className="text-cta underline">Unsplash</span>
            </a>
          </p>
        </Attribution>
      </div>
      <div className="relative z-1 p-3">
        <img
          src="/logo-mobile.png"
          alt=""
          width={80}
          height={80}
          className="aspect-square"
        />
        <p className="text-size-sm pt-2">
          Travel Expore is a demo website made by Front-end developer Joshua
          Glenn R. Gulbin. This demonstrates his front-end developing skill on
          building an optimize GSAP animated landing page.
        </p>
        <nav>
          <ul className="flex gap-1.5"></ul>
        </nav>
        <p>All rights reserved.</p>
      </div>
    </footer>
  );
}
