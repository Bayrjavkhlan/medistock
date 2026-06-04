import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";

import Profile from "@/components/core/Profile";
import { useActiveOrganization } from "@/hooks/useActiveOrganization";
import { usePageTitle } from "@/utils/getPageTitle";

type HeaderProps = {
  collapsed: boolean;
  isMobileOpen: boolean;
  setCollapsed?: (val: boolean) => void;
  setMobileOpen?: (val: boolean) => void;
};

// const roleLabelMap = {
//   OWNER: "Эзэмшигч",
//   MANAGER: "Менежер",
//   STAFF: "Ажилтан",
// } as const;

export default function Header({
  collapsed,
  isMobileOpen,
  setMobileOpen,
}: HeaderProps) {
  const theme = useTheme();
  const sidebarWidth = collapsed ? 100 : 300;

  const { data: session } = useSession();
  const { activeOrganization } = useActiveOrganization();
  const pageTitle = usePageTitle();

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        left: { xs: 0, sm: `${sidebarWidth}px` },
        width: { xs: "100%", sm: `calc(100% - ${sidebarWidth}px)` },
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        transition: "all 0.3s ease",
        zIndex: theme.zIndex.drawer + 1,
        height: 80,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "80px !important",
          gap: 2,
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 2, minWidth: 0 }}
        >
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen && setMobileOpen(!isMobileOpen)}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon sx={{ fontSize: "32px" }} />
          </IconButton>

          <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
            {pageTitle}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {/* {memberships.length > 0 && (
            <FormControl size="small" sx={{ minWidth: { xs: 150, sm: 220 } }}>
              <Select
                value={activeOrganization?.organization.id ?? ""}
                displayEmpty
                onChange={(event) => {
                  const value = event.target.value as string;
                  if (value) {
                    void setActiveOrganization(value);
                  }
                }}
              >
                {memberships.map((membership) => (
                  <MenuItem
                    key={membership.organization.id}
                    value={membership.organization.id}
                  >
                    {membership.organization.name} •{" "}
                    {roleLabelMap[membership.role] ?? membership.role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )} */}
          <Profile
            username={session?.user?.name ?? undefined}
            role={activeOrganization?.role}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
