import BaseCard from "../../base/Card/BaseCard";

interface Props {
  total: number;
  totalActive: number;
  totalInactive: number;
  totalSubmit: number;
  onFilterData: (status: string) => void;
}

export default function MonitorHeader({
  total,
  totalActive,
  totalInactive,
  totalSubmit,
  onFilterData,
}: Props) {
  return (
    <div className="flex flex-col xl:flex-row justify-between mb-6">
      <div className="flex flex-col mb-6">
        <h1 className="text-3xl font-bold">Live</h1>
        <h1 className="text-3xl font-bold">Monitoring</h1>
        <p className="text-gray-500">ติดตามการกรอกข้อมูลผู้ป่วยแบบเรียลไทม์</p>
      </div>

      <div className="grid grid-cols-2 md:flex gap-4 items-start">
        <BaseCard
          className="flex-row items-center justify-center p-4! cursor-pointer hover:scale-102"
          onClick={() => onFilterData("")}
        >
          <div className="h-6 md:h-10 aspect-square bg-gray-700 rounded-sm"></div>
          <div className="font-extrabold">
            <p className="text-[12px] text-neutral-400">ALL FORM</p>
            <p className="text-xl">{total}</p>
          </div>
        </BaseCard>
        <BaseCard
          className="flex-row items-center justify-center p-4! cursor-pointer hover:scale-102"
          onClick={() => onFilterData("active")}
        >
          <div className="h-6 md:h-10 aspect-square bg-blue-200 rounded-sm"></div>
          <div className="font-extrabold">
            <p className="text-[12px] text-neutral-400">ACTIVE</p>
            <p className="text-xl">{totalActive}</p>
          </div>
        </BaseCard>
        <BaseCard
          className="flex-row items-center justify-center p-4! cursor-pointer hover:scale-102"
          onClick={() => onFilterData("inactive")}
        >
          <div className="h-6 md:h-10 aspect-square bg-gray-200 rounded-sm"></div>
          <div className="font-extrabold">
            <p className="text-[12px] text-neutral-400">INACTIVE</p>
            <p className="text-xl">{totalInactive}</p>
          </div>
        </BaseCard>
        <BaseCard
          className="flex-row items-center justify-center p-4! cursor-pointer hover:scale-102"
          onClick={() => onFilterData("submitted")}
        >
          <div className="h-6 md:h-10 aspect-square bg-green-200 rounded-sm"></div>
          <div className="font-extrabold">
            <p className="text-[12px] text-neutral-400">SUBMITTED</p>
            <p className="text-xl">{totalSubmit}</p>
          </div>
        </BaseCard>
      </div>
    </div>
  );
}
