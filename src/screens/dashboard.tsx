import {
  Box,
  Button,
  Heading,
  HStack,
  ScrollView,
  Stack,
  VStack,
  Text,
} from "native-base";
import React from "react";
import { getCategories, getCategoryByName } from "../store/reducers/categories";
import { useDispatch } from "react-redux";
import { addItem } from "../store/actions/itemsAction";
import { ItemsCard } from "../components/itemsCard";
import { getItems } from "../store/reducers/items";

export const DashboardScreen = () => {
  const categories = getCategories();
  const items = getItems();

  const dispatch = useDispatch();

  return (
    <Box px={5} safeAreaTop>
      <HStack flexWrap={"wrap"}>
        <Stack safeAreaBottom>
          <ScrollView>
            {categories?.length <= 0 ? (
              <HStack>
                <Text w="100%" textAlign={"center"}>
                  Looks like no categories
                </Text>
              </HStack>
            ) : (
              categories?.map((val, ind) => {
                const category = categories?.find(
                  (cat) => cat?.name === val?.name
                );
                return (
                  <VStack key={ind} w="100%">
                    <HStack space={5} mb="15" justifyContent={"space-between"}>
                      <Heading size={"xl"}>
                        {category?.name || "Untitled Name"}
                      </Heading>
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
                    <ItemsCard category={category} items={items} />
                  </VStack>
                );
              })
            )}
          </ScrollView>
        </Stack>
      </HStack>
    </Box>
  );
};
