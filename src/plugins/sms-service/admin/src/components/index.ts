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
  padding: 0 1rem;


  .tabs {
    max-width: 20rem;
    width: 100%;
    //border: 1px solid #000;

    & > * {
      height: 100% !important;
      //border: 1px solid #000;
    }
  }

  & .selected {
    & > div {
      background-color: rgba(0, 0, 255, 0.05);
      border: 1px solid rgba(0, 0, 255, 0.09);

    }
  }

  hr {
    //border-color: #ffffff;
  }

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
