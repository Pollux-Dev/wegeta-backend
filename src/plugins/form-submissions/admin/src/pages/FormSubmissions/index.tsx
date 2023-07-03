/*
 *
 * HomePage
 *
 */

import React, {useEffect, useState} from "react";
import {
  Accordion,
  AccordionContent,
  AccordionGroup,
  AccordionToggle,
  BaseHeaderLayout,
  Box,
  ContentLayout,
  Flex,
  IconButton,
  Layout,
  Link,
  Pagination,
  TextButton,
  Tooltip,
  Typography,
} from "@strapi/design-system";

// import {Dots, NextLink, PageLink, Pagination, PreviousLink} from '@strapi/design-system/v2';
import {ArrowLeft, Calendar, Information, Pencil, User} from "@strapi/icons";
import {LoadingIndicatorPage} from "@strapi/helper-plugin";
import {Submissions} from "../../api/submissions";
import {useParams} from "react-router-dom";
import {Content, Entry, Key, Value} from "./Components";

type FormSubmission = {
  id: string;
  title: string;
  submissions: {
    submittedAt: string;
    formData: Record<string, any>;
    [key: string]: any;
  }[];
};

const AccordionAction = ({ submittedAt }: { submittedAt: string }) => (
  <Flex horizontal gap={2}>
    <IconButton
      variant={"success-light"}
      noBorder
      label="Delete"
      icon={<Calendar />}
      style={{ pointerEvents: "none" }}
    />

    <TextButton noBorder label="Sumitted At" icon={<Pencil />}>
      <Typography textColor="neutral800">
        {new Date(submittedAt).toDateString()}
      </Typography>
    </TextButton>
  </Flex>
);

const FormSubmissions = () => {
  const [submissionsData, setSubmissionsData] = useState<FormSubmission>();
  const [showModal, setShowModal] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<any>(true);
  const params = useParams<{ id: string }>();
  const [expandedID, setExpandedID] = useState(null);

  const handleToggle = (id: any) => () => {
    setExpandedID((s) => (s === id ? null : id));
  };

  const fetchData = async () => {
    if (isLoading === false) setIsLoading(true);

    // const formsWithSubmission = await todoRequests.getFormsWithSubmission();

    const formsWithSubmission = await Submissions.get(
      `/api/pages/${params?.id}`,
      {
        params: {
          populate: {
            submissions: {
              populate: "*",
            },
            form: {
              populate: ["label", "name", "items"],
            },
          },
        },
      }
    )
      .then<FormSubmission>((res: any) => {
        if (res.status !== 200) throw new Error("Failed to fetch pages");

        console.log("forms ----  : ", res.data.data);
        const attributes = res.data.data.attributes;

        const submissions: FormSubmission["submissions"] = (
          attributes.submissions.data as any[]
        ).map(({ id, attributes }: any) => ({
          id,
          submittedAt: attributes.createdAt,
          formId: attributes.formId,
          formData: attributes.formData,
          form: attributes.form,
        }));

        return {
          id: res.data.data.id,
          title: attributes.title,
          form: attributes.form,
          submissions,
        };
      })
      .catch((err) => {
        console.log("err fetching pages --> : ", err);
      });

    console.log("forms: ", formsWithSubmission);

    if (formsWithSubmission) {
      setSubmissionsData(formsWithSubmission);
    }
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
        navigationAction={
          <Link startIcon={<ArrowLeft />} to="/plugins/form-submissions">
            Go back
          </Link>
        }
        title="Form Submissions"
        subtitle="All your Form-Submission in on place"
        as="h2"
      />

      <ContentLayout>
        <Box
          background="neutral0"
          hasRadius={true}
          shadow="filterShadow"
          padding={8}
          style={{ marginTop: "10px" }}
        >
          <AccordionGroup
            footer={
              <Flex justifyContent="start" background="neutral150" padding={3}>
                <Typography style={{ color: "gray" }}>
                  {submissionsData?.submissions.length} &nbsp; Submissions
                </Typography>
              </Flex>
            }
            label="This are the Submissions for the form you selected"
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
          >
            {submissionsData?.submissions.map((submission, idx) => (
              <Accordion
                expanded={expandedID === idx}
                onToggle={handleToggle(idx)}
                id="acc-1"
                key={idx}
                size={expandedID === idx ? "S" : "S"}
              >
                <AccordionToggle
                  startIcon={<User aria-hidden />}
                  title={`User ${idx + 1}`}
                  togglePosition="left"
                  action={
                    <AccordionAction submittedAt={submission.submittedAt} />
                  }
                />
                <AccordionContent>
                  <Content>
                    {Object.entries(submission.formData).map(([key, value]) => (
                      <Entry className="entries">
                        <Key className="key">{key} :  </Key> {"  "}
                        <Value className="value">{value}</Value>
                      </Entry>
                    ))}
                  </Content>
                </AccordionContent>
              </Accordion>
            ))}
          </AccordionGroup>

          <Pagination
            activePage={1}
            pageCount={submissionsData?.submissions.length}
          ></Pagination>
        </Box>
      </ContentLayout>
    </Layout>
  );
};

export default FormSubmissions;
