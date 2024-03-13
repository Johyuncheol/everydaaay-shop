import React, { FC } from "react";
import * as MyForm from "../../lib/MyForm";
import InputFrame from "../../components/input/InputFrame";
import LoginBtn from "../../components/button/ColorBtn";
import { validateMessage } from "../../utill/Validation";

interface OrderFormProps {
  onSubmit: (values: any) => void;
}

const RegisterForm: FC<OrderFormProps> = ({ onSubmit }) => {
  return (
    <MyForm.Form
      className="RegisterForm"
      id="register-form"
      initialValue={{
        nickname: "",
        id: "",
        password: "",
      }}
      validate={validateMessage}
      onSubmit={onSubmit}
    >
      <InputFrame
        label="닉네임"
        htmlFor="nickname"
        required
        error={<MyForm.ErrorMessage name="nickname" />}
      >
        <MyForm.Field
          type="text"
          name="nickname"
          placeholder="Nickname"
          autoFocus
        />
      </InputFrame>

      <InputFrame
        label="아이디"
        htmlFor="id"
        required
        error={<MyForm.ErrorMessage name="id" />}
      >
        <MyForm.Field type="text" name="id" placeholder="id" />
      </InputFrame>

      <InputFrame
        label="비밀번호"
        htmlFor="password"
        required
        error={<MyForm.ErrorMessage name="password" />}
      >
        <MyForm.Field type="password" name="password" placeholder="password" />
      </InputFrame>

      <LoginBtn background="black" fontColor="white">
        회원가입
      </LoginBtn>
    </MyForm.Form>
  );
};

export default RegisterForm;
