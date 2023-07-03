/*
 *
 * HomePage
 *
 */

import React, {useEffect, useState} from "react";
import {BaseHeaderLayout, Button, ContentLayout, EmptyStateLayout, Layout,} from "@strapi/design-system";
import {Plus} from "@strapi/icons";

import SubmissionCount from "../../components/SubmissionCount";
import FormTable from "../../components/FormTabel";
import {Illo} from "../../components/Illo";
import {LoadingIndicatorPage} from "@strapi/helper-plugin";
import {Submissions} from "../../api/submissions";
import FormEvent from "../../utils/FormEvent";

const formEvent = FormEvent.GetInstance();

const HomePage = () => {
  const [formData, setFormData] = useState<any>([]);
  const [showModal, setShowModal] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<any>(true);
  const [refresh, setRefresh] = useState<any>(false);

  const fetchFormData = async () => {
    setIsLoading(true);

    const formsWithSubmission = await Submissions.get("/api/pages", {
      params: {
        populate: "*",
      },
    })
      .then((res) => {
        if (res.status !== 200) throw new Error("Failed to fetch pages");

        // console.log("forms ----  : ", res.data.data);

        return res.data.data
          .filter(
            ({ attributes }: any) => attributes.submissions.data.length > 0
          )
          .map(({ id, attributes }: any) => ({
            id,
            title: attributes.title,
            link: attributes.link,
            publishedAt: attributes.publishedAt,
            createdAt: attributes.createdAt,
            submissions: attributes.submissions.data,
          }));
      })
      .catch((err) => {
        console.log("err fetching pages --> : ", err);
      });

    console.log("forms: ", formsWithSubmission);

    setFormData(formsWithSubmission);
    setIsLoading(false);
  };

  useEffect(() => {
    formEvent.on("submission", (data) => {
      console.log("refreshing admin ui: ----  ", data);
      // fetchFormData();
    });

    console.log("listener : ", formEvent.listenerCount("submission"));

    return () => {
      formEvent.removeAllListeners("submission");
    };
  }, []);

  useEffect(() => {
    fetchFormData();
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
          {formData.length === 0 ? (
          <EmptyStateLayout
            icon={<Illo />}
            content="You don't have any Submission yet..."
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
          <>
            <SubmissionCount count={formData.length} />
            <FormTable formData={formData} setShowModal={setShowModal} />
          </>
        )}
      </ContentLayout>
    </Layout>
  );
};

export default HomePage;
