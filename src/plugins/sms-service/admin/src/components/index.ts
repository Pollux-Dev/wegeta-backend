import styled from "styled-components";
import {Card} from "@strapi/design-system";

export const SmsType = styled.div`
  display: flex;
  flex-flow: ${({ dir }) => (dir === "hor" ? "row" : "column")};
  gap: 1rem;

  .radio-group {
    display: flex;
    gap: 1.5rem;
  }
`;

export const CardWrapper = styled(Card)`
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
