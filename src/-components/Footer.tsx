export default function Footer() {
  return (
    <footer className="text-primary relative">
      <div className="absolute inset-0">
        <div className="bg-font-dark/20 absolute inset-0 z-1"></div>
        <img
          src="/footer-1440.png"
          srcSet="/footer-480.png 480w, /footer-800.png 800w, /footer-1440.png 1440w, /footer-1440@2x.png 2880w"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
          alt=""
          className="absolute inset-0 -z-1 h-full w-full object-cover"
        />
      </div>
      <div className="relative z-1">
        {" "}
        <p>
          Travel Expore is a demo website made by Front-end developer Joshua
          Glenn R. Gulbin. This demonstrates his front-end developing skill on
          building an optimize GSAP animated landing page.
        </p>
        <p>All rights reserved.</p>
      </div>
    </footer>
  );
}
