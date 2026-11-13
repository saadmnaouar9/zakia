import sharp from 'sharp';
const d='C:/Users/hp/AppData/Local/Temp/claude/49b43ed93eb5020c/31836a91-9fbf-4d80-bd5a-4ef00a599493/images/';
const sc='C:/Users/hp/AppData/Local/Temp/claude/49b43ed93eb5020c/31836a91-9fbf-4d80-bd5a-4ef00a599493/scratchpad/';
const {data,info}=await sharp(d+'10.png').flatten({background:'#fff'}).extract({left:325,top:285,width:550,height:340}).raw().toBuffer({resolveWithObject:true});
const W=info.width,H=info.height,m=Buffer.alloc(W*H);
for(let i=0;i<W*H;i++){const r=data[i*3],g=data[i*3+1],b=data[i*3+2];const x=i%W,y=(i/W)|0;
 const red=r>140&&g<90&&b<90, grn=g>r+18&&g>b+10&&g<200&&r<170;
 let on=red||grn; if(x<18||(x>480&&y>250)||(x<45&&y>260)) on=false; m[i]=on?255:0;}
// closing: blur then threshold (fills letters), then slight blur for feather
const base=await sharp(m,{raw:{width:W,height:H,channels:1}}).blur(5).threshold(40).extractChannel(0).raw().toBuffer();
const out=new Uint8Array(W*H),st=[];for(let x=0;x<W;x++)st.push(x,(H-1)*W+x);for(let y=0;y<H;y++)st.push(y*W,y*W+W-1);
while(st.length){const i=st.pop();if(out[i]||base[i])continue;out[i]=1;const x=i%W,y=(i/W)|0;if(x>0)st.push(i-1);if(x<W-1)st.push(i+1);if(y>0)st.push(i-W);if(y<H-1)st.push(i+W);}
const filled=Buffer.alloc(W*H);for(let i=0;i<W*H;i++)filled[i]=out[i]?0:255;
const mr=await sharp(filled,{raw:{width:W,height:H,channels:1}}).blur(1.2).extractChannel(0).raw().toBuffer();
const rgba=Buffer.alloc(W*H*4);for(let i=0;i<W*H;i++){rgba[i*4]=data[i*3];rgba[i*4+1]=data[i*3+1];rgba[i*4+2]=data[i*3+2];rgba[i*4+3]=mr[i];}
const rgb=await sharp(rgba,{raw:{width:W,height:H,channels:4}}).png().toBuffer();
await sharp(rgb).trim({threshold:2}).toFile('public/img/logo-fr.png');
await sharp(rgb).flatten({background:'#888'}).jpeg().toFile(sc+'logo-test.jpg');
