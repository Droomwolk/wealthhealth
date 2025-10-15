// src/components/PikadayFieldContainer/__tests__/PikadayField.test.jsx
import { render, screen, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, afterEach } from "vitest";

// ---- Mock de pikaday : formate dynamiquement en fr-FR ----
const fmtFR = new Intl.DateTimeFormat("fr-FR");
vi.mock("pikaday", () => {
  return {
    default: vi.fn().mockImplementation(({ field, onSelect }) => {
      const api = {
        _date: null,
        setDate(d, silent) {
          this._date = d instanceof Date ? d : new Date(d);
          if (field) field.value = fmtFR.format(this._date);
          if (!silent && typeof onSelect === "function") onSelect(this._date);
        },
        getDate() {
          return this._date;
        },
        destroy: vi.fn(),
      };
      if (field) {
        field.__select = (d) => {
          api._date = d instanceof Date ? d : new Date(d);
          field.value = fmtFR.format(api._date);
          onSelect?.(api._date);
        };
      }
      return api;
    }),
  };
});

import Pikaday from "pikaday";
import PikadayField from "../PikadayField";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("PikadayField", () => {
  test("rend le label et l’input", () => {
    render(
      <PikadayField
        id="dob"
        name="dob"
        labelText="Date of Birth"
        value={null}
        onChange={() => {}}
      />
    );
    expect(screen.getByText(/date of birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of birth/i)).toBeInTheDocument();
    expect(Pikaday).toHaveBeenCalledTimes(1);
  });

  test("sélection de date → met à jour l’input en FR et appelle onChange(Date)", () => {
    const handleChange = vi.fn();
    render(
      <PikadayField
        id="dob"
        name="dob"
        labelText="Date of Birth"
        value={null}
        onChange={handleChange}
      />
    );

    const input = screen.getByLabelText(/date of birth/i);

    // ✅ crée une date sans ambiguïté (UTC “00:00”) → format FR = 10/10/2022
    const d = new Date(Date.UTC(2022, 9, 10)); // 10 octobre 2022
    input.__select?.(d);

    expect(input.value).toBe("10/10/2022");
    expect(handleChange).toHaveBeenCalledTimes(1);
    // On compare le timestamp pour éviter tout souci d’objets Date différents
    expect(handleChange.mock.calls[0][0].getTime()).toBe(d.getTime());
  });

  test("value externe (Date) → l’input affiche la date au format FR", () => {
    const value = new Date(Date.UTC(2023, 0, 1)); // 1er janvier 2023
    render(
      <PikadayField
        id="sd"
        name="sd"
        labelText="Start Date"
        value={value}
        onChange={() => {}}
      />
    );
    const input = screen.getByLabelText(/start date/i);
    expect(input.value).toBe("01/01/2023");
  });

  test("reset externe (value = null) → l’input se vide", () => {
    const { rerender } = render(
      <PikadayField
        id="sd"
        name="sd"
        labelText="Start Date"
        value={new Date(Date.UTC(2023, 0, 1))}
        onChange={() => {}}
      />
    );
    const input = screen.getByLabelText(/start date/i);
    expect(input.value).toBe("01/01/2023");

    // reset
    rerender(
      <PikadayField
        id="sd"
        name="sd"
        labelText="Start Date"
        value={null}
        onChange={() => {}}
      />
    );
    expect(input.value).toBe("");
  });

  test("affiche le message d’erreur RHF", () => {
    render(
      <PikadayField
        id="dob"
        name="dob"
        labelText="Date of Birth"
        value={null}
        rhfError="Date requise"
        onChange={() => {}}
      />
    );
    expect(screen.getByText(/date requise/i)).toBeInTheDocument();
  });

  test("cleanup: détruit le picker sans erreur", () => {
    const { unmount } = render(
      <PikadayField
        id="dob"
        name="dob"
        labelText="Date of Birth"
        onChange={() => {}}
      />
    );
    const instance = Pikaday.mock.results[0].value;
    unmount();
    expect(instance.destroy).toHaveBeenCalledTimes(1);
  });
});
