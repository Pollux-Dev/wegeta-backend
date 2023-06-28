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
  ContentLayout,
  Layout,
  Radio,
  RadioGroup,
  Tab,
  TabGroup,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
  TextInput,
  Tooltip,
  Typography,
} from "@strapi/design-system";
import { useNotification } from "@strapi/helper-plugin";
import { Information, Message } from "@strapi/icons";
import axios from "axios";
import {
  isValidPhoneNumber,
  validatePhoneNumberLength,
} from "libphonenumber-js";
import { useHandleFileUpload } from "../../utils";
import { CardWrapper, SmsType } from "../../components";
import SendSms from "../../components/SendSms";
import Outbox from "../../components/Outbox";

const HomePage = () => {

  const [selectedTab, setSelectedTab] = useState(0);


  return (
    <Layout>
      <BaseHeaderLayout title="Compose Message" as="h1" />


      <ContentLayout>
        <CardWrapper>
          <Box as={"form"} padding={10} >

            <TabGroup
              label="Some stuff for the label"
              id="tabs"
              onTabChange={(selected : any) => {
                setSelectedTab(selected)
                console.log(selected)
              }}
            >
              <Tabs className='tabs'>
                <Tab className={selectedTab === 0 && 'selected'} >Send SMS</Tab>
                <Tab className={selectedTab === 1 && 'selected'}>Outbox</Tab>
              </Tabs>
              <br/>
              <hr/>
              <br/>
              <TabPanels>
                <TabPanel>
                  <SendSms/>
                </TabPanel>
                <TabPanel>
                  <Outbox/>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </Box>
        </CardWrapper>
      </ContentLayout>
    </Layout>
  );
};

export default HomePage;
