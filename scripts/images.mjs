import sharp from 'sharp';
const d='C:/Users/hp/AppData/Local/Temp/claude/49b43ed93eb5020c/31836a91-9fbf-4d80-bd5a-4ef00a599493/images/';
const P={1:['confiture-abricot','png'],2:['confiture-fraise','png'],3:['confiture-abricot-boite','png'],4:['creme-patissiere','png'],5:['ketchup-tomato','png'],6:['levure-patissiere','png'],7:['luncheon','png'],8:['amidon-mais','png'],9:['margarine-patissiere','png'],10:['mayonnaise','png'],11:['miel','png'],12:['seau-algerienne','png'],13:['seau-andalouse','png'],14:['seau-biggy-burger','png'],15:['seau-fajitas','png'],16:['seau-ketchup','png'],17:['seau-moutarde','png'],18:['seau-samourai','png'],19:['mortadelle','png'],20:['moutarde-dijon','jpg'],21:['sauce-algerienne','png'],22:['sauce-barbecue','png'],23:['sauce-samourai','png'],29:['tartine-cuisson','png'],30:['saucisson-piquant','png'],31:['maquereaux','png'],32:['thon','png'],33:['vinaigre','png'],34:['concentre-tomates','jpg']};
for(const [n,[slug,ext]] of Object.entries(P)){
  const src=d+n+'.'+ext;
  const m=await sharp(src).metadata();
  let buf=await sharp(src).trim({threshold:6}).toBuffer();
  const mm=await sharp(buf).metadata();
  if(mm.hasAlpha){const {data,info}=await sharp(buf).raw().toBuffer({resolveWithObject:true});let x0=info.width,y0=info.height,x1=0,y1=0;
    for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++){if(data[(y*info.width+x)*4+3]>90){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;}}
    if(x1>x0&&y1>y0&&(x1-x0<info.width*0.97||y1-y0<info.height*0.97))buf=await sharp(buf).extract({left:x0,top:y0,width:x1-x0+1,height:y1-y0+1}).toBuffer();}
  await sharp(buf).resize({width:1200,height:1200,fit:'inside',withoutEnlargement:true}).webp({quality:86,alphaQuality:95}).toFile(`public/img/products/${slug}.webp`);
  const t=await sharp(`public/img/products/${slug}.webp`).metadata();
  console.log(slug,t.width,t.height,m.hasAlpha);
}
const C={'tartines-confiture':[1,830,1140,700,660],'tartines-fraise':[2,820,1165,745,655],'wrap-samourai':[23,1190,1270,270,200],'wrap-algerienne':[21,1210,1250,250,210],'poulet-barbecue':[22,1060,1345,420,230],'salade':[10,270,1170,330,310],'frites-poulet':[20,1130,1380,320,420],'maquereaux-salade':[31,1000,890,260,180],'sauce-tomate':[5,830,1290,645,435],'mille-feuille':[4,720,1110,490,415],'cake-fruits':[6,720,1150,480,330],'cake-glace':[8,710,1150,505,420]};
for(const [k,[n,l,t,w,h]] of Object.entries(C)){
  const ext=[20,24,26,28,34].includes(n)?'jpg':'png';
  await sharp(d+n+'.'+ext).flatten({background:'#fff'}).extract({left:l,top:t,width:w,height:h}).resize({width:900,withoutEnlargement:true}).webp({quality:84}).toFile(`public/img/food/${k}.webp`);
}
// contact sheet
const names=Object.keys(C);
const tiles=await Promise.all(names.map(async k=>({input:await sharp(`public/img/food/${k}.webp`).resize(300,300,{fit:'cover'}).toBuffer()})));
tiles.forEach((t,i)=>{t.left=(i%4)*300;t.top=Math.floor(i/4)*300});
await sharp({create:{width:1200,height:900,channels:3,background:'#888'}}).composite(tiles).jpeg().toFile('C:/Users/hp/AppData/Local/Temp/claude/49b43ed93eb5020c/31836a91-9fbf-4d80-bd5a-4ef00a599493/scratchpad/sheet.jpg');
