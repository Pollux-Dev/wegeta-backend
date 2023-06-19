/*
 *
 * HomePage
 *
 */

import React from 'react';
import pluginId from '../../pluginId';
import {BaseHeaderLayout, Button, ContentLayout, EmptyStateLayout, Layout} from "@strapi/design-system";
import { ExternalLink } from '@strapi/icons';

import { LinkButton } from '@strapi/design-system';

const HomePage = () => {
  return (
    <Layout>
      <BaseHeaderLayout
        title="generated-page-link Plugin"
        subtitle="All your generated page links in on place"
      />

      <ContentLayout>

        <LinkButton isExternal href="https://strapi.io/" startIcon={<ExternalLink />} size='l'>
          Link to generated page
        </LinkButton>

      </ContentLayout>
    </Layout>
  );
};

export default HomePage;
