import React from "react";
import { Box } from "native-base";

type Props = { children: React.ReactNode };

export const Card: React.FC<Props> = ({ children }) => {
  return (
    <Box
      mb={5}
      w="100%"
      rounded="lg"
      p="2"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700",
      }}
      _web={{
        shadow: 2,
        borderWidth: 0,
      }}
      _light={{
        backgroundColor: "gray.50",
      }}
    >
      {children}
    </Box>
  );
};
