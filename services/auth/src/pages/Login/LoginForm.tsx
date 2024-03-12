import React from "react";
import * as MyForm from "../../lib/MyForm";
import InputFrame from "../../components/input/InputFrame";
import LoginBtn from "../../components/button/ColorBtn";
import { validateMessage } from "../../utill/Validation";

interface OrderFormProps {
  onSubmit: (values: any) => void;
}

const LoginForm: React.FC<OrderFormProps> = ({ onSubmit }) => {

  return (
    <MyForm.Form
      className="LoginForm"
      id="Login-form"
      initialValue={{
        id: "",
        password: "",
      }}
      validate={validateMessage}
      onSubmit={onSubmit}
    >
      <InputFrame
        label="아이디"
        htmlFor="id"
        required
        error={<MyForm.ErrorMessage name={"id"} />}
      >
        <MyForm.Field
          type="text"
          name="id"
          placeholder="id를 입력하세요"
          autoFocus
        />
      </InputFrame>

      <InputFrame
        label="비밀번호"
        htmlFor="password"
        required
        error={<MyForm.ErrorMessage name={"password"} />}
      >
        <MyForm.Field
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요"
        />
      </InputFrame>

      <LoginBtn background="black" fontColor="white">
        로그인
      </LoginBtn>
    </MyForm.Form>
  );
};

export default LoginForm;

