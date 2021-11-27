import { SIDE_NAV_LIGHT, NAV_TYPE_SIDE, DIR_LTR } from 'constants/ThemeConstant';
import { env } from './EnvironmentConfig'

export const APP_NAME = 'ArredoBimboDashboard';
export const API_BASE_URL = 'https://arredobimbo.github.io/Dashboard/'

export const APP_PREFIX_PATH = '/Dashboard/app';

export const AUTH_PREFIX_PATH = '/Dashboard/auth';

export const THEME_CONFIG = {
	navCollapsed: false,
	sideNavTheme: SIDE_NAV_LIGHT,
	locale: 'en',
	navType: NAV_TYPE_SIDE,
	topNavColor: '#3e82f7',
	headerNavColor: '',
	mobileNav: false,
	currentTheme: 'light',
	direction: DIR_LTR
};

// ************************* configurazioni per le form riguardanti l'inserimento di un nuvoo articolo *********************
export const ultimiArrivi = ['Si', 'No'];

export const gratis = ['Si', 'No'];

export const personalizzazione = ['Si', 'No'];

export const taglie_tutte = ["x", "y", "z"];

export const categorie = ['A-spasso', 'Bagnetto', 'arredamento', 'sicurezza', 'gioco-e-relax', 'offerte', 'marchi', 'abbigliamento', 'pappa'];

export const sottocategorie = {
	'A-spasso':
		['passeggini-trio-e-duo', 'passeggini-leggeri', 'accessori-per-passeggiare', 'passeggini-gemellari', 'Carrozzine-e-navicelle', 'marsupi-e-zaini'],

	'Bagnetto': ['fasciatoio-e-bagnetti', 'vaschette-da-bagno', 'salute-e-benessere', 'igiene'],

	'arredamento': ['Culle-per-neonati', 'lettini', 'armadietti', 'complementi-d-arredo', 'accessori-camerette', 'lettini-neonati',
		'cassettiere', 'materassi-e-cuscini', 'accessori-culla', 'fiocchi-nascita'],

	'sicurezza': ['cancelletti', 'zanzariere', 'barriere-da-letto', 'paraspigoli', 'solari'],

	'gioco-e-relax': ['giocattoli', 'box-e-recinti', 'girelli', 'biciclette', 'altalene-e-dondoli', 'palestrine', 'sdraiette'],

	'offerte': ['Non disponbile'],

	'marchi': ['Non disponibile'],

	'abbigliamento': ['mussole'],

	'pappa': ['allattamento', 'seggiolini-pappa', 'sediolini-da-tavolo', 'alazasedia', 'accessori-per-sediolini', 'accessori-per-la-pappa',
		'alimentazione', 'accessori-per-la-dentizione']
};

export const rules = {
	name: [
		{
			required: true,
			message: 'Inserisci il nome del prodotto',
		}
	],
	description: [
		{
			required: true,
			message: 'Inserisci una descrizione per il prodotto',
		}
	],
	categoria: [
		{
			required: true,
			message: 'Inserisci la categoria per il prodotto',
		}
	],
	sottocategoria: [
		{
			required: true,
			message: 'Inserisci la sottocategoria per il prodotto',
		}
	],
	colori: [
		{
			required: true,
			message: 'Inserisci almeno un colore per il prodotto',
		}
	],
	taglia: [
		{
			required: true,
			message: 'Inserisci almeno una taglia',
		}
	],
	numColori: [
		{
			required: true,
			message: 'Inserisci almeno un numero per il colore selezionato',
		}
	],
	price: [
		{
			required: true,
			message: 'Inserisci il prezzo del prodotto',
		}
	],
	ultimiArrivi: [
		{
			required: false,
		}
	],
	gratis: [
		{
			required: false,
		}
	],
	sconto: [
		{
			required: false,
		}
	],
	numero_pezzi: [
		{
			required: true,
			message: 'Inserisci la disponibilità del prodotto',
		}
	],
	marca: [
		{
			required: true,
			message: 'Inserisci la marca del prodotto',
		}
	],
	costo_personalizzazione: [
		{
			required: true,
			message: 'Inserisci il costo di personalizzazione del prodotto',
		}
	], 
	descrizione_personalizzazione: [
		{
			required: false,
		}
	],
	personalizzazione: [
		{
			required: true,
			message: 'Inserisci la possibilità di personalizzare o meno il prodotto',
		}
	],
	correlati: [
		{
			required: false,
		}
	],
	lunghezza: [
		{
			required: true,
		}
	],
	larghezza: [
		{
			required: true,
		}
	],
	peso: [
		{
			required: false,
		}
	],
	altezza: [
		{
			required: true,
		}
	],
	materiale: [
		{
			required: false,
		}
	],
};

