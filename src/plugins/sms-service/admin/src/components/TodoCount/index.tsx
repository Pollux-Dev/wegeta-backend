import React from "react";
import { Typography, Box, Flex } from "@strapi/design-system";

export default function TodoCount({ count }: any) {
  return (
    <Box background="neutral0" hasRadius={true} shadow="filterShadow">
      <Flex  padding={4}>
        <Typography >
          You have a total of {count} todos 🚀
        </Typography>
      </Flex>
    </Box>
  );
}
