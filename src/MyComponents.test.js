import { render, screen } from "@testing-library/react";
import AuthForm from "./components/Forms/AuthForm";

test("renders AuthForm", () => {
    render(<AuthForm />);
    const componentElement = screen.getByTestId("auth-form-component");
    expect(componentElement).toBeInTheDocument();
});