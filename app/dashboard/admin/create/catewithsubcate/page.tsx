"use client";

import { Box } from "@mui/material";

import CateWithSubCate from "@/components/admin/catewithsubcate/CateWithSubCate"
import SideBar from "@/components/sidebar/sideBar";


const CourseCreate = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#1c1c1c",
      }}
    >
        <SideBar/>
<CateWithSubCate/>
      
    </Box>
  );
};
export default CourseCreate;