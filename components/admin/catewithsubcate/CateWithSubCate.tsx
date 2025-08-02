import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";

import styles from "./ItemManagerStyles";

import { fetchCategories } from "@/slice/categorySlice";

import { fetchSubCategories, SubCategory } from "@/slice/subcategorySlice";

import {
  saveItem,
  setEditingItem,
  resetEditingItem,
  fetchItems,
  deleteItem,
} from "@/slice/catewithsubcateSlice";
import { Delete, Edit, Search } from "@mui/icons-material";
import { AppDispatch, RootState } from "@/app/store";
const ItemManager = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { items, editingItem, loading } = useSelector((state: RootState) => state.items);
  const { list: categories } = useSelector((state: RootState) => state.categories);

  const { list: subcategories } = useSelector((state: RootState) => state.subcategories);

  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>();
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");


  const [filteredItems, setFilteredItems] = useState(items)
  console.log("editingItem***", editingItem);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
    dispatch(fetchItems());
  }, [dispatch]);

  useEffect(() => {
    if (editingItem && editingItem.categoryId?._id) {
      setSelectedCategory(editingItem.categoryId?._id);
      setSelectedSubcategory(editingItem.subcategoryId?._id);
      setTitle(editingItem?.title);
      setSubTitle(editingItem?.subtitle);
    } else {
      resetForm();
    }
  }, [editingItem]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = items && items.filter((item) =>
        `${item.title} ${item.subtitle} 
  ${item.categoryId.name}
  ${item.subcategoryId.name}
  
  `
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );


      setFilteredItems(filtered)
    } else {
      setFilteredItems(items);
    }
  }, [searchQuery, items]);


  const handleSaveItem = () => {
    const item = {
      categoryId: selectedCategory,
      subcategoryId: selectedSubcategory,
      title,
      subtitle,
    };
    if (item)
      dispatch(saveItem(item)).then(() => {
        dispatch(fetchItems());
        resetForm();
      });
  };

  const resetForm = () => {
    setSelectedCategory("");
    setSelectedSubcategory("");
    setTitle("");
    setSubTitle("");
    dispatch(resetEditingItem());
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory("");
  };

  const handleSubCategoryChange = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
  };

  const handleDeleteItem = (id: string) => {
    dispatch(deleteItem(id)).then(() => dispatch(fetchItems()));
  };

  return (
    <Box p={3} maxWidth="900px" mx="auto">
      <Typography variant="h4" gutterBottom>
        Category With Subcategory
      </Typography>
      <TextField
        label=" Search by Title, SubTitle,Category, SubCategory"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={styles.searchField}
        slotProps={{
          inputLabel: {
            style: { color: '#8A12FC' },
          },
        }}
      />

      <Box display="flex" flexDirection="column" gap={2} mb={3}>
        <FormControl fullWidth sx={styles.formControl}>
          <InputLabel>Category</InputLabel>
          {categories.length > 0 && (
            <Select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              sx={styles.selectField}
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          )}
        </FormControl>

        <FormControl fullWidth sx={styles.formControl}>
          <InputLabel> SubCategory</InputLabel>
          {
            subcategories.length > 0 && (
              <Select
                value={selectedSubcategory}
                onChange={(e) => handleSubCategoryChange(e.target.value)}
                sx={styles.selectField}
                disabled={!selectedCategory}
              >
                {subcategories.map((subcategory) => (
                  <MenuItem key={subcategory._id} value={subcategory._id}>
                    {subcategory.name}
                  </MenuItem>
                ))}
              </Select>
            )
          }
        </FormControl>

        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={styles.textField}
          slotProps={{
            inputLabel: {
              style: { color: '#8A12FC' },
            },
          }}
        />

        <TextField
          label="Sub Title"
          value={subtitle}
          onChange={(e) => setSubTitle(e.target.value)}
          sx={styles.textField}
          slotProps={{
            inputLabel: {
              style: { color: '#8A12FC' },
            },
          }}
        />

        <Button
          variant="contained"
          onClick={handleSaveItem}
          disabled={!selectedCategory || !selectedSubcategory}
        >
          {editingItem ? "Update" : "Add"}
        </Button>
      </Box>

      <List>
        {loading ? (
          <Typography>Loading ....</Typography>
        ) : (
          items &&
          filteredItems.map((item) => (
            <ListItem
              key={item._id}
              divider
              sx={{
                borderColor: "#8A12FC",
                padding: 1,
                "&:hover": {
                  backgroundColor: "#8A12FC",
                },
                transition: "all 0.3s ease",
              }}
            >
              <ListItemText
                primary={item?.title}
                secondary={
                  <>
                    <span
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontSize: "1rem",
                        color: "white",
                      }}
                    >
                      <strong>Category</strong>
                      {"  "}
                      {"  "}
                      {"  "}
                      {item?.categoryId?.name}
                    </span>

                    <span
                      style={{
                        fontSize: "1rem",
                        color: "white",
                      }}
                    >
                      {"  "} <strong>SubCategory</strong>
                      {"  "}
                      {item?.subcategoryId?.name}
                    </span>
                  </>
                }
                slotProps={{
                  primary: {
                    variant: "h6",
                    color: "white",
                  }
                }}
              />

              <IconButton
                edge="end"
                sx={{
                  color: "green",
                  "&: hover": {
                    backgroundColor: "rgba(0,255,0,0.1)",
                  },
                }}
                onClick={() => dispatch(setEditingItem(item))}
              >
                <Edit />
              </IconButton>

              <IconButton
                edge="end"
                sx={{
                  color: "red",
                  "&: hover": {
                    backgroundColor: "rgba(0,255,0,0.1)",
                  },
                }}
                onClick={() => handleDeleteItem(item._id)}
              >
                <Delete />
              </IconButton>
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
};

export default ItemManager;