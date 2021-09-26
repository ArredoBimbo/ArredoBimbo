import { SIDE_NAV_LIGHT, NAV_TYPE_SIDE, DIR_LTR } from 'constants/ThemeConstant';
import { env } from './EnvironmentConfig'

export const APP_NAME = 'ArredoBimboDashboard';
export const API_BASE_URL = 'https://arredobimbo.github.io/Dashboard/'

export const APP_PREFIX_PATH = '/';

export const AUTH_PREFIX_PATH = '/Dashboard/auth';
export const IP = 'http://localhost:8000';

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
export const categorie = ['A-spasso', 'Bagnetto', 'arredamento', 'sicurezza', 'gioco-e-relax', 'offerte', 'marchi', 'abbigliamento', 'pappa'];
export const sottocategorie =
{
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
	"Azzurro fiordaliso",
	"Beige",
	"Beige-oliva chiaro",
	"Beige verdastro",
	"Bianco",
	"Bianco antico",
	"Bianco anti-flash",
	"Bianco di titanio",
	"Bianco di zinco",
	"Bianco fantasma",
	"Bianco floreale",
	"Bianco fumo",
	"Bianco Navajo",
	"Biscotto",
	"Bistro",
	"Blu",
	"Blu acciaio",
	"Blu alice",
	"Blu Bondi",
	"Blu cadetto",
	"Blu ceruleo",
	"Blu comando stellare",
	"Blu di Persia",
"Blu di Prussia",
"Blu Dodger",
	"Blu elettrico",
	"Blu marino",
	"Blu medio",
	"Blu notte",
	"Blu oltremare",
"Blu polvere",
"Blu polvere scuro",
"Blu reale",
	"Blu scuro",
	"Bordeaux",
	"Borgogna",
	"Bronzo",
	"Bronzo antico",
	"Camoscio",
	"Carbone",
	"Cardo",
	"Carminio",
"	Carta da zucchero",
"	Castagno",
	"Castagno scuro",
	"Castagno chiaro",
	"Catrame",
	"Catrame scuro",
	"Celadon",
	"Celeste",
	"Ceruleo",
	"Ceruleo scuro",
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
	"Denim chiaro",
	"Eliotropo",
	"Écru",
	"Fiore di granturco",
	"Foglia di tè",
	"Fucsia",
	"Fulvo",
	"Gainsboro",
	"Giada",
	"Giallo",
	"Giallo miele",
	"Giallo Napoli",
	"Giallo pastello",
	"Giallo sabbia",
	"Giallo segnale",
	"Giallo scuolabus",
	"Glicine",
	"Granata",
	"Grano",
	"Grigio 5%",
	"Grigio 10%",
	"Grigio 15%",
	"Grigio 20%",
	"Grigio 25%",
	"Grigio 30%",
	"Grigio 35%",
	"Grigio 40%",
	"Grigio 50%",
	"Grigio 60%",
	"Grigio 70%",
	"Grigio 75%",
	"Grigio 80%",
	"Grigio asparago",
	"Grigio ardesia scuro",
	"Grigio ardesia chiaro",
	"Grigio cenere",
	"Grigio topo",
	"Incarnato prugna",
	"Indaco",
	"Indaco elettrico",
	"Indaco scuro",
	"International Klein Blue",
	"Isabella",
	"Kaki",
	"Kaki chiaro",
	"Kaki scuro",
	"Lampone",
	"Lavanda",
	"Lavanda pallido",
	"Lavanda rosata",
	"Limone",
	"Limone crema",
	"Lilla",
	"Lime",
	"Lino",
	"Magenta",
	"Magenta chiaro",
	"Magnolia",
	"Malva",
	"Malva chiaro",
	"Mandarino",
	"Marrone",
	"Marrone chiaro",
	"Marrone pastello",
	"Marrone-rosso",
	"Marrone sabbia chiaro",
	"Marrone scuro",
	"Melanzana",
	"Mogano",
	"Nero",
	"Ocra",
	"Olivina",
	"Orchidea",
	"Oro",
	"Oro vecchio",
	"Ottone antico",
	"Ottanio",
	"Papaia",
	"Pera",
	"Pervinca",
	"Pesca",
	"Pesca scuro",
	"Pesca-arancio",
	"Pesca-giallo",
	"Pistacchio",
	"Platino",
	"Porpora",
	"Prugna",
	"Rame",
	"Registration black",
	"Rosa",
	"Rosa arancio",
	"Rosa medio",
	"Rosa Mountbatten",
	"Rosa pallido",
	"Rosa pastello",
	"Rosa scuro",
	"Rosa shocking",
	"Rosa vivo",
	"Rosso",
	"Rosso aragosta",
	"Rosso cardinale",
	"Rosso corsa",
	"Rosso Falun",
	"Rosso fragola",
	"Rosso fuoco",
	"Rosso mattone",
	"Rosso mattone chiaro",
	"Rosso pomodoro",
	"Rosso pompeiano",
	"Rosso rosa",
	"Rosso sangue",
	"Rosso segnale",
	"Rosso Tiziano",
	"Rosso veneziano",
	"Rosso violetto chiaro",
	"Rubino",
	"Sabbia",
	"Salmone",
	"Salmone scuro",
	"Sangria",
	"Scarlatto",
	"Scarlatto scuro",
	"Senape",
	"Seppia",
	"Solidago",
	"Solidago scuro",
	"Tanno",
	"Tenné",
	"Terra d'ombra",
	"Terra d'ombra bruciata",
	"Terra di Siena",
	"Terra di Siena bruciata",
	"Testa di moro",
	"Tè verde",
	"Tronco",
	"Turchese",
	"Turchese chiaro",
	"Turchese pallido",
	"Turchese scuro",
	"Uovo di pettirosso",
	"Uovo di pettirosso chiaro",
	"Verde",
	"Verde Caraibi",
	"Verde foresta",
	"Verde chiaro",
	"Verde-giallo",
	"Verde marino",
	"Verde marino medio",
	"Verde marino scuro",
	"Verde menta",
	"Verde menta chiaro",
	"Verde muschio",
	"Verde oliva",
	"Verde olivastro",
	"Verde oliva scuro",
	"Verde pastello",
	"Verde pino",
	"Verde primavera",
	"Verde primavera scuro",
	"Verde ufficio",
	"Verde smeraldo",
	"Verde Veronese",
	"Vermiglio",
	"Viola",
	"Viola chiaro",
	"Viola melanzana",
	"Violetto",
	"Vinaccia",
	"Zafferano",
	"Zafferano profondo",
	"Zaffiro",

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
		
	
	
	
	
	
	
	
	
	
	
	];

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