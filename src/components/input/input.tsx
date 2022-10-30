import { Input, Button, Text, FormControl, HStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { memo } from "react";

type Props = {
  isField?: boolean;
  placeholder: string;
  type?: string;
  label: string;
  onDelete?: () => void;
  onChange: (val: string) => void;
  value?: string;
};

export const InputContainer: React.FC<Props> = memo(
  ({
    isField = false,
    placeholder,
    type,
    label,
    onDelete,
    onChange,
    value,
  }) => {
    return (
      <FormControl>
        <FormControl.Label>{label}</FormControl.Label>
        <HStack space="3" alignItems={"center"}>
          <Input
            value={value}
            onChangeText={onChange}
            w="90%"
            size="1xl"
            InputRightElement={
              isField ? (
                <Button size="xs" rounded="none" h="full">
                  <Text color="white" textTransform={"uppercase"}>
                    {type}
                  </Text>
                </Button>
              ) : (
                <></>
              )
            }
            placeholder={placeholder}
          />
          {!!isField && (
            <MaterialIcons
              onPress={onDelete}
              name="delete-forever"
              size={22}
              color="#be123c"
            />
          )}
        </HStack>
      </FormControl>
    );
  }
);
