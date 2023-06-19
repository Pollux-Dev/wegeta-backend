/*
 *
 * HomePage
 *
 */

import React, { useState } from "react";
import {
  BaseHeaderLayout,
  Box,
  Button,
  Card,
  ContentLayout,
  Layout,
  Radio,
  RadioGroup,
  Textarea,
  TextInput,
  Tooltip,
  Typography,
} from "@strapi/design-system";
import { Information, Message } from "@strapi/icons";
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
  const [isLoading, setIsLoading] = useState<any>(false);
  const [messageType, setMessageType] = useState<"sms" | "email">("sms");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  return (
    <Layout>
      <BaseHeaderLayout title="Compose Message" as="h1" />

      <ContentLayout>
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
              type={messageType === "sms" ? "number" : "email"}
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
                error={content.length > 15 ? "Content is too long" : undefined}
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
                <Tooltip description="Content of the tooltip" position="right">
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
      </ContentLayout>
    </Layout>
  );
};

export default HomePage;
