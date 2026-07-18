import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Privacy Policy | Demo Website",
      },
    ],
  }),
});

function RouteComponent() {
  const classNameHeaders = "text-size-lg mt-5 pb-2";
  return (
    <section className="page-content text-font-dark text-size-sm max-w-180 place-self-center px-3 pt-15 pb-10">
      <h1 className={classNameHeaders}>Privacy Policy</h1>
      <p>
        travel-explore is a travel inspiration site that does not collect
        sensitive personal information. We use only anonymous,
        performance-focused analytics to improve the browsing experience.
      </p>
      <h2 className={classNameHeaders}>Data collected</h2>
      <p>
        We may gather general usage metrics such as page views, load times, and
        browser performance. This information is anonymous and used solely to
        optimize the site.
      </p>
      <h2 className={classNameHeaders}>What we do not collect</h2>
      <p>
        The site does not collect passwords, payment details, health data, or
        any identifying personal information. You can browse travel-explore
        without sharing sensitive data.
      </p>
      <h2 className={classNameHeaders}>Third-party images</h2>
      <p>
        Images are sourced from third-party providers, as listed in{" "}
        <a
          href="https://github.com/gulbin-dev/travel-explore/blob/main/src/utils/land-sites.ts"
          target="_blank"
          className="font-medium underline"
        >
          src/utils/land-sites.ts
        </a>
        . The site uses images from <strong>Unsplash</strong> and{" "}
        <strong>Pexels</strong>, and those images remain the property of their
        creators.
      </p>
      <h2 className={classNameHeaders}>External links</h2>
      <p>
        travel-explore may link to external websites or map embeds. We do not
        control those sites and their privacy practices may differ from ours.
      </p>
      <h2 className={classNameHeaders}>Contact</h2>
      <p>
        For privacy questions, please check the project repository or reach out
        to the site owner through{" "}
        <a
          href="mailto:gulbindev@gmail.com"
          target="_blank"
          className="hover:active:decoration-cta underline decoration-black transition-colors"
        >
          email
        </a>
        .
      </p>
    </section>
  );
}
