import ConstructionIcon from "@mui/icons-material/Construction";
import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from "@mui/icons-material/Home";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import MedicationIcon from "@mui/icons-material/Medication";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import type { Session } from "next-auth";
import type { ElementType } from "react";

import type { Action, Subject } from "@/constants/routes";
import type { UserMembership } from "@/generated/graphql";
import { OrganizationRole, OrganizationType } from "@/generated/graphql";

export type RoleKey =
  | "ADMIN"
  | "HOSPITAL_OWNER"
  | "HOSPITAL_MANAGER"
  | "HOSPITAL_STAFF"
  | "PHARMACY_OWNER"
  | "PHARMACY_MANAGER"
  | "PHARMACY_STAFF"
  | "SUPPLIER_OWNER"
  | "SUPPLIER_MANAGER"
  | "SUPPLIER_STAFF"
  | "USER";

export type SidebarItem = {
  label: string;
  path: string;
  icon: ElementType;
  action: Action;
  subject: Subject;
};

export const resolveRoleKey = (
  session: Session | null,
  activeMembership: UserMembership | null,
): RoleKey => {
  if (session?.user?.isPlatformAdmin) return "ADMIN";
  if (!activeMembership) return "USER";

  const orgType = activeMembership.organization.type;
  const role = activeMembership.role;

  if (orgType === OrganizationType.Hospital) {
    if (role === OrganizationRole.Owner) return "HOSPITAL_OWNER";
    if (role === OrganizationRole.Manager) return "HOSPITAL_MANAGER";
    return "HOSPITAL_STAFF";
  }

  if (orgType === OrganizationType.Pharmacy) {
    if (role === OrganizationRole.Owner) return "PHARMACY_OWNER";
    if (role === OrganizationRole.Manager) return "PHARMACY_MANAGER";
    return "PHARMACY_STAFF";
  }

  if (orgType === OrganizationType.Supplier) {
    if (role === OrganizationRole.Owner) return "SUPPLIER_OWNER";
    if (role === OrganizationRole.Manager) return "SUPPLIER_MANAGER";
    return "SUPPLIER_STAFF";
  }

  return "USER";
};

export const SIDEBARS: Record<RoleKey, SidebarItem[]> = {
  ADMIN: [
    {
      label: "Хяналтын самбар",
      path: "/admin/dashboard",
      icon: HomeIcon,
      action: "read",
      subject: "Admin_Dashboard",
    },
    {
      label: "Эмнэлгүүд",
      path: "/admin/hospital",
      icon: LocalHospitalIcon,
      action: "read",
      subject: "Admin_Hospital",
    },
    {
      label: "Эмийн сангууд",
      path: "/admin/pharmacy",
      icon: LocalPharmacyIcon,
      action: "read",
      subject: "Admin_Pharmacy",
    },
    {
      label: "Эмүүд",
      path: "/admin/medicine",
      icon: MedicationIcon,
      action: "read",
      subject: "Admin_Medicine",
    },
    {
      label: "Тоног төхөөрөмж",
      path: "/admin/equipment",
      icon: ConstructionIcon,
      action: "read",
      subject: "Admin_Equipment",
    },
    {
      label: "Ажилчид",
      path: "/admin/staff",
      icon: PeopleIcon,
      action: "read",
      subject: "Admin_Staff",
    },
    {
      label: "Бүртгэлүүд",
      path: "/admin/log",
      icon: HistoryIcon,
      action: "read",
      subject: "Admin_EquipmentLog",
    },
    {
      label: "Хангамжийн удирдлага",
      path: "/admin/supply-management",
      icon: ConstructionIcon,
      action: "read",
      subject: "Supply_Management",
    },
    {
      label: "Нийлүүлэгчийн удирдлага",
      path: "/admin/supplier-management",
      icon: LocalPharmacyIcon,
      action: "read",
      subject: "Supplier_Management",
    },
  ],
  HOSPITAL_OWNER: [
    {
      label: "Хяналтын самбар",
      path: "/hospital/dashboard",
      icon: HomeIcon,
      action: "read",
      subject: "Hospital_Dashboard",
    },
    {
      label: "Ажилчид",
      path: "/hospital/staff",
      icon: PeopleIcon,
      action: "read",
      subject: "Hospital_Staff",
    },
    {
      label: "Тоног төхөөрөмж",
      path: "/hospital/equipment",
      icon: ConstructionIcon,
      action: "read",
      subject: "Hospital_Equipment",
    },
    {
      label: "Бүртгэлүүд",
      path: "/hospital/log",
      icon: HistoryIcon,
      action: "read",
      subject: "Hospital_EquipmentLog",
    },
    {
      label: "Хангамж",
      path: "/hospital/supply",
      icon: LocalPharmacyIcon,
      action: "read",
      subject: "Supply_Marketplace",
    },
  ],
  HOSPITAL_MANAGER: [
    {
      label: "Хяналтын самбар",
      path: "/hospital/dashboard",
      icon: HomeIcon,
      action: "read",
      subject: "Hospital_Dashboard",
    },
    {
      label: "Тоног төхөөрөмж",
      path: "/hospital/equipment",
      icon: ConstructionIcon,
      action: "read",
      subject: "Hospital_Equipment",
    },
    {
      label: "Бүртгэлүүд",
      path: "/hospital/log",
      icon: HistoryIcon,
      action: "read",
      subject: "Hospital_EquipmentLog",
    },
    {
      label: "Хангамж",
      path: "/hospital/supply",
      icon: LocalPharmacyIcon,
      action: "read",
      subject: "Supply_Marketplace",
    },
  ],
  HOSPITAL_STAFF: [
    {
      label: "Тоног төхөөрөмж",
      path: "/hospital/equipment",
      icon: ConstructionIcon,
      action: "read",
      subject: "Hospital_Equipment",
    },
    {
      label: "Бүртгэлүүд",
      path: "/hospital/log",
      icon: HistoryIcon,
      action: "read",
      subject: "Hospital_EquipmentLog",
    },
    {
      label: "Хангамж",
      path: "/hospital/supply",
      icon: LocalPharmacyIcon,
      action: "read",
      subject: "Supply_Marketplace",
    },
  ],
  PHARMACY_OWNER: [
    {
      label: "Хяналтын самбар",
      path: "/pharmacy/dashboard",
      icon: HomeIcon,
      action: "read",
      subject: "Pharmacy_Dashboard",
    },
    {
      label: "Ажилчид",
      path: "/pharmacy/staff",
      icon: PeopleIcon,
      action: "read",
      subject: "Pharmacy_Staff",
    },
    {
      label: "Эмүүд",
      path: "/pharmacy/medicine",
      icon: MedicationIcon,
      action: "read",
      subject: "Pharmacy_Medicine",
    },
    {
      label: "Тоног төхөөрөмж",
      path: "/pharmacy/equipment",
      icon: ConstructionIcon,
      action: "read",
      subject: "Pharmacy_Equipment",
    },
    {
      label: "Бүртгэлүүд",
      path: "/pharmacy/log",
      icon: HistoryIcon,
      action: "read",
      subject: "Pharmacy_EquipmentLog",
    },
    {
      label: "Хангамж",
      path: "/pharmacy/supply",
      icon: LocalPharmacyIcon,
      action: "read",
      subject: "Supply_Marketplace",
    },
  ],
  PHARMACY_MANAGER: [
    {
      label: "Хяналтын самбар",
      path: "/pharmacy/dashboard",
      icon: HomeIcon,
      action: "read",
      subject: "Pharmacy_Dashboard",
    },
    {
      label: "Эмүүд",
      path: "/pharmacy/medicine",
      icon: MedicationIcon,
      action: "read",
      subject: "Pharmacy_Medicine",
    },
    {
      label: "Тоног төхөөрөмж",
      path: "/pharmacy/equipment",
      icon: ConstructionIcon,
      action: "read",
      subject: "Pharmacy_Equipment",
    },
    {
      label: "Бүртгэлүүд",
      path: "/pharmacy/log",
      icon: HistoryIcon,
      action: "read",
      subject: "Pharmacy_EquipmentLog",
    },
    {
      label: "Хангамж",
      path: "/pharmacy/supply",
      icon: LocalPharmacyIcon,
      action: "read",
      subject: "Supply_Marketplace",
    },
  ],
  PHARMACY_STAFF: [
    {
      label: "Эмүүд",
      path: "/pharmacy/medicine",
      icon: MedicationIcon,
      action: "read",
      subject: "Pharmacy_Medicine",
    },
    {
      label: "Тоног төхөөрөмж",
      path: "/pharmacy/equipment",
      icon: ConstructionIcon,
      action: "read",
      subject: "Pharmacy_Equipment",
    },
    {
      label: "Хангамж",
      path: "/pharmacy/supply",
      icon: LocalPharmacyIcon,
      action: "read",
      subject: "Supply_Marketplace",
    },
  ],
  SUPPLIER_OWNER: [
    {
      label: "Хангамж",
      path: "/supplier/supply",
      icon: LocalPharmacyIcon,
      action: "read",
      subject: "Supply_Marketplace",
    },
    {
      label: "Миний тоног төхөөрөмж",
      path: "/supplier/supply-management",
      icon: ConstructionIcon,
      action: "read",
      subject: "Supply_Management",
    },
    {
      label: "Миний нийлүүлэгч",
      path: "/supplier/supplier-management",
      icon: LocalPharmacyIcon,
      action: "read",
      subject: "Supplier_Management",
    },
  ],
  SUPPLIER_MANAGER: [
    {
      label: "Хангамж",
      path: "/supplier/supply",
      icon: LocalPharmacyIcon,
      action: "read",
      subject: "Supply_Marketplace",
    },
    {
      label: "Миний тоног төхөөрөмж",
      path: "/supplier/supply-management",
      icon: ConstructionIcon,
      action: "read",
      subject: "Supply_Management",
    },
    {
      label: "Миний нийлүүлэгч",
      path: "/supplier/supplier-management",
      icon: LocalPharmacyIcon,
      action: "read",
      subject: "Supplier_Management",
    },
  ],
  SUPPLIER_STAFF: [
    {
      label: "Хангамж",
      path: "/supplier/supply",
      icon: LocalPharmacyIcon,
      action: "read",
      subject: "Supply_Marketplace",
    },
  ],
  USER: [
    {
      label: "Хяналтын самбар",
      path: "/user/dashboard",
      icon: HomeIcon,
      action: "read",
      subject: "User_Dashboard",
    },
    {
      label: "Эмнэлгүүд",
      path: "/user/hospital",
      icon: LocalHospitalIcon,
      action: "read",
      subject: "User_Hospital",
    },
    {
      label: "Эмийн сангууд",
      path: "/user/pharmacy",
      icon: LocalPharmacyIcon,
      action: "read",
      subject: "User_Pharmacy",
    },
    {
      label: "Эмүүд",
      path: "/user/medicine",
      icon: MedicationIcon,
      action: "read",
      subject: "User_Medicine",
    },
    {
      label: "Профайл",
      path: "/profile",
      icon: PersonIcon,
      action: "read",
      subject: "Profile",
    },
  ],
};
