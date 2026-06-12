// src/data/subscriptions.ts
import netflixlogo from "@/assets/netflixlogo.png";
import spotifylogo from "@/assets/spotifylogo.png";
import groupline from "@/assets/groupline.png";
import canvalogo from "@/assets/canvalogo.png";
import applelogo from "@/assets/applelogo.png";
import dropbox from "@/assets/dropbox.png";
import jira from "@/assets/jira.png";

export const subscriptionsData = [
  { id: 1, name: "Netflix", desc: "Streamline Movies and shows.", frequency: "Monthly", active: true, logo: netflixlogo },
  { id: 2, name: "AJo with Sophie, Lagos Nigeria", desc: "Group saving monthly plan.", frequency: "Monthly", active: true, logo: groupline },
  { id: 3, name: "AJo Gbemi", desc: "Group saving monthly plan.", frequency: "Monthly", active: true, logo: groupline },
  { id: 4, name: "Spotify", desc: "Streamline Music Platform.", frequency: "Yearly", active: true, logo: spotifylogo },
  { id: 5, name: "Canva", desc: "Creative platform for designs.", frequency: "Monthly", active: true, logo: canvalogo },
  { id: 6, name: "AJo with Linda.", desc: "Group saving monthly plan.", frequency: "Monthly", active: true, logo: groupline },
  { id: 7, name: "Apple Music", desc: "Creative platform for designs.", frequency: "Monthly", active: true, logo: applelogo },
  { id: 8, name: "Atlassian JIRA", desc: "Plan, track, and release great software.", frequency: "Monthly", active: true, logo: jira },
  { id: 9, name: "Dropbox", desc: "Everything you need for work, all in one place.", frequency: "Monthly", active: true, logo: dropbox },
];