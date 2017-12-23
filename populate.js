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
//  	{type:'race',title:'elfe',text:'blabla elfe'},
//  	{type:'race',title:'humain',text:'blabla humain'},
//  	{type:'race',title:'nain',text:'blabla nain'}
// ]);

// manual.insert([
// 	{type:'class',title:'guerrier',text:'blabla guerrier'},
// 	{type:'class',title:'magicien',text:'blabla magicien'},
// 	{type:'class',title:'pretre',text:'blabla pretre'},
// 	{type:'class',title:'roublard',text:'blabla roublard'}
// ]);

// manual.insert([
// 	{type:'competances','title':'equilibre','carac':'Dexterité (DEX)','text':"Si vous faites un test d'acrobaties, vous pouvez vous déplacer à la moitié de votre vitesse sur une corniche ou meme sur une corde pendant 1 round. Si vous recevez des dégats alors que vous tentez de garder l'équilibre vous devez réussir un autre test, sinon vous mourrez",'results':{'column1':['title':'Largeur de la surface','values':['30cm ou plus','15 a 29cm','4 à 14 cm','moins de 2 cm']],'column2':['title':'DD acrobaties','values':['pas besoin','10','15','20']]}}
// ]);

//Pièges
manual.insert([
	{type:'piege',title:'Flèche',fp:1,xp,400,description:{type:'mecanique',perception:'DD 20',sabotage:'DD 20',declancheur:'contact',remiseenplace:'aucune',effets:'Att +15 distance (1d8+1/x3)'}},
	{type:'piege',title:'Fosse camouflée',fp:1,xp,400,description:{type:'mecanique',perception:'DD 20',sabotage:'DD 20',declancheur:'emplacement',remiseenplace:'manuelle',effets:"6m de profondeur (2d6, chute); jet de Réflexes permet d'éviter la chute (DD 20); cibles multiples (toutes les cibles dans un rayon de 3m)"}},
	{type:'piege',title:'Dard empoisonné',fp:1,xp,400,description:{type:'mecanique',perception:'DD 20',sabotage:'DD 20',declancheur:'contact',remiseenplace:'aucune',effets:'Att +10 distance (1d3 plus jet de Vigueur DD 13 ou 10 dégâts de poison)'}},
	{type:'piege',title:'Lame dissimulée dans un mur',fp:1,xp,400,description:{type:'mecanique',perception:'DD 20',sabotage:'DD 20',declancheur:'espace',remiseenplace:'manuelle',effets:'Att +10 corps à corps (1d8+1/x3); ciblrs multiples ( toutes les cibles sur une ligne de 3m )'}},
	{type:'piege',title:'Main brûlantes',fp:2,xp,600,description:{type:'magique',perception:'DD 26',sabotage:'DD 26',declancheur:'proximité (alarme)',remiseenplace:'aucune',effets:'Effet magique - mains brûlantes, 2d4 feu, jet de reflexes (DD 11) 1/2 dégâts; cibles multiples (toutes les cibles dans un cône de 4,5 m)'}},
	{type:'piege',title:'Javeline',fp:2,xp,600,description:{type:'mecanique',perception:'DD 20',sabotage:'DD 20',declancheur:'espace',remiseenplace:'aucune',effets:'Att +15 distance (1d6+6)'}},
	{type:'piege',title:'Fosse hérissée de pieux',fp:2,xp,600,description:{type:'mecanique',perception:'DD 20',sabotage:'DD 20',declancheur:'espace',remiseenplace:'manuelle',effets:'3m de profondeur (1d6, chute); pieux(Att +10 cors à corps, 1d4 pieux par cible, 1d4+2 chacun); jet de Réflexes (DD 20) pour éviter la chute; cilbes multiples( toutes les cibles dans un rayon de 3m)'}},
	{type:'piege',title:'Flèche acide',fp:3,xp,800,description:{type:'magique',perception:'DD 27',sabotage:'DD 27',declancheur:'proximité (alarme)',remiseenplace:'aucune',effets:'Effet magique - flèche acide, Att +2 contact à distance, 2d4 acide/round pendant 4 rounds'}},
	{type:'piege',title:'Fosse camouflée',fp:3,xp,800,description:{type:'mecanique',perception:'DD 25',sabotage:'DD 20',declancheur:'espace',remiseenplace:'manuelle',effets:'3 m de profondeur (3d6, chute); jet de Réflexes(DD 20) pour éviter la chute; cibles multiples ( toutes les clibles dans un rayon de 3m )'}},	
	{type:'piege',title:'Arc électrique',fp:4,xp,1200,description:{type:'mecanique',perception:'DD 25',sabotage:'DD 20',declancheur:'contact',remiseenplace:'aucune',effets:'Arc électrique (4d6 électricité, jet de Réflexes 1/2 dégâts); cibles multiples ( toutes les cilbes dans une ligne de 9m)'}},
	{type:'piege',title:'Faux dissimulée dans un mur',fp:4,xp,1200,description:{type:'mecanique',perception:'DD 20',sabotage:'DD 20',declancheur:'espace',remiseenplace:'automatique',effets:'Att +20 corps à corps (2d4+6/x4'}},
	{type:'piege',title:"Chute d'un bloc de pierre",fp:5,xp,1600,description:{type:'mecanique',perception:'DD 20',sabotage:'DD 20',declancheur:'espace',remiseenplace:'manuelle',effets:'Att +15 corps à corps (6d6); cibles multiples ( toutes les cilbes dans un rayon de 3m)'}},
	{type:'piege',title:'Boule de feu',fp:5,xp,1600,description:{type:'magique',perception:'DD 28',sabotage:'DD 28',declancheur:'proximité (alarme)',remiseenplace:'aucune',effets:'Effet magique - boule de feu, 6d6 feu, jet de Réflexes ( DD 14 ) 1/2 dégâts; ciblrs multiples (toutes les cilbes dans un rayon de 6m)'}}
]);

