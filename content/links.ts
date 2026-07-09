import { linksSchema, type Links } from "./types";

export const links: Links = linksSchema.parse({
  email: "kedavema@gmail.com",
  github: "https://github.com/kedavema",
  linkedin: "https://www.linkedin.com/in/velazquez-kevin/",
  resumeUrl: "/resume.pdf",
});
