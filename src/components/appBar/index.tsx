import React from "react";
import { HStack, IconButton, Icon, Text, Box } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { DrawerHeaderProps } from "@react-navigation/drawer";

export const AppBar: React.FC<DrawerHeaderProps> = ({ navigation, route }) => {
  const { name } = route;
  return (
    <>
      <Box w="100%" safeAreaTop bg="lightBlue.700" />
      <HStack bg="lightBlue.900" px="1" py="3" alignItems="center" w="100%">
        <HStack flex="1" alignItems="center">
          <IconButton
            onPress={() => navigation.openDrawer()}
            icon={
              <Icon size="sm" as={MaterialIcons} name="menu" color="white" />
            }
          />
          <Text color="white" fontSize="20" fontWeight="bold">
            {name?.replace(/_[0-9]/g, "")}
          </Text>
        </HStack>
      </HStack>
    </>
  );
};
