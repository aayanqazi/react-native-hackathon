import {
  Box,
  Button,
  HStack,
  Stack,
  VStack,
  Heading,
  ScrollView,
  Menu,
  Text,
} from "native-base";
import React from "react";
import { Card } from "../components/card/card";
import { InputContainer } from "../components/input/input";
import { useDispatch } from "react-redux";
import {
  addCategory,
  addNewFeild,
  removeCategory,
  removeFeild,
  updateCategoryName,
  updateFields,
  updateTitleField,
} from "../store/actions/categories";
import { getCategories } from "../store/reducers/categories";

type FieldsType = {
  keyName: string;
  type: string;
  label: string;
};

type CategoryProps = {
  title: string;
  fields: FieldsType[];
  categoryIndex: number;
};

export const ManageCategories = () => {
  const dispatch = useDispatch();
  const categories = getCategories();

  const onAddNewCategory = () => {
    dispatch(addCategory());
  };

  const fieldsTypes = ["text", "number", "checkbox", "date"];

  const onAddNewField = (type: string, categoryIndex: number) => {
    dispatch(
      addNewFeild({
        fields: {
          keyName: "",
          type,
          label: "Field",
          id: Date.now(),
        },
        id: categoryIndex,
      })
    );
  };

  const onDeleteFields = (categoryId: number, fieldsId: number) => {
    dispatch(
      removeFeild({
        categoryId,
        fieldsId,
      })
    );
  };

  const onDeleteCategory = (categoryId: number) => {
    dispatch(
      removeCategory({
        categoryId,
      })
    );
  };

  return (
    <Box safeAreaTop flex={1} px="3">
      <ScrollView flex={0.9}>
        <VStack>
          {categories?.length <= 0 ? (
            <HStack>
              <Text w="100%" textAlign={"center"}>
                Looks like no categories
              </Text>
            </HStack>
          ) : (
            categories?.map((category) => {
              return (
                <Card>
                  <Stack p="4" space={3}>
                    <Heading>{category.name}</Heading>
                    <InputContainer
                      value={category.name}
                      label="Category Name"
                      placeholder="Enter Category Name"
                      onChange={(text) =>
                        dispatch(
                          updateCategoryName({
                            categoryId: category?.id,
                            value: text,
                          })
                        )
                      }
                    />
                    {category?.fields?.map((val, ind) => {
                      return (
                        <InputContainer
                          key={`${val}_${ind}`}
                          type={val?.type}
                          placeholder="Enter Field name"
                          isField
                          value={val?.keyName}
                          label={val?.label}
                          onChange={(text) =>
                            dispatch(
                              updateFields({
                                categoryId: category?.id,
                                fieldsId: val?.id,
                                value: text,
                              })
                            )
                          }
                          onDelete={() => onDeleteFields(category?.id, val?.id)}
                        />
                      );
                    })}
                    <HStack justifyContent={"space-between"}>
                      <Menu
                        trigger={(triggerProps) => {
                          return (
                            <Button {...triggerProps}>ADD NEW FIELD</Button>
                          );
                        }}
                      >
                        {fieldsTypes?.map((val, ind) => {
                          return (
                            <Menu.Item
                              onPress={() => onAddNewField(val, category?.id)}
                              key={`${val}_${ind}`}
                            >
                              <Text textTransform={"uppercase"}>{val}</Text>
                            </Menu.Item>
                          );
                        })}
                      </Menu>
                      <Button
                        onPress={() => onDeleteCategory(category?.id)}
                        colorScheme="danger"
                      >
                        REMOVE CATEGORY
                      </Button>
                    </HStack>
                    <HStack>
                      <Menu
                        trigger={(triggerProps) => {
                          return (
                            <Button colorScheme="blue" {...triggerProps}>
                              {`Make Title Field: ${
                                category?.defaultTitle || ""
                              }`}
                            </Button>
                          );
                        }}
                      >
                        {category?.fields?.map((val, ind) => {
                          if (val?.type !== "checkbox")
                            return (
                              <Menu.Item
                                onPress={() =>
                                  dispatch(
                                    updateTitleField({
                                      categoryId: category?.id,
                                      value: val?.keyName,
                                      fieldId: val?.id,
                                    })
                                  )
                                }
                                key={`${val?.keyName}_${ind}`}
                              >
                                <Text textTransform={"uppercase"}>
                                  {val?.keyName}
                                </Text>
                              </Menu.Item>
                            );
                        })}
                      </Menu>
                    </HStack>
                  </Stack>
                </Card>
              );
            })
          )}
        </VStack>
      </ScrollView>

      <HStack
        flex={0.1}
        alignItems={"center"}
        w="100%"
        left={0}
        right={0}
        safeAreaBottom
      >
        <Button onPress={onAddNewCategory} w="100%">
          Add New Category
        </Button>
      </HStack>
    </Box>
  );
};
