import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Items from "./Items";

/* 
테스트 항목
랜더링이 되는가
체크박스 동작

-props로 setState를 전달받기에 테스트가 모호해짐 
버튼 클릭시 setState의 호출여부 검사 

  수량변경 버튼
  삭제버튼
*/

describe("Items Component", () => {
  const testData = [
    {
      option: { Color: "Red", Size: "S" },
      count: 1,
      price: 1000,
      orderPrice: 1000,
      id: "123",
      imgSrc: "test.jpg",
      alt: "Test Image",
      name: "Test Product",
      deliveryFee: 0,
      noDeliveryPrice: 1000,
    },
  ];

  test("renders items correctly", () => {
    const setCheckedItemMock = jest.fn();
    const setDataMock = jest.fn();
    const checkedItemMock = Array(testData.length).fill(false);

    const { getByText } = render(
      <Items
        data={testData}
        setCheckedItem={setCheckedItemMock}
        setData={setDataMock}
        checkedItem={checkedItemMock}
      />
    );
    const productName = getByText("Test Product");
    expect(productName).toBeInTheDocument();
  });

  test("체크박스 동작", () => {
    const setCheckedItemMock = jest.fn();
    const setDataMock = jest.fn();
    const checkedItemMock = Array(testData.length).fill(false);

    const { getByTestId } = render(
      <Items
        data={testData}
        setCheckedItem={setCheckedItemMock}
        setData={setDataMock}
        checkedItem={checkedItemMock}
      />
    );
    // false로 초기화하는지
    expect(setCheckedItemMock).toHaveBeenCalledTimes(1);

    // 체크박스 클릭시 변경일어나는지
    const checkbox = getByTestId("checkbox-0");
    fireEvent.click(checkbox);
    expect(setCheckedItemMock).toHaveBeenCalledTimes(2);
  });

  test("수량변경 버튼 동작", async () => {
    const setCheckedItemMock = jest.fn();
    const setDataMock = jest.fn();
    const checkedItemMock = Array(testData.length).fill(false);

    render(
      <Items
        data={testData}
        setCheckedItem={setCheckedItemMock}
        setData={setDataMock}
        checkedItem={checkedItemMock}
      />
    );
    const increaseBtn = screen.getByTestId("increaseBtn-0");
    const decreaseBtn = screen.getByTestId("decreaseBtn-0");

    expect(screen.getByText("▲")).toBeInTheDocument();
    expect(screen.getByText("▼")).toBeInTheDocument();

    await act(async () => {
      await fireEvent.click(increaseBtn);
    });
    // setData를 props로 주고있어서 mock 하게되어 상태변화가 일어나지않아 호출여부로 확인
    expect(setDataMock).toHaveBeenCalled();

    await act(async () => {
      await fireEvent.click(decreaseBtn);
    });
    // setData를 props로 주고있어서 mock 하게되어 상태변화가 일어나지않아 호출여부로 확인
    expect(setDataMock).toHaveBeenCalled();
  });

  test("삭제 버튼 동작", async () => {
    const setCheckedItemMock = jest.fn();
    const setDataMock = jest.fn();
    const checkedItemMock = Array(testData.length).fill(false);

    render(
      <Items
        data={testData}
        setCheckedItem={setCheckedItemMock}
        setData={setDataMock}
        checkedItem={checkedItemMock}
      />
    );
    const deleteButton = screen.getByTestId("deleteButton");

    await act(async () => {
      await fireEvent.click(deleteButton);
    });
    // setData를 props로 주고있어서 mock 하게되어 상태변화가 일어나지않아 호출여부로 확인
    expect(setDataMock).toHaveBeenCalled();
  });
});
