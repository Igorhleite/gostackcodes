import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
}

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  margin-top: 80px;
  max-width: 450px;
  line-height: 56px;
`;

export const Form = styled.form<FormProps>`
  margin-top: 40px;
  max-width: 700px;

  display: flex;
  -webkit-box-shadow: 6px -5px 40px -2px rgba(179, 179, 179, 1);
  -moz-box-shadow: 6px -5px 40px -2px rgba(179, 179, 179, 1);
  box-shadow: 6px -5px 40px -2px rgba(179, 179, 179, 1);

  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 10px 0 0 10px;
    color: #a8a8b3;
    border: 2px solid #fff;
    border-right: 0;
    font-size: 20px;
    color: #a8a8b3;

    ${props =>
      props.hasError &&
      css`
        border-color: #c53030;
      `}

    & ::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 210px;
    height: 70px;
    background: #04d361;
    border-radius: 0 5px 5px 0;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;

export const Repositories = styled.div`
  margin-top: 40px;
  max-width: 700px;

  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;

    display: flex;
    align-items: center;
    transition: transform 0.2s;

    & + a {
      margin-top: 16px;
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }
    div {
      margin-left: 16px;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        font-size: 16px;
        color: #a8a8b3;
        margin-top: 5px;
      }
    }
    svg {
      margin-left: auto;
      color: #cbcbd6;
    }

    &:hover {
      transform: translateX(10px);
    }
  }
`;

export const UserRepositories = styled.div`
  -webkit-box-shadow: -1px 16px 17px -6px rgba(166, 166, 166, 1);
  -moz-box-shadow: -1px 16px 17px -6px rgba(166, 166, 166, 1);
  box-shadow: -1px 16px 17px -6px rgba(166, 166, 166, 1);
  max-width: 490px;
  display: flex;
  flex-direction: column;

  align-content: center;
  align-items: center;
  text-align: center;
  background-color: #fff;
  border-radius: 0 0 10px 10px;
  transition: transform 1s;
  transform: translateY(0px);

  strong {
    font-size: 20px;
    color: #646473;
    margin-bottom: 10px;
  }
  div {
    position: relative;

    padding: 0 24px;
    max-height: 100px;
    overflow-x: hidden; /* Hide horizontal scrollbar */
    overflow-y: scroll; /* Add vertical scrollbar */
    border-radius: 10px;
    align-content: center;
    align-items: center;
    text-align: center;
    display: flex;
    flex-direction: column;

    ::-webkit-scrollbar {
      display: none;
    }
  }
  button {
    flex: 1;
    display: block;
    text-decoration: none;
    transition: transform 0.2s;
    border: none;
    background-color: transparent;
    &:hover {
      transform: translateY(-4px);
      color: black;
    }
  }
  p {
    margin-top: 2px;
    font-size: 20px;
    color: #a8a8b3;
    &:hover {
      color: black;
    }
  }
`;
