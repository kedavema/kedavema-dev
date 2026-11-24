import Link from "next/link";
import { Window } from "@/components/desktop/Window";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[560px] pt-10">
      <Window title="ERROR" titleAs="h1" badge="!" active titleId="w-error">
        <div className="flex flex-col gap-5 text-center">
          <p className="m-0 text-[30px] leading-none">File not found.</p>
          <p className="m-0 text-dim">Abort, Retry, Fail?</p>
          <div className="flex flex-wrap justify-center gap-x-[26px] gap-y-[22px] pt-2">
            <Link className="dos dos-hot" href="/">
              &lt; Back to the desktop &gt;
            </Link>
          </div>
        </div>
      </Window>
    </div>
  );
}
