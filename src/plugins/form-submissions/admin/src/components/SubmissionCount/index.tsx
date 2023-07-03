import React from "react";
import { Box, Flex, Typography } from "@strapi/design-system";

export default function SubmissionCount({ count }: any) {
  return (
    <Box background="neutral0" hasRadius={true} shadow="filterShadow">
      <Flex padding={4}>
        <Typography>You have a total of {count} forms submissions.</Typography>
      </Flex>
    </Box>
  );
}
