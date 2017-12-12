//Database
dbLocation = '127.0.0.1:27017/PathfinderDB';
var db = require('monk')(dbLocation);
//Models
var users = db.get('users');
var games = db.get('games');
var characters = db.get('characters');
var stories = db.get('stories');
var manual = db.get('manual');

// manual.insert([
// 	{type:'race',title:'elfe',text:'blabla elfe'},
// 	{type:'race',title:'humain',text:'blabla humain'},
// 	{type:'race',title:'nain',text:'blabla nain'},
// ]);

manual.insert([
	{type:'class',title:'guerrier',text:'blabla guerrier'},
	{type:'class',title:'magicien',text:'blabla magicien'},
	{type:'class',title:'pretre',text:'blabla pretre'},
	{type:'class',title:'roublard',text:'blabla roublard'}
]);