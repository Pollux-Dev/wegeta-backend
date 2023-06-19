/*
 *
 * HomePage
 *
 */

import React, { useEffect, useState } from "react";
import {
  BaseHeaderLayout,
  Box,
  Button,
  Card,
  ContentLayout,
  EmptyStateLayout,
  Layout,
  Radio,
  RadioGroup,
  Textarea,
  TextInput,
  Tooltip,
  Typography,
} from "@strapi/design-system";
import { Information, Message, Plus } from "@strapi/icons";
import { Illo } from "../../components/Illo";
import TodoModal from "../../components/TodoModal";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import todoRequests from "../../api/todo";
import styled from "styled-components";
// import SvgMessage from "@strapi/icons/dist/Message";

const SmsType = styled.div`
  display: flex;
  flex-flow: column;
  gap: 1rem;

  //border: 1px solid #000;

  .radio-group {
    display: flex;
    gap: 1.5rem;
  }
`;

const CardWrapper = styled(Card)`
  padding: 1rem;

  & .box {
    display: flex;
    flex-flow: column;
    gap: 2rem;
    //border: 1px solid red;

    button {
      align-self: flex-start;
    }
  }
`;

const HomePage = () => {
  const [todoData, setTodoData] = useState<any>([]);
  const [showModal, setShowModal] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<any>(true);
  const [messageType, setMessageType] = useState<"sms" | "email">("sms");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");


  async function addTodo(data: any) {
    await todoRequests.addTodo(data);
    await fetchData();
  }

  async function toggleTodo(data: any) {
    await todoRequests.toggleTodo(data.id);
  }

  async function deleteTodo(data: any) {
    await todoRequests.deleteTodo(data.id);
    await fetchData();
  }

  async function editTodo(id: any, data: any) {
    await todoRequests.editTodo(id, data);
    await fetchData();
  }

  const fetchData = async () => {
    if (isLoading === false) setIsLoading(true);

    const todo = await todoRequests.getAllTodos();
    setTodoData(todo);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingIndicatorPage />;
  }

  return (
    <Layout>
      <BaseHeaderLayout
        title="Compose Message"
        subtitle="All your needs in on place"
        as="h1"
      />

      <ContentLayout>
        {todoData.length === 0 ? (
          <EmptyStateLayout
            icon={<Illo />}
            content="You don't have any todos yet..."
            action={
              <Button
                onClick={() => setShowModal(true)}
                variant="secondary"
                startIcon={<Plus />}
              >
                Add your first Todo
              </Button>
            }
          />
        ) : (
          <CardWrapper>
            <Box padding={10} className="box">
              <SmsType>
                <Typography variant="omega bold" fontWeight="bold" id="type">
                  Type
                </Typography>
                <RadioGroup
                  labelledBy="type"
                  onChange={(e: any) => setMessageType(e.target.value)}
                  value={messageType}
                  name="type"
                  className="radio-group"
                  size="l"
                >
                  <Radio value="sms">Sms</Radio>
                  <Radio value="email">Email</Radio>
                </RadioGroup>
              </SmsType>

              <TextInput
                placeholder="This is a content placeholder"
                label="To ( recipient )"
                name="content"
                type="number"
                required
                // hint="Description line"
                // error={content.length > 5 ? "Content is too long" : undefined}
                onChange={(e: any) => setContent(e.target.value)}
                value={content}
                labelAction={
                  <Tooltip description="Content of the tooltip">
                    <button
                      aria-label="Information about the email"
                      style={{
                        border: "none",
                        padding: 0,
                        background: "transparent",
                      }}
                    >
                      <Information aria-hidden />
                    </button>
                  </Tooltip>
                }
              />

              {messageType === "email" && (
                <TextInput
                  placeholder="This is a content placeholder"
                  label="Subject"
                  name="subject"
                  type="text"
                  // hint="Description line"
                  error={
                    content.length > 15 ? "Content is too long" : undefined
                  }
                  onChange={(e: any) => setContent(e.target.value)}
                  value={content}
                  labelAction={
                    <Tooltip description="Content of the tooltip">
                      <button
                        aria-label="Information about the email"
                        style={{
                          border: "none",
                          padding: 0,
                          background: "transparent",
                        }}
                      >
                        <Information aria-hidden />
                      </button>
                    </Tooltip>
                  }
                />
              )}

              <Textarea
                placeholder="This is a content placeholder"
                label="Content"
                name="content"
                hint="Description line"
                required
                // error={content.length < 5 ? "Content is too short" : undefined}
                // value={'message'}
                onChange={(e: any) => setMessage(e.target.value)}
                labelAction={
                  <Tooltip
                    description="Content of the tooltip"
                    position="right"
                  >
                    <button
                      aria-label="Information about the email"
                      style={{
                        border: "none",
                        padding: 0,
                        background: "transparent",
                      }}
                    >
                      <Information aria-hidden />
                    </button>
                  </Tooltip>
                }
              >
                {message}
              </Textarea>

              <Button startIcon={<Message />} loading={false} size="L">
                Send SMS
              </Button>
            </Box>
          </CardWrapper>
        )}
      </ContentLayout>
      {showModal && <TodoModal setShowModal={setShowModal} addTodo={addTodo} />}
    </Layout>
  );
};

export default HomePage;
