"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
} from "@mui/material";
import { Delete, Edit, Search } from "@mui/icons-material";
import categoryManagerStyles from "./categoryManagerStyles";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, Category, deleteCategory, fetchCategories, updatedCategory } from "@/slice/categorySlice";
import { AppDispatch, RootState } from "@/app/store";


const CategoryManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [newCategory, setNewCategory] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<
    {
      id?: string;
      name: string;
    }>({ id: "", name: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const { list: categories, loading } = useSelector((state: RootState) => state.categories);
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  useEffect(() => {
    setFilteredCategories(categories)
  }, [categories]);
  const handleSaveCategory = () => {
    if (editing.id) {
      dispatch(updatedCategory({
        id: editing.id,
        name: editing.name
      }))
    } else {
      dispatch(addCategory(newCategory));
    }
    setEditing({ id: undefined, name: "" });
    setNewCategory("");
  };

  const handleDeleteCategory = (id: string) => {
    dispatch(deleteCategory(id));
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term === '') {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter((cat) =>
        cat.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  };
  return (<Box sx={categoryManagerStyles.container}>
    <Typography variant="h4" gutterBottom>
      Category Manager
    </Typography>
    <Box display="flex" gap={2} mb={3}>
      <TextField
        label="Search Categories"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search
                  style={{ color: '#8A12FC' }}

                />
              </InputAdornment>
            ),
          },
          inputLabel: {
            style: { color: '#8A12FC' },
          },
        }}
        sx={categoryManagerStyles.searchField}
      />
    </Box>
    <Box display="flex" gap={2} mb={3}>
      <TextField
        label={editing.id ? "Edit Category" : "Add Category"}
        variant="outlined"
        fullWidth
        value={editing.id ? editing.name : newCategory}
        onChange={(e) =>
          editing.id
            ? setEditing({ ...editing, name: e.target.value })
            : setNewCategory(e.target.value)
        }
        slotProps={{
          inputLabel: {
            style: categoryManagerStyles.inputLabel
          }
        }}
        sx={categoryManagerStyles.categoryField}
      />
      <Button
        variant="contained"
        onClick={handleSaveCategory}
        disabled={!newCategory.trim() && !editing.name.trim()}
      >
        {editing.id ? "update " : "Add"}
      </Button>
    </Box>
    <List>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (

        filteredCategories?.map((category) => (
          <ListItem
            key={category?._id}
            sx={categoryManagerStyles.listItem}
            divider
          >
            <ListItemText primary={category?.name} />
            <IconButton
              edge="end"
              onClick={() => setEditing({ id: category._id, name: category.name })}
            >
              <Edit style={{ color: "green" }} />
            </IconButton>

            <IconButton
              edge="end"
              color="error"
              onClick={() => category._id && handleDeleteCategory(category._id)}
            >
              <Delete />
            </IconButton>
          </ListItem>
        ))
      )}
    </List>
  </Box>)
}

export default CategoryManager;