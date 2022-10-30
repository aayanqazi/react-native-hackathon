import {
  HStack,
  Heading,
  Input,
  Switch,
  Pressable,
  Text,
  FormControl,
  Stack,
} from "native-base";
import React from "react";
import { updateItem, removeItem } from "../../store/actions/itemsAction";
import { Card } from "../card/card";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";

type ItemsCardProps = {
  items: [];
  category: any;
};

export const ItemsCard: React.FC<ItemsCardProps> = ({
  items = [],
  category,
}) => {
  const dispatch = useDispatch();

  const onDeleteItem = (id: number) => {
    dispatch(
      removeItem({
        id,
      })
    );
  };

  return (
    <HStack flexWrap={"wrap"} mb="10" safeAreaBottom>
      {items?.length <= 0 ? (
        <HStack>
          <Text my="5" w="100%" textAlign={"center"}>
            No items to display
          </Text>
        </HStack>
      ) : (
        items?.map((item: any, ind: number) => {
          const defaultKey = category?.defaultFieldId;
          const selectedName = item?.find((val: any) => {
            return val?.fieldId == defaultKey;
          })?.value;
          if (item?.[0]?.categoryId === category?.id)
            return (
              <Card>
                <Heading size="md" my="2">
                  {selectedName || "Untitled Name"}
                </Heading>
                {category?.fields?.map((input: any) => {
                  const selectedItem = item?.find(
                    (val: any) =>
                      val?.fieldId == input.id &&
                      val?.categoryId === category?.id
                  );
                  if (input?.type === "date") {
                    return (
                      <HStack
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Text>{input?.keyName}</Text>
                        <Stack flex={1}>
                          <DateTimePicker
                            onChange={(_, date) => {
                              dispatch(
                                updateItem({
                                  id: ind,
                                  value: date,
                                  fieldId: input?.id,
                                  type: input?.type,
                                })
                              );
                            }}
                            value={
                              selectedItem?.value
                                ? new Date(selectedItem?.value)
                                : new Date()
                            }
                          />
                        </Stack>
                      </HStack>
                    );
                  }
                  if (input?.type === "text")
                    return (
                      <FormControl>
                        <FormControl.Label>{input?.keyName}</FormControl.Label>
                        <Input
                          value={selectedItem?.value}
                          my={"2"}
                          size="lg"
                          onChangeText={(text) => {
                            dispatch(
                              updateItem({
                                id: ind,
                                value: text,
                                fieldId: input?.id,
                                type: input?.type,
                              })
                            );
                          }}
                          placeholder={input.keyName}
                        />
                      </FormControl>
                    );
                  if (input?.type === "number")
                    return (
                      <FormControl>
                        <FormControl.Label>{input?.label}</FormControl.Label>
                        <Input
                          value={selectedItem?.value}
                          keyboardType="numeric"
                          my={"2"}
                          size="lg"
                          placeholder={input.keyName}
                          onChangeText={(text) => {
                            dispatch(
                              updateItem({
                                id: ind,
                                value: text,
                                fieldId: input?.id,
                                type: input?.type,
                              })
                            );
                          }}
                        />
                      </FormControl>
                    );
                  if (input?.type === "checkbox")
                    return (
                      <HStack mt="4" space={4} alignItems={"center"}>
                        <Switch
                          value={selectedItem?.value}
                          onToggle={(val) =>
                            dispatch(
                              updateItem({
                                id: ind,
                                value: val,
                                fieldId: input?.id,
                                type: input?.type,
                              })
                            )
                          }
                        />
                        <Text>{input?.keyName}</Text>
                      </HStack>
                    );
                })}
                <HStack my="4" alignItems={"center"} space="1">
                  <Pressable onPress={() => onDeleteItem(ind)}>
                    <HStack>
                      <MaterialIcons
                        name="delete-forever"
                        size={22}
                        color="#be123c"
                      />
                      <Text color="#be123c">REMOVE</Text>
                    </HStack>
                  </Pressable>
                </HStack>
              </Card>
            );
        })
      )}
    </HStack>
  );
};
