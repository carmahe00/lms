"use client"
import { useMediaQuery, useTheme } from "@mui/material";
import { Box, Tabs, Tab } from "@mui/material";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";
const ScrollableTab: React.FC = () => {
    const theme = useTheme();
    const router = useRouter();
    const [value, setValue] = useState(0);
    const [subcategories, setSubcategories] = useState<any[]>([]);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const handleChange = (event: SyntheticEvent<Element, Event>, newValue: any) => {
        setValue(newValue);

        const selectedSlug = subcategories[newValue]?.slug
        if (selectedSlug) {
            router.push(`/content/${selectedSlug.toLowerCase()}`)
        }


    };

    const fetchSubCategories = async () => {
        try {
            const response = await fetch(`${process.env.API}/subcategory`);
            const data = await response.json();

            console.log("data==", data);
            setSubcategories(data);
        } catch (error) {
            console.log("error during fetching", error);
        }
    };

    useEffect(() => {
        fetchSubCategories();
    }, []);
    return (
        <Box
            sx={{
                backgroundColor: "#1c1c1c",
                color: "#fff",
                padding: "10px 0",
            }}
        >

            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label=" scrollable force tabs example"
                sx={{
                    "& .MuiTabs-indicator": {
                        display: "none",
                    },

                    "& .MuiTabs-scrollButtons": {
                        color: "white",
                        "&:hover": {
                            color: "#00ff00",
                        },

                        "& svg": {
                            fontSize: "3rem",
                        },
                    },
                }}
            >
                {subcategories.map((tab, index) => (
                    <Tab
                        key={index}
                        label={tab.name}
                        sx={{
                            textTransform: "none",
                            fontSize: isSmallScreen ? "14px" : "19px",
                            fontWeight: "600",
                            "&.Mui-selected": {
                                color: "#00ff00 !important",
                            },
                            color: value === index ? "#fff" : "#fff",

                            "&:hover": {
                                color: "#00ff00",
                            },
                        }}
                    />
                ))}
            </Tabs>
        </Box>
    )
}

export default ScrollableTab;