interface Props {
  children: React.ReactNode;
  title?: string;
}

export default function PatientFormSection({ children, title }: Props) {
  return (
    <div>
      {title && <p className="font-extrabold mb-4 text-xl">{title}</p>}
      <div className="grid grid-cols-2 gap-4">{children}</div>
    </div>
  );
}
