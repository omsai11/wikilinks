import fetch from "node-fetch";
import { load } from "cheerio";
import pretty from "pretty";
var lvda="capacitor";
const url='https://en.wikipedia.org/wiki/';

const response=await fetch(url);
const body=await response.text();

let $ =load(body);
let title=$('.mw-parser-output p');
console.log(title.text());
