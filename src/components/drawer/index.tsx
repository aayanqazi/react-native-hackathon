import * as React from "react";
import { View } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { AppBar } from "../appBar";
import { Pressable, VStack, Text, HStack, Divider } from "native-base";
import { ManageCategories } from "../../screens/manageCategories";
import { getCategories } from "../../store/reducers/categories";
import { CategoryDetails } from "../../screens/categoryDetails";
import { DashboardScreen } from "../../screens/dashboard";

const Drawer = createDrawerNavigator();

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <VStack space="6" my="2" mx="1">
        <VStack divider={<Divider />} space="4">
          <VStack space="3">
            {props.state.routes.map((val, index) => (
              <Pressable
                key={index}
                px="5"
                py="3"
                rounded="md"
                bg={
                  index === props.state.index
                    ? "rgba(6, 182, 212, 0.1)"
                    : "transparent"
                }
                onPress={(_) => {
                  props.navigation.navigate(val?.name);
                }}
              >
                <HStack space="7" alignItems="center">
                  <Text
                    fontWeight="500"
                    color={
                      index === props.state.index ? "primary.500" : "gray.700"
                    }
                  >
                    {val?.name.replace(/_[0-9]/g, "")}
                  </Text>
                </HStack>
              </Pressable>
            ))}
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
};

export default function DrawerNavigation() {
  const categories = getCategories();
  return (
    <NavigationContainer>
      <Drawer.Navigator
        useLegacyImplementation={true}
        initialRouteName="Dashboard"
        drawerContent={CustomDrawerContent}
        screenOptions={{
          header: (props) => <AppBar {...props} />,
        }}
      >
        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
        {categories?.map((category, ind) => {
          return (
            <Drawer.Screen
              key={ind}
              navigationKey={`${category}_${ind}`}
              name={`${category?.name}_${ind}` || " "}
              component={CategoryDetails}
            />
          );
        })}

        <Drawer.Screen name="Manage Categories" component={ManageCategories} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
