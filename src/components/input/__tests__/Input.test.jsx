import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import Input from "../input";

describe("Input component", () => {
  test("affiche le label et l’input", () => {
    render(
      <Input
        id="username"
        labelText="Username"
        name="username"
        value=""
        onChange={() => {}}
      />
    );

    const label = screen.getByText(/username/i);
    const input = screen.getByLabelText(/username/i);

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  test("appelle onChange quand on saisit du texte", async () => {
    const handleChange = vi.fn();
    render(
      <Input
        id="email"
        labelText="Email"
        name="email"
        value=""
        onChange={handleChange}
      />
    );

    const input = screen.getByLabelText(/email/i);
    await userEvent.type(input, "test");

    expect(handleChange).toHaveBeenCalled();
  });

  test("affiche une erreur locale si la validation échoue", async () => {
    render(
      <Input
        id="name"
        labelText="Name"
        name="name"
        value=""
        validation="^[A-Z]+$"
        errorText="Invalid name"
        onChange={() => {}}
      />
    );

    const input = screen.getByLabelText(/name/i);
    await userEvent.type(input, "john"); // ne respecte pas le pattern

    const errorMsg = await screen.findByText(/invalid name/i);
    expect(errorMsg).toBeInTheDocument();
  });

  test("affiche un message d’erreur RHF s’il est passé", () => {
    render(
      <Input
        id="password"
        labelText="Password"
        name="password"
        value="123"
        rhfError="Mot de passe requis"
        onChange={() => {}}
      />
    );

    expect(screen.getByText(/mot de passe requis/i)).toBeInTheDocument();
  });

  test("ne casse pas sans validation ni rhfError", async () => {
    render(
      <Input
        id="city"
        labelText="City"
        name="city"
        value=""
        onChange={() => {}}
      />
    );

    const input = screen.getByLabelText(/city/i);
    await userEvent.type(input, "Paris");

    expect(screen.queryByText(/error/i)).toBeNull();
  });
});
