export const EQUIPMENT_CATEGORY_LABELS: Record<string, string> = {
  IMAGING_MRI: "MRI дүрс оношилгоо",
  IMAGING_CT: "CT дүрс оношилгоо",
  IMAGING_X_RAY: "Рентген аппарат",
  IMAGING_ULTRASOUND: "Эхо аппарат",
  VENTILATOR: "Амьсгалын аппарат",
  PATIENT_MONITOR: "Өвчтөний монитор",
  SURGICAL_INSTRUMENT: "Мэс заслын хэрэгсэл",
  LAB_EQUIPMENT: "Лабораторийн төхөөрөмж",
  INFUSION_PUMP: "Дуслын шахуурга",
  DEFIBRILLATOR: "Дефибриллятор",
  DIALYSIS_MACHINE: "Диализийн аппарат",
  OTHER: "Бусад",
};

export const EQUIPMENT_STATE_LABELS: Record<string, string> = {
  AVAILABLE: "Бэлэн",
  ASSIGNED: "Хуваарилагдсан",
  IN_MAINTENANCE: "Засвар үйлчилгээнд",
  OUT_OF_ORDER: "Эвдэрсэн",
  RETIRED: "Ашиглалтаас гарсан",
};

export const EQUIPMENT_LOG_TYPE_LABELS: Record<string, string> = {
  GENERAL: "Ерөнхий",
  MAINTENANCE: "Засвар үйлчилгээ",
  INSPECTION: "Үзлэг шалгалт",
  CALIBRATION: "Тохируулга",
  FAULT: "Гэмтэл",
};

export const EQUIPMENT_LOG_STATUS_LABELS: Record<string, string> = {
  Completed: "Дууссан",
  Passed: "Тэнцсэн",
  "Requires follow-up": "Дахин шалгах шаардлагатай",
  Resolved: "Шийдвэрлэсэн",
};

export const formatEquipmentCategory = (value?: string | null) =>
  value ? (EQUIPMENT_CATEGORY_LABELS[value] ?? value) : "-";

export const formatEquipmentState = (value?: string | null) =>
  value ? (EQUIPMENT_STATE_LABELS[value] ?? value) : "-";

export const formatEquipmentLogType = (value?: string | null) =>
  value ? (EQUIPMENT_LOG_TYPE_LABELS[value] ?? value) : "-";

export const formatEquipmentLogStatus = (value?: string | null) =>
  value ? (EQUIPMENT_LOG_STATUS_LABELS[value] ?? value) : "-";
