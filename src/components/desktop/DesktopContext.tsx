"use client";

import { createContext, useContext } from "react";
import type { DialogKind, DialogState, MenuName } from "./types";

export type DesktopApi = {
  menu: MenuName | null;
  dialog: DialogState;
  /** Index of the last job opened, highlighted in WORK.DB. */
  selectedJob: number;
  toggleMenu: (name: MenuName) => void;
  closeMenu: () => void;
  openDialog: (kind: DialogKind) => void;
  openJob: (index: number) => void;
  /** Closes the dialog only if it is still the one showing. */
  closeDialog: (kind: DialogKind) => void;
};

export const DesktopContext = createContext<DesktopApi | null>(null);

export function useDesktop(): DesktopApi {
  const api = useContext(DesktopContext);
  if (!api) throw new Error("useDesktop must be used inside <DesktopShell>");
  return api;
}
