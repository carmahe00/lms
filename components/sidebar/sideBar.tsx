import React, { useState } from "react";
import {
    AppBar,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    IconButton,
    Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import BarChartIcon from "@mui/icons-material/BarChart";
import BuildIcon from "@mui/icons-material/Build";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { signOut } from "next-auth/react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import CategoryIcon from "@mui/icons-material/Category";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import AlignVerticalCenterIcon from "@mui/icons-material/AlignVerticalCenter";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MoneyIcon from "@mui/icons-material/Money";
import { appBarStyles, drawerMobileStyles, drawerStyles, listItemIconStyles, listItemStyles, listItemTextStyles, logoutIconStyles, mainContentStyles } from "./sidebarStyles";
import { useRouter } from "next/navigation";

const SideBar: React.FC = () => {
    const router = useRouter();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const menuItems = [
        {
            text: "Dashboard",
            icon: <HomeIcon sx={{ fontSize: "32px" }} />,
            link: "/dashboard/admin",
        },
        {
            text: "Create Content & Courses",
            icon: <ChatIcon sx={{ fontSize: "32px" }} />,
            link: "/dashboard/admin/content/create",
        },
        {
            text: "Courses",
            icon: <BarChartIcon sx={{ fontSize: "32px" }} />,
            link: "/dashboard/admin/create/course",
        },
        {
            text: "Tutorials",
            icon: <BuildIcon sx={{ fontSize: "32px" }} />,
            link: "/dashboard/admin/create/content",
        },
        {
            text: "Home",
            icon: <LiveHelpIcon sx={{ fontSize: "32px" }} />,
            link: "/",
        },
        {
            text: "Create Category",
            icon: <CategoryIcon sx={{ fontSize: "32px" }} />,
            link: "/dashboard/admin/create/category",
        },

        {
            text: "Create SubCategory",
            icon: <AcUnitIcon sx={{ fontSize: "32px" }} />,
            link: "/dashboard/admin/create/subcategory",
        },
        {
            text: "Create Category With SubCategory",
            icon: <AlignVerticalCenterIcon sx={{ fontSize: "32px" }} />,
            link: "/dashboard/admin/create/catewithsubcate",
        },

        {
            text: "All User",
            icon: <ManageAccountsIcon sx={{ fontSize: "32px" }} />,
            link: "/dashboard/admin/alluser",
        },

        {
            text: "Pricing",
            icon: <MoneyIcon sx={{ fontSize: "32px" }} />,
            link: "/pricing",
        },
    ];
    return (
    <Box sx={{ display: "flex" }}>
      {!isSmallScreen && (
        <Drawer
          variant="permanent"
          sx={drawerStyles(isHovered)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                key={index}
                sx={listItemStyles(isHovered)}
                onClick={() => router.push(item.link)}
              >
                <ListItemIcon sx={listItemIconStyles(isHovered)}>
                  {item.icon}
                </ListItemIcon>

                {isHovered && (
                  <ListItemText primary={item.text} sx={listItemTextStyles} />
                )}
              </ListItem>
            ))}

            <ListItem
              sx={listItemStyles(isHovered)}
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <ListItemIcon sx={listItemIconStyles(isHovered)}>
                <ExitToAppIcon sx={logoutIconStyles} />
              </ListItemIcon>

              {isHovered && (
                <ListItemText primary="Logout" sx={listItemTextStyles} />
              )}
            </ListItem>
          </List>
        </Drawer>
      )}

      {isSmallScreen && (
        <AppBar position="fixed" sx={appBarStyles}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      {/* mobile sidebar */}

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={drawerMobileStyles}
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              sx={listItemStyles(isHovered)}
              onClick={() => router.push(item.link)}
            >
              <ListItemIcon sx={listItemIconStyles(isHovered)}>
                {item.icon}
              </ListItemIcon>

              <ListItemText primary={item.text} sx={listItemTextStyles} />
            </ListItem>
          ))}

          <ListItem
            sx={listItemStyles(isHovered)}
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <ListItemIcon sx={listItemIconStyles(isHovered)}>
              <ExitToAppIcon sx={logoutIconStyles} />
            </ListItemIcon>

            {isHovered && (
              <ListItemText primary="Logout" sx={listItemTextStyles} />
            )}
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={mainContentStyles}>
        <Toolbar />
        
      </Box>
    </Box>
  );

}

export default SideBar;