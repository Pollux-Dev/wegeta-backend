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

export default function TodoTable({
  todoData,
  toggleTodo,
  deleteTodo,
  editTodo,
  setShowModal,
}: any) {
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
          {todoData.map((todo: any) => {
            return (
              <Tr key={todo.id}>
                <Td>
                  <Typography textColor="neutral800">{todo.id}</Typography>
                </Td>

                <Td>
                  <Typography textColor="neutral800">{todo.title}</Typography>
                </Td>

                <Td>
                  <Typography textColor="neutral800">{todo.link}</Typography>
                </Td>

                <Td>
                  <Typography textColor="neutral800">
                    {new Date(todo.createdAt).toDateString()}
                  </Typography>
                </Td>

                <Td align="right">
                  <LinkButton
                    variant={"success-light"}
                    to={`/plugins/${pluginId}/submissions/${todo.id}`}
                    as={NavLink}
                  >
                    <Typography textColor="neutral800">
                      View Submissions : Total {todo.submissions.length}
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
