import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TerminalShell } from "./TerminalShell";

describe("TerminalShell", () => {
  it("shows the welcome entry on first render", () => {
    render(<TerminalShell />);
    expect(screen.getByText(/Type a command or click a chip below/)).toBeInTheDocument();
  });

  it("dispatches a typed command and appends its output", async () => {
    const user = userEvent.setup();
    render(<TerminalShell />);

    await user.type(screen.getByRole("textbox"), "about{Enter}");

    expect(screen.getAllByText(/visitor@portfolio:~\$/).length).toBeGreaterThan(1);
    expect(screen.getByText(/Available commands:|—/)).toBeInTheDocument();
  });

  it("dispatches a command when a chip is clicked", async () => {
    const user = userEvent.setup();
    render(<TerminalShell />);

    await user.click(screen.getByRole("button", { name: "Run command: help" }));
    expect(screen.getByText("Available commands:")).toBeInTheDocument();
  });

  it("clears entries and history when the clear command runs", async () => {
    const user = userEvent.setup();
    render(<TerminalShell />);

    await user.type(screen.getByRole("textbox"), "help{Enter}");
    expect(screen.getByText("Available commands:")).toBeInTheDocument();

    await user.type(screen.getByRole("textbox"), "clear{Enter}");
    expect(screen.queryByText("Available commands:")).not.toBeInTheDocument();
    expect(screen.queryByText(/Type a command or click a chip below/)).not.toBeInTheDocument();
  });
});
