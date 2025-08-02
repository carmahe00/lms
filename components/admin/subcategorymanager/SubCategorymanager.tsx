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

import subcategoryManagerStyles from "./subcategoryManagerStyles";
import {
  addSubCategory,
  updateSubCategory,
  fetchSubCategories,
  deleteSubCategory,
  SubCategory,
} from "@/slice/subcategorySlice";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";

const SubCategoryManager = () => {
  const { list: subcategories, loading } = useSelector(
    (state: RootState) => state.subcategories
  );

  const dispatch = useDispatch<AppDispatch>();
  const [newSubCategory, setNewSubCategory] = useState("");

  const [editing, setEditing] = useState<
  {
      id?: string;
      name: string;
    }
  >({ id: undefined, name: "" });
  const [filteredsubCategories, setFilteredsubCategories] = useState<SubCategory[]>([]);


  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchSubCategories());
  }, []);


  useEffect(() => {
    setFilteredsubCategories(subcategories);
  }, [subcategories]);


  const handleSaveSubCategory = () => {
    if (editing.id) {
      dispatch(updateSubCategory({ id: editing.id, name: editing.name, _id: editing.id }));
    } else {
      dispatch(addSubCategory(newSubCategory));
    }

    setEditing({ id: undefined, name: "" });

    setNewSubCategory("");
  };

  const handleDeletesubCategory = (id:string) => {
    dispatch(deleteSubCategory(id));
  };

  const handleSearch = (term:string) => {
    setSearchTerm(term);
    if (term === '') {
      setFilteredsubCategories(subcategories);
    } else {
      const filtered = subcategories.filter((cat) =>
        cat.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredsubCategories(filtered);
    }
  };

  return (
    <Box sx={subcategoryManagerStyles.container}>
      <Typography variant="h4" gutterBottom>
        SubCategory Manager
      </Typography>


      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Search subCategories"
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
          
          sx={
            subcategoryManagerStyles.searchField

          }
        />
      </Box>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          label={editing.id ? "Edit SubCategory" : "Add SubCategory"}
          variant="outlined"
          fullWidth
          value={editing.id ? editing.name : newSubCategory}
          onChange={(e) =>
            editing.id
              ? setEditing({ ...editing, name: e.target.value })
              : setNewSubCategory(e.target.value)
          }
          slotProps={{
            inputLabel: {
              style: subcategoryManagerStyles.inputLabel,
            },
          }}
          sx={subcategoryManagerStyles.categoryField}
        />

        <Button
          variant="contained"
          onClick={handleSaveSubCategory}
          sx={subcategoryManagerStyles.button}
          disabled={!newSubCategory.trim() && !editing.name.trim()}
        >
          {editing.id ? "Update" : "Add"}
        </Button>
      </Box>

      <List>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          filteredsubCategories?.map((subcategory, index) => (
            <ListItem
              key={index}
              sx={subcategoryManagerStyles.listItem}
              divider
            >
              <ListItemText primary={subcategory?.name} />
              <IconButton
                edge="end"
                onClick={() =>
                  setEditing({ id: subcategory?._id, name: subcategory?.name })
                }
              >
                <Edit style={{ color: "green" }} />
              </IconButton>

              <IconButton
                edge="end"
                color="error"
                onClick={() => handleDeletesubCategory(subcategory?._id)}
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

export default SubCategoryManager;