interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function BaseCard({ children, className, onClick }: Props) {
  return (
    <div
      className={`rounded-2xl bg-white shadow-sm border border-slate-100 ${className} p-6 flex flex-col gap-6 text-start`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
