"use client";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import AbilityGuard from "@/components/AbilityGuard";
import { resolveRoleKey, SIDEBARS } from "@/config/sidebars";
import type { Subject } from "@/constants/routes";
import { useActiveOrganization } from "@/hooks/useActiveOrganization";

type Props = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const sidebarLabelBySubject: Partial<Record<Subject, string>> = {
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

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: Props) {
  const theme = useTheme();
  const pathname = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data: session } = useSession();
  const { activeOrganization } = useActiveOrganization();
  const router = useRouter();

  const roleKey = resolveRoleKey(session ?? null, activeOrganization ?? null);
  const sidebarItems = SIDEBARS[roleKey] ?? [];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };
  const content = (
    <Box
      sx={{
        width: collapsed ? 100 : 300,
        bgcolor: "background.paper",
        height: "100vh",
        borderRight: `1px solid ${theme.palette.divider}`,
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1200,
        transition: "width 0.3s ease",
      }}
    >
      <Box
        sx={{
          bgcolor: "transparent",
          borderRadius: 0,
          "&:hover": {
            bgcolor: theme.palette.action.hover,
          },
          borderBottom: `1px solid ${theme.palette.divider}`,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          width: "100%",
          height: 80,
        }}
      >
        {!collapsed && (
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1.2rem",
              ml: 1,
              transition: "opacity 0.3s",
            }}
          >
            Medistock
          </Typography>
        )}
        <IconButton disableRipple onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>

      <List sx={{ flexGrow: 1, paddingTop: 0, paddingBottom: 0 }}>
        {sidebarItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;
          const label = sidebarLabelBySubject[item.subject] ?? item.label;
          return (
            <AbilityGuard
              key={item.path}
              action={item.action}
              subject={item.subject}
              fallback={null}
            >
              <Tooltip title={collapsed ? label : ""} placement="right">
                <ListItem
                  onClick={() => {
                    router.push(item.path);
                    if (isMobile) setMobileOpen(false);
                  }}
                  sx={{
                    px: collapsed ? 0 : 2,
                    py: 2,
                    justifyContent: collapsed ? "center" : "flex-start",
                    transition: "all 0.3s ease",
                    borderRadius: 0,
                    "&:hover": {
                      bgcolor: "primary.100",
                      ".dark &": {
                        bgcolor: "primary.800",
                      },
                    },

                    ...(active && {
                      bgcolor: "primary.50",
                      ".dark &": {
                        bgcolor: "primary.900",
                        "&:hover": { bgcolor: "primary.800" },
                      },
                    }),
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: collapsed ? "center" : "flex-start",
                      mr: collapsed ? 0 : 2,
                      "& svg": {
                        fontSize: "32px",
                      },
                    }}
                    className="text-primary dark:text-white"
                  >
                    <Icon />
                  </ListItemIcon>
                  {!collapsed && <ListItemText primary={label} />}
                </ListItem>
              </Tooltip>
            </AbilityGuard>
          );
        })}
      </List>

      <Box
        sx={{
          borderTop: `1px solid ${theme.palette.divider}`,
          bgcolor: "background.default",
        }}
      >
        <Tooltip title={collapsed ? "Гарах" : ""} placement="right">
          <ListItem
            onClick={() => {
              window.location.href = "/api/auth/signout";
            }}
            sx={{
              px: collapsed ? 0 : 2,
              py: 2,
              justifyContent: collapsed ? "center" : "flex-start",
              transition: "all 0.3s ease",
              borderRadius: 0,
              "&:hover": {
                bgcolor: "error.100",

                ".dark &": {
                  bgcolor: "error.900",
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: collapsed ? "center" : "flex-start",
                mr: collapsed ? 0 : 2,
                "& svg": {
                  fontSize: "32px",
                },
                color: "error.main",
              }}
            >
              <LogoutIcon />
            </ListItemIcon>

            {!collapsed && (
              <ListItemText
                primary="Гарах"
                sx={{
                  color: "error.main",
                }}
              />
            )}
          </ListItem>
        </Tooltip>
      </Box>
    </Box>
  );

  return isMobile ? (
    <Drawer
      anchor="left"
      open={mobileOpen}
      onClose={() => setMobileOpen(false)}
      ModalProps={{ keepMounted: true }}
      sx={{
        "& .MuiDrawer-paper": {
          width: 280,
          boxSizing: "border-box",
        },
      }}
    >
      {content}
    </Drawer>
  ) : (
    <Box sx={{ position: "fixed", top: 0, left: 0, height: "100vh" }}>
      {content}
    </Box>
  );
}
