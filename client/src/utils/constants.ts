import { FilterOptionsType, HeaderMenuType } from "../vite-env";

export const headerMenu: HeaderMenuType[] = [
  { name: "Home", link: "/" },
  { name: "Jobs", link: "/jobs" },
  { name: "Browse", link: "/browse" },
];

export const carouselContent = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "React Js Developer",
];

export const filteOption: FilterOptionsType[] = [
  {
    filterType: "Location",
    filters: ["Pune","Mumbai","Delhi NCR","Hydrabad","Baglore","Nagour"],
  },
  {
    filterType: "Industry",
    filters: ["IT","Finance","Banking","Healthcare","Education"],
  },
  {
    filterType: "Salary",
    filters: ["0-40k", "41k-1lack", "1lack-5lack"],
  },
];


export const skills =["Javascript","React","HTML","CSS","Typescript","NodeJs","MongoDB"]