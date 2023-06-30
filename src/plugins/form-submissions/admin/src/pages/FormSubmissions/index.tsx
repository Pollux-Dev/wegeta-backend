/*
 *
 * HomePage
 *
 */

import React, {useEffect, useState} from "react";
import {
  BaseHeaderLayout, Box, ContentLayout, Layout, Table, Tbody, Td, TFooter, Th, Thead, Tr, Typography, VisuallyHidden,
} from "@strapi/design-system";
import {Plus} from "@strapi/icons";
import {LoadingIndicatorPage, useFetchClient} from "@strapi/helper-plugin";
import {Submissions} from "../../api/submissions";
import {useParams} from "react-router-dom";

const FormSubmissions = () => {
  const [todoData, setTodoData] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<any>(true);
  const { get } = useFetchClient();
  const params = useParams<{ id: string }>();

  const fetchData = async () => {
    if (isLoading === false) setIsLoading(true);

    // const formsWithSubmission = await todoRequests.getFormsWithSubmission();

    const formsWithSubmission = await Submissions.get(
      `/api/pages/${params?.id}`,
      {
        params: {
          populate: "*" /*filters: {
          id: {
            $in: formsWithSubmission,
          },
        },*/,
        },
      }
    )
      .then((res) => {
        if (res.status !== 200) throw new Error("Failed to fetch pages");

        console.log("forms ----  : ", res.data.data);

        return res.data.data.attributes.submissions.data
          .map(({ id, attributes }: any) => ({
            id,
            title: attributes.formTitle,
            createdAt: attributes.createdAt,
            link: '',
          }));
      })
      .catch((err) => {
        console.log("err fetching pages --> : ", err);
      });

    console.log("forms: ", formsWithSubmission);

    setTodoData(formsWithSubmission);
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

                <VisuallyHidden>Actions</VisuallyHidden>
              </Tr>
            </Thead>

            <Tbody>
              {todoData.map((todo: any, idx) => {
                return (
                  <Tr key={idx}>
                    <Td>
                      <Typography textColor="neutral800">{todo.id}</Typography>
                    </Td>

                    <Td>
                      <Typography textColor="neutral800">
                        {todo.title}
                      </Typography>
                    </Td>

                    <Td>
                      <Typography textColor="neutral800">
                        {todo.link}
                      </Typography>
                    </Td>

                    <Td>
                      <Typography textColor="neutral800">
                        {new Date(todo.createdAt).toDateString()}
                      </Typography>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </ContentLayout>
    </Layout>
  );
};

export default FormSubmissions;
