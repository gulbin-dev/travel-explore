export default function Attribution({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-primary absolute bottom-1 left-1 z-10 flex">
      <span className="bg-primary block h-7 w-1"></span>{" "}
      <div className="bg-primary/10 rounded-xs p-1.5 backdrop-blur-2xl">
        {children}
      </div>
    </div>
  );
}
