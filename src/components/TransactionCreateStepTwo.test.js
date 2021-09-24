import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import TransactionCreateStepTwo from "./TransactionCreateStepTwo";

const mockCreateTransaction = jest.fn();
const mockShowSnackbar = jest.fn();

test("if an amount and note is entered, the pay button becomes enabled", async () => {
  render(
    <TransactionCreateStepTwo
      sender={{ id: "5" }}
      receiver={{ id: "5" }}
      createTransaction={mockCreateTransaction}
      showSnackbar={mockShowSnackbar}
    />
  );

  expect(await screen.findByRole("button", { name: /pay/i })).toBeDisabled();

  userEvent.type(screen.getByPlaceholderText(/amount/i), "50");
  userEvent.type(screen.getByPlaceholderText(/add a note/i), "dinner");

  expect(await screen.findByRole("button", { name: /pay/i })).toBeEnabled();
  userEvent.click(screen.getByRole("button", { name: /pay/i }));
  await act(() => Promise.resolve());
  expect(mockCreateTransaction).toHaveBeenCalled();
  userEvent.click(await screen.findByRole("button", { name: /request/i }));
});
