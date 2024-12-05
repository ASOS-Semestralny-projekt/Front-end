import {render, screen, waitFor} from "@testing-library/react";
import {RegisterForm} from "./RegisterForm";
import {userEvent} from "@testing-library/user-event";

describe("Register component", () => {
    it("should render Register component correctly", () => {
        render(<RegisterForm />);
        const element = screen.getByRole("button");
        expect(element).toBeInTheDocument()
    });

    it("should show error message when none the fields is entered", async () => {
        render(<RegisterForm />);
        const buttonElement = screen.getByRole("button");
        await userEvent.click(buttonElement);
        const alertElement = screen.getByRole("alert");
        expect(alertElement).toBeInTheDocument();
        expect(alertElement).toHaveTextContent(
            "Nasledujúce polia nemôžu byť prázdne: Meno, Priezvisko, Ulica, Číslo domu, Mesto, PSČ, Krajina, Email, Telefónne číslo, Heslo"
        );
    });

    it("should show success alert if the email is unique", async () => {
        render(<RegisterForm />);
        // Query the input using its placeholder text
        const fisrtName = screen.getByPlaceholderText("Zadajte vaše meno");
        expect(fisrtName).toHaveValue("");
        const secondName = screen.getByPlaceholderText("Zadajte vaše priezvisko");
        expect(secondName).toHaveValue("");
        const address = screen.getByPlaceholderText("Zadajte ulicu bydliska");
        expect(address).toHaveValue("");
        const houseNumber = screen.getByPlaceholderText("Zadajte číslo domu");
        expect(houseNumber).toHaveValue("");
        const city = screen.getByPlaceholderText("Zadajte mesto");
        expect(city).toHaveValue("");
        const zipCode = screen.getByPlaceholderText("Zadajte PSČ");
        expect(zipCode).toHaveValue("");
        const country = screen.getByPlaceholderText("Zadajte vašu krajinu");
        expect(country).toHaveValue("");
        const email = screen.getByPlaceholderText("example@mail.com");
        expect(email).toHaveValue("");
        const telephone = screen.getByPlaceholderText("+421...");
        expect(telephone).toHaveValue("");
        const password = screen.getByPlaceholderText("***************");
        expect(password).toHaveValue("");

        // Simulate typing into the input
        await userEvent.type(fisrtName, "John");
        await userEvent.type(secondName, "Doe");
        await userEvent.type(address, "Ulica");
        await userEvent.type(houseNumber, "9");
        await userEvent.type(city, "BA");
        await userEvent.type(zipCode, "9890");
        await userEvent.type(country, "Slovensko");
        await userEvent.type(email, "unique@mail.com");
        await userEvent.type(telephone, "0900332");
        await userEvent.type(password, "password");

        const buttonElement = screen.getByRole("button");
        await userEvent.click(buttonElement);
        await waitFor(() => {
            const alertElement = screen.getByRole("alert");
            expect(alertElement).toBeInTheDocument();
            expect(alertElement).toHaveTextContent(
                "Registrácia bola úspešná. Prebieha presmerovanie na prihlásenie..."
            );
        }, { timeout: 2000 }); // Timeout of 2 seconds
    });

    it("should show error alert if the email is already taken", async () => {
        render(<RegisterForm />);
        // Query the input using its placeholder text
        const fisrtName = screen.getByPlaceholderText("Zadajte vaše meno");
        expect(fisrtName).toHaveValue("");
        const secondName = screen.getByPlaceholderText("Zadajte vaše priezvisko");
        expect(secondName).toHaveValue("");
        const address = screen.getByPlaceholderText("Zadajte ulicu bydliska");
        expect(address).toHaveValue("");
        const houseNumber = screen.getByPlaceholderText("Zadajte číslo domu");
        expect(houseNumber).toHaveValue("");
        const city = screen.getByPlaceholderText("Zadajte mesto");
        expect(city).toHaveValue("");
        const zipCode = screen.getByPlaceholderText("Zadajte PSČ");
        expect(zipCode).toHaveValue("");
        const country = screen.getByPlaceholderText("Zadajte vašu krajinu");
        expect(country).toHaveValue("");
        const email = screen.getByPlaceholderText("example@mail.com");
        expect(email).toHaveValue("");
        const telephone = screen.getByPlaceholderText("+421...");
        expect(telephone).toHaveValue("");
        const password = screen.getByPlaceholderText("***************");
        expect(password).toHaveValue("");

        // Simulate typing into the input
        await userEvent.type(fisrtName, "John");
        await userEvent.type(secondName, "Doe");
        await userEvent.type(address, "Ulica");
        await userEvent.type(houseNumber, "9");
        await userEvent.type(city, "BA");
        await userEvent.type(zipCode, "9890");
        await userEvent.type(country, "Slovensko");
        await userEvent.type(email, "example@mail.com");
        await userEvent.type(telephone, "0900332");
        await userEvent.type(password, "password");

        const buttonElement = screen.getByRole("button");
        await userEvent.click(buttonElement);
        await waitFor(() => {
            const alertElement = screen.getByRole("alert");
            expect(alertElement).toBeInTheDocument();
            expect(alertElement).toHaveTextContent(
                "Zadaný email už existuje"
            );
        }, { timeout: 2000 }); // Timeout of 2 seconds
    });
});