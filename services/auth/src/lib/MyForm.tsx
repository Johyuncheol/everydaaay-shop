import React, { createContext, useContext, useEffect, useState } from "react";

// Form 컴포넌트에서 사용할 Props 정의
interface FormProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  initialValue: Record<string, any>; // 폼 초기 값
  validate: (values: Record<string, any>) => Record<string, string>; // 유효성 검사 함수
  onSubmit: (values: Record<string, any>) => void; // 제출 시 동작하는 함수
}

// Field 컴포넌트에서 사용할 Props 정의
interface FieldProps {
  element?: string; // 생성할 요소(태그)
  name: string;
  type?: string;
  placeholder?: string;
  autoFocus?: boolean;
}

// 에러 메시지 컴포넌트에서 사용할 Props 정의
interface ErrorMessageProps {
  name: string;
}

// Form 컴포넌트에서 사용할 Context의 값의 타입 정의
interface FormContextProps {
  values: Record<string, string>; // 현재 폼의 값
  errors: Record<string, string>; // 유효성 검사 에러 메시지
  touched: Record<string, boolean>; // 각 필드의 포커스 여부
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void; // 필드의 onBlur 이벤트 핸들러
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  getFieldProps: (name: string) => {
    name: string;
    value: any;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

// 폼 커스텀훅
export const useForm = ({
  initialValue, // 폼에서 사용되는 key-value객체 ex) {id:"", password:""}
  validate, // 유효성검사 함수
  onSubmit, // 제출시 동작하는 함수
}: {
  initialValue: Record<string, string>;
  validate: (values: Record<string, string>) => Record<string, string>;
  onSubmit: (values: Record<string, string>) => void;
}) => {
  const [values, setValues] = useState(initialValue); // 사용되는 값객체
  const [errors, setErrors] = useState<Record<string, string>>({}); //에러 메시지가 담길 키-값 객체
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // 값 변경함수
  // name을 키값으로 하여 값 저장
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // 해당 요소에 포커스가 왔었다는걸 마킹하는 함수
  // 포커스가 오지않은 요소는 에러메세지를 출력하면 안되기때문
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  };

  // 제출함수를 호출하는 함수
  // 에러가 있다면 제출함수를 호출하지않도록 제어한다
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 폼요소들의 키값을 사용 touched를 true로 변경하면서 모든 요소의 유효성검사동작하게만듬
    const nextTouched = Object.keys(values).reduce((touched, field: string) => {
      touched[field] = true;
      return touched;
    }, {} as Record<string, boolean>);

    setTouched(nextTouched);

    //유효성검사
    const errors = validate(values);
    setErrors(errors);
    // 에러가 하나라도있으면 제출함수실행 x
    if (Object.values(errors).some(Boolean)) return;
    onSubmit(values);
  };

  const getFieldProps = (name: string) => {
    const value = values[name];
    const onBlur = handleBlur;
    const onChange = handleChange;

    return {
      name,
      value,
      onBlur,
      onChange,
    };
  };

  useEffect(() => {
    setErrors(validate(values));
  }, [values]);

  return {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    getFieldProps,
  };
};

const formContext = createContext<FormContextProps | undefined>(undefined);
formContext.displayName = "FormContext";

// form 영역을 컨텍스트로 관리할 커스텀훅
export const Form: React.FC<FormProps> = ({
  id,
  className,
  children,
  ...rest
}) => {
  const formValue = useForm(rest);
  return (
    <formContext.Provider value={formValue}>
      <form
        noValidate
        id={id}
        className={className}
        onSubmit={formValue.handleSubmit}
      >
        {children}
      </form>
    </formContext.Provider>
  );
};

// getFieldProps 함수를 사용하여 필드의 props를 가져온 후,
// React.createElement를 통해 해당 엘리먼트를 생성.
// 값을 구별하기위한 name속성을 제외하고는 getFieldProps함수를 통해 인자를 쉽게 전달
export const Field: React.FC<FieldProps> = ({ element = "input", ...rest }) => {
  const { getFieldProps } = useContext(formContext)!;
  return React.createElement(element, { ...rest, ...getFieldProps(rest.name) });
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ name }) => {
  const { touched, errors } = useContext(formContext)!;
  // 만약 터치되지 않았거나 에러가 없다면 null을 반환하여 에러 메시지를 표시안함.
  if (!touched[name] || !errors[name]) return null;
  return <span>{errors[name]}</span>;
};
