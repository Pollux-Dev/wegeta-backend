import React, { useState } from "react";
import { SmsType } from "../index";
import {
  Box,
  Button,
  Radio,
  RadioGroup,
  Textarea,
  TextInput,
  Tooltip,
  Typography,
} from "@strapi/design-system";
import { Information, Message } from "@strapi/icons";
import {
  isValidPhoneNumber,
  validatePhoneNumberLength,
} from "libphonenumber-js";
import axios from "axios";
import { useNotification } from "@strapi/helper-plugin";
import { useHandleFileUpload } from "../../utils";

type PropsType = {
  setTab: (arg: 1 | 0) => void;
};

const SendSms = ({ setTab }: PropsType) => {
  const [isLoading, setIsLoading] = useState<any>(false);
  const [messageType, setMessageType] = useState<"sms" | "email">("sms");
  const [formError, setFormError] = useState<Record<string, any>>({});
  const [recipientType, setRecipientType] = useState<"single" | "bulk">(
    "single"
  );
  const [recipient, setRecipient] = useState<string | string[]>("");
  const [message, setMessage] = useState("");
  const notification = useNotification();
  const handleFileChange = useHandleFileUpload(setRecipient);

  const getFieldProps = (type: typeof recipientType) => {
    if (type === "single") {
      return {
        type: "number",
        value: recipient,
      };
    } else if (type === "bulk") {
      return {
        type: "file",
        accept:
          ".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        multiple: false,
        onChange: handleFileChange,
        error: undefined,
      };
    }
  };

  function onSend() {
    return (e: any) => {
      e.preventDefault();

      if (messageType !== "sms") {
        return;
      }

      setFormError({});

      if (!recipient || recipient?.length === 0) {
        setFormError({
          recipient: "Recipient filed is required",
        });
        return;
      }

      if (!message) {
        setFormError({
          message: "Message Is required",
        });
        return;
      }

      if (recipientType === "single") {
        console.log("isValid: ", isValidPhoneNumber(recipient as string, "ET"));
        console.log(
          "isLength: ",
          validatePhoneNumberLength(recipient as string, "ET")
        );

        if (!isValidPhoneNumber(recipient as string, "ET")) {
          notification({
            type: "warning",
            message: {
              id: "Your error message",
              defaultMessage:
                "Incorrect phone number, must start with +251, 9, 09",
            },
          });

          return;
        }
      }

      setIsLoading(true);



      const endPoint = recipientType === "single" ? "send_sms" : "send_list";
      axios
        .post(
          `http://197.156.70.196:9095/api/${endPoint}`,
          {
            username: "Wegegta30499",
            password: `!1<.?4!;'*Jl#j*YiEiw7daWk"[Uy`,
            to: recipient,
            text: message,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log("response :", res.data);

          // insert into outbox

          // todo
          // show sucess message

          notification({
            type: "success",
            message: {
              id: "Your error message",
              defaultMessage: `Your Message has been sent successfully ${
                recipientType === "single" ? "to" : "for"
              } ${
                recipientType === "single"
                  ? recipient
                  : `${recipient.length} recipient(s)`
              }`,
            },
          });

          setRecipient("");
          setMessage("");
          setIsLoading(false);
          setTab(1);

          // todo : outbox

        })
        .catch((err) => {
          setIsLoading(false);

          notification({
            type: "warning",
            message: {
              id: "Your error message",
              defaultMessage: "Something went wrong, please try again",
            },
          });
        });
    };
  }

  return (
    <Box className="box" color="neutral800" padding={4} background="neutral0">
      <SmsType dir="ver" style={{ display: "none" }}>
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

      <SmsType>
        <Typography variant="omega bold" fontWeight="bold" id="selection">
          Recipient
        </Typography>
        <RadioGroup
          labelledBy="selection"
          onChange={(e: any) => setRecipientType(e.target.value)}
          value={recipientType}
          name="selection"
          className="radio-group"
          size="l"
        >
          <Radio value="single">Single</Radio>
          <Radio value="bulk">Bulk</Radio>
        </RadioGroup>
      </SmsType>

      <TextInput
        error={formError?.recipient}
        label={`To ( ${
          recipientType === "single" ? 1 : recipient.length
        }  recipient )`}
        name="recipient"
        required
        // hint="Description line"
        // error={content.length > 5 ? "Content is too long" : undefined}
        onChange={(e: any) => {
          if (recipientType === "single") {
            setFormError((err) => ({ ...err, recipient: undefined }));
            setRecipient(e.target.value);
          }
        }}
        // value={recipient}
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
        {...getFieldProps(recipientType)}
      />

      <Textarea
        placeholder="This is a content placeholder"
        label="Message"
        name="content"
        hint="Your Message here"
        required
        error={formError?.message}
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

      <Button
        type="submit"
        startIcon={<Message />}
        loading={isLoading}
        size="L"
        onClick={onSend()}
      >
        Send SMS
      </Button>
    </Box>
  );
};

export default SendSms;
