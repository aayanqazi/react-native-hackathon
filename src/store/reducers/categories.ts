import { createSlice } from "@reduxjs/toolkit";
import { IRootState } from "..";
import { useSelector } from "react-redux";

export const intialCategory = {
  id: Math.floor(Math.random() * 1000),
  name: "",
  items: [] as any[],
  defaultTitle: "",
  defaultFieldId: "",
  fields: [
    {
      id: Date.now(),
      keyName: "",
      type: "text",
      label: "Field",
    },
  ],
};
export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [] as typeof intialCategory[],
  },
  reducers: {
    addCategory: (state) => {
      state.categories = [
        ...state.categories,
        { ...intialCategory, id: Math.floor(Math.random() * 100) },
      ];
    },
    addNewFeild: (state, { payload }) => {
      const cloneCategories = [...state.categories];
      const categoryIndex = cloneCategories?.findIndex(
        (val) => val.id === payload.id
      );
      cloneCategories[categoryIndex].fields = [
        ...cloneCategories[categoryIndex].fields,
        payload.fields,
      ];
      state.categories = cloneCategories;
    },
    removeFeild: (state, { payload }) => {
      const cloneCategories = [...state.categories];
      const categoryIndex = cloneCategories?.findIndex(
        (val) => val.id === payload.categoryId
      );
      const fieldIndex = cloneCategories[categoryIndex].fields?.findIndex(
        (val) => val?.id === payload.fieldsId
      );
      cloneCategories[categoryIndex].fields.splice(fieldIndex, 1);
      state.categories = cloneCategories;
    },
    removeCategory: (state, { payload }) => {
      const categoryIndex = state.categories?.findIndex(
        (val) => val.id === payload.categoryId
      );
      const cloneCategories = [...state.categories];
      cloneCategories.splice(categoryIndex, 1);
      state.categories = cloneCategories;
    },
    updateFields: (state, { payload }) => {
      const cloneCategories = [...state.categories];
      const categoryIndex = cloneCategories?.findIndex(
        (val) => val.id === payload.categoryId
      );
      const fieldIndex = cloneCategories[categoryIndex].fields?.findIndex(
        (val) => val?.id === payload.fieldsId
      );

      cloneCategories[categoryIndex].fields[fieldIndex] = {
        ...cloneCategories[categoryIndex].fields[fieldIndex],
        keyName: payload.value,
      };
      state.categories = cloneCategories;
    },
    updateCategoryName: (state, { payload }) => {
      const cloneCategories = [...state.categories];
      const categoryIndex = cloneCategories?.findIndex(
        (val) => val.id === payload.categoryId
      );
      state.categories[categoryIndex].name = payload.value;
      state.categories = cloneCategories;
    },
    updateTitleField: (state, { payload }) => {
      const cloneCategories = [...state.categories];
      const categoryIndex = cloneCategories?.findIndex(
        (val) => val.id === payload.categoryId
      );
      cloneCategories[categoryIndex].defaultTitle = payload.value;
      cloneCategories[categoryIndex].defaultFieldId = payload.fieldId;

      state.categories = cloneCategories;
    },
  },
});

export const getCategories = () =>
  useSelector((state: IRootState) => state.categories.categories);

export const getCategoryByName = (categoryName: string) => {
  const categories = useSelector(
    (state: IRootState) => state.categories.categories
  );
  return categories?.find((val) => val?.name === categoryName);
};
export default categoriesSlice.reducer;
