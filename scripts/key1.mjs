import sharp from 'sharp';
const src='C:/Users/hp/AppData/Local/Temp/claude/49b43ed93eb5020c/31836a91-9fbf-4d80-bd5a-4ef00a599493/images/1.png';
const {data,info}=await sharp(src).ensureAlpha().raw().toBuffer({resolveWithObject:true});
const {width:W,height:H}=info;const seen=new Uint8Array(W*H);const st=[];
const bg=i=>{const r=data[i*4],g=data[i*4+1],b=data[i*4+2];const mx=Math.max(r,g,b),mn=Math.min(r,g,b);return mx-mn<14&&mx>110&&mx<190;};
for(let x=0;x<W;x++){st.push(x,(H-1)*W+x)}for(let y=0;y<H;y++){st.push(y*W,y*W+W-1)}
while(st.length){const i=st.pop();if(seen[i]||!bg(i))continue;seen[i]=1;const x=i%W,y=(i/W)|0;if(x>0)st.push(i-1);if(x<W-1)st.push(i+1);if(y>0)st.push(i-W);if(y<H-1)st.push(i+W);}
for(let i=0;i<W*H;i++)if(seen[i])data[i*4+3]=0;
let buf=await sharp(data,{raw:{width:W,height:H,channels:4}}).png().toBuffer();
// soften edge: blur alpha slightly via erode-ish: use trim then resize
await sharp(buf).trim({threshold:6}).resize({width:1200,height:1200,fit:'inside'}).webp({quality:86,alphaQuality:95}).toFile('public/img/products/confiture-abricot.webp');
const m=await sharp('public/img/products/confiture-abricot.webp').metadata();console.log(m.width,m.height);
