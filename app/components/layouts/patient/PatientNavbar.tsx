interface Props {
  pageTitle: string;
}

export default function PatientNavbar({ pageTitle }: Props) {
  return (
    <div className="p-6 flex justify-between items-center bg-white text-blue-700 shadow-sm">
      <p className="text-2xl font-extrabold">Logo</p>
      <p className="text-sm font-semibold bg-blue-100 px-3 py-1">{pageTitle}</p>
    </div>
  );
}
