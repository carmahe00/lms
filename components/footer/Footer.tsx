"use  client";

import { useState, useEffect } from "react";

import {
  Box,
  Grid,
  Typography,
  IconButton,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";

import {
  Facebook,
  Instagram,
  LinkedIn,
  YouTube,
} from "@mui/icons-material";

import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();

  const isSmallScreen = useMediaQuery("(max-width:600px   ) ");

  const [categorydata, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchcatewithsubcatedata = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.API}/homepage/catewithsubcate`
      );

      const data = await response.json();

      setCategoryData(data || []);
    } catch (error) {
      console.log("error fetching categories with subcategories", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchcatewithsubcatedata();
  }, []);

  const formatteddata = categorydata.reduce((acc:any[], item:any) => {
    const categoryName = item.categoryId.name;
    const categorySlug = item.categoryId.slug;

    const subcategoryName = item.subcategoryId.name;
    const subcategorySlug = item.subcategoryId.slug;

    let category:any | undefined = acc.find((c:any) => c.name === categoryName);

    if (!category) {
      category = {
        name: categoryName,
        slug: categorySlug,
        subcategories: [],
      };

      acc.push(category);
    }

    let subcategory = category.subcategories.find(
      (sc:any) => sc.name === subcategoryName
    );

    if (!subcategory) {
      subcategory = {
        name: subcategoryName,
        slug: subcategorySlug,
      };

      category.subcategories.push(subcategory);
    }

    return acc;
  }, []);

  console.log("formatteddata ", formatteddata);

  return (
    <Box
      sx={{
        bgcolor: "#212121",
        color: "white",
        py: 4,
        px: isSmallScreen ? 2 : 8,
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ color: "green" }}
          >
            BrainBtye
          </Typography>

          <Typography sx={{ mt: 2 }}>
            Corporate & Communications Address B-123 localhost
          </Typography>

          <Box
            sx={{
              mt: 4,
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row",
              gap: 2,
              justifyContent: "start",
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              style={{ maxWidth: "150px", height: "auto" }}
            />

            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              style={{ maxWidth: "150px", height: "auto" }}
            />
          </Box>

          <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
            <IconButton sx={{ color: "white" }}>
              <Facebook />
            </IconButton>
            <IconButton sx={{ color: "white" }}>
              <Instagram />
            </IconButton>
            <IconButton sx={{ color: "white" }}>
              <LinkedIn />
            </IconButton>
            <IconButton sx={{ color: "white" }}>
              <YouTube />
            </IconButton>
          </Box>
        </Grid>

        {loading ? (
          <Grid item xs={12} sx={{ textAlign: "center", mt: 4 }}>
            <CircularProgress sx={{ color: "green" }} />
          </Grid>
        ) : (
          formatteddata.map((section: any, index: number) => (
            <Grid item xs={12} sm={4} md={2} key={section.slug || index}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  display: "block",
                  color: "green",
                  textDecoration: "none",
                  fontSize: isSmallScreen ? "18px" : "20px",
                  fontStyle: "normal",
                  letterSpacing: "0.5px",
                  lineHeight: "1.6",
                  wordSpacing: "1px",
                  cursor: "pointer",
                  "&:hover": { color: "green" },
                  mb: 0.5,
                }}
                onClick={() => router.push(`/content/${section?.slug}`)}
              >
                {section?.name}
              </Typography>

              {section?.subcategories?.map((link: any, linkIndex: number) => (
                <Typography
                  key={link.slug || linkIndex}
                  onClick={() => router.push(`/content/${link.slug}`)}
                  sx={{
                    cursor: "pointer",
                    display: "block",
                    color: "white",
                    textDecoration: "none",
                    fontSize: isSmallScreen ? "16px" : "18px",
                    fontStyle: "normal",
                    "&:hover": { color: "green" },
                    mb: 0.5,
                  }}
                >
                  {link.name}
                </Typography>
              ))}
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Footer;