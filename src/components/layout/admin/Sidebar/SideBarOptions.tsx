import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import MedicationIcon from "@mui/icons-material/Medication";
import PeopleIcon from "@mui/icons-material/People";
import type { Session } from "next-auth";

import { Routes } from "@/constants/routes";
import type { Subject } from "@/constants/routes";
import type { UserMembership } from "@/generated/graphql";
import { defineAbilityFor } from "@/lib/casl";

const iconMap: Record<string, React.ReactNode> = {
  "Хяналтын самбар": <HomeIcon />,
  Ажилчид: <PeopleIcon />,
  "Тоног төхөөрөмж": <MedicalServicesIcon />,
  Бүртгэлүүд: <HistoryIcon />,
  "Миний бүртгэлүүд": <HistoryIcon />,
  "Эмийн сангууд": <MedicalServicesIcon />,
  Эмүүд: <MedicationIcon />,
  Гарах: <LogoutIcon />,
};

const sidebarTextBySubject: Partial<Record<Subject, string>> = {
  Admin_Dashboard: "Хяналтын самбар",
  Hospital_Dashboard: "Хяналтын самбар",
  Pharmacy_Dashboard: "Хяналтын самбар",
  Supplier_Dashboard: "Хяналтын самбар",
  User_Dashboard: "Хяналтын самбар",
  Admin_Hospital: "Эмнэлгүүд",
  User_Hospital: "Эмнэлгүүд",
  Admin_Pharmacy: "Эмийн сангууд",
  User_Pharmacy: "Эмийн сангууд",
  Admin_Medicine: "Эмүүд",
  Pharmacy_Medicine: "Эмүүд",
  User_Medicine: "Эмүүд",
  Admin_Staff: "Ажилчид",
  Hospital_Staff: "Ажилчид",
  Pharmacy_Staff: "Ажилчид",
  Admin_Equipment: "Тоног төхөөрөмж",
  Hospital_Equipment: "Тоног төхөөрөмж",
  Pharmacy_Equipment: "Тоног төхөөрөмж",
  User_Equipment: "Тоног төхөөрөмж",
  Admin_EquipmentLog: "Бүртгэлүүд",
  Hospital_EquipmentLog: "Бүртгэлүүд",
  Pharmacy_EquipmentLog: "Бүртгэлүүд",
  User_EquipmentLog: "Бүртгэлүүд",
  Supply_Marketplace: "Хангамж",
  Supply_Management: "Хангамжийн удирдлага",
  Supplier_Management: "Нийлүүлэгчийн удирдлага",
  Profile: "Профайл",
};

export type SidebarItem = {
  text: string;
  path: string;
  icon: React.ReactNode;
};

export const getSidebarOptions = (
  session: Session | null,
  activeMembership: UserMembership | null = null,
): SidebarItem[] => {
  const ability = defineAbilityFor(session?.user ?? null, activeMembership);
  const items: SidebarItem[] = [];

  Object.values(Routes).forEach((route) => {
    const index = route.Index;
    if (!index) return;

    if (!ability.can(index.action, index.subject)) return;

    const text = sidebarTextBySubject[index.subject] ?? index.title;

    items.push({
      text,
      path: index.route,
      icon: iconMap[text] ?? <HomeIcon />,
    });
  });

  return items;
};
