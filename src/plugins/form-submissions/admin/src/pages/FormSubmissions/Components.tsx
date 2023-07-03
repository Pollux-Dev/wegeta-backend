import styled from "styled-components";

export const Entry = styled.div`
  padding: 0.5rem;
  max-width: max-content;
  //border: 1px solid #000;
`;

export const Content = styled.div`
  padding: 1rem;
  display: grid;
  //// auto-fill the grid with the minimum width of the content
  //grid-template-columns: repeat(auto-fit, minmax(min-content,20rem));
  //grid-gap: .5rem;
`;

export const Key = styled.span`
  display: inline-block;
  font-weight: bold;
  font-size: 1.1rem;
`

export const Value = styled.span`
  display: inline-block;
  // chip shaped styling
  padding: .5rem;
  border-radius: 0.5rem;
  background-color: #efefef;
  color: #000;

`
