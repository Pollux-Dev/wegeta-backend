import React from "react";
import { ExternalLink } from "@strapi/icons";
import { LinkButton } from "@strapi/design-system";

const PageLinkButton = (props: any) => {
  const { label, href } = props;
  console.log("props --- : ", props);
  return (
    <LinkButton
      isExternal
      startIcon={<ExternalLink />}
      size="l"
      disabled={!props?.value}
      href={props?.value}
    >
      {props?.value
        ? "Link to generated page"
        : "You have to publish this form to generate a link"}
    </LinkButton>
  );
};

export default PageLinkButton;
