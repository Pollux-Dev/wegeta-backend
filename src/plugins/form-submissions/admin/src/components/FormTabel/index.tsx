import React from "react";
import {
  Box,
  LinkButton,
  NavLink,
  Table,
  Tbody,
  Td,
  TFooter,
  Th,
  Thead,
  Tr,
  Typography,
  VisuallyHidden,
} from "@strapi/design-system";
import { Plus } from "@strapi/icons";
import pluginId from "../../pluginId";

type Form = {
  id: string | number;
  title: string;
  link: string;
  publishedAt: string;
  createdAt: string;
  submissions: any[];
};

type PropsType = {
  formData: Form[];
  setShowModal: (arg: any) => void;
};

export default function FormTable({ formData, setShowModal }: PropsType) {
  // navigate to the form submission page

  return (
    <Box
      background="neutral0"
      hasRadius={true}
      shadow="filterShadow"
      padding={8}
      style={{ marginTop: "10px" }}
    >
      <Table
        colCount={4}
        rowCount={10}
        footer={
          <TFooter onClick={() => setShowModal(true)} icon={<Plus />}>
            Add a todo
          </TFooter>
        }
      >
        <Thead>
          <Tr>
            <Th>
              <Typography variant="sigma">ID</Typography>
            </Th>

            <Th>
              <Typography variant="sigma">Title</Typography>
            </Th>

            <Th>
              <Typography variant="sigma">Link</Typography>
            </Th>

            <Th>
              <Typography variant="sigma">CreatedAt</Typography>
            </Th>

            <Th>
              <VisuallyHidden>Actions</VisuallyHidden>
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {formData.map((form: any) => {
            return (
              <Tr key={form.id}>
                <Td>
                  <Typography textColor="neutral800">{form.id}</Typography>
                </Td>

                <Td>
                  <Typography textColor="neutral800">{form.title}</Typography>
                </Td>

                <Td>
                  <Typography textColor="neutral800">{form.link}</Typography>
                </Td>

                <Td>
                  <Typography textColor="neutral800">
                    {new Date(form.createdAt).toDateString()}
                  </Typography>
                </Td>

                <Td align="right">
                  <LinkButton
                    variant={"success-light"}
                    to={`/plugins/${pluginId}/submissions/${form.id}`}
                    as={NavLink}
                  >
                    <Typography textColor="neutral800">
                      View Submissions : Total {form.submissions.length}
                    </Typography>
                  </LinkButton>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
