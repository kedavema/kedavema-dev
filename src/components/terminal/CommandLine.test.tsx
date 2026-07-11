import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CommandLine } from "./CommandLine";

describe("CommandLine", () => {
  it("submits the typed value on Enter and clears the input", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<CommandLine history={[]} onSubmit={onSubmit} />);

    const input = screen.getByRole("textbox");
    await user.type(input, "help{Enter}");

    expect(onSubmit).toHaveBeenCalledWith("help");
    expect(input).toHaveValue("");
  });

  it("does not submit on Enter when the input is blank", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<CommandLine history={[]} onSubmit={onSubmit} />);

    await user.type(screen.getByRole("textbox"), "   {Enter}");
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("navigates history with ArrowUp/ArrowDown", async () => {
    const user = userEvent.setup();
    render(<CommandLine history={["help", "about"]} onSubmit={vi.fn()} />);

    const input = screen.getByRole("textbox");
    await user.click(input);
    await user.keyboard("{ArrowUp}");
    expect(input).toHaveValue("about");

    await user.keyboard("{ArrowUp}");
    expect(input).toHaveValue("help");

    await user.keyboard("{ArrowDown}");
    expect(input).toHaveValue("about");

    await user.keyboard("{ArrowDown}");
    expect(input).toHaveValue("");
  });
});
