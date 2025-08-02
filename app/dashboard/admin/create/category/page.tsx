"use client";

import CategoryManager from "@/components/admin/categorymanager/categoryManager";
import SideBar from "@/components/sidebar/sideBar";
import { Box } from "@mui/material";




const Category: React.FC = () => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#1c1c1c",
            }}
        >
            <SideBar />
            <CategoryManager />

        </Box>
    )
}

export default Category;