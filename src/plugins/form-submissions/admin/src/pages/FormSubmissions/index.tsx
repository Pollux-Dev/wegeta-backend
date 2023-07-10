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
  LinkButton,
  NextLink,
  Pagination,
  PreviousLink,
  TextButton,
  Tooltip,
  Typography,
} from "@strapi/design-system";

// import {Dots, NextLink, PageLink, Pagination, PreviousLink} from '@strapi/design-system/v2';
import {ArrowLeft, Calendar, File, Information, Pencil, User,} from "@strapi/icons";
import {LoadingIndicatorPage} from "@strapi/helper-plugin";
import {Submissions} from "../../api/submissions";
import {NavLink, useParams} from "react-router-dom";
import {Content, Entry, Key, PageNumber, PaginationWrapper, Value,} from "./Components";

type FormSubmission = {
  id: string;
  title: string;
  form: any[];
  submissions: {
    submittedAt: string;
    formData: Record<string, any>;
    formId: string;
    [key: string]: any;
  }[];
};

type Form = {
  id: string;
  title: string;
  form: any[];
};

type Pagination = {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
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

const FileTypes = {
  pdf: "pdf",
  doc: "doc",
  xls: "xls",
  image: "image",
  video: "video",
} as const;

const getFileType = (mimeType: string) => {
  switch (mimeType) {
    case "application/pdf":
      return FileTypes.pdf;
    case "application/msword":
    case "application/wps-office.docx":
      return FileTypes.doc;
    case "application/vnd.ms-excel":
    case "application/wps-office.xlsx":
      return FileTypes.xls;
    case "image/png":
    case "image/jpeg":
    case "image/webp":
      return FileTypes.image;
    case "video/mp4":
      return FileTypes.video;
    default:
      return FileTypes.doc;
  }
};

const FormSubmissions = () => {
  const [submissions, setSubmissions] = useState<FormSubmission>();
  const [files, setFiles] = useState<
    { name: string; url: string; mime: string }[]
  >([]);
  const [showModal, setShowModal] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<any>(true);
  const params = useParams<{ id: string }>();
  const [expandedID, setExpandedID] = useState(null);

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination>();

  const handleToggle = (id: any) => () => {
    setExpandedID((s) => (s === id ? null : id));
  };

  useEffect(() => {
    console.log("page : ", page);

    const fetchSubmissions = async () => {
      setIsLoading(true);
      const selectedForm = await Submissions.get(
        `/api/pages/${params?.id}`,
        {}
      ).then((res: any) => {
        const attributes = res.data.data.attributes;
        return {
          id: res.data.data.id,
          title: attributes.title,
          form: attributes.form,
        };
      });

      const submissions = await Submissions.get(
        "/form-submissions/submissions",
        {
          params: {
            sort: ["createdAt:desc"],
            filters: {
              formId: {
                $eq: params?.id,
              },
            },
            pagination: {
              page: page,
              pageSize: 5,
              withCount: true,
            },
          },
        }
      ).then((res) => {
        console.log("res.data.data ----> : ", res.data.meta.pagination);

        const submissions = (res.data.data as any[]).map(
          ({ id, attributes }: any) => ({
            id,
            submittedAt: attributes.createdAt,
            formId: attributes.formId,
            formData: attributes.formData,
          })
        );
        // console.log("submission data : ", submissions);
        return { submissions, pagination: res.data.meta.pagination };
      });

      setSubmissions({
        ...selectedForm,
        submissions: submissions.submissions,
      });

      setPagination(submissions.pagination);

      setIsLoading(false);
    };

    fetchSubmissions();
  }, [page]);

  // fetch files uploaded
  useEffect(() => {
    // todo : find a better way to relate the submission with the file
    Submissions.get("/api/upload/files")
      .then((res) => {
        /* console.log(
           "files res ----> : ",
           res.data.map((file: any) => file)
         );
 */
        setFiles(
          res.data.map((file: any) => ({
            name: file.name,
            url: file.url,
            mime: file.mime,
          }))
        );
      })
      .catch((err) => {
        console.log("files err ----> : ", err);
      });
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
                  {submissions?.submissions.length} &nbsp; Submissions
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
            {submissions?.submissions.map((submission, idx) => (
              <Accordion
                expanded={expandedID === idx}
                onToggle={handleToggle(idx)}
                id="acc-1"
                key={idx}
                size="S"
              >
                <AccordionToggle
                  startIcon={<User aria-hidden />}
                  // use the index in reverse order to show the latest submission first
                  title={`User ${submissions?.submissions.length - idx}`}
                  togglePosition="left"
                  action={
                    <AccordionAction submittedAt={submission.submittedAt} />
                  }
                />
                <AccordionContent>
                  <Content>
                    {Object.entries(submission.formData).map(
                      ([key, value], idx) => {
                        let fileType;
                        const isFileUpload = files.find(
                          ({ name }) => name === value
                        );
                        if (isFileUpload) {
                          fileType = getFileType(isFileUpload.mime);
                        }

                        return (
                          <Entry className="entries" key={idx}>
                            <Key className="key">{key} : </Key> {"  "}
                            {isFileUpload ? ( // open the link in a new tab
                              // http://localhost:1337/uploads/default_image_ec2d9c4b17.png

                              <LinkButton
                                startIcon={<File />}
                                target="_blank"
                                href={`http://localhost:1337${isFileUpload.url}`}
                                as="a"
                                isExternal
                              >
                                {fileType === "image"
                                  ? "Preview Image"
                                  : "Download File"}
                              </LinkButton>
                            ) : (
                              <Value className="value">{value || "-"}</Value>
                            )}
                          </Entry>
                        );
                      }
                    )}
                  </Content>
                </AccordionContent>
              </Accordion>
            ))}
          </AccordionGroup>
          <PaginationWrapper>
            <Pagination className="pagination">
              <PreviousLink
                as={NavLink}
                to="/1"
                disabled={true}
                aria-disabled={page === 1}
                onClick={(e: any) => {
                  e.preventDefault();

                  // set the page to previous page
                  if (page === 1) return;
                  setPage((page) => page - 1);
                }}
              >
                Previous
              </PreviousLink>
              {pagination?.pageCount &&
                Array.from(new Array(pagination.pageCount))
                  .slice(0, 5)
                  .map((page, idx) => (
                    <PageNumber
                      className={idx + 1 === pagination.page ? "active" : ""}
                      key={idx}
                      onClick={() => {
                        if (idx + 1 == page) return;
                        setPage(idx + 1);
                      }}
                    >
                      {idx + 1}
                    </PageNumber>
                  ))}
              {pagination?.pageCount && pagination?.pageCount > 5 && (
                <React.Fragment>
                  ...
                  <PageNumber
                    className={
                      pagination?.page === pagination?.pageCount ? "active" : ""
                    }
                    onClick={() => {
                      if (pagination?.page === pagination?.pageCount) return;
                      setPage(pagination?.pageCount || 0);
                    }}
                  >
                    {pagination?.pageCount && pagination.pageCount}
                  </PageNumber>
                </React.Fragment>
              )}
              <NextLink
                as={NavLink}
                to="/2"
                aria-disabled={page === pagination?.pageCount}
                onClick={(e: any) => {
                  e.preventDefault();

                  // set the page to the next page
                  if (page === pagination?.pageCount) return;
                  setPage((page) => page + 1);
                }}
              >
                Next page
              </NextLink>
            </Pagination>
          </PaginationWrapper>
        </Box>
      </ContentLayout>
    </Layout>
  );
};

export default FormSubmissions;
