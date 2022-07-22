import { Directory, FileSystem } from '../models';

const myFs = new FileSystem('~');
const projects = new Directory('projects');
const about = new Directory('about');
const experience = new Directory('expericence');
const volunteer = new Directory('volunteer');

const reactTerminal = new Directory('react-terminal');
const draw2Html = new Directory('Draw2HTML');
projects.insertItem(reactTerminal);
projects.insertItem(draw2Html);

myFs.insertItem(projects);
myFs.insertItem(about);
myFs.insertItem(experience);
myFs.insertItem(volunteer);

export default myFs;
