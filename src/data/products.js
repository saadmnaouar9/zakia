export const categories = [
  { id: 'all', label: 'Tous' },
  { id: 'margarines', label: 'Margarines', tint: '#f6e7a8' },
  { id: 'sauces', label: 'Sauces', tint: '#f3c98b' },
  { id: 'ketchup', label: 'Ketchup', tint: '#f4b5ad' },
  { id: 'confitures', label: 'Confitures', tint: '#f7c9a0' },
  { id: 'miel', label: 'Miel', tint: '#f6dc9c' },
  { id: 'conserves', label: 'Conserves', tint: '#bcd8ee' },
  { id: 'charcuterie', label: 'Charcuterie', tint: '#f1b9a8' },
  { id: 'patisserie', label: 'Pâtisserie', tint: '#f4e089' },
]

const p = (id, name, cat, img, short, facts = [], extra = {}) => ({ id, name, cat, img, short, facts, ...extra })

export const products = [
  p('margarine-patissiere', 'Margarine pâtissière', 'margarines', 'margarine-patissiere', 'La margarine des gourmandises : viennoiseries, gâteaux et pâtes feuilletées.', ['100 % végétale'], { ar: 'مارجرين للحلويات' }),
  p('tartine-cuisson', 'Tartine & Cuisson', 'margarines', 'tartine-cuisson', 'Une margarine polyvalente pour tartiner le pain et cuisiner au quotidien.', ['100 % végétale', '0 % cholestérol', 'Riche en vitamines A, D, E'], { ar: 'للدهن والطبخ' }),
  p('sauce-algerienne', 'Sauce Algérienne', 'sauces', 'sauce-algerienne', 'Tomate, oignon et piment pour relever sandwichs, wraps et grillades.', ['Tomate, oignon, piment', 'Poids net 285 g']),
  p('sauce-barbecue', 'Sauce Barbecue', 'sauces', 'sauce-barbecue', 'Une sauce douce et fumée, idéale avec le poulet et les viandes grillées.', ['Tomate, arôme fumé, caramel', 'Poids net 300 g']),
  p('sauce-samourai', 'Sauce Samouraï', 'sauces', 'sauce-samourai', 'Piment, moutarde et jaune d’œuf : la sauce relevée des sandwichs.', ['Piment, moutarde, jaune d’œuf', 'Poids net 265 g']),
  p('mayonnaise', 'Mayonnaise', 'sauces', 'mayonnaise', 'Onctueuse et généreuse, pour les salades, sandwichs et accompagnements.', [], { ar: 'مايونيز' }),
  p('moutarde-dijon', 'Moutarde de Dijon', 'sauces', 'moutarde-dijon', 'Une moutarde franche pour assaisonner frites, poulet et vinaigrettes.', [], { ar: 'موطارد ديجون' }),
  p('vinaigre', 'Vinaigre d’alcool coloré', 'sauces', 'vinaigre', 'Le vinaigre de table du quotidien pour assaisonner salades et marinades.', ['Acidité 6 %', '50 cl']),
  p('seau-algerienne', 'Sauce Algérienne — seau', 'sauces', 'seau-algerienne', 'La sauce douce et savoureuse, en format seau.', ['Format seau'], { ar: 'ملمة الجبيرين' }),
  p('seau-andalouse', 'Sauce Andalouse — seau', 'sauces', 'seau-andalouse', 'La sauce douce et savoureuse, en format seau.', ['Format seau']),
  p('seau-biggy-burger', 'Sauce Biggy Burger — seau', 'sauces', 'seau-biggy-burger', 'Pour burgers et sandwichs : douce et savoureuse, en format seau.', ['Format seau']),
  p('seau-fajitas', 'Sauce Fajitas — seau', 'sauces', 'seau-fajitas', 'Une sauce forte et piquante pour fajitas et tacos, en format seau.', ['Sauce forte & piquante', 'Format seau']),
  p('seau-moutarde', 'Moutarde de Dijon — seau', 'sauces', 'seau-moutarde', 'La moutarde de Dijon en format seau.', ['Format seau']),
  p('seau-samourai', 'Sauce Samouraï — seau', 'sauces', 'seau-samourai', 'La sauce douce et savoureuse, en format seau.', ['Format seau']),
  p('ketchup-tomato', 'Ketchup Tomato', 'ketchup', 'ketchup-tomato', 'Le ketchup à la tomate, en flacon souple facile à doser.', [], { ar: 'كاتشب طماطم' }),
  p('seau-ketchup', 'Ketchup Tomato — seau', 'ketchup', 'seau-ketchup', 'Le ketchup à la tomate, douce et savoureuse, en format seau.', ['Format seau'], { ar: 'كاتشب طماطم' }),
  p('confiture-abricot', 'Confiture d’Abricot', 'confitures', 'confiture-abricot', 'Une confiture d’abricot à tartiner, en flacon souple.', ['Flacon souple']),
  p('confiture-fraise', 'Confiture de Fraise', 'confitures', 'confiture-fraise', 'Une confiture de fraise généreuse pour le petit-déjeuner et le goûter.', ['Flacon souple']),
  p('confiture-abricot-boite', 'Confiture d’Abricot — boîte', 'confitures', 'confiture-abricot-boite', 'La confiture d’abricot, en boîte métal.', ['Format boîte']),
  p('miel', 'Miel naturel', 'miel', 'miel', 'Un miel pur, à déguster sur le pain, dans le thé ou en pâtisserie.', ['Miel pur 100 %'], { ar: 'عسل طبيعي' }),
  p('thon', 'Thon entier à l’huile végétale', 'conserves', 'thon', 'Du thon entier à l’huile végétale, riche en oméga 3.', ['Riche en oméga 3'], { ar: 'تون كامل بالزيت النباتي' }),
  p('maquereaux', 'Filets de maquereaux', 'conserves', 'maquereaux', 'Des filets de maquereaux à l’huile végétale, riches en oméga 3.', ['À l’huile végétale', 'Riche en oméga 3']),
  p('concentre-tomates', 'Concentré de tomates', 'conserves', 'concentre-tomates', 'Le concentré de tomates pour tous vos plats mijotés et vos sauces.', [], { ar: 'مركز الطماطم' }),
  p('luncheon', 'Luncheon', 'charcuterie', 'luncheon', 'Une charcuterie de viande de volaille, à trancher pour sandwichs et assiettes.', ['Viande de volaille'], { ar: 'لانشون' }),
  p('saucisson-piquant', 'Saucisson piquant', 'charcuterie', 'saucisson-piquant', 'Une charcuterie piquante de viande de volaille, parfaite en sandwich.', ['Viande de volaille', 'Piquant'], { ar: 'نقانق حارة' }),
  p('mortadelle', 'Mortadelle cuite', 'charcuterie', 'mortadelle', 'Une mortadelle cuite de viande de volaille, pour sandwichs et buffets.', ['Viande de volaille'], { ar: 'مورتديلا مطبوخة' }),
  p('creme-patissiere', 'Crème pâtissière — arôme vanille', 'patisserie', 'creme-patissiere', 'La préparation pour crème pâtissière arôme vanille, pour tartes et mille-feuilles.', ['Sac 5 kg', 'Arôme vanille']),
  p('levure-patissiere', 'Levure pâtissière', 'patisserie', 'levure-patissiere', 'La levure pour des gâteaux et cakes bien levés.', ['Sac 5 kg'], { ar: 'خميرة للحلويات' }),
  p('amidon-mais', 'Amidon de maïs', 'patisserie', 'amidon-mais', 'L’amidon de maïs pour lier crèmes et sauces, et alléger les pâtisseries.', ['Sac 5 kg'], { ar: 'نشاء الذرة' }),
]

export const bySlug = Object.fromEntries(products.map((x) => [x.id, x]))
export const catLabel = (id) => categories.find((c) => c.id === id)?.label ?? ''
export const catTint = (id) => categories.find((c) => c.id === id)?.tint ?? '#f3e6cc'
