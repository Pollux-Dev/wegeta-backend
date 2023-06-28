import React, { useState } from "react";
import {
  Table,
  Tbody,
  Td,
  TFooter,
  Th,
  Thead,
  Tr,
  Badge
} from "@strapi/design-system";

import {
  BaseCheckbox,
  Box,
  Button,
  Flex,
  IconButton,
  TextInput,
  Typography,
  VisuallyHidden,

} from "@strapi/design-system";
import { Pencil, Plus, Trash } from "@strapi/icons";

function TodoCheckbox({ value, checkboxID, callback, disabled }: any) {
  const [isChecked, setIsChecked] = useState(value);

  function handleChange() {
    setIsChecked(!isChecked);
    {
      callback && callback({ id: checkboxID, value: !isChecked });
    }
  }

  return (
    <BaseCheckbox
      checked={isChecked}
      onChange={handleChange}
      disabled={disabled}
    />
  );
}

function TodoInput({ value, onChange }: any) {
  return (
    <TextInput
      type="text"
      aria-label="todo-input"
      name="todo-input"
      error={value.length > 40 ? "Text should be less than 40 characters" : ""}
      onChange={onChange}
      value={value}
    />
  );
}

export default function TodoTable({
  todoData,
  toggleTodo,
  deleteTodo,
  editTodo,
  setShowModal,
}: any) {
  return (
    <Box
      background="neutral0"
      hasRadius={true}
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
              <Typography variant="sigma">Message</Typography>
            </Th>

            <Th>
              <Typography variant="sigma">Number of Recipient</Typography>
            </Th>

            <Th>
              <Typography variant="sigma">Status</Typography>
            </Th>

            <Th>
              <VisuallyHidden>Actions</VisuallyHidden>
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {todoData.map((todo: any) => {
            const [inputValue, setInputValue] = useState(todo.name);

            const [isEdit, setIsEdit] = useState(false);

            return (
              <Tr key={todo.id}>
                <Td>
                  <Typography textColor="neutral800">{todo.id}</Typography>
                </Td>

                <Td>
                  {isEdit ? (
                    <TodoInput
                      value={inputValue}
                      onChange={(e: any) => setInputValue(e.target.value)}
                    />
                  ) : (
                    <Typography textColor="neutral800">{todo.name}</Typography>
                  )}
                </Td>

                <Td>
                  <Typography textColor="neutral800">-</Typography>

                </Td>

                <Td>
                 <Badge active >Success</Badge>
                </Td>

                <Td>
                  {isEdit ? (
                    <Flex style={{ justifyContent: "end" }}>
                      <Button
                        onClick={() => {
                          editTodo(todo.id, { name: inputValue })
                          setIsEdit(false)
                        }}
                      >
                        Save
                      </Button>
                    </Flex>
                  ) : (
                    <Flex style={{ justifyContent: "end" }}>
                      <Box paddingLeft={1}>
                        <IconButton
                          onClick={() => deleteTodo(todo)}
                          label="Delete"
                          noBorder
                          icon={<Trash />}
                        />
                      </Box>
                    </Flex>
                  )}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
