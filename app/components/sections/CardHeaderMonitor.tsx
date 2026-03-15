import {
  getColorBgStatus,
  getColorStatus,
  getColorStatusText,
} from "@/app/lib/getColor";

interface Props {
  status: string;
  lastActive: string;
}

export default function CardHeaderMonitor({ status, lastActive }: Props) {
  const date = new Date(lastActive);
  const displayDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;

  return (
    <div className="flex justify-between items-start">
      {/* ==== status ==== */}
      <div
        className={`flex items-center! gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase border ${getColorStatusText(status)} ${getColorBgStatus(status)}`}
      >
        <div className="relative flex h-3 w-3">
          {status === "active" && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
          )}
          <span
            className={`relative inline-flex rounded-full h-full w-full ${getColorStatus(status)}`}
          ></span>
        </div>
        <div>{status}</div>
      </div>

      {/* ==== last active time ==== */}
      <div className="flex flex-col items-end text-gray-500">
        <p className="text-[12px]">อัปเดตล่าสุดในฐานข้อมูล</p>
        <p className="text-sm">{displayDate}</p>
      </div>
    </div>
  );
}
