/* eslint-disable max-len */

export type PersonData = {
  id: number;
  name: string;
  role: string;
  brief: string;
  avatar: string;
  github: string;
};

export const teamData: PersonData[] = [
  {
    id: 1,
    name: 'NataliyaMoon',
    role: 'developer',
    brief: `NataliyaBrief`,
    avatar: '/avatars/natasha.jpg',
    github: 'https://github.com/nataliyamoon',
  },
  {
    id: 2,
    name: 'AnnaIvanova',
    role: 'teamLead',
    brief: `AnnaBrief`,
    avatar: '/avatars/anna.jpg',
    github: 'https://github.com/AnnaSergeevnaIv',
  },
  {
    id: 3,
    name: 'AndrewM',
    role: 'developer',
    brief: `AndrewBrief`,
    avatar: '/avatars/andrew.jpg',
    github: 'https://github.com/dusixx',
  },
];
