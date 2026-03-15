interface Props {
  children: React.ReactNode;
  onSubmit: () => void;
}

export default function FormLayout({ children, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 container-custom">
      {children}
    </form>
  );
}
