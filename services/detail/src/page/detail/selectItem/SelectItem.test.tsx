import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import ItemSelection from "./SelectItem";
import * as ShoppingBag from "../../../api/ShoppingBag";

/* 
테스트 항목
옵션 select box 생기는 지
추가한 아이템이 표시되는 지
수량변경, 삭제 버튼이 동작하는 지
장바구니 저장 버튼
*/

// putInShoppingBagAPI 함수의 mock 구현
jest.mock("../../../api/ShoppingBag", () => ({
  putInShoppingBagAPI: jest.fn(),
}));

describe("ItemSelection Component", () => {
  const testData = {
    id: "123",
    imgSrc: "test.jpg",
    alt: "Test Image",
    brand: "Test Brand",
    name: "Test Product",
    price: 1000,
    deliveryFee: 0,
    noDeliveryPrice: 1000,
    options: [
      { label: "Color", values: ["Red", "Blue"] },
      { label: "Size", values: ["S", "M"] },
    ],
  };

  test("옵션 select box 생기는 지", async () => {
    render(<ItemSelection data={testData} />);

    const selectoption_0 = screen.getByTestId(`option-0`);
    const selectoption_1 = screen.getByTestId(`option-1`);
    expect(selectoption_0).toBeInTheDocument();
    expect(selectoption_1).toBeInTheDocument();
  });

  test("추가한 아이템이 표시되는지", async () => {
    render(<ItemSelection data={testData} />);

    const selectoption_0 = screen.getByTestId(`option-0`);
    const selectoption_1 = screen.getByTestId(`option-1`);

    fireEvent.change(selectoption_0, { target: { value: "Red" } });
    fireEvent.change(selectoption_1, { target: { value: "S" } });

    expect(screen.getByText("Color: Red")).toBeInTheDocument();
    expect(screen.getByText("Size: S")).toBeInTheDocument();
  });

  test("수량변경, 삭제 버튼이 동작하는지", async () => {
    render(<ItemSelection data={testData} />);

    const selectoption_0 = screen.getByTestId(`option-0`);
    const selectoption_1 = screen.getByTestId(`option-1`);

    fireEvent.change(selectoption_0, { target: { value: "Red" } });
    fireEvent.change(selectoption_1, { target: { value: "S" } });

    const decreaseBtn = screen.getByTestId(`decreaseBtn-0`);
    const increaseBtn = screen.getByTestId(`increaseBtn-0`);
    const deleteBtn = screen.getByTestId(`deleteButton-0`);

    const itemNums = screen.getByTestId(`itemNums-0`);

    fireEvent.click(increaseBtn);
    expect(itemNums.textContent).toBe("2");

    fireEvent.click(decreaseBtn);
    expect(itemNums.textContent).toBe("1");

    fireEvent.click(deleteBtn);
    //queryByText는 없으면 null을 반환함
    expect(screen.queryByText("Color: Red")).not.toBeInTheDocument();
    expect(screen.queryByText("Size: S")).not.toBeInTheDocument();
  });

  test("장바구니 저장 버튼", async () => {
    render(<ItemSelection data={testData} />);

    const mockAddCart = jest.spyOn(ShoppingBag, "putInShoppingBagAPI");

    const selectoption_0 = screen.getByTestId(`option-0`);
    const selectoption_1 = screen.getByTestId(`option-1`);

    const saveBtn = screen.getByTestId(`save-cart`);

    fireEvent.change(selectoption_0, { target: { value: "Red" } });
    fireEvent.change(selectoption_1, { target: { value: "S" } });

    // 비로그인으로 장바구니 버튼 눌렀을 때
    await act(async () => {
      await fireEvent.click(saveBtn);
    });
    await expect(mockAddCart).not.toHaveBeenCalledWith();

    // 로그인하고 장바구니 버튼 눌렀을 때
    jest.spyOn(document, "cookie", "get").mockImplementation(() => "name=이름");

    await act(async () => {
      await fireEvent.click(saveBtn);
    });

    const expectDate = [
      {
        option: { Color: "Red", Size: "S" },
        count: 1,
        id: "123",
        imgSrc: "test.jpg",
        alt: "Test Image",
        name: "Test Product",
        deliveryFee: 0,
        price: 1000,
        noDeliveryPrice: 1000,
        orderPrice: 1000,
      },
    ];

    await expect(mockAddCart).toHaveBeenCalledWith(JSON.stringify(expectDate));
  });
});
