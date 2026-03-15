interface Props {
  typing: string | undefined;
  realtimeValue?: string;
  dbValue?: string;
  fieldName: string;
  label: string;
}

export default function FieldDisplay({
  typing,
  realtimeValue,
  dbValue,
  fieldName,
  label,
}: Props) {
  const isTping = typing === fieldName;
  const classNameText = `font-bold ${isTping ? "text-blue-600" : "text-gray-500"}`;

  const displayTyping = (
    <div className="flex items-end gap-2">
      <p>กำลังพิมพ์</p>
      <div className="flex gap-1 mb-1.5">
        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span>
        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.15s]"></span>
        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.3s]"></span>
      </div>
    </div>
  );

  if (realtimeValue || dbValue) {
    return (
      <div
        className={`p-3 rounded-xl border w-full
            ${isTping ? "bg-blue-50 border-blue-300  transition-all duration-300 animate-pulse" : "bg-gray-50 border-gray-200"}
        `}
      >
        <p className={`text-sm ${classNameText}`}>{label}</p>
        <div className={classNameText}>
          {isTping ? displayTyping : realtimeValue || dbValue}
        </div>
      </div>
    );
  }
}
