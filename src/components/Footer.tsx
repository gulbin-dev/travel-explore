export default function Footer() {
  return (
    <footer className="bg-primary text-font-dark relative flex min-h-50 justify-center overflow-hidden">
      <div className="relative z-1 max-w-180 p-3">
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
