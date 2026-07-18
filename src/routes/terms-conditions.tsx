import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms-conditions")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Terms and Conditions | Demo Website",
      },
    ],
  }),
});

function RouteComponent() {
  const classNameHeaders = "text-size-lg mt-5 pb-2";
  return (
    <section className="page-content text-font-dark text-size-sm max-w-180 place-self-center px-3 pt-15 pb-10">
      <h1 className={classNameHeaders}>Terms and Conditions</h1>
      <p>
        These terms govern your use of travel-explore, a website for travel
        inspiration and general destination information.
      </p>
      <h2 className={classNameHeaders}>Use of content</h2>
      <p>
        Content is provided for personal, non-commercial use. You may browse and
        share pages, but you may not republish or redistribute material without
        permission.
      </p>
      <h2 className={classNameHeaders}>Third-party images</h2>
      <p>
        Images on the site come from third-party providers. The image data in{" "}
        <a
          href="https://github.com/gulbin-dev/travel-explore/blob/main/src/utils/land-sites.ts"
          target="_blank"
          className="font-medium underline"
        >
          src/utils/land-sites.ts
        </a>{" "}
        includes assets from <strong>Unsplash</strong> and{" "}
        <strong>Pexels</strong>. These images are subject to their original
        provider terms and attribution requirements.
      </p>
      <h2 className={classNameHeaders}>Disclaimer</h2>
      <p>
        travel-explore does not guarantee the accuracy, completeness, or current
        status of the information provided. Travel details may change, so users
        should verify information independently.
      </p>
      <h2 className={classNameHeaders}>Analytics</h2>
      <p>
        We use anonymous analytics to improve site performance and usability. No
        sensitive personal data is collected.
      </p>
      <h2 className={classNameHeaders}>Limitation of liability</h2>
      <p>
        travel-explore is not liable for damages or losses arising from your use
        of the site. Use of the website is at your own risk.
      </p>
      <h2 className={classNameHeaders}>Updates</h2>
      <p>
        These terms may be updated over time. Continued use of the site after
        changes indicates acceptance of the revised terms.
      </p>
    </section>
  );
}
