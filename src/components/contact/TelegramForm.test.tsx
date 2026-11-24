import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TelegramForm } from "./TelegramForm";

const links = {
  email: "kedavema@gmail.com",
  github: "https://github.com/kedavema",
  linkedin: "https://www.linkedin.com/in/velazquez-kevin/",
  resumeUrl: "/resume.pdf",
};

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Name"), "Jane Doe");
  await user.type(screen.getByLabelText("Email"), "jane@example.com");
  await user.type(screen.getByLabelText("Message"), "Are you open to a backend role?");
}

describe("TelegramForm", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("counts words as you type", async () => {
    const user = userEvent.setup();
    render(<TelegramForm links={links} />);
    await user.type(screen.getByLabelText("Message"), "hola desde Ypacaraí");
    expect(screen.getByText(/3 words/)).toBeInTheDocument();
  });

  it("posts the telegram and shows it in Morse code", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({}) });
    vi.stubGlobal("fetch", fetchMock);

    render(<TelegramForm links={links} />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send telegram/i }));

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(/Telegram delivered/);
    });
    expect(screen.getByRole("status")).toHaveTextContent(".- .-. .");

    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body).toMatchObject({
      name: "Jane Doe",
      email: "jane@example.com",
      subject: "Telegram from Jane Doe",
      message: "Are you open to a backend role?",
    });
  });

  it("shows field errors returned from a 400 response", async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ fieldErrors: { email: ["Enter a valid email address."] } }),
      }),
    );

    render(<TelegramForm links={links} />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send telegram/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Enter a valid email address.");
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
  });

  it("falls back to direct links when the line is down", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network error")));

    render(<TelegramForm links={links} />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send telegram/i }));

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(/line is down/i);
    });
    expect(screen.getByRole("link", { name: links.email })).toBeInTheDocument();
  });
});
