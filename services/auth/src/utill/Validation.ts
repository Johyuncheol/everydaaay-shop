/*
이메일, 패스워드, 닉네임의 유효성검사 -> 이부분은 다른 서비스에서도 쓰인다면 shared로 옮길예정
로그인, 회원가입시 사용되는 유효성 검사메세지 생성함수
*/

// 이메일 유효성 검사
// 이메일 형식
export const emailValidate = (data: string) => {
    if (data === undefined) return false;
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    return regex.test(data);
  };
  
  //닉네임 유효성 검사
  //5자리 이상
  export const nickNameValidate = (data: string) => {
    if (data === undefined) return false;
    return data.length >= 5;
  };
  
  // 비밀번호 유효성검사
  // 8자리이상 + 특수문자 1개이상
  export const passwordValidate = (data: string) => {
    if (data === undefined) return false;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return data.length >= 8 && specialCharRegex.test(data);
  };
  
  
  
  // 로그인과 회원가입에서만 쓰이는 유효성검사 메시지
  // error 값이 있으면 네트워크요청 보내지않음
  // 초기값이 "" 로 설정되기 때문에 막아야함 error가 생성되기전 요청가능하기 때문 
  export const validateMessage = (values: any) => {
    const errors: any = {};
  
    if (values.id === "" || (!emailValidate(values.id) && values.id)) {
      errors.id = "이메일 형식으로 입력하세요";
    } else {
      errors.id = "";
    }
  
    if (
      values.password === "" ||
      (!passwordValidate(values.password) && values.password)
    ) {
      errors.password = "8자리이상 + 특수문자 1개이상 ";
    } else {
      errors.password = "";
    }
  
    if (
      values.nickname === "" ||
      (!nickNameValidate(values.nickname) && values.nickname)
    ) {
      errors.nickname = "닉네임 5자리이상";
    } else {
      errors.nickname = "";
    }
    return errors;
  };
  