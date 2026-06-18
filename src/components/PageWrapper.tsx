export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-primary text-primary font-open-sans">{children}</main>
  );
}
