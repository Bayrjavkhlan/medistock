export const SUPPLY_CATEGORIES = [
  "LAB_ANALYZER",
  "LAB_CONSUMABLE",
  "IMAGING_SYSTEM",
  "PATIENT_MONITORING",
  "SURGICAL_SUPPLY",
  "DIAGNOSTIC_DEVICE",
  "ICU_SUPPORT",
  "STERILIZATION",
  "HOSPITAL_FURNITURE",
  "PPE",
  "OTHER",
] as const;

export const SUPPLY_AVAILABILITY = [
  "AVAILABLE",
  "LIMITED",
  "OUT_OF_STOCK",
  "PREORDER",
  "DISCONTINUED",
] as const;

export const SUPPLIER_STATUSES = [
  "ACTIVE",
  "PENDING_VERIFICATION",
  "SUSPENDED",
] as const;

export type SupplyCategory = (typeof SUPPLY_CATEGORIES)[number];
export type SupplyAvailability = (typeof SUPPLY_AVAILABILITY)[number];
export type SupplierStatus = (typeof SUPPLIER_STATUSES)[number];

export const supplyCategoryLabelMap: Record<SupplyCategory, string> = {
  LAB_ANALYZER: "Лабораторийн анализатор",
  LAB_CONSUMABLE: "Лабораторийн хэрэглээний материал",
  IMAGING_SYSTEM: "Дүрс оношилгооны систем",
  PATIENT_MONITORING: "Өвчтөн хянах төхөөрөмж",
  SURGICAL_SUPPLY: "Мэс заслын хангамж",
  DIAGNOSTIC_DEVICE: "Оношилгооны төхөөрөмж",
  ICU_SUPPORT: "Эрчимт эмчилгээний дэмжлэг",
  STERILIZATION: "Ариутгал",
  HOSPITAL_FURNITURE: "Эмнэлгийн тавилга",
  PPE: "Хувийн хамгаалах хэрэгсэл",
  OTHER: "Бусад",
};

export const supplyAvailabilityLabelMap: Record<SupplyAvailability, string> = {
  AVAILABLE: "Бэлэн байгаа",
  LIMITED: "Хязгаартай",
  OUT_OF_STOCK: "Дууссан",
  PREORDER: "Урьдчилсан захиалга",
  DISCONTINUED: "Нийлүүлэлт зогссон",
};

export const supplierStatusLabelMap: Record<SupplierStatus, string> = {
  ACTIVE: "Идэвхтэй",
  PENDING_VERIFICATION: "Баталгаажуулалт хүлээж буй",
  SUSPENDED: "Түр зогсоосон",
};
