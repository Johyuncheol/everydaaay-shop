//세션스토리지에 저장하는 함수
export const addSessionStorage = (key: string, value: any) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

// 세션 스토리지에서 가져오는 함수
export const getSessionStorage = (key: string) => {
  const storedValue = sessionStorage.getItem(key);

  // 만약 값이 null이 아니라면 JSON 파싱을 시도하고, 그렇지 않으면 null 반환
  return storedValue !== null ? JSON.parse(storedValue) : null;
};
