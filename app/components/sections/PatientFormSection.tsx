interface Props {
  children: React.ReactNode;
  title?: string;
}

export default function PatientFormSection({ children, title }: Props) {
  return (
    <div>
      {title && <p>{title}</p>}
      <div className="grid grid-cols-2 gap-4">{children}</div>
    </div>
  );
}
