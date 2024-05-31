import { SidebarItem } from "./types";

export const DATA: SidebarItem[] = [
  {
    link: "/tablets",
    title: "Tablets",
    iconPath: (
      <>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 6a1 1 0 011-1h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 16.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        />
      </>
    ),
  },
  {
    link: "/videos",
    title: "Videos",
    iconPath: (
      <>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14V10z"
        />
        <rect
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          x="3"
          y="8"
          width="12"
          height="8"
          rx="2"
        />
      </>
    ),
  },
  {
    link: "/users",
    title: "Users",
    iconPath: (
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M17 20h5v-1a5 5 0 00-5-5H6a5 5 0 00-5 5v1h5m5-6a5 5 0 110-10 5 5 0 010 10zm-3 6v-1a3 3 0 013-3h4a3 3 0 013 3v1H9zm0 0H4"
      />
    ),
  },
  {
    link: "/email-stats",
    title: "Email stats",
    iconPath: (
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M16 2H8a2 2 0 00-2 2v16a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2zM8 6l4 3 4-3"
      />
    ),
  },
  {
    link: "/monitoring",
    title: "Monitoring",
    iconPath: (
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 20l-5.447-2.724A1 1 0 013 16.382V7.618a1 1 0 01.553-.894L9 4m0 16l5.447 2.724A1 1 0 0016 22h5a1 1 0 001-1v-8a1 1 0 00-.553-.894L15 8.618M9 4l5.447-2.724A1 1 0 0116 2h5a1 1 0 011 1v8a1 1 0 01-.553.894L15 15.382M9 4v12m6-12v12"
      />
    ),
  },
  {
    link: "/questionnaire",
    title: "Questionnaire",
    iconPath: (
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
      />
    ),
  },
];
