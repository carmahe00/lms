"use client";

import { Box } from "@mui/material";

import SideBar from "@/components/sidebar/sideBar";
import SubCategoryManager from "@/components/admin/subcategorymanager/SubCategorymanager";


const CourseCreate = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#1c1c1c",
      }}
    >
      <SideBar />
      <SubCategoryManager />

    </Box>
  );
};
export default CourseCreate;