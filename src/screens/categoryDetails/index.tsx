import { Box, Button, Heading, HStack, Input, Switch, Text } from "native-base";
import React from "react";
import { getCategoryByName } from "../../store/reducers/categories";
import { useDispatch } from "react-redux";
import { ScrollView } from "react-native";
import { addItem } from "../../store/actions/itemsAction";
import { getItems, getItemsByCategory } from "../../store/reducers/items";
import { ItemsCard } from "../../components/itemsCard";

export const CategoryDetails: React.FC<any> = (props) => {
  const name = props?.route?.name?.replace(/_[0-9]/g, "");
  const category = getCategoryByName(name);
  const items = getItemsByCategory(category?.id);
  const dispatch = useDispatch();

  return (
    <Box px={5} safeAreaTop>
      <HStack mb="15" justifyContent={"space-between"}>
        <Heading size={"xl"}>{name || "Untitled Name"}</Heading>
        <Button
          onPress={() =>
            dispatch(
              addItem(
                category?.fields?.map((val) => ({
                  id: Date.now(),
                  categoryId: category?.id,
                  fieldId: val?.id,
                  type: val.type,
                  value: "",
                }))
              )
            )
          }
        >
          ADD NEW ITEM
        </Button>
      </HStack>
      <ScrollView>
        <ItemsCard items={items} category={category} />
      </ScrollView>
    </Box>
  );
};
