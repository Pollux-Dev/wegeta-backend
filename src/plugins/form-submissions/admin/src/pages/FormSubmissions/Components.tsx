import styled from "styled-components";

export const Entry = styled.div`
  padding: 0.5rem;
  max-width: max-content;
  //border: 1px solid #000;

  .file_link {
  }
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

export const PaginationWrapper = styled.div`
  width: max-content;
  margin-left: auto;
  margin-top: 2rem;
`

export const Value = styled.span`
  display: inline-block;
  // chip shaped styling
  padding: .5rem;
  border-radius: 0.5rem;
  background-color: #efefef;
  color: #000;
`


export const PageNumber = styled.button`
  padding: .2rem .5rem;
  border-radius: 4px;
  border: 1px solid ${({theme}) => theme.colors.neutral200};
  background-color: ${({theme}) => theme.colors.neutral0};
  color: ${({theme}) => theme.colors.neutral800};
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5rem;
  margin: 0 .25rem;
  cursor: pointer;
  transition: all .2s ease-in-out;

  &:hover {
    background-color: ${({theme}) => theme.colors.neutral100};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({theme}) => theme.colors.primary100};
  }

  &:disabled {
    opacity: .5;
    cursor: not-allowed;
  }

  &.active {
    background-color: ${({theme}) => theme.colors.primary100};
    color: ${({theme}) => theme.colors.primary800};
    border-color: ${({theme}) => theme.colors.primary200};
  }

  &.active:hover {
    background-color: ${({theme}) => theme.colors.primary200};
  }

  &.active:focus {
    box-shadow: 0 0 0 2px ${({theme}) => theme.colors.primary100};
  }

  &.active:disabled {
    opacity: 1;
    cursor: default;
  }
`;
