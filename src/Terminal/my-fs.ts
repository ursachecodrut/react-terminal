import { Directory, File, FileSystem } from '../models';

const myFs = new FileSystem('~');
const projects = new Directory('projects');
const about = new Directory('about');
const experience = new Directory('experience');
const volunteer = new Directory('volunteer');
const skills = new Directory('skills');

// react terminal
const reactTerminal = new Directory('react-terminal');
const reactTerminalFile = new File('react-terminal', '');
reactTerminal.insertItem(reactTerminalFile);

// draw2HTML
const draw2Html = new Directory('Draw2HTML');
const draw2HtmlFile = new File(
	'draw2HTML',
	'Machine Learning script built with Python and OpenCV that converts basic digital or pen and paper sketches into HTML and CSS code. The program splits the drawing into individual elements based on color and position, then transforms them into HTML tags.'
);
draw2Html.insertItem(draw2HtmlFile);

projects.insertItem(reactTerminal);
projects.insertItem(draw2Html);

// about me
const aboutmeFile = new File(
	'about-me',
	'My name is Codrut Ursache. I am a second year student of Bachelor in Computer Science at University Politehnica of Bucharest. I love working in React, Node, NestJs, Express, JavaScript and more.'
);
about.insertItem(aboutmeFile);

const languages = new File(
	'languages',
	'Javascript, Typescript, Java, C, Python'
);
const tools = new File('tools', 'Linux, Git, MongoDB, Postgresql');
const frameworks = new File(
	'frameworks',
	'ReactJs, NestJs, Prisma, Tailwind, MaterialUI, Express, Boostrap'
);
skills.insertItem(languages);
skills.insertItem(tools);
skills.insertItem(frameworks);

myFs.insertItem(projects);
myFs.insertItem(about);
myFs.insertItem(experience);
myFs.insertItem(volunteer);
myFs.insertItem(skills);

export default myFs;
