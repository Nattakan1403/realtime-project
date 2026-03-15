interface Props {
  children: React.ReactNode;
  type?: "submit" | "button";
  className?: string;
  onClick?: () => void;
}

export default function BaseButton({
  children,
  type = "button",
  className,
  onClick,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`p-4 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition hover:cursor-pointer ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
