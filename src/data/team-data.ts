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
    name: 'Nataliya Moon',
    role: 'Developer',
    brief: `Hold a red diploma in Journalism and a Master’s degree in Social Sciences. A few years ago made a career shift to fullstack dev. Enjoy planning and structuring.`,
    avatar: '/avatars/natasha.jpg',
    github: 'https://github.com/nataliyamoon',
  },
  {
    id: 2,
    name: 'Anna Ivanova',
    role: 'Team Lead | Developer',
    brief: `Believes that on the path a wrong turn was taken... On the way to development, accidentally turned off and became an engineer in relay protection and automation. Trying to correct this unfortunate mistake.`,
    avatar: '/avatars/anna.jpg',
    github: 'https://github.com/AnnaSergeevnaIv',
  },
  {
    id: 3,
    name: 'Andrew M',
    role: 'Developer',
    brief: `Passionate about learning new technologies and building innovative projects. Key softskills: responsibility, attention to detail, eagerness to learn.`,
    avatar: '/avatars/andrew.jpg',
    github: 'https://github.com/dusixx',
  },
];
