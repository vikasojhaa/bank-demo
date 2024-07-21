import PropTypes from "prop-types";
import { useEffect } from "react";
import { useRouter } from "next/router";
// @mui
import { Box, Drawer, Toolbar, Divider } from "@mui/material";
// hooks
import useResponsive from "./useResponsive";
// components
import Scrollbar from "./scrollbar";
import NavSection from "./nav-section";
//
import navConfig from "./config";

// ----------------------------------------------------------------------

const NAV_WIDTH = 220;

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useRouter();

  console.log(pathname);

  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Toolbar />
      <Divider />
      <NavSection data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open={pathname === "/" ? false : true}
          variant={pathname === "/" ? "temporary" : "permanent"}
          // PaperProps={{
          //   sx: {
          //     width: NAV_WIDTH,
          //     bgcolor: "background.default",
          //     borderRightStyle: "hidden",
          //     borderRightColor: "#103996",
          //   },
          // }}
          sx={{
            width: NAV_WIDTH,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: NAV_WIDTH,
              boxSizing: "border-box",
              backgroundColor: "#DCDDDE",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
