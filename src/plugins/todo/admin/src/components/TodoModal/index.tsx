import React, { useState } from "react";

import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalLayout,
  TextInput,
  Typography,
} from "@strapi/design-system";

export default function TodoModal({ setShowModal, addTodo }: any) {
  const [name, setName] = useState("");

  const handleSubmit = async (e: Event) => {
    // Prevent submitting parent form
    e.preventDefault();
    e.stopPropagation();

    try {
      await addTodo({ name: name });
      setShowModal(false);
    } catch (e) {
      console.log("error", e);
    }
  };

  const getError = () => {
    // Form validation error

    if (name.length > 40) {
      return "Content is too long";
    }

    return null;
  };

  return (
    <ModalLayout
      onClose={() => setShowModal(false)}
      labelledBy="title"
      as="form"
      onSubmit={handleSubmit}
    >
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Add todo
        </Typography>
      </ModalHeader>

      <ModalBody>
        <TextInput
          placeholder="What do you need to do?"
          label="Name"
          name="text"
          hint="Max 40 characters"
          error={getError()}
          onChange={(e: any) => setName(e.target.value)}
          value={name}
        />
      </ModalBody>

      <ModalFooter
        startActions={
          <Button onClick={() => setShowModal(false)} variant="tertiary">
            Cancel
          </Button>
        }
        endActions={<Button type="submit">Add todo</Button>}
      />
    </ModalLayout>
  );
}
