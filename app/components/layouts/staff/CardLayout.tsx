interface Props {
  children: React.ReactNode;
}

export default function CardLayout({ children }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 ">
      {children}
    </div>
  );
}
