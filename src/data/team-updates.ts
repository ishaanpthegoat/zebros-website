export type TeamUpdate = {
  id: string;
  date: string;
  dateLabel: string;
  category: string;
  title: string;
  paragraphs: string[];
  photos?: { src: string; alt: string; caption: string }[];
};

// Dates refer to team updates, rather than publication or inferred completion dates.
export const teamUpdates: TeamUpdate[] = [
  {
    id: "november-testing",
    date: "2026-11-10",
    dateLabel: "November 2–10, 2026",
    category: "Testing & preparation",
    title: "From an assembled robot to a reliable one",
    paragraphs: [
      "Our focus is now on getting the robot running reliably. We are coordinating CAD files and printed parts, working on programming, and asking the team to record tests, including the attempts that do not work. Those videos will help us see what needs to change.",
      "We are also preparing for scrimmages. A December invitation from FTC 6078 Cut The Red Wire is being reviewed with our coaches. An event choice and registration are still pending. We will share confirmed plans when they are ready.",
    ],
  },
  {
    id: "october-robot",
    photos: [
      { src: "/img/updates/2026-10-28-workshop.webp", alt: "Front view of the assembled robot with roller intake, yellow ramp, and pink shooter", caption: "October 28: the assembled mechanisms on the workshop table. Photo shared by Sanya." },
      { src: "/img/updates/2026-10-29-robot-front.webp", alt: "Assembled Zebros robot on the practice field beside colored game balls", caption: "October 29: the robot on the practice field. Photo shared by Nivaan." },
      { src: "/img/updates/2026-10-29-robot-side.webp", alt: "Side view showing the robot wiring, drivetrain, and pink upper mechanism", caption: "October 29: a closer look at the chassis and upper mechanism. Photo shared by Nivaan." },
    ],
    date: "2026-10-29",
    dateLabel: "October 28–29, 2026",
    category: "Robot build",
    title: "The robot comes together",
    paragraphs: [
      "New workshop and field photos show the intake, front ramp, and pink upper mechanism together on the robot. It is a clear step forward from the drivetrain photos we shared a week earlier.",
      "Assembly is one milestone. Driving, intake testing, and programming are the next priorities. We also discussed an alternate CAD concept as a backup if the current design needs a larger change.",
    ],
  },
  {
    id: "october-community",
    photos: [
      { src: "/img/updates/2026-10-27-pink-day.webp", alt: "Pink Day poster asking the team to wear pink on October 27 for breast cancer awareness", caption: "Pink Day artwork shared by Aarnavi on October 24 for October 27." },
    ],
    date: "2026-10-27",
    dateLabel: "October 24–28, 2026",
    category: "Team & community",
    title: "Pink Day, team photos, and workshop ideas",
    paragraphs: [
      "We shared our Pink Day poster for October 27 to promote breast cancer awareness and collected team portraits for our documentation. A final pink team shirt design was also shared on October 24.",
      "For outreach, we prepared workshop ideas for different age groups and arranged a planning call with the Boys & Girls Club. The October 28 call could not go ahead because the meeting link did not arrive. Reconnecting and arranging a new time remain next steps.",
    ],
  },
  {
    id: "october-drivetrain",
    photos: [
      { src: "/img/updates/2026-10-22-ramp.webp", alt: "Front of the drivetrain with a yellow ramp between the wheels", caption: "October 22: front view of the drivetrain and ramp. Photo shared by Sanya." },
      { src: "/img/updates/2026-10-22-drivetrain.webp", alt: "Side of the robot chassis with REV Control Hub and mecanum wheels", caption: "October 22: chassis, wheels, and mounted control hub. Photo shared by Sanya." },
    ],
    date: "2026-10-22",
    dateLabel: "October 22–24, 2026",
    category: "Build milestone",
    title: "Drivetrain and ramp built",
    paragraphs: [
      "On October 22, we shared six build photos and reported that the drivetrain and ramp were finished. The intake parts had also been printed for the next assembly session.",
      "That opened up work on wiring, driving code, and basic autonomous movement on the actual robot. Alongside the build, we split up portfolio and website work and started asking everyone to photograph their session notes so progress is easier to track.",
    ],
  },
  {
    id: "october-transfer",
    date: "2026-10-17",
    dateLabel: "October 17–20, 2026",
    category: "Build & outreach",
    title: "Transfer assembly and the next parts arrive",
    paragraphs: [
      "Our October 17 build recap records the arrival of parts, construction of the transfer, and a gear being attached to the shooter. Team shirt design was also underway. On October 20, our coach confirmed that the SendCutSend parts had arrived.",
      "Outreach moved forward too. On October 20, we reported a reply from the Boys & Girls Club of Wake and Johnston Counties about discussing a STEM workshop. Early ideas included SPIKE robots and an FLL mat, subject to available materials.",
    ],
  },
  {
    id: "october-shooter",
    date: "2026-10-13",
    dateLabel: "October 10–13, 2026",
    category: "Iteration & testing",
    title: "A shooter test, a motor change, and another try",
    paragraphs: [
      "On October 10, we printed and ordered parts, built the shooter, and tested it. That first test did not work. By October 13, changing the shooter motor got the mechanism working, but it was too powerful and needed its power reduced in code.",
      "We also printed the turret gears in carbon-fiber PLA. These tests gave us specific changes to make before putting the mechanisms together on the robot.",
    ],
  },
  {
    id: "october-drivetrain-code",
    date: "2026-10-06",
    dateLabel: "September 29–October 6, 2026",
    category: "Mechanical & programming",
    title: "Chains, robot code, and a finished CAD model",
    paragraphs: [
      "The programming team continued its alignment work while mechanical work moved into the drivetrain. On October 3, we added chains to the motors on each side and imported code to the robot.",
      "Our October 6 recap marked the drivetrain and full Onshape model as finished at that stage. We reviewed the rules and sketched the controller layout. Odometry wheels and basic autonomous movement were still on the to-do list.",
    ],
  },
  {
    id: "september-mechanisms",
    date: "2026-09-26",
    dateLabel: "September 26, 2026",
    category: "Design & testing",
    title: "Testing intake materials and refining the shooter",
    paragraphs: [
      "We compared surgical tubing and gecko wheels for the intake. Surgical tubing pulled balls in most effectively in those tests, so our next idea was to combine it with gecko wheels and explore wheels at the sides of the intake.",
      "Our shooter discussion focused on a servo-controlled padded backplate, a gate to manage incoming balls, and ways to speed up the mechanism. We also designed a string-linked ramp to guide game pieces toward the intake. We also split up the rulebook review so team members understood the requirements for upcoming events. These were design and testing steps before the later robot assembly.",
    ],
  },
];

export const latestTeamUpdate = teamUpdates[0];
