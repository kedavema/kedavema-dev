import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";

const links = {
  email: "kedavema@gmail.com",
  github: "https://github.com/kedavema",
  linkedin: "https://www.linkedin.com/in/velazquez-kevin/",
  resumeUrl: "/resume.pdf",
};

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Name"), "Jane Doe");
  await user.type(screen.getByLabelText("Email"), "jane@example.com");
  await user.type(screen.getByLabelText("Subject"), "Hello there");
  await user.type(
    screen.getByLabelText("Message"),
    "This is a message long enough to pass validation."
  );
}

describe("ContactForm", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows a success message after a successful submit", async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({}) })
    );

    render(<ContactForm links={links} />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(/Message sent/);
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
      })
    );

    render(<ContactForm links={links} />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Enter a valid email address.");
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
  });

  it("falls back to direct links when the request fails", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network error")));

    render(<ContactForm links={links} />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(/unavailable/i);
    });
    expect(screen.getByText(links.email)).toBeInTheDocument();
  });
});
