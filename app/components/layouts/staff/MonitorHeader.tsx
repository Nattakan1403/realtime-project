import BaseCard from "../../base/Card/BaseCard";

interface Props {
  total: number;
  totalActive: number;
  totalInactive: number;
  totalSubmit: number;
}

export default function MonitorHeader({
  total,
  totalActive,
  totalInactive,
  totalSubmit,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row justify-between mb-6">
      <div className="flex flex-col mb-6">
        <h1 className="text-3xl font-bold">Live Monitoring</h1>
        <p className="text-gray-500">ติดตามการกรอกข้อมูลผู้ป่วยแบบเรียลไทม์</p>
      </div>

      <div className="flex gap-4">
        <BaseCard className="flex-row items-center justify-center py-0.5!">
          <div className="h-10 aspect-square bg-gray-700 rounded-sm"></div>
          <div className="font-extrabold">
            <p className="text-sm text-neutral-400">ALL FORM</p>
            <p className="text-xl">{total}</p>
          </div>
        </BaseCard>
        <BaseCard className="flex-row items-center justify-center py-0.5!">
          <div className="h-10 aspect-square bg-blue-200 rounded-sm"></div>
          <div className="font-extrabold">
            <p className="text-sm text-neutral-400">ACTIVE</p>
            <p className="text-xl">{totalActive}</p>
          </div>
        </BaseCard>
        <BaseCard className="flex-row items-center justify-center py-0.5!">
          <div className="h-10 aspect-square bg-gray-200 rounded-sm"></div>
          <div className="font-extrabold">
            <p className="text-sm text-neutral-400">INACTIVE</p>
            <p className="text-xl">{totalInactive}</p>
          </div>
        </BaseCard>
        <BaseCard className="flex-row items-center justify-center py-0.5!">
          <div className="h-10 aspect-square bg-green-200 rounded-sm"></div>
          <div className="font-extrabold">
            <p className="text-sm text-neutral-400">SUBMITTED</p>
            <p className="text-xl">{totalSubmit}</p>
          </div>
        </BaseCard>
      </div>
    </div>
  );
}
