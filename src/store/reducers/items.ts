import { createSlice } from "@reduxjs/toolkit";
import { IRootState } from "..";
import { useSelector } from "react-redux";

export const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [] as any,
  },
  reducers: {
    addItem: (state, { payload }) => {
      console.log(payload);
      state.items.push(payload);
    },
    updateItem: (state, { payload }) => {
      const cloneItems = [...state.items];
      const itemIndex = payload.id;
      const selectedIndex = cloneItems[itemIndex].findIndex(
        (val: any) => val.fieldId === payload.fieldId
      );

      if (selectedIndex !== -1) {
        cloneItems[itemIndex][selectedIndex] = {
          ...cloneItems[itemIndex][selectedIndex],
          value: payload.value,
        };
      } else {
        cloneItems[itemIndex].push({
          id: Date.now(),
          value: payload.value,
          fieldId: payload?.fieldId,
          type: payload.type,
        });
      }

      state.items = cloneItems;
    },
    removeItem: (state, { payload }) => {
      const cloneItems = [...state.items];
      cloneItems.splice(payload.id, 1);
      state.items = cloneItems;
    },
  },
});

export const getItems = () =>
  useSelector((state: IRootState) => state.items.items);

export const getItemsByCategory = (categoryId?: number) => {
  const items = useSelector((state: IRootState) => state.items.items);
  return items?.map((val: any) => {
    const filterValue = val?.filter(
      (fil: any) => fil.categoryId === categoryId
    );
    return filterValue;
  });
};

export default itemsSlice.reducer;
