"use client";

import Link from "next/link";
import type { Links } from "@content/types";
import { TelegramForm } from "@/components/contact/TelegramForm";
import { DialogWindow } from "./DialogWindow";
import { useDesktop } from "./DesktopContext";
import type { DesktopJob } from "./types";

function Buttons({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap justify-center gap-x-6 gap-y-5 pt-3">{children}</div>;
}

function JobDialog({ jobs }: { jobs: DesktopJob[] }) {
  const { dialog, closeDialog } = useDesktop();
  const open = dialog?.kind === "job";
  const job = jobs[dialog?.job ?? 0];
  const close = () => closeDialog("job");

  return (
    <DialogWindow open={open} onClose={close} title={job.file} titleId="dialog-job" badge={job.year}>
      <div className="flex flex-col gap-3.5">
        <p className="m-0 text-[36px] leading-none">{job.company}</p>
        <p className="m-0 text-accent">
          {job.role} · {job.period}
        </p>
        <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
          {job.highlights.map((line) => (
            <li key={line} className="grid grid-cols-[2ch_minmax(0,1fr)]">
              <span aria-hidden="true" className="text-link">
                ■
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
        {job.stack.length > 0 && <p className="m-0 text-dim">{job.stack.join(" · ")}</p>}
        <Buttons>
          {job.caseStudy && (
            <Link className="dos dos-hot" href={`/work/${job.caseStudy}`} onClick={close}>
              &lt; Case study &gt;
            </Link>
          )}
          <button type="button" className="dos" onClick={close}>
            &lt; Close &gt;
          </button>
        </Buttons>
      </div>
    </DialogWindow>
  );
}

function AboutDialog({ hometown }: { hometown: string }) {
  const { dialog, closeDialog } = useDesktop();
  const close = () => closeDialog("about");

  return (
    <DialogWindow
      open={dialog?.kind === "about"}
      onClose={close}
      title="ABOUT THIS DESKTOP"
      titleId="dialog-about"
      badge="?"
      width={580}
    >
      <div className="flex flex-col gap-3.5">
        <p className="m-0 text-[32px] leading-none">kedavema desktop 1.0</p>
        <p className="m-0">Made in Asunción by someone from {hometown}.</p>
        <p className="m-0">
          The wallpaper is a guitar for {hometown}, Paraguay&apos;s folklore capital. The telegram
          office is Tacuaral, the railway stop the town grew around.
        </p>
        <p className="m-0 text-dim">
          Built with Next.js and TypeScript.{" "}
          <a className="link" href="https://github.com/kedavema/kedavema-dev">
            Source on GitHub
          </a>
          .
        </p>
        <Buttons>
          <button type="button" className="dos dos-hot" onClick={close}>
            &lt; OK &gt;
          </button>
        </Buttons>
      </div>
    </DialogWindow>
  );
}

const KEYS: Array<[string, string]> = [
  ["W", "Open the Work menu"],
  ["D", "Download the résumé"],
  ["T", "Send a telegram"],
  ["H", "This window"],
  ["Alt-X", "Exit"],
  ["Esc", "Close any window"],
];

function KeysDialog() {
  const { dialog, closeDialog } = useDesktop();
  const close = () => closeDialog("keys");

  return (
    <DialogWindow open={dialog?.kind === "keys"} onClose={close} title="KEYBOARD" titleId="dialog-keys" badge="?" width={480}>
      <div className="flex flex-col gap-4">
        <dl className="m-0 grid grid-cols-[minmax(0,7ch)_minmax(0,1fr)] gap-x-[1ch] gap-y-1">
          {KEYS.map(([key, action]) => (
            <div key={key} className="contents">
              <dt className="text-link">{key}</dt>
              <dd className="m-0">{action}</dd>
            </div>
          ))}
        </dl>
        <Buttons>
          <button type="button" className="dos dos-hot" onClick={close}>
            &lt; OK &gt;
          </button>
        </Buttons>
      </div>
    </DialogWindow>
  );
}

function ExitDialog() {
  const { dialog, closeDialog, openDialog } = useDesktop();
  const close = () => closeDialog("exit");

  return (
    <DialogWindow open={dialog?.kind === "exit"} onClose={close} title="EXIT" titleId="dialog-exit" badge="!" width={500}>
      <div className="flex flex-col gap-5 text-center">
        <p className="m-0">There&apos;s no exit, but there is a telegraph office.</p>
        <Buttons>
          <button type="button" className="dos dos-hot" onClick={() => openDialog("telegram")}>
            &lt; Send a telegram &gt;
          </button>
          <button type="button" className="dos" onClick={close}>
            &lt; Stay &gt;
          </button>
        </Buttons>
      </div>
    </DialogWindow>
  );
}

function TelegramDialog({ links }: { links: Links }) {
  const { dialog, closeDialog } = useDesktop();

  return (
    <DialogWindow
      open={dialog?.kind === "telegram"}
      onClose={() => closeDialog("telegram")}
      title="TELEGRAM · TACUARAL STATION"
      titleId="dialog-telegram"
      badge="T"
      width={640}
    >
      <div className="flex flex-col gap-3.5">
        <p className="m-0 text-dim">
          Ypacaraí grew around a railway stop from 1864 called Tacuaral. This is its telegraph office,
          back in service for this website.
        </p>
        <TelegramForm links={links} />
      </div>
    </DialogWindow>
  );
}


export function Dialogs({
  jobs,
  links,
  hometown,
}: {
  jobs: DesktopJob[];
  links: Links;
  hometown: string;
}) {
  return (
    <>
      <JobDialog jobs={jobs} />
      <AboutDialog hometown={hometown} />
      <KeysDialog />
      <ExitDialog />
      <TelegramDialog links={links} />
    </>
  );
}