export const colori = [
	"Acquamarina",
	"Albicocca",
	"Amaranto",
	"Ambra",
	"Ametista",
	"Anguria",
	"Antracite",
	"Aragosta",
	"Arancione",
	"Ardesia",
	"Argento",
	"Asparago",
	"Avio",
	"Avorio",
	"Azalea",
	"Azzurro",
	"Azzurrofiordaliso",
	"Beige",
	"Beigeolivachiaro",
	"Beigeverdastro",
	"Bianco",
	"Biancoantico",
	"Biancoantiflash",
	"Biancodititanio",
	"Biancodizinco",
	"Biancofantasma",
	"Biancofloreale",
	"Biancofumo",
	"BiancoNavajo",
	"Biscotto",
	"Bistro",
	"Blu",
	"Bluacciaio",
	"Blualice",
	"BluBondi",
	"Blucadetto",
	"Bluceruleo",
	"Blucomandostellare",
	"BludiPersia",
	"BludiPrussia",
	"BluDodger",
	"Bluelettrico",
	"Blumarino",
	"Blumedio",
	"Blunotte",
	"Bluoltremare",
	"Blupolvere",
	"Blupolverescuro",
	"Blureale",
	"Bluscuro",
	"Bordeaux",
	"Borgogna",
	"Bronzo",
	"Bronzoantico",
	"Camoscio",
	"Carbone",
	"Cardo",
	"Carminio",
	"Cartadazucchero",
	"Castagno",
	"Castagnoscuro",
	"Castagnochiaro",
	"Catrame",
	"Catramescuro",
	"Celadon",
	"Celeste",
	"Ceruleo",
	"Ceruleoscuro",
	"Chartreuse",
	"Ciano",
	"Ciliegia",
	"Cioccolato",
	"Cobalto",
	"Conchiglia",
	"Corallo",
	"Crema",
	"Cremisi",
	"Denim",
	"Denimchiaro",
	"Eliotropo",
	"Acru",
	"Fioredigranturco",
	"Fogliadite",
	"Fucsia",
	"Fulvo",
	"Gainsboro",
	"Giada",
	"Giallo",
	"Giallomiele",
	"GialloNapoli",
	"Giallopastello",
	"Giallosabbia",
	"Giallosegnale",
	"Gialloscuolabus",
	"Glicine",
	"Granata",
	"Grano",
	"Grigio5",
	"Grigioasparago",
	"Grigioardesia scuro",
	"Grigioardesia chiaro",
	"Grigiocenere",
	"Grigiotopo",
	"Incarnatoprugna",
	"Indaco",
	"Indacoelettrico",
	"Indacoscuro",
	"InternationalKleinBlue",
	"Isabella",
	"Kaki",
	"Kakichiaro",
	"Kakiscuro",
	"Lampone",
	"Lavanda",
	"Lavandapallido",
	"Lavandarosata",
	"Limone",
	"Limonecrema",
	"Lilla",
	"Lime",
	"Lino",
	"Magenta",
	"Magentachiaro",
	"Magnolia",
	"Malva",
	"Malvachiaro",
	"Mandarino",
	"Marrone",
	"Marronechiaro",
	"Marronepastello",
	"Marronerosso",
	"Marronesabbiachiaro",
	"Marronescuro",
	"Melanzana",
	"Mogano",
	"Nero",
	"Ocra",
	"Olivina",
	"Orchidea",
	"Oro",
	"Orovecchio",
	"Ottoneantico",
	"Ottanio",
	"Papaia",
	"Pera",
	"Pervinca",
	"Pesca",
	"Pescascuro",
	"Pescaarancio",
	"Pescagiallo",
	"Pistacchio",
	"Platino",
	"Porpora",
	"Prugna",
	"Rame",
	"Rosa",
	"Rosaarancio",
	"Rosamedio",
	"RosaMountbatten",
	"Rosapallido",
	"Rosapastello",
	"Rosascuro",
	"Rosashocking",
	"Rosavivo",
	"Rosso",
	"Rossoaragosta",
	"Rossocardinale",
	"Rossocorsa",
	"RossoFalun",
	"Rossofragola",
	"Rossofuoco",
	"Rossomattone",
	"Rossomattonechiaro",
	"Rossopomodoro",
	"Rossopompeiano",
	"Rossorosa",
	"Rossosangue",
	"Rossosegnale",
	"RossoTiziano",
	"Rossoveneziano",
	"Rossoviolettochiaro",
	"Rubino",
	"Sabbia",
	"Salmone",
	"Salmonescuro",
	"Sangria",
	"Scarlatto",
	"Scarlattoscuro",
	"Senape",
	"Seppia",
	"Solidago",
	"Solidagoscuro",
	"Tanno",
	"Tenne",
	"Terradombra",
	"Terradombrabruciata",
	"TerradiSiena",
	"TerradiSienabruciata",
	"Testadimoro",
	"Teverde",
	"Tronco",
	"Turchese",
	"Turchesechiaro",
	"Turchesepallido",
	"Turchesescuro",
	"Uovodipettirosso",
	"Uovodipettirossochiaro",
	"Verde",
	"VerdeCaraibi",
	"Verdeforesta",
	"Verdechiaro",
	"Verdegiallo",
	"Verdemarino",
	"Verdemarinomedio",
	"Verdemarinoscuro",
	"Verdementa",
	"Verdementachiaro",
	"Verdemuschio",
	"Verdeoliva",
	"Verdeolivastro",
	"Verdeolivascuro",
	"Verdepastello",
	"Verdepino",
	"Verdeprimavera",
	"Verdeprimaverascuro",
	"Verdeufficio",
	"Verdesmeraldo",
	"VerdeVeronese",
	"Vermiglio",
	"Viola",
	"Violachiaro",
	"Viola melanzana",
	"Violetto",
	"Vinaccia",
	"Zafferano",
	"Zafferano profondo",
	"Zaffiro",
];