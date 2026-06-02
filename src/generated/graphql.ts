/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any };
  /** A field whose value conforms to the standard internet email address format as specified in HTML Spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address. */
  EmailAddress: { input: any; output: any };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
};

export type Address = {
  __typename?: "Address";
  address1?: Maybe<Scalars["String"]["output"]>;
  address2?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  latitude?: Maybe<Scalars["Float"]["output"]>;
  longitude?: Maybe<Scalars["Float"]["output"]>;
  province?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type AddressCreateInput = {
  address1: Scalars["String"]["input"];
  address2?: InputMaybe<Scalars["String"]["input"]>;
  province: Scalars["String"]["input"];
};

export type AdminDashboardOverview = {
  __typename?: "AdminDashboardOverview";
  alerts: Array<DashboardAlertItem>;
  growthSeries: Array<DashboardSeries>;
  inventoryStatus: Array<DashboardStat>;
  map: AdminMapLocationsPayload;
  recentItems: Array<DashboardActivityItem>;
  stats: Array<DashboardStat>;
  topHospitals: Array<DashboardStat>;
  topPharmacies: Array<DashboardStat>;
};

export type AdminMapLocationsPayload = {
  __typename?: "AdminMapLocationsPayload";
  drugstores: Array<DashboardMapLocation>;
  hospitals: Array<DashboardMapLocation>;
};

export type AuthUser = {
  __typename?: "AuthUser";
  email?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  isPlatformAdmin: Scalars["Boolean"]["output"];
  memberships: Array<UserMembership>;
  name?: Maybe<Scalars["String"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
};

export type Booking = {
  __typename?: "Booking";
  bookingTime?: Maybe<Scalars["DateTime"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  department?: Maybe<Scalars["String"]["output"]>;
  doctorName?: Maybe<Scalars["String"]["output"]>;
  hospital?: Maybe<Hospital>;
  id?: Maybe<Scalars["String"]["output"]>;
  patientName?: Maybe<Scalars["String"]["output"]>;
  patientPhone?: Maybe<Scalars["String"]["output"]>;
  status?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type BookingCreateInput = {
  bookingTime: Scalars["DateTime"]["input"];
  department: Scalars["String"]["input"];
  doctorName?: InputMaybe<Scalars["String"]["input"]>;
  hospitalId: Scalars["String"]["input"];
  patientName: Scalars["String"]["input"];
  patientPhone: Scalars["String"]["input"];
  status: BookingStatus;
};

export enum BookingStatus {
  Cancelled = "CANCELLED",
  Completed = "COMPLETED",
  Confirmed = "CONFIRMED",
  Pending = "PENDING",
}

export type Bookings = {
  __typename?: "Bookings";
  count: Scalars["Int"]["output"];
  data?: Maybe<Array<Booking>>;
};

export type BookingsWhereInput = {
  hospitalId?: InputMaybe<Scalars["String"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<BookingStatus>;
};

export type DashboardActivityItem = {
  __typename?: "DashboardActivityItem";
  createdAt?: Maybe<Scalars["String"]["output"]>;
  href?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  meta?: Maybe<Scalars["String"]["output"]>;
  subtitle?: Maybe<Scalars["String"]["output"]>;
  title: Scalars["String"]["output"];
};

export type DashboardAlertItem = {
  __typename?: "DashboardAlertItem";
  description: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  severity: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
};

export type DashboardMapLocation = {
  __typename?: "DashboardMapLocation";
  address: Scalars["String"]["output"];
  address2?: Maybe<Scalars["String"]["output"]>;
  closesAt: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  latitude: Scalars["Float"]["output"];
  longitude: Scalars["Float"]["output"];
  name: Scalars["String"]["output"];
  opensAt: Scalars["String"]["output"];
  province: Scalars["String"]["output"];
  type: Scalars["String"]["output"];
};

export type DashboardOverview = {
  __typename?: "DashboardOverview";
  admin?: Maybe<AdminDashboardOverview>;
  hospital?: Maybe<HospitalDashboardOverview>;
  pharmacy?: Maybe<PharmacyDashboardOverview>;
  role?: Maybe<Scalars["String"]["output"]>;
};

export type DashboardProfile = {
  __typename?: "DashboardProfile";
  address: Scalars["String"]["output"];
  email?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  latitude?: Maybe<Scalars["Float"]["output"]>;
  longitude?: Maybe<Scalars["Float"]["output"]>;
  name: Scalars["String"]["output"];
  phone?: Maybe<Scalars["String"]["output"]>;
  province?: Maybe<Scalars["String"]["output"]>;
};

export type DashboardSeries = {
  __typename?: "DashboardSeries";
  color?: Maybe<Scalars["String"]["output"]>;
  key: Scalars["String"]["output"];
  label: Scalars["String"]["output"];
  points: Array<DashboardSeriesPoint>;
};

export type DashboardSeriesPoint = {
  __typename?: "DashboardSeriesPoint";
  label: Scalars["String"]["output"];
  value: Scalars["Int"]["output"];
};

export type DashboardStat = {
  __typename?: "DashboardStat";
  helper?: Maybe<Scalars["String"]["output"]>;
  label: Scalars["String"]["output"];
  tone?: Maybe<Scalars["String"]["output"]>;
  value: Scalars["Int"]["output"];
};

export type Drug = {
  __typename?: "Drug";
  availability: Array<DrugAvailability>;
  availabilityCount: Scalars["Int"]["output"];
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  dosageForm?: Maybe<Scalars["String"]["output"]>;
  genericName?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  manufacturer?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  startingPrice?: Maybe<Scalars["Float"]["output"]>;
  strength?: Maybe<Scalars["String"]["output"]>;
  totalStock: Scalars["Int"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type DrugAvailability = {
  __typename?: "DrugAvailability";
  address?: Maybe<Address>;
  id: Scalars["String"]["output"];
  organizationId: Scalars["String"]["output"];
  pharmacyEmail?: Maybe<Scalars["String"]["output"]>;
  pharmacyId: Scalars["String"]["output"];
  pharmacyName: Scalars["String"]["output"];
  pharmacyPhone?: Maybe<Scalars["String"]["output"]>;
  price?: Maybe<Scalars["Float"]["output"]>;
  quantity: Scalars["Int"]["output"];
  status?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type DrugCreateInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  dosageForm?: InputMaybe<Scalars["String"]["input"]>;
  genericName?: InputMaybe<Scalars["String"]["input"]>;
  manufacturer?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  strength?: InputMaybe<Scalars["String"]["input"]>;
};

export type Drugs = {
  __typename?: "Drugs";
  count: Scalars["Int"]["output"];
  data?: Maybe<Array<Drug>>;
};

export type DrugsWhereInput = {
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export enum EnumSortOrder {
  Asc = "asc",
  Desc = "desc",
}

export type Equipment = {
  __typename?: "Equipment";
  assignedTo?: Maybe<User>;
  brand?: Maybe<Scalars["String"]["output"]>;
  calibrationInstructionDocument?: Maybe<Scalars["String"]["output"]>;
  category?: Maybe<Scalars["String"]["output"]>;
  commissionedDate?: Maybe<Scalars["DateTime"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  endOfLifeDate?: Maybe<Scalars["DateTime"]["output"]>;
  hospital?: Maybe<Hospital>;
  id?: Maybe<Scalars["String"]["output"]>;
  logs?: Maybe<Array<Maybe<EquipmentLog>>>;
  maintenancePlan?: Maybe<Scalars["String"]["output"]>;
  manufacturedYear?: Maybe<Scalars["Int"]["output"]>;
  model?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  passportDocument?: Maybe<Scalars["String"]["output"]>;
  requiredParts?: Maybe<Scalars["String"]["output"]>;
  serialNo?: Maybe<Scalars["String"]["output"]>;
  sparePartsStock?: Maybe<Scalars["String"]["output"]>;
  state?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  usageManualDocument?: Maybe<Scalars["String"]["output"]>;
  usedParts?: Maybe<Scalars["String"]["output"]>;
};

export enum EquipmentCategory {
  Defibrillator = "DEFIBRILLATOR",
  DialysisMachine = "DIALYSIS_MACHINE",
  ImagingCt = "IMAGING_CT",
  ImagingMri = "IMAGING_MRI",
  ImagingUltrasound = "IMAGING_ULTRASOUND",
  ImagingXRay = "IMAGING_X_RAY",
  InfusionPump = "INFUSION_PUMP",
  LabEquipment = "LAB_EQUIPMENT",
  Other = "OTHER",
  PatientMonitor = "PATIENT_MONITOR",
  SurgicalInstrument = "SURGICAL_INSTRUMENT",
  Ventilator = "VENTILATOR",
}

export type EquipmentCreateInput = {
  assignedToId?: InputMaybe<Scalars["String"]["input"]>;
  brand?: InputMaybe<Scalars["String"]["input"]>;
  calibrationInstructionDocument?: InputMaybe<Scalars["String"]["input"]>;
  category: EquipmentCategory;
  commissionedDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  endOfLifeDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  hospitalId: Scalars["String"]["input"];
  maintenancePlan?: InputMaybe<Scalars["String"]["input"]>;
  manufacturedYear?: InputMaybe<Scalars["Int"]["input"]>;
  model?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  passportDocument?: InputMaybe<Scalars["String"]["input"]>;
  requiredParts?: InputMaybe<Scalars["String"]["input"]>;
  serialNo: Scalars["String"]["input"];
  sparePartsStock?: InputMaybe<Scalars["String"]["input"]>;
  state: EquipmentState;
  usageManualDocument?: InputMaybe<Scalars["String"]["input"]>;
  usedParts?: InputMaybe<Scalars["String"]["input"]>;
};

export type EquipmentLog = {
  __typename?: "EquipmentLog";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  equipment?: Maybe<Equipment>;
  faultDate?: Maybe<Scalars["DateTime"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  performedBy?: Maybe<User>;
  problem?: Maybe<Scalars["String"]["output"]>;
  repairAction?: Maybe<Scalars["String"]["output"]>;
  status?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type EquipmentLogCreateInput = {
  description: Scalars["String"]["input"];
  equipmentId: Scalars["String"]["input"];
  faultDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  problem?: InputMaybe<Scalars["String"]["input"]>;
  repairAction?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<EquipmentLogType>;
};

export enum EquipmentLogType {
  Calibration = "CALIBRATION",
  Fault = "FAULT",
  General = "GENERAL",
  Inspection = "INSPECTION",
  Maintenance = "MAINTENANCE",
}

export type EquipmentLogUpdateInput = {
  description: Scalars["String"]["input"];
  faultDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  problem?: InputMaybe<Scalars["String"]["input"]>;
  repairAction?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<EquipmentLogType>;
};

export type EquipmentLogs = {
  __typename?: "EquipmentLogs";
  count: Scalars["Int"]["output"];
  data?: Maybe<Array<EquipmentLog>>;
};

export type EquipmentLogsWhereInput = {
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export enum EquipmentState {
  Assigned = "ASSIGNED",
  Available = "AVAILABLE",
  InMaintenance = "IN_MAINTENANCE",
  OutOfOrder = "OUT_OF_ORDER",
  Retired = "RETIRED",
}

export type Equipments = {
  __typename?: "Equipments";
  count: Scalars["Int"]["output"];
  data?: Maybe<Array<Equipment>>;
};

export type EquipmentsWhereInput = {
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type Hospital = {
  __typename?: "Hospital";
  address?: Maybe<Address>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type HospitalCreateInput = {
  address: AddressCreateInput;
  email: Scalars["EmailAddress"]["input"];
  name: Scalars["String"]["input"];
  phone: Scalars["String"]["input"];
};

export type HospitalDashboardOverview = {
  __typename?: "HospitalDashboardOverview";
  activitySeries: Array<DashboardSeries>;
  alerts: Array<DashboardAlertItem>;
  equipmentStates: Array<DashboardStat>;
  nearbyPharmacies: Array<DashboardActivityItem>;
  profile: DashboardProfile;
  recentLogs: Array<DashboardActivityItem>;
  stats: Array<DashboardStat>;
  upcomingBookings: Array<DashboardActivityItem>;
};

export type HospitalOption = {
  __typename?: "HospitalOption";
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type Hospitals = {
  __typename?: "Hospitals";
  count: Scalars["Int"]["output"];
  data?: Maybe<Array<Hospital>>;
};

export type HospitalsWhereInput = {
  address?: InputMaybe<Scalars["String"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type LoginInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type LoginPayload = {
  __typename?: "LoginPayload";
  accessToken: Scalars["String"]["output"];
  accessTokenExpiresAt: Scalars["String"]["output"];
  refreshToken: Scalars["String"]["output"];
  user: AuthUser;
};

export type LogoutPayload = {
  __typename?: "LogoutPayload";
  message: Scalars["String"]["output"];
};

export type MePayload = {
  __typename?: "MePayload";
  activeOrganization?: Maybe<UserMembership>;
  user: AuthUser;
};

export type Membership = {
  __typename?: "Membership";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  organization: OrganizationSummary;
  role: OrganizationRole;
  user: User;
};

export type MembershipCreateInput = {
  role: OrganizationRole;
  userId: Scalars["String"]["input"];
};

export type MembershipUpdateInput = {
  role: OrganizationRole;
};

export type Memberships = {
  __typename?: "Memberships";
  count: Scalars["Int"]["output"];
  data?: Maybe<Array<Membership>>;
};

export type Mutation = {
  __typename?: "Mutation";
  bookingCreate?: Maybe<Scalars["Boolean"]["output"]>;
  bookingDelete?: Maybe<Scalars["Boolean"]["output"]>;
  bookingUpdate?: Maybe<Scalars["Boolean"]["output"]>;
  drugCreate?: Maybe<Scalars["Boolean"]["output"]>;
  drugDelete?: Maybe<Scalars["Boolean"]["output"]>;
  drugUpdate?: Maybe<Scalars["Boolean"]["output"]>;
  equipmentCreate?: Maybe<Scalars["Boolean"]["output"]>;
  equipmentDelete?: Maybe<Scalars["Boolean"]["output"]>;
  equipmentLogCreate?: Maybe<Scalars["Boolean"]["output"]>;
  equipmentLogDelete?: Maybe<Scalars["Boolean"]["output"]>;
  equipmentLogUpdate?: Maybe<Scalars["Boolean"]["output"]>;
  equipmentUpdate?: Maybe<Scalars["Boolean"]["output"]>;
  hospitalCreate?: Maybe<Scalars["Boolean"]["output"]>;
  hospitalDelete?: Maybe<Scalars["Boolean"]["output"]>;
  hospitalUpdate?: Maybe<Scalars["Boolean"]["output"]>;
  login?: Maybe<LoginPayload>;
  logout?: Maybe<LogoutPayload>;
  membershipCreate?: Maybe<Scalars["Boolean"]["output"]>;
  membershipDelete?: Maybe<Scalars["Boolean"]["output"]>;
  membershipUpdate?: Maybe<Scalars["Boolean"]["output"]>;
  pharmacyCreate?: Maybe<Scalars["Boolean"]["output"]>;
  pharmacyDelete?: Maybe<Scalars["Boolean"]["output"]>;
  pharmacyDrugDelete?: Maybe<Scalars["Boolean"]["output"]>;
  pharmacyDrugUpsert?: Maybe<Scalars["Boolean"]["output"]>;
  pharmacyUpdate?: Maybe<Scalars["Boolean"]["output"]>;
  refreshAccessToken?: Maybe<LoginPayload>;
  resendOtp?: Maybe<ResendOtpPayload>;
  selectOrganization?: Maybe<UserMembership>;
  signUp?: Maybe<SignUpPayload>;
  supplierCreate?: Maybe<Scalars["Boolean"]["output"]>;
  supplierDelete?: Maybe<Scalars["Boolean"]["output"]>;
  supplierUpdate?: Maybe<Scalars["Boolean"]["output"]>;
  supplyItemCreate?: Maybe<Scalars["Boolean"]["output"]>;
  supplyItemDelete?: Maybe<Scalars["Boolean"]["output"]>;
  supplyItemUpdate?: Maybe<Scalars["Boolean"]["output"]>;
  userCreate?: Maybe<Scalars["Boolean"]["output"]>;
  userDelete?: Maybe<Scalars["Boolean"]["output"]>;
  userUpdate?: Maybe<Scalars["Boolean"]["output"]>;
  verifyOtp?: Maybe<VerifyOtpPayload>;
};

export type MutationBookingCreateArgs = {
  input: BookingCreateInput;
};

export type MutationBookingDeleteArgs = {
  id: Scalars["String"]["input"];
};

export type MutationBookingUpdateArgs = {
  id: Scalars["String"]["input"];
  input: BookingCreateInput;
};

export type MutationDrugCreateArgs = {
  input: DrugCreateInput;
};

export type MutationDrugDeleteArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDrugUpdateArgs = {
  id: Scalars["String"]["input"];
  input: DrugCreateInput;
};

export type MutationEquipmentCreateArgs = {
  input: EquipmentCreateInput;
};

export type MutationEquipmentDeleteArgs = {
  id: Scalars["String"]["input"];
};

export type MutationEquipmentLogCreateArgs = {
  input: EquipmentLogCreateInput;
};

export type MutationEquipmentLogDeleteArgs = {
  id: Scalars["String"]["input"];
};

export type MutationEquipmentLogUpdateArgs = {
  id: Scalars["String"]["input"];
  input: EquipmentLogUpdateInput;
};

export type MutationEquipmentUpdateArgs = {
  id: Scalars["String"]["input"];
  input: EquipmentCreateInput;
};

export type MutationHospitalCreateArgs = {
  input: HospitalCreateInput;
};

export type MutationHospitalDeleteArgs = {
  id: Scalars["String"]["input"];
};

export type MutationHospitalUpdateArgs = {
  id: Scalars["String"]["input"];
  input: HospitalCreateInput;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationMembershipCreateArgs = {
  input: MembershipCreateInput;
};

export type MutationMembershipDeleteArgs = {
  id: Scalars["String"]["input"];
};

export type MutationMembershipUpdateArgs = {
  id: Scalars["String"]["input"];
  input: MembershipUpdateInput;
};

export type MutationPharmacyCreateArgs = {
  input: PharmacyCreateInput;
};

export type MutationPharmacyDeleteArgs = {
  id: Scalars["String"]["input"];
};

export type MutationPharmacyDrugDeleteArgs = {
  drugId: Scalars["String"]["input"];
};

export type MutationPharmacyDrugUpsertArgs = {
  input: PharmacyDrugUpsertInput;
};

export type MutationPharmacyUpdateArgs = {
  id: Scalars["String"]["input"];
  input: PharmacyCreateInput;
};

export type MutationRefreshAccessTokenArgs = {
  refreshToken: Scalars["String"]["input"];
};

export type MutationResendOtpArgs = {
  input: ResendOtpInput;
};

export type MutationSelectOrganizationArgs = {
  orgId: Scalars["String"]["input"];
};

export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type MutationSupplierCreateArgs = {
  input: SupplierCreateInput;
};

export type MutationSupplierDeleteArgs = {
  id: Scalars["String"]["input"];
};

export type MutationSupplierUpdateArgs = {
  id: Scalars["String"]["input"];
  input: SupplierUpdateInput;
};

export type MutationSupplyItemCreateArgs = {
  input: SupplyItemCreateInput;
};

export type MutationSupplyItemDeleteArgs = {
  id: Scalars["String"]["input"];
};

export type MutationSupplyItemUpdateArgs = {
  id: Scalars["String"]["input"];
  input: SupplyItemUpdateInput;
};

export type MutationUserCreateArgs = {
  input: UserCreateInput;
};

export type MutationUserDeleteArgs = {
  id: Scalars["String"]["input"];
};

export type MutationUserUpdateArgs = {
  id: Scalars["String"]["input"];
  input: UserUpdateInput;
};

export type MutationVerifyOtpArgs = {
  input: VerifyOtpInput;
};

export enum OrganizationRole {
  Manager = "MANAGER",
  Owner = "OWNER",
  Staff = "STAFF",
}

export type OrganizationSummary = {
  __typename?: "OrganizationSummary";
  id: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  type: OrganizationType;
};

export enum OrganizationType {
  Hospital = "HOSPITAL",
  Pharmacy = "PHARMACY",
  Supplier = "SUPPLIER",
}

export type PharmaciesWhereInput = {
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type Pharmacy = {
  __typename?: "Pharmacy";
  address?: Maybe<Address>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  inventory: Array<PharmacyDrug>;
  inventoryCount: Scalars["Int"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type PharmacyCreateInput = {
  address: AddressCreateInput;
  email: Scalars["EmailAddress"]["input"];
  name: Scalars["String"]["input"];
  phone: Scalars["String"]["input"];
};

export type PharmacyDashboardOverview = {
  __typename?: "PharmacyDashboardOverview";
  activitySeries: Array<DashboardSeries>;
  alerts: Array<DashboardAlertItem>;
  inventoryStatus: Array<DashboardStat>;
  lowStockItems: Array<DashboardActivityItem>;
  profile: DashboardProfile;
  recentUpdates: Array<DashboardActivityItem>;
  stats: Array<DashboardStat>;
  topDrugs: Array<DashboardActivityItem>;
};

export type PharmacyDrug = {
  __typename?: "PharmacyDrug";
  drug: Drug;
  id?: Maybe<Scalars["String"]["output"]>;
  price?: Maybe<Scalars["Float"]["output"]>;
  quantity?: Maybe<Scalars["Int"]["output"]>;
  status?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type PharmacyDrugUpsertInput = {
  drugId: Scalars["String"]["input"];
  price?: InputMaybe<Scalars["Float"]["input"]>;
  quantity: Scalars["Int"]["input"];
  status: Scalars["String"]["input"];
};

export type PharmacyDrugs = {
  __typename?: "PharmacyDrugs";
  count: Scalars["Int"]["output"];
  data?: Maybe<Array<PharmacyDrug>>;
};

export type PharmacyDrugsWhereInput = {
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type PharmacyOption = {
  __typename?: "PharmacyOption";
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type Pharmacys = {
  __typename?: "Pharmacys";
  count: Scalars["Int"]["output"];
  data?: Maybe<Array<Pharmacy>>;
};

export type Query = {
  __typename?: "Query";
  adminMapLocations?: Maybe<AdminMapLocationsPayload>;
  bookingDetail?: Maybe<Booking>;
  bookings?: Maybe<Bookings>;
  currentUser?: Maybe<AuthUser>;
  dashboardOverview?: Maybe<DashboardOverview>;
  drugDetail?: Maybe<Drug>;
  drugs?: Maybe<Drugs>;
  equipmentDetail?: Maybe<Equipment>;
  equipmentLogDetail?: Maybe<EquipmentLog>;
  equipmentLogs?: Maybe<EquipmentLogs>;
  equipments?: Maybe<Equipments>;
  hospitalDetail?: Maybe<Hospital>;
  hospitalOption: Array<HospitalOption>;
  hospitals?: Maybe<Hospitals>;
  me?: Maybe<MePayload>;
  memberships?: Maybe<Memberships>;
  pharmacies?: Maybe<Pharmacys>;
  pharmacyDetail?: Maybe<Pharmacy>;
  pharmacyDrugs?: Maybe<PharmacyDrugs>;
  pharmacyOption: Array<PharmacyOption>;
  supplierDetail?: Maybe<Supplier>;
  supplierSupplyItems?: Maybe<SupplyItems>;
  suppliers?: Maybe<Suppliers>;
  supplyItemDetail?: Maybe<SupplyItem>;
  supplyItems?: Maybe<SupplyItems>;
  userDetail?: Maybe<User>;
  users?: Maybe<Users>;
};

export type QueryBookingDetailArgs = {
  id: Scalars["String"]["input"];
};

export type QueryBookingsArgs = {
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
  where?: InputMaybe<BookingsWhereInput>;
};

export type QueryDrugDetailArgs = {
  id: Scalars["String"]["input"];
};

export type QueryDrugsArgs = {
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
  where?: InputMaybe<DrugsWhereInput>;
};

export type QueryEquipmentDetailArgs = {
  id: Scalars["String"]["input"];
};

export type QueryEquipmentLogDetailArgs = {
  id: Scalars["String"]["input"];
};

export type QueryEquipmentLogsArgs = {
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
  where?: InputMaybe<EquipmentLogsWhereInput>;
};

export type QueryEquipmentsArgs = {
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
  where?: InputMaybe<EquipmentsWhereInput>;
};

export type QueryHospitalDetailArgs = {
  id: Scalars["String"]["input"];
};

export type QueryHospitalsArgs = {
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
  where?: InputMaybe<HospitalsWhereInput>;
};

export type QueryMembershipsArgs = {
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
};

export type QueryPharmaciesArgs = {
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
  where?: InputMaybe<PharmaciesWhereInput>;
};

export type QueryPharmacyDetailArgs = {
  id: Scalars["String"]["input"];
};

export type QueryPharmacyDrugsArgs = {
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
  where?: InputMaybe<PharmacyDrugsWhereInput>;
};

export type QuerySupplierDetailArgs = {
  id: Scalars["String"]["input"];
};

export type QuerySupplierSupplyItemsArgs = {
  skip: Scalars["Int"]["input"];
  supplierId: Scalars["String"]["input"];
  take: Scalars["Int"]["input"];
};

export type QuerySuppliersArgs = {
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
  where?: InputMaybe<SuppliersWhereInput>;
};

export type QuerySupplyItemDetailArgs = {
  id: Scalars["String"]["input"];
};

export type QuerySupplyItemsArgs = {
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
  where?: InputMaybe<SupplyItemsWhereInput>;
};

export type QueryUserDetailArgs = {
  id: Scalars["String"]["input"];
};

export type QueryUsersArgs = {
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
  where?: InputMaybe<UsersWhereInput>;
};

export type ResendOtpInput = {
  email: Scalars["String"]["input"];
};

export type ResendOtpPayload = {
  __typename?: "ResendOtpPayload";
  message: Scalars["String"]["output"];
};

export type SignUpInput = {
  email: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type SignUpPayload = {
  __typename?: "SignUpPayload";
  message: Scalars["String"]["output"];
};

export type Supplier = {
  __typename?: "Supplier";
  address?: Maybe<Address>;
  categoriesSupplied: Array<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  logoUrl?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  organizationId: Scalars["String"]["output"];
  phone?: Maybe<Scalars["String"]["output"]>;
  status: SupplierStatus;
  supplyItemCount: Scalars["Int"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  website?: Maybe<Scalars["String"]["output"]>;
};

export type SupplierAddressInput = {
  address1: Scalars["String"]["input"];
  address2?: InputMaybe<Scalars["String"]["input"]>;
  province: Scalars["String"]["input"];
};

export type SupplierCreateInput = {
  address?: InputMaybe<SupplierAddressInput>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  logoUrl?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  ownerUserId?: InputMaybe<Scalars["String"]["input"]>;
  phone?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<SupplierStatus>;
  website?: InputMaybe<Scalars["String"]["input"]>;
};

export enum SupplierStatus {
  Active = "ACTIVE",
  PendingVerification = "PENDING_VERIFICATION",
  Suspended = "SUSPENDED",
}

export type SupplierUpdateInput = {
  address?: InputMaybe<SupplierAddressInput>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  logoUrl?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  ownerUserId?: InputMaybe<Scalars["String"]["input"]>;
  phone?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<SupplierStatus>;
  website?: InputMaybe<Scalars["String"]["input"]>;
};

export type Suppliers = {
  __typename?: "Suppliers";
  count: Scalars["Int"]["output"];
  data?: Maybe<Array<Supplier>>;
};

export type SuppliersWhereInput = {
  search?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<SupplierStatus>;
};

export enum SupplyAvailabilityStatus {
  Available = "AVAILABLE",
  Discontinued = "DISCONTINUED",
  Limited = "LIMITED",
  OutOfStock = "OUT_OF_STOCK",
  Preorder = "PREORDER",
}

export type SupplyItem = {
  __typename?: "SupplyItem";
  availability: SupplyAvailabilityStatus;
  brand?: Maybe<Scalars["String"]["output"]>;
  category: SupplyItemCategory;
  contactInfo?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  currency?: Maybe<Scalars["String"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  documentUrls: Array<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  imageUrls: Array<Scalars["String"]["output"]>;
  manufacturer?: Maybe<Scalars["String"]["output"]>;
  model?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  price?: Maybe<Scalars["Float"]["output"]>;
  shortDescription?: Maybe<Scalars["String"]["output"]>;
  specifications?: Maybe<Scalars["JSON"]["output"]>;
  supplier: Supplier;
  supplierId: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  warranty?: Maybe<Scalars["String"]["output"]>;
};

export enum SupplyItemCategory {
  DiagnosticDevice = "DIAGNOSTIC_DEVICE",
  HospitalFurniture = "HOSPITAL_FURNITURE",
  IcuSupport = "ICU_SUPPORT",
  ImagingSystem = "IMAGING_SYSTEM",
  LabAnalyzer = "LAB_ANALYZER",
  LabConsumable = "LAB_CONSUMABLE",
  Other = "OTHER",
  PatientMonitoring = "PATIENT_MONITORING",
  Ppe = "PPE",
  Sterilization = "STERILIZATION",
  SurgicalSupply = "SURGICAL_SUPPLY",
}

export type SupplyItemCreateInput = {
  availability?: InputMaybe<SupplyAvailabilityStatus>;
  brand?: InputMaybe<Scalars["String"]["input"]>;
  category: SupplyItemCategory;
  contactInfo?: InputMaybe<Scalars["String"]["input"]>;
  currency?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  documentUrls: Array<Scalars["String"]["input"]>;
  imageUrls: Array<Scalars["String"]["input"]>;
  manufacturer?: InputMaybe<Scalars["String"]["input"]>;
  model?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  price?: InputMaybe<Scalars["Float"]["input"]>;
  shortDescription?: InputMaybe<Scalars["String"]["input"]>;
  specifications?: InputMaybe<Scalars["JSON"]["input"]>;
  supplierId: Scalars["String"]["input"];
  warranty?: InputMaybe<Scalars["String"]["input"]>;
};

export enum SupplyItemSortField {
  CreatedAt = "CREATED_AT",
  Name = "NAME",
  Price = "PRICE",
  UpdatedAt = "UPDATED_AT",
}

export type SupplyItemUpdateInput = {
  availability?: InputMaybe<SupplyAvailabilityStatus>;
  brand?: InputMaybe<Scalars["String"]["input"]>;
  category: SupplyItemCategory;
  contactInfo?: InputMaybe<Scalars["String"]["input"]>;
  currency?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  documentUrls: Array<Scalars["String"]["input"]>;
  imageUrls: Array<Scalars["String"]["input"]>;
  manufacturer?: InputMaybe<Scalars["String"]["input"]>;
  model?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  price?: InputMaybe<Scalars["Float"]["input"]>;
  shortDescription?: InputMaybe<Scalars["String"]["input"]>;
  specifications?: InputMaybe<Scalars["JSON"]["input"]>;
  supplierId: Scalars["String"]["input"];
  warranty?: InputMaybe<Scalars["String"]["input"]>;
};

export type SupplyItems = {
  __typename?: "SupplyItems";
  count: Scalars["Int"]["output"];
  data?: Maybe<Array<SupplyItem>>;
};

export type SupplyItemsWhereInput = {
  availability?: InputMaybe<SupplyAvailabilityStatus>;
  category?: InputMaybe<SupplyItemCategory>;
  maxPrice?: InputMaybe<Scalars["Float"]["input"]>;
  minPrice?: InputMaybe<Scalars["Float"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sortBy?: InputMaybe<SupplyItemSortField>;
  sortOrder?: InputMaybe<EnumSortOrder>;
  supplierId?: InputMaybe<Scalars["String"]["input"]>;
};

export type User = {
  __typename?: "User";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  isPlatformAdmin?: Maybe<Scalars["Boolean"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type UserCreateInput = {
  email: Scalars["String"]["input"];
  isPlatformAdmin?: InputMaybe<Scalars["Boolean"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  organizationId?: InputMaybe<Scalars["String"]["input"]>;
  password: Scalars["String"]["input"];
  phone?: InputMaybe<Scalars["String"]["input"]>;
  role?: InputMaybe<OrganizationRole>;
};

export type UserMembership = {
  __typename?: "UserMembership";
  organization: OrganizationSummary;
  role: OrganizationRole;
};

export type UserUpdateInput = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  isPlatformAdmin?: InputMaybe<Scalars["Boolean"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  organizationId?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
  phone?: InputMaybe<Scalars["String"]["input"]>;
  role?: InputMaybe<OrganizationRole>;
};

export type Users = {
  __typename?: "Users";
  count: Scalars["Int"]["output"];
  data?: Maybe<Array<User>>;
};

export type UsersWhereInput = {
  organizationId?: InputMaybe<Scalars["String"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type VerifyOtpInput = {
  email: Scalars["String"]["input"];
  otp: Scalars["String"]["input"];
};

export type VerifyOtpPayload = {
  __typename?: "VerifyOtpPayload";
  message: Scalars["String"]["output"];
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login?: {
    __typename?: "LoginPayload";
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: string;
    user: {
      __typename?: "AuthUser";
      id: string;
      name?: string | null;
      email?: string | null;
      phone?: string | null;
      isPlatformAdmin: boolean;
      memberships: Array<{
        __typename?: "UserMembership";
        role: OrganizationRole;
        organization: {
          __typename?: "OrganizationSummary";
          id: string;
          name: string;
          type: OrganizationType;
        };
      }>;
    };
  } | null;
};

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;

export type SignUpMutation = {
  __typename?: "Mutation";
  signUp?: { __typename?: "SignUpPayload"; message: string } | null;
};

export type VerifyOtpMutationVariables = Exact<{
  input: VerifyOtpInput;
}>;

export type VerifyOtpMutation = {
  __typename?: "Mutation";
  verifyOtp?: { __typename?: "VerifyOtpPayload"; message: string } | null;
};

export type ResendOtpMutationVariables = Exact<{
  input: ResendOtpInput;
}>;

export type ResendOtpMutation = {
  __typename?: "Mutation";
  resendOtp?: { __typename?: "ResendOtpPayload"; message: string } | null;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = {
  __typename?: "Mutation";
  logout?: { __typename?: "LogoutPayload"; message: string } | null;
};

export type RefreshAccessTokenMutationVariables = Exact<{
  refreshToken: Scalars["String"]["input"];
}>;

export type RefreshAccessTokenMutation = {
  __typename?: "Mutation";
  refreshAccessToken?: {
    __typename?: "LoginPayload";
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: string;
    user: {
      __typename?: "AuthUser";
      id: string;
      name?: string | null;
      email?: string | null;
      phone?: string | null;
      isPlatformAdmin: boolean;
      memberships: Array<{
        __typename?: "UserMembership";
        role: OrganizationRole;
        organization: {
          __typename?: "OrganizationSummary";
          id: string;
          name: string;
          type: OrganizationType;
        };
      }>;
    };
  } | null;
};

export type SelectOrganizationMutationVariables = Exact<{
  orgId: Scalars["String"]["input"];
}>;

export type SelectOrganizationMutation = {
  __typename?: "Mutation";
  selectOrganization?: {
    __typename?: "UserMembership";
    role: OrganizationRole;
    organization: {
      __typename?: "OrganizationSummary";
      id: string;
      name: string;
      type: OrganizationType;
    };
  } | null;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: {
    __typename?: "MePayload";
    activeOrganization?: {
      __typename?: "UserMembership";
      role: OrganizationRole;
      organization: {
        __typename?: "OrganizationSummary";
        id: string;
        name: string;
        type: OrganizationType;
      };
    } | null;
    user: {
      __typename?: "AuthUser";
      id: string;
      name?: string | null;
      email?: string | null;
      phone?: string | null;
      isPlatformAdmin: boolean;
      memberships: Array<{
        __typename?: "UserMembership";
        role: OrganizationRole;
        organization: {
          __typename?: "OrganizationSummary";
          id: string;
          name: string;
          type: OrganizationType;
        };
      }>;
    };
  } | null;
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = {
  __typename?: "Query";
  currentUser?: {
    __typename?: "AuthUser";
    id: string;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    isPlatformAdmin: boolean;
    memberships: Array<{
      __typename?: "UserMembership";
      role: OrganizationRole;
      organization: {
        __typename?: "OrganizationSummary";
        id: string;
        name: string;
        type: OrganizationType;
      };
    }>;
  } | null;
};

export type DashboardOverviewQueryVariables = Exact<{ [key: string]: never }>;

export type DashboardOverviewQuery = {
  __typename?: "Query";
  dashboardOverview?: {
    __typename?: "DashboardOverview";
    role?: string | null;
    admin?: {
      __typename?: "AdminDashboardOverview";
      stats: Array<{
        __typename?: "DashboardStat";
        label: string;
        value: number;
        helper?: string | null;
        tone?: string | null;
      }>;
      growthSeries: Array<{
        __typename?: "DashboardSeries";
        key: string;
        label: string;
        color?: string | null;
        points: Array<{
          __typename?: "DashboardSeriesPoint";
          label: string;
          value: number;
        }>;
      }>;
      inventoryStatus: Array<{
        __typename?: "DashboardStat";
        label: string;
        value: number;
        helper?: string | null;
        tone?: string | null;
      }>;
      recentItems: Array<{
        __typename?: "DashboardActivityItem";
        id: string;
        title: string;
        subtitle?: string | null;
        meta?: string | null;
        href?: string | null;
        createdAt?: string | null;
      }>;
      topHospitals: Array<{
        __typename?: "DashboardStat";
        label: string;
        value: number;
        helper?: string | null;
        tone?: string | null;
      }>;
      topPharmacies: Array<{
        __typename?: "DashboardStat";
        label: string;
        value: number;
        helper?: string | null;
        tone?: string | null;
      }>;
      alerts: Array<{
        __typename?: "DashboardAlertItem";
        id: string;
        title: string;
        description: string;
        severity: string;
      }>;
      map: {
        __typename?: "AdminMapLocationsPayload";
        hospitals: Array<{
          __typename?: "DashboardMapLocation";
          id: string;
          name: string;
          type: string;
          address: string;
          address2?: string | null;
          province: string;
          opensAt: string;
          closesAt: string;
          latitude: number;
          longitude: number;
        }>;
        drugstores: Array<{
          __typename?: "DashboardMapLocation";
          id: string;
          name: string;
          type: string;
          address: string;
          address2?: string | null;
          province: string;
          opensAt: string;
          closesAt: string;
          latitude: number;
          longitude: number;
        }>;
      };
    } | null;
    hospital?: {
      __typename?: "HospitalDashboardOverview";
      profile: {
        __typename?: "DashboardProfile";
        id: string;
        name: string;
        email?: string | null;
        phone?: string | null;
        address: string;
        province?: string | null;
        latitude?: number | null;
        longitude?: number | null;
      };
      stats: Array<{
        __typename?: "DashboardStat";
        label: string;
        value: number;
        helper?: string | null;
        tone?: string | null;
      }>;
      activitySeries: Array<{
        __typename?: "DashboardSeries";
        key: string;
        label: string;
        color?: string | null;
        points: Array<{
          __typename?: "DashboardSeriesPoint";
          label: string;
          value: number;
        }>;
      }>;
      equipmentStates: Array<{
        __typename?: "DashboardStat";
        label: string;
        value: number;
        helper?: string | null;
        tone?: string | null;
      }>;
      recentLogs: Array<{
        __typename?: "DashboardActivityItem";
        id: string;
        title: string;
        subtitle?: string | null;
        meta?: string | null;
        href?: string | null;
        createdAt?: string | null;
      }>;
      upcomingBookings: Array<{
        __typename?: "DashboardActivityItem";
        id: string;
        title: string;
        subtitle?: string | null;
        meta?: string | null;
        href?: string | null;
        createdAt?: string | null;
      }>;
      nearbyPharmacies: Array<{
        __typename?: "DashboardActivityItem";
        id: string;
        title: string;
        subtitle?: string | null;
        meta?: string | null;
        href?: string | null;
        createdAt?: string | null;
      }>;
      alerts: Array<{
        __typename?: "DashboardAlertItem";
        id: string;
        title: string;
        description: string;
        severity: string;
      }>;
    } | null;
    pharmacy?: {
      __typename?: "PharmacyDashboardOverview";
      profile: {
        __typename?: "DashboardProfile";
        id: string;
        name: string;
        email?: string | null;
        phone?: string | null;
        address: string;
        province?: string | null;
        latitude?: number | null;
        longitude?: number | null;
      };
      stats: Array<{
        __typename?: "DashboardStat";
        label: string;
        value: number;
        helper?: string | null;
        tone?: string | null;
      }>;
      activitySeries: Array<{
        __typename?: "DashboardSeries";
        key: string;
        label: string;
        color?: string | null;
        points: Array<{
          __typename?: "DashboardSeriesPoint";
          label: string;
          value: number;
        }>;
      }>;
      inventoryStatus: Array<{
        __typename?: "DashboardStat";
        label: string;
        value: number;
        helper?: string | null;
        tone?: string | null;
      }>;
      topDrugs: Array<{
        __typename?: "DashboardActivityItem";
        id: string;
        title: string;
        subtitle?: string | null;
        meta?: string | null;
        href?: string | null;
        createdAt?: string | null;
      }>;
      lowStockItems: Array<{
        __typename?: "DashboardActivityItem";
        id: string;
        title: string;
        subtitle?: string | null;
        meta?: string | null;
        href?: string | null;
        createdAt?: string | null;
      }>;
      recentUpdates: Array<{
        __typename?: "DashboardActivityItem";
        id: string;
        title: string;
        subtitle?: string | null;
        meta?: string | null;
        href?: string | null;
        createdAt?: string | null;
      }>;
      alerts: Array<{
        __typename?: "DashboardAlertItem";
        id: string;
        title: string;
        description: string;
        severity: string;
      }>;
    } | null;
  } | null;
};

export type AdminMapLocationsQueryVariables = Exact<{ [key: string]: never }>;

export type AdminMapLocationsQuery = {
  __typename?: "Query";
  adminMapLocations?: {
    __typename?: "AdminMapLocationsPayload";
    hospitals: Array<{
      __typename?: "DashboardMapLocation";
      id: string;
      name: string;
      type: string;
      address: string;
      address2?: string | null;
      province: string;
      opensAt: string;
      closesAt: string;
      latitude: number;
      longitude: number;
    }>;
    drugstores: Array<{
      __typename?: "DashboardMapLocation";
      id: string;
      name: string;
      type: string;
      address: string;
      address2?: string | null;
      province: string;
      opensAt: string;
      closesAt: string;
      latitude: number;
      longitude: number;
    }>;
  } | null;
};

export type EquipmentCreateMutationVariables = Exact<{
  input: EquipmentCreateInput;
}>;

export type EquipmentCreateMutation = {
  __typename?: "Mutation";
  equipmentCreate?: boolean | null;
};

export type EquipmentUpdateMutationVariables = Exact<{
  equipmentUpdateId: Scalars["String"]["input"];
  input: EquipmentCreateInput;
}>;

export type EquipmentUpdateMutation = {
  __typename?: "Mutation";
  equipmentUpdate?: boolean | null;
};

export type EquipmentDeleteMutationVariables = Exact<{
  equipmentDeleteId: Scalars["String"]["input"];
}>;

export type EquipmentDeleteMutation = {
  __typename?: "Mutation";
  equipmentDelete?: boolean | null;
};

export type EquipmentsQueryVariables = Exact<{
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  where?: InputMaybe<EquipmentsWhereInput>;
}>;

export type EquipmentsQuery = {
  __typename?: "Query";
  equipments?: {
    __typename?: "Equipments";
    count: number;
    data?: Array<{
      __typename?: "Equipment";
      id?: string | null;
      name?: string | null;
      serialNo?: string | null;
      brand?: string | null;
      model?: string | null;
      manufacturedYear?: number | null;
      commissionedDate?: any | null;
      endOfLifeDate?: any | null;
      passportDocument?: string | null;
      usageManualDocument?: string | null;
      calibrationInstructionDocument?: string | null;
      maintenancePlan?: string | null;
      requiredParts?: string | null;
      usedParts?: string | null;
      sparePartsStock?: string | null;
      state?: string | null;
      category?: string | null;
      assignedTo?: {
        __typename?: "User";
        id?: string | null;
        name?: string | null;
        email?: string | null;
        phone?: string | null;
      } | null;
      hospital?: {
        __typename?: "Hospital";
        id?: string | null;
        name?: string | null;
        email?: string | null;
      } | null;
    }> | null;
  } | null;
};

export type EquipmentDetailQueryVariables = Exact<{
  equipmentDetailId: Scalars["String"]["input"];
}>;

export type EquipmentDetailQuery = {
  __typename?: "Query";
  equipmentDetail?: {
    __typename?: "Equipment";
    id?: string | null;
    name?: string | null;
    serialNo?: string | null;
    brand?: string | null;
    model?: string | null;
    manufacturedYear?: number | null;
    commissionedDate?: any | null;
    endOfLifeDate?: any | null;
    passportDocument?: string | null;
    usageManualDocument?: string | null;
    calibrationInstructionDocument?: string | null;
    maintenancePlan?: string | null;
    requiredParts?: string | null;
    usedParts?: string | null;
    sparePartsStock?: string | null;
    category?: string | null;
    state?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    assignedTo?: {
      __typename?: "User";
      id?: string | null;
      name?: string | null;
      email?: string | null;
      phone?: string | null;
    } | null;
    hospital?: {
      __typename?: "Hospital";
      id?: string | null;
      name?: string | null;
      email?: string | null;
    } | null;
    logs?: Array<{
      __typename?: "EquipmentLog";
      id?: string | null;
      description?: string | null;
      type?: string | null;
      faultDate?: any | null;
      problem?: string | null;
      repairAction?: string | null;
      status?: string | null;
      createdAt?: any | null;
      performedBy?: {
        __typename?: "User";
        id?: string | null;
        name?: string | null;
        email?: string | null;
      } | null;
    } | null> | null;
  } | null;
};

export type HospitalCreateMutationVariables = Exact<{
  input: HospitalCreateInput;
}>;

export type HospitalCreateMutation = {
  __typename?: "Mutation";
  hospitalCreate?: boolean | null;
};

export type HospitalUpdateMutationVariables = Exact<{
  hospitalUpdateId: Scalars["String"]["input"];
  input: HospitalCreateInput;
}>;

export type HospitalUpdateMutation = {
  __typename?: "Mutation";
  hospitalUpdate?: boolean | null;
};

export type HospitalDeleteMutationVariables = Exact<{
  hospitalDeleteId: Scalars["String"]["input"];
}>;

export type HospitalDeleteMutation = {
  __typename?: "Mutation";
  hospitalDelete?: boolean | null;
};

export type HospitalsQueryVariables = Exact<{
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  where?: InputMaybe<HospitalsWhereInput>;
}>;

export type HospitalsQuery = {
  __typename?: "Query";
  hospitals?: {
    __typename?: "Hospitals";
    count: number;
    data?: Array<{
      __typename?: "Hospital";
      id?: string | null;
      name?: string | null;
      email?: string | null;
      phone?: string | null;
      address?: {
        __typename?: "Address";
        address1?: string | null;
        address2?: string | null;
        id?: string | null;
        province?: string | null;
      } | null;
    }> | null;
  } | null;
};

export type HospitalDetailQueryVariables = Exact<{
  hospitalDetailId: Scalars["String"]["input"];
}>;

export type HospitalDetailQuery = {
  __typename?: "Query";
  hospitalDetail?: {
    __typename?: "Hospital";
    id?: string | null;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    address?: {
      __typename?: "Address";
      id?: string | null;
      address1?: string | null;
      address2?: string | null;
      province?: string | null;
      latitude?: number | null;
      longitude?: number | null;
    } | null;
  } | null;
};

export type HospitalOptionQueryVariables = Exact<{ [key: string]: never }>;

export type HospitalOptionQuery = {
  __typename?: "Query";
  hospitalOption: Array<{
    __typename?: "HospitalOption";
    id?: string | null;
    name?: string | null;
  }>;
};

export type DrugCreateMutationVariables = Exact<{
  input: DrugCreateInput;
}>;

export type DrugCreateMutation = {
  __typename?: "Mutation";
  drugCreate?: boolean | null;
};

export type DrugUpdateMutationVariables = Exact<{
  drugUpdateId: Scalars["String"]["input"];
  input: DrugCreateInput;
}>;

export type DrugUpdateMutation = {
  __typename?: "Mutation";
  drugUpdate?: boolean | null;
};

export type DrugDeleteMutationVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type DrugDeleteMutation = {
  __typename?: "Mutation";
  drugDelete?: boolean | null;
};

export type PharmacyDrugUpsertMutationVariables = Exact<{
  input: PharmacyDrugUpsertInput;
}>;

export type PharmacyDrugUpsertMutation = {
  __typename?: "Mutation";
  pharmacyDrugUpsert?: boolean | null;
};

export type PharmacyDrugDeleteMutationVariables = Exact<{
  drugId: Scalars["String"]["input"];
}>;

export type PharmacyDrugDeleteMutation = {
  __typename?: "Mutation";
  pharmacyDrugDelete?: boolean | null;
};

export type DrugsQueryVariables = Exact<{
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  where?: InputMaybe<DrugsWhereInput>;
}>;

export type DrugsQuery = {
  __typename?: "Query";
  drugs?: {
    __typename?: "Drugs";
    count: number;
    data?: Array<{
      __typename?: "Drug";
      id?: string | null;
      name?: string | null;
      genericName?: string | null;
      dosageForm?: string | null;
      strength?: string | null;
      manufacturer?: string | null;
      description?: string | null;
      totalStock: number;
      startingPrice?: number | null;
      availabilityCount: number;
      createdAt?: any | null;
      updatedAt?: any | null;
    }> | null;
  } | null;
};

export type PharmacyDrugsQueryVariables = Exact<{
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  where?: InputMaybe<PharmacyDrugsWhereInput>;
}>;

export type PharmacyDrugsQuery = {
  __typename?: "Query";
  pharmacyDrugs?: {
    __typename?: "PharmacyDrugs";
    count: number;
    data?: Array<{
      __typename?: "PharmacyDrug";
      id?: string | null;
      quantity?: number | null;
      price?: number | null;
      status?: string | null;
      updatedAt?: any | null;
      drug: {
        __typename?: "Drug";
        id?: string | null;
        name?: string | null;
        genericName?: string | null;
        dosageForm?: string | null;
        strength?: string | null;
        manufacturer?: string | null;
        description?: string | null;
      };
    }> | null;
  } | null;
};

export type DrugDetailQueryVariables = Exact<{
  drugDetailId: Scalars["String"]["input"];
}>;

export type DrugDetailQuery = {
  __typename?: "Query";
  drugDetail?: {
    __typename?: "Drug";
    id?: string | null;
    name?: string | null;
    genericName?: string | null;
    dosageForm?: string | null;
    strength?: string | null;
    manufacturer?: string | null;
    description?: string | null;
    totalStock: number;
    startingPrice?: number | null;
    availabilityCount: number;
    createdAt?: any | null;
    updatedAt?: any | null;
    availability: Array<{
      __typename?: "DrugAvailability";
      id: string;
      pharmacyId: string;
      organizationId: string;
      pharmacyName: string;
      pharmacyEmail?: string | null;
      pharmacyPhone?: string | null;
      quantity: number;
      price?: number | null;
      status?: string | null;
      updatedAt?: any | null;
      address?: {
        __typename?: "Address";
        id?: string | null;
        address1?: string | null;
        address2?: string | null;
        province?: string | null;
        latitude?: number | null;
        longitude?: number | null;
      } | null;
    }>;
  } | null;
};

export type PharmacyCreateMutationVariables = Exact<{
  input: PharmacyCreateInput;
}>;

export type PharmacyCreateMutation = {
  __typename?: "Mutation";
  pharmacyCreate?: boolean | null;
};

export type PharmacyUpdateMutationVariables = Exact<{
  pharmacyUpdateId: Scalars["String"]["input"];
  input: PharmacyCreateInput;
}>;

export type PharmacyUpdateMutation = {
  __typename?: "Mutation";
  pharmacyUpdate?: boolean | null;
};

export type PharmacyDeleteMutationVariables = Exact<{
  pharmacyDeleteId: Scalars["String"]["input"];
}>;

export type PharmacyDeleteMutation = {
  __typename?: "Mutation";
  pharmacyDelete?: boolean | null;
};

export type PharmacyDetailQueryVariables = Exact<{
  pharmacyDetailId: Scalars["String"]["input"];
}>;

export type PharmacyDetailQuery = {
  __typename?: "Query";
  pharmacyDetail?: {
    __typename?: "Pharmacy";
    id?: string | null;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    inventoryCount: number;
    address?: {
      __typename?: "Address";
      id?: string | null;
      address1?: string | null;
      address2?: string | null;
      province?: string | null;
      latitude?: number | null;
      longitude?: number | null;
    } | null;
    inventory: Array<{
      __typename?: "PharmacyDrug";
      id?: string | null;
      quantity?: number | null;
      price?: number | null;
      status?: string | null;
      updatedAt?: any | null;
      drug: {
        __typename?: "Drug";
        id?: string | null;
        name?: string | null;
        genericName?: string | null;
        dosageForm?: string | null;
        strength?: string | null;
        manufacturer?: string | null;
      };
    }>;
  } | null;
};

export type UserCreateMutationVariables = Exact<{
  input: UserCreateInput;
}>;

export type UserCreateMutation = {
  __typename?: "Mutation";
  userCreate?: boolean | null;
};

export type UserUpdateMutationVariables = Exact<{
  userUpdateId: Scalars["String"]["input"];
  input: UserUpdateInput;
}>;

export type UserUpdateMutation = {
  __typename?: "Mutation";
  userUpdate?: boolean | null;
};

export type MembershipUpdateMutationVariables = Exact<{
  membershipUpdateId: Scalars["String"]["input"];
  input: MembershipUpdateInput;
}>;

export type MembershipUpdateMutation = {
  __typename?: "Mutation";
  membershipUpdate?: boolean | null;
};

export type MembershipDeleteMutationVariables = Exact<{
  membershipDeleteId: Scalars["String"]["input"];
}>;

export type MembershipDeleteMutation = {
  __typename?: "Mutation";
  membershipDelete?: boolean | null;
};

export type MembershipsQueryVariables = Exact<{
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
}>;

export type MembershipsQuery = {
  __typename?: "Query";
  memberships?: {
    __typename?: "Memberships";
    count: number;
    data?: Array<{
      __typename?: "Membership";
      id?: string | null;
      role: OrganizationRole;
      user: {
        __typename?: "User";
        id?: string | null;
        name?: string | null;
        email?: string | null;
        phone?: string | null;
      };
      organization: {
        __typename?: "OrganizationSummary";
        id: string;
        name: string;
        type: OrganizationType;
      };
    }> | null;
  } | null;
};

export type UserDetailQueryVariables = Exact<{
  userDetailId: Scalars["String"]["input"];
}>;

export type UserDetailQuery = {
  __typename?: "Query";
  userDetail?: {
    __typename?: "User";
    id?: string | null;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    isPlatformAdmin?: boolean | null;
  } | null;
};

export type SupplyItemCreateMutationVariables = Exact<{
  input: SupplyItemCreateInput;
}>;

export type SupplyItemCreateMutation = {
  __typename?: "Mutation";
  supplyItemCreate?: boolean | null;
};

export type SupplyItemUpdateMutationVariables = Exact<{
  id: Scalars["String"]["input"];
  input: SupplyItemUpdateInput;
}>;

export type SupplyItemUpdateMutation = {
  __typename?: "Mutation";
  supplyItemUpdate?: boolean | null;
};

export type SupplyItemDeleteMutationVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type SupplyItemDeleteMutation = {
  __typename?: "Mutation";
  supplyItemDelete?: boolean | null;
};

export type SupplierCreateMutationVariables = Exact<{
  input: SupplierCreateInput;
}>;

export type SupplierCreateMutation = {
  __typename?: "Mutation";
  supplierCreate?: boolean | null;
};

export type SupplierUpdateMutationVariables = Exact<{
  id: Scalars["String"]["input"];
  input: SupplierUpdateInput;
}>;

export type SupplierUpdateMutation = {
  __typename?: "Mutation";
  supplierUpdate?: boolean | null;
};

export type SupplierDeleteMutationVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type SupplierDeleteMutation = {
  __typename?: "Mutation";
  supplierDelete?: boolean | null;
};

export type SupplyItemsQueryVariables = Exact<{
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  where?: InputMaybe<SupplyItemsWhereInput>;
}>;

export type SupplyItemsQuery = {
  __typename?: "Query";
  supplyItems?: {
    __typename?: "SupplyItems";
    count: number;
    data?: Array<{
      __typename?: "SupplyItem";
      id?: string | null;
      supplierId: string;
      name: string;
      shortDescription?: string | null;
      description?: string | null;
      category: SupplyItemCategory;
      model?: string | null;
      brand?: string | null;
      manufacturer?: string | null;
      price?: number | null;
      currency?: string | null;
      availability: SupplyAvailabilityStatus;
      warranty?: string | null;
      contactInfo?: string | null;
      imageUrls: Array<string>;
      documentUrls: Array<string>;
      specifications?: any | null;
      createdAt?: any | null;
      updatedAt?: any | null;
      supplier: {
        __typename?: "Supplier";
        id?: string | null;
        organizationId: string;
        name: string;
        description?: string | null;
        logoUrl?: string | null;
        email?: string | null;
        phone?: string | null;
        website?: string | null;
        status: SupplierStatus;
        categoriesSupplied: Array<string>;
        supplyItemCount: number;
        createdAt?: any | null;
        updatedAt?: any | null;
        address?: {
          __typename?: "Address";
          id?: string | null;
          address1?: string | null;
          address2?: string | null;
          province?: string | null;
          latitude?: number | null;
          longitude?: number | null;
        } | null;
      };
    }> | null;
  } | null;
};

export type SupplyItemDetailQueryVariables = Exact<{
  supplyItemDetailId: Scalars["String"]["input"];
}>;

export type SupplyItemDetailQuery = {
  __typename?: "Query";
  supplyItemDetail?: {
    __typename?: "SupplyItem";
    id?: string | null;
    supplierId: string;
    name: string;
    shortDescription?: string | null;
    description?: string | null;
    category: SupplyItemCategory;
    model?: string | null;
    brand?: string | null;
    manufacturer?: string | null;
    price?: number | null;
    currency?: string | null;
    availability: SupplyAvailabilityStatus;
    warranty?: string | null;
    contactInfo?: string | null;
    imageUrls: Array<string>;
    documentUrls: Array<string>;
    specifications?: any | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    supplier: {
      __typename?: "Supplier";
      id?: string | null;
      organizationId: string;
      name: string;
      description?: string | null;
      logoUrl?: string | null;
      email?: string | null;
      phone?: string | null;
      website?: string | null;
      status: SupplierStatus;
      categoriesSupplied: Array<string>;
      supplyItemCount: number;
      createdAt?: any | null;
      updatedAt?: any | null;
      address?: {
        __typename?: "Address";
        id?: string | null;
        address1?: string | null;
        address2?: string | null;
        province?: string | null;
        latitude?: number | null;
        longitude?: number | null;
      } | null;
    };
  } | null;
};

export type SuppliersQueryVariables = Exact<{
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  where?: InputMaybe<SuppliersWhereInput>;
}>;

export type SuppliersQuery = {
  __typename?: "Query";
  suppliers?: {
    __typename?: "Suppliers";
    count: number;
    data?: Array<{
      __typename?: "Supplier";
      id?: string | null;
      organizationId: string;
      name: string;
      description?: string | null;
      logoUrl?: string | null;
      email?: string | null;
      phone?: string | null;
      website?: string | null;
      status: SupplierStatus;
      categoriesSupplied: Array<string>;
      supplyItemCount: number;
      createdAt?: any | null;
      updatedAt?: any | null;
      address?: {
        __typename?: "Address";
        id?: string | null;
        address1?: string | null;
        address2?: string | null;
        province?: string | null;
        latitude?: number | null;
        longitude?: number | null;
      } | null;
    }> | null;
  } | null;
};

export type SupplierDetailQueryVariables = Exact<{
  supplierDetailId: Scalars["String"]["input"];
}>;

export type SupplierDetailQuery = {
  __typename?: "Query";
  supplierDetail?: {
    __typename?: "Supplier";
    id?: string | null;
    organizationId: string;
    name: string;
    description?: string | null;
    logoUrl?: string | null;
    email?: string | null;
    phone?: string | null;
    website?: string | null;
    status: SupplierStatus;
    categoriesSupplied: Array<string>;
    supplyItemCount: number;
    createdAt?: any | null;
    updatedAt?: any | null;
    address?: {
      __typename?: "Address";
      id?: string | null;
      address1?: string | null;
      address2?: string | null;
      province?: string | null;
      latitude?: number | null;
      longitude?: number | null;
    } | null;
  } | null;
};

export type SupplierSupplyItemsQueryVariables = Exact<{
  supplierId: Scalars["String"]["input"];
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
}>;

export type SupplierSupplyItemsQuery = {
  __typename?: "Query";
  supplierSupplyItems?: {
    __typename?: "SupplyItems";
    count: number;
    data?: Array<{
      __typename?: "SupplyItem";
      id?: string | null;
      supplierId: string;
      name: string;
      shortDescription?: string | null;
      description?: string | null;
      category: SupplyItemCategory;
      model?: string | null;
      brand?: string | null;
      manufacturer?: string | null;
      price?: number | null;
      currency?: string | null;
      availability: SupplyAvailabilityStatus;
      warranty?: string | null;
      contactInfo?: string | null;
      imageUrls: Array<string>;
      documentUrls: Array<string>;
      specifications?: any | null;
      createdAt?: any | null;
      updatedAt?: any | null;
      supplier: {
        __typename?: "Supplier";
        id?: string | null;
        organizationId: string;
        name: string;
        description?: string | null;
        logoUrl?: string | null;
        email?: string | null;
        phone?: string | null;
        website?: string | null;
        status: SupplierStatus;
        categoriesSupplied: Array<string>;
        supplyItemCount: number;
        createdAt?: any | null;
        updatedAt?: any | null;
        address?: {
          __typename?: "Address";
          id?: string | null;
          address1?: string | null;
          address2?: string | null;
          province?: string | null;
          latitude?: number | null;
          longitude?: number | null;
        } | null;
      };
    }> | null;
  } | null;
};

export const LoginDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Login" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "LoginInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "login" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      { kind: "Field", name: { kind: "Name", value: "phone" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isPlatformAdmin" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "memberships" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "role" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "organization" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "type" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "accessToken" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "refreshToken" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "accessTokenExpiresAt" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const SignUpDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SignUp" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SignUpInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "signUp" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "message" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const VerifyOtpDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "VerifyOtp" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "VerifyOtpInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "verifyOtp" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "message" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<VerifyOtpMutation, VerifyOtpMutationVariables>;
export const ResendOtpDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ResendOtp" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ResendOtpInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "resendOtp" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "message" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ResendOtpMutation, ResendOtpMutationVariables>;
export const LogoutDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Logout" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "logout" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "message" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RefreshAccessTokenDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RefreshAccessToken" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "refreshToken" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "refreshAccessToken" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "refreshToken" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "refreshToken" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      { kind: "Field", name: { kind: "Name", value: "phone" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isPlatformAdmin" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "memberships" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "role" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "organization" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "type" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "accessToken" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "refreshToken" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "accessTokenExpiresAt" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RefreshAccessTokenMutation,
  RefreshAccessTokenMutationVariables
>;
export const SelectOrganizationDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SelectOrganization" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "orgId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "selectOrganization" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "orgId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "orgId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "role" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "organization" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SelectOrganizationMutation,
  SelectOrganizationMutationVariables
>;
export const MeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Me" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "me" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "activeOrganization" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "role" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "organization" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "type" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      { kind: "Field", name: { kind: "Name", value: "phone" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isPlatformAdmin" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "memberships" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "role" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "organization" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "type" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const CurrentUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "CurrentUser" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "currentUser" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "phone" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isPlatformAdmin" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "memberships" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "role" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "organization" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "type" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CurrentUserQuery, CurrentUserQueryVariables>;
export const DashboardOverviewDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "DashboardOverview" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "dashboardOverview" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "role" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "admin" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "stats" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "label" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "value" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "helper" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "tone" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "growthSeries" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "key" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "label" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "color" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "points" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "label" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "value" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "inventoryStatus" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "label" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "value" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "helper" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "tone" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "recentItems" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "title" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "subtitle" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "meta" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "href" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "createdAt" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "topHospitals" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "label" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "value" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "helper" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "tone" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "topPharmacies" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "label" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "value" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "helper" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "tone" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "alerts" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "title" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "description" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "severity" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "map" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "hospitals" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "type" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "address" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "address2" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "province" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "opensAt" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "closesAt" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "latitude" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "longitude" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "drugstores" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "type" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "address" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "address2" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "province" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "opensAt" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "closesAt" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "latitude" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "longitude" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "hospital" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "profile" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "email" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "phone" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "address" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "province" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "latitude" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "longitude" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "stats" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "label" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "value" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "helper" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "tone" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "activitySeries" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "key" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "label" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "color" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "points" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "label" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "value" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "equipmentStates" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "label" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "value" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "helper" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "tone" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "recentLogs" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "title" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "subtitle" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "meta" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "href" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "createdAt" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "upcomingBookings" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "title" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "subtitle" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "meta" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "href" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "createdAt" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "nearbyPharmacies" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "title" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "subtitle" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "meta" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "href" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "createdAt" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "alerts" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "title" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "description" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "severity" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pharmacy" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "profile" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "email" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "phone" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "address" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "province" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "latitude" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "longitude" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "stats" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "label" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "value" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "helper" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "tone" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "activitySeries" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "key" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "label" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "color" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "points" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "label" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "value" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "inventoryStatus" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "label" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "value" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "helper" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "tone" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "topDrugs" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "title" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "subtitle" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "meta" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "href" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "createdAt" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lowStockItems" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "title" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "subtitle" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "meta" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "href" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "createdAt" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "recentUpdates" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "title" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "subtitle" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "meta" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "href" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "createdAt" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "alerts" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "title" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "description" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "severity" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DashboardOverviewQuery,
  DashboardOverviewQueryVariables
>;
export const AdminMapLocationsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminMapLocations" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminMapLocations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "hospitals" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address2" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "province" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "opensAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "closesAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "latitude" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "longitude" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "drugstores" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address2" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "province" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "opensAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "closesAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "latitude" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "longitude" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AdminMapLocationsQuery,
  AdminMapLocationsQueryVariables
>;
export const EquipmentCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "EquipmentCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "EquipmentCreateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "equipmentCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  EquipmentCreateMutation,
  EquipmentCreateMutationVariables
>;
export const EquipmentUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "EquipmentUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "equipmentUpdateId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "EquipmentCreateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "equipmentUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "equipmentUpdateId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  EquipmentUpdateMutation,
  EquipmentUpdateMutationVariables
>;
export const EquipmentDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "EquipmentDelete" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "equipmentDeleteId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "equipmentDelete" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "equipmentDeleteId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  EquipmentDeleteMutation,
  EquipmentDeleteMutationVariables
>;
export const EquipmentsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Equipments" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "take" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skip" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "where" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "EquipmentsWhereInput" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "equipments" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "take" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "take" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "skip" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "skip" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "where" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "serialNo" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "brand" } },
                      { kind: "Field", name: { kind: "Name", value: "model" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "manufacturedYear" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "commissionedDate" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endOfLifeDate" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "passportDocument" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "usageManualDocument" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "calibrationInstructionDocument",
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "maintenancePlan" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "requiredParts" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "usedParts" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "sparePartsStock" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "assignedTo" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "email" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "phone" },
                            },
                          ],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "state" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "category" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "hospital" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "email" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "count" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EquipmentsQuery, EquipmentsQueryVariables>;
export const EquipmentDetailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "EquipmentDetail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "equipmentDetailId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "equipmentDetail" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "equipmentDetailId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "serialNo" } },
                { kind: "Field", name: { kind: "Name", value: "brand" } },
                { kind: "Field", name: { kind: "Name", value: "model" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "manufacturedYear" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "commissionedDate" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "endOfLifeDate" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "passportDocument" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "usageManualDocument" },
                },
                {
                  kind: "Field",
                  name: {
                    kind: "Name",
                    value: "calibrationInstructionDocument",
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "maintenancePlan" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "requiredParts" },
                },
                { kind: "Field", name: { kind: "Name", value: "usedParts" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "sparePartsStock" },
                },
                { kind: "Field", name: { kind: "Name", value: "category" } },
                { kind: "Field", name: { kind: "Name", value: "state" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "assignedTo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      { kind: "Field", name: { kind: "Name", value: "phone" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "hospital" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "logs" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "faultDate" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "problem" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "repairAction" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "status" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "performedBy" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "email" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  EquipmentDetailQuery,
  EquipmentDetailQueryVariables
>;
export const HospitalCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "HospitalCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "HospitalCreateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "hospitalCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  HospitalCreateMutation,
  HospitalCreateMutationVariables
>;
export const HospitalUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "HospitalUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "hospitalUpdateId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "HospitalCreateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "hospitalUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "hospitalUpdateId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  HospitalUpdateMutation,
  HospitalUpdateMutationVariables
>;
export const HospitalDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "HospitalDelete" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "hospitalDeleteId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "hospitalDelete" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "hospitalDeleteId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  HospitalDeleteMutation,
  HospitalDeleteMutationVariables
>;
export const HospitalsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Hospitals" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "take" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skip" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "where" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "HospitalsWhereInput" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "hospitals" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "take" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "take" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "skip" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "skip" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "where" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "count" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      { kind: "Field", name: { kind: "Name", value: "phone" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "address1" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "address2" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "province" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<HospitalsQuery, HospitalsQueryVariables>;
export const HospitalDetailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "HospitalDetail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "hospitalDetailId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "hospitalDetail" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "hospitalDetailId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "phone" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "address" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address1" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address2" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "province" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "latitude" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "longitude" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<HospitalDetailQuery, HospitalDetailQueryVariables>;
export const HospitalOptionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "HospitalOption" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "hospitalOption" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<HospitalOptionQuery, HospitalOptionQueryVariables>;
export const DrugCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DrugCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "DrugCreateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "drugCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DrugCreateMutation, DrugCreateMutationVariables>;
export const DrugUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DrugUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "drugUpdateId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "DrugCreateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "drugUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "drugUpdateId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DrugUpdateMutation, DrugUpdateMutationVariables>;
export const DrugDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DrugDelete" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "drugDelete" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DrugDeleteMutation, DrugDeleteMutationVariables>;
export const PharmacyDrugUpsertDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "PharmacyDrugUpsert" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "PharmacyDrugUpsertInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "pharmacyDrugUpsert" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  PharmacyDrugUpsertMutation,
  PharmacyDrugUpsertMutationVariables
>;
export const PharmacyDrugDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "PharmacyDrugDelete" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "drugId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "pharmacyDrugDelete" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "drugId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "drugId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  PharmacyDrugDeleteMutation,
  PharmacyDrugDeleteMutationVariables
>;
export const DrugsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Drugs" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "take" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skip" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "where" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DrugsWhereInput" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "drugs" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "take" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "take" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "skip" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "skip" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "where" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "count" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "genericName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "dosageForm" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "strength" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "manufacturer" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "totalStock" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "startingPrice" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "availabilityCount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DrugsQuery, DrugsQueryVariables>;
export const PharmacyDrugsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PharmacyDrugs" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "take" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skip" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "where" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "PharmacyDrugsWhereInput" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "pharmacyDrugs" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "take" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "take" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "skip" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "skip" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "where" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "count" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "quantity" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "price" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "status" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "drug" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "genericName" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "dosageForm" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "strength" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "manufacturer" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "description" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PharmacyDrugsQuery, PharmacyDrugsQueryVariables>;
export const DrugDetailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "DrugDetail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "drugDetailId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "drugDetail" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "drugDetailId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "genericName" } },
                { kind: "Field", name: { kind: "Name", value: "dosageForm" } },
                { kind: "Field", name: { kind: "Name", value: "strength" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "manufacturer" },
                },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "totalStock" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "startingPrice" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "availabilityCount" },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "availability" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "pharmacyId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "organizationId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "pharmacyName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "pharmacyEmail" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "pharmacyPhone" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "quantity" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "price" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "status" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "address1" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "address2" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "province" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "latitude" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "longitude" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DrugDetailQuery, DrugDetailQueryVariables>;
export const PharmacyCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "PharmacyCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "PharmacyCreateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "pharmacyCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  PharmacyCreateMutation,
  PharmacyCreateMutationVariables
>;
export const PharmacyUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "PharmacyUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pharmacyUpdateId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "PharmacyCreateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "pharmacyUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "pharmacyUpdateId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  PharmacyUpdateMutation,
  PharmacyUpdateMutationVariables
>;
export const PharmacyDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "PharmacyDelete" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pharmacyDeleteId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "pharmacyDelete" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "pharmacyDeleteId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  PharmacyDeleteMutation,
  PharmacyDeleteMutationVariables
>;
export const PharmacyDetailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PharmacyDetail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pharmacyDetailId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "pharmacyDetail" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "pharmacyDetailId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "phone" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "inventoryCount" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "address" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address1" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address2" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "province" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "latitude" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "longitude" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "inventory" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "quantity" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "price" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "status" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "drug" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "genericName" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "dosageForm" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "strength" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "manufacturer" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PharmacyDetailQuery, PharmacyDetailQueryVariables>;
export const UserCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UserCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UserCreateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserCreateMutation, UserCreateMutationVariables>;
export const UserUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UserUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userUpdateId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UserUpdateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userUpdateId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserUpdateMutation, UserUpdateMutationVariables>;
export const MembershipUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "MembershipUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "membershipUpdateId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "MembershipUpdateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "membershipUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "membershipUpdateId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  MembershipUpdateMutation,
  MembershipUpdateMutationVariables
>;
export const MembershipDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "MembershipDelete" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "membershipDeleteId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "membershipDelete" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "membershipDeleteId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  MembershipDeleteMutation,
  MembershipDeleteMutationVariables
>;
export const MembershipsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Memberships" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "take" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skip" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "memberships" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "take" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "take" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "skip" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "skip" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "role" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "user" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "email" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "phone" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "organization" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "type" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "count" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MembershipsQuery, MembershipsQueryVariables>;
export const UserDetailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "UserDetail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userDetailId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userDetail" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userDetailId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "phone" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isPlatformAdmin" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserDetailQuery, UserDetailQueryVariables>;
export const SupplyItemCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SupplyItemCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SupplyItemCreateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "supplyItemCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SupplyItemCreateMutation,
  SupplyItemCreateMutationVariables
>;
export const SupplyItemUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SupplyItemUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SupplyItemUpdateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "supplyItemUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SupplyItemUpdateMutation,
  SupplyItemUpdateMutationVariables
>;
export const SupplyItemDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SupplyItemDelete" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "supplyItemDelete" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SupplyItemDeleteMutation,
  SupplyItemDeleteMutationVariables
>;
export const SupplierCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SupplierCreate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SupplierCreateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "supplierCreate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SupplierCreateMutation,
  SupplierCreateMutationVariables
>;
export const SupplierUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SupplierUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SupplierUpdateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "supplierUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SupplierUpdateMutation,
  SupplierUpdateMutationVariables
>;
export const SupplierDeleteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SupplierDelete" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "supplierDelete" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SupplierDeleteMutation,
  SupplierDeleteMutationVariables
>;
export const SupplyItemsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "SupplyItems" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "take" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skip" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "where" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "SupplyItemsWhereInput" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "supplyItems" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "take" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "take" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "skip" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "skip" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "where" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "count" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "supplierId" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shortDescription" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "category" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "model" } },
                      { kind: "Field", name: { kind: "Name", value: "brand" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "manufacturer" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "price" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "currency" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "availability" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "warranty" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "contactInfo" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "imageUrls" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "documentUrls" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "specifications" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "supplier" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "organizationId" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "description" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "logoUrl" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "email" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "phone" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "website" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "status" },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "categoriesSupplied",
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "supplyItemCount" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "createdAt" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "updatedAt" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "address" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "address1" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "address2" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "province" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "latitude" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "longitude" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SupplyItemsQuery, SupplyItemsQueryVariables>;
export const SupplyItemDetailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "SupplyItemDetail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "supplyItemDetailId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "supplyItemDetail" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "supplyItemDetailId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "supplierId" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "shortDescription" },
                },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "category" } },
                { kind: "Field", name: { kind: "Name", value: "model" } },
                { kind: "Field", name: { kind: "Name", value: "brand" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "manufacturer" },
                },
                { kind: "Field", name: { kind: "Name", value: "price" } },
                { kind: "Field", name: { kind: "Name", value: "currency" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "availability" },
                },
                { kind: "Field", name: { kind: "Name", value: "warranty" } },
                { kind: "Field", name: { kind: "Name", value: "contactInfo" } },
                { kind: "Field", name: { kind: "Name", value: "imageUrls" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "documentUrls" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "specifications" },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "supplier" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "organizationId" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "logoUrl" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      { kind: "Field", name: { kind: "Name", value: "phone" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "website" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "status" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "categoriesSupplied" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "supplyItemCount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "address1" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "address2" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "province" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "latitude" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "longitude" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SupplyItemDetailQuery,
  SupplyItemDetailQueryVariables
>;
export const SuppliersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Suppliers" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "take" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skip" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "where" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "SuppliersWhereInput" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "suppliers" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "take" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "take" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "skip" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "skip" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "where" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "count" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "organizationId" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "logoUrl" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      { kind: "Field", name: { kind: "Name", value: "phone" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "website" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "status" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "categoriesSupplied" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "supplyItemCount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "address1" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "address2" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "province" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "latitude" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "longitude" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SuppliersQuery, SuppliersQueryVariables>;
export const SupplierDetailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "SupplierDetail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "supplierDetailId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "supplierDetail" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "supplierDetailId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "organizationId" },
                },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "logoUrl" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "phone" } },
                { kind: "Field", name: { kind: "Name", value: "website" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "categoriesSupplied" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "supplyItemCount" },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "address" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address1" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address2" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "province" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "latitude" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "longitude" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SupplierDetailQuery, SupplierDetailQueryVariables>;
export const SupplierSupplyItemsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "SupplierSupplyItems" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "supplierId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "take" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skip" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "supplierSupplyItems" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "supplierId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "supplierId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "take" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "take" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "skip" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "skip" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "count" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "supplierId" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "shortDescription" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "category" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "model" } },
                      { kind: "Field", name: { kind: "Name", value: "brand" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "manufacturer" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "price" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "currency" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "availability" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "warranty" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "contactInfo" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "imageUrls" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "documentUrls" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "specifications" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "supplier" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "organizationId" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "description" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "logoUrl" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "email" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "phone" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "website" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "status" },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "categoriesSupplied",
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "supplyItemCount" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "createdAt" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "updatedAt" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "address" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "address1" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "address2" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "province" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "latitude" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "longitude" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SupplierSupplyItemsQuery,
  SupplierSupplyItemsQueryVariables
>;
