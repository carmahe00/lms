"use client"

import SideBar from "@/components/sidebar/sideBar";
import { Typography } from "@mui/material";

const Home: React.FC = () => {
    return (
        <>
        <div
            style={{
                textAlign: "center",
                margin: "30px 0"
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    fontWeight: "bold",
                    fontSize: "2.5rem",
                    letterSpacing: "1px",
                    lineHeight: "1.4",
                    textTransform: "uppercase",
                    textShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)",
                    backgroundImage: "linear-gradient(45deg, #FF6F61, #FF8C00)",
                    backgroundClip: "text",
                    color: "transparent",
                    display: "inline-block",
                }}
            >
Admin Dashboard
            </Typography>
        </div>
        <SideBar />
        </>
    )
}


export default Home;