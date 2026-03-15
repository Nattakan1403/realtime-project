export const getColorBgStatus = (status: string) => {
  switch (status) {
    case "active":
      return "bg-blue-100 border-blue-200!";
    case "submitted":
      return "bg-green-100 border-green-200!";
    default:
      return "bg-gray-100 border-gray-200!";
  }
};

export const getColorShadowStatus = (status: string) => {
  switch (status) {
    case "active":
      return "shadow-blue-200";
    case "submitted":
      return "shadow-green-200";
    default:
      return "shadow-gray-200";
  }
};

export const getColorStatus = (status: string) => {
  switch (status) {
    case "active":
      return "bg-blue-600";
    case "submitted":
      return "bg-green-600";
    default:
      return "bg-gray-500";
  }
};

export const getColorStatusText = (status: string) => {
  switch (status) {
    case "active":
      return "text-blue-600";
    case "submitted":
      return "text-green-600";
    default:
      return "text-gray-500";
  }
};