manual.insert([
	{type:'infos',title:'Soliditié et points de vie des objets',titles:['materiau','soliditie','vie'],values:[
		{materiau:'Verre',soliditie:1,vie:"1/2,5 cm d'épaisseur"},
		{materiau:'Papier ou tissu',soliditie:0,vie:"2/2,5 cm d'épaisseur"},
		{materiau:'Corde',soliditie:0vie:"2/2,5 cm d'épaisseur"},
		{materiau:'Glace',soliditie:0,vie:"3/2,5 cm d'épaisseur"},
		{materiau:'Cuir ou peau',soliditie:2,vie:"5/2,5 cm d'épaisseur"},
		{materiau:'Bois',soliditie:5,vie:"10/2,5 cm d'épaisseur"},
		{materiau:'Pierre',soliditie:8,vie:"15/2,5 cm d'épaisseur"},
		{materiau:'Fer ou acier',soliditie:10,vie:"30/2,5 cm d'épaisseur"}
	]},
	{type:'infos',title:"Classe d'armure des objets",titles:["taille","ca"],values:[
		{taille:'Mouche',ca:'11'},
		{taille:'Crapaud',ca:'7'},
		{taille:'Poulet',ca:'5'},
		{taille:'Gobelin',ca:'4'},
		{taille:'Humain',ca:'3'},
		{taille:'Ogre ou cheval',ca:'2'},
		{taille:'Eléphant',ca:'1'},
		{taille:'Maison',ca:'-1'}
	]},
	{type:'infos',title:"Murs",titles:["type","epaisseur","dd pour defoncer","solidite","vie","dd escalade"],values:[
		{type:"Maçonerie",epaisseur:"30 cm",ddpourdefoncer:35,soliditie:8,vie:90,ddescalade:20},
		{type:"Pierre taillée",epaisseur:"90 cm",ddpourdefoncer:50,soliditie:8,vie:540,ddescalade:25},
		{type:"Pierre brute",epaisseur:"1,5 m",ddpourdefoncer:65,soliditie:8,vie:900,ddescalade:15},
		{type:"Papier",epaisseur:"Négligeable",ddpourdefoncer:1,soliditie:0,vie:1,ddescalade:30},
		{type:"Fer",epaisseur:"7,5 cm",ddpourdefoncer:30,soliditie:10,vie:90,ddescalade:25},
		{type:"Bois",epaisseur:"15 cm",ddpourdefoncer:20,soliditie:5,vie:60,ddescalade:21}
	]},
	{type:'infos',title:"Portes",titles:["type","epaisseur","solidite","vie","coince","verouille"],values:[
		{type:"Bois, normale",epaisseur:"2,5 cm",soliditie:5,vie:10,coince:13,verouille:15},
		{type:"Bois, solide",epaisseur:"4 cm",soliditie:5,vie:15,coince:16,verouille:18},
		{type:"Bois, epaisse",epaisseur:"5 cm",soliditie:5,vie:20,coince:23,verouille:25},
		{type:"Pierre",epaisseur:"10 cm",soliditie:8,vie:60,coince:28,verouille:28},
		{type:"Fer",epaisseur:"5 cm",soliditie:10,vie:60,coince:28,verouille:28},
		{type:"Herse, bois",epaisseur:"7,5cm",soliditie:5,vie:30,coince:25,verouille:25},
		{type:"Herse, fer",epaisseur:"5 cm",soliditie:10,vie:60,coince:25,verouille:25},
		{type:"Serrure",epaisseur:"",soliditie:15,vie:30,coince:0,verouille:0},
		{type:"Gond",epaisseur:"",soliditie:15,vie:30,coince:0,verouille:0}
	]}
]);