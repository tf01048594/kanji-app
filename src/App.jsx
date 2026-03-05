import { useState, useEffect } from "react";

// ===== DATA =====
// exampleFurigana: mảng [{text, reading}] — reading=null nếu không phải kanji
const KANJI_N5 = [
  { id: 1, kanji: "日", reading: "にち／ひ", meaning: "Ngày / Mặt trời", level: "N5",
    example: "今日は天気がいいです。", exampleMeaning: "Hôm nay thời tiết đẹp.",
    exampleFurigana: [{t:"今日",r:"きょう"},{t:"は"},{t:"天気",r:"てんき"},{t:"がいいです。"}] },

  { id: 2, kanji: "月", reading: "げつ／つき", meaning: "Tháng / Mặt trăng", level: "N5",
    example: "今月は忙しいです。", exampleMeaning: "Tháng này tôi bận lắm.",
    exampleFurigana: [{t:"今月",r:"こんげつ"},{t:"は"},{t:"忙",r:"いそが"},{t:"しいです。"}] },

  { id: 3, kanji: "火", reading: "か／ひ", meaning: "Lửa / Thứ ba", level: "N5",
    example: "火曜日に映画を見ます。", exampleMeaning: "Thứ Ba tôi xem phim.",
    exampleFurigana: [{t:"火曜日",r:"かようび"},{t:"に"},{t:"映画",r:"えいが"},{t:"を"},{t:"見",r:"み"},{t:"ます。"}] },

  { id: 4, kanji: "水", reading: "すい／みず", meaning: "Nước / Thứ tư", level: "N5",
    example: "水を飲んでください。", exampleMeaning: "Hãy uống nước đi.",
    exampleFurigana: [{t:"水",r:"みず"},{t:"を"},{t:"飲",r:"の"},{t:"んでください。"}] },

  { id: 5, kanji: "木", reading: "もく／き", meaning: "Cây / Thứ năm", level: "N5",
    example: "公園に大きい木があります。", exampleMeaning: "Trong công viên có cây to.",
    exampleFurigana: [{t:"公園",r:"こうえん"},{t:"に"},{t:"大",r:"おお"},{t:"きい"},{t:"木",r:"き"},{t:"があります。"}] },

  { id: 6, kanji: "金", reading: "きん／かね", meaning: "Vàng / Tiền / Thứ sáu", level: "N5",
    example: "お金がありません。", exampleMeaning: "Tôi không có tiền.",
    exampleFurigana: [{t:"お"},{t:"金",r:"かね"},{t:"がありません。"}] },

  { id: 7, kanji: "土", reading: "ど／つち", meaning: "Đất / Thứ bảy", level: "N5",
    example: "土曜日に休みます。", exampleMeaning: "Thứ Bảy tôi nghỉ.",
    exampleFurigana: [{t:"土曜日",r:"どようび"},{t:"に"},{t:"休",r:"やす"},{t:"みます。"}] },

  { id: 8, kanji: "山", reading: "さん／やま", meaning: "Núi", level: "N5",
    example: "富士山は高いです。", exampleMeaning: "Núi Fuji rất cao.",
    exampleFurigana: [{t:"富士山",r:"ふじさん"},{t:"は"},{t:"高",r:"たか"},{t:"いです。"}] },

  { id: 9, kanji: "川", reading: "かわ", meaning: "Sông", level: "N5",
    example: "川で魚を釣ります。", exampleMeaning: "Tôi câu cá ở sông.",
    exampleFurigana: [{t:"川",r:"かわ"},{t:"で"},{t:"魚",r:"さかな"},{t:"を"},{t:"釣",r:"つ"},{t:"ります。"}] },

  { id: 10, kanji: "田", reading: "た／でん", meaning: "Ruộng", level: "N5",
    example: "田んぼで米を作ります。", exampleMeaning: "Trồng lúa trên ruộng.",
    exampleFurigana: [{t:"田",r:"た"},{t:"んぼで"},{t:"米",r:"こめ"},{t:"を"},{t:"作",r:"つく"},{t:"ります。"}] },

  { id: 11, kanji: "人", reading: "じん／ひと", meaning: "Người", level: "N5",
    example: "あの人は先生です。", exampleMeaning: "Người kia là giáo viên.",
    exampleFurigana: [{t:"あの"},{t:"人",r:"ひと"},{t:"は"},{t:"先生",r:"せんせい"},{t:"です。"}] },

  { id: 12, kanji: "口", reading: "こう／くち", meaning: "Miệng / Cửa", level: "N5",
    example: "口を開けてください。", exampleMeaning: "Hãy mở miệng ra.",
    exampleFurigana: [{t:"口",r:"くち"},{t:"を"},{t:"開",r:"あ"},{t:"けてください。"}] },

  { id: 13, kanji: "手", reading: "しゅ／て", meaning: "Tay", level: "N5",
    example: "手を洗いましょう。", exampleMeaning: "Hãy rửa tay đi.",
    exampleFurigana: [{t:"手",r:"て"},{t:"を"},{t:"洗",r:"あら"},{t:"いましょう。"}] },

  { id: 14, kanji: "目", reading: "もく／め", meaning: "Mắt", level: "N5",
    example: "目が大きいです。", exampleMeaning: "Mắt to.",
    exampleFurigana: [{t:"目",r:"め"},{t:"が"},{t:"大",r:"おお"},{t:"きいです。"}] },

  { id: 15, kanji: "耳", reading: "じ／みみ", meaning: "Tai", level: "N5",
    example: "耳が痛いです。", exampleMeaning: "Tai tôi đau.",
    exampleFurigana: [{t:"耳",r:"みみ"},{t:"が"},{t:"痛",r:"いた"},{t:"いです。"}] },

  { id: 16, kanji: "大", reading: "だい／おお", meaning: "To / Lớn", level: "N5",
    example: "大きい犬がいます。", exampleMeaning: "Có một con chó to.",
    exampleFurigana: [{t:"大",r:"おお"},{t:"きい"},{t:"犬",r:"いぬ"},{t:"がいます。"}] },

  { id: 17, kanji: "小", reading: "しょう／ちい", meaning: "Nhỏ / Bé", level: "N5",
    example: "小さい子供が遊んでいます。", exampleMeaning: "Đứa trẻ nhỏ đang chơi.",
    exampleFurigana: [{t:"小",r:"ちい"},{t:"さい"},{t:"子供",r:"こども"},{t:"が"},{t:"遊",r:"あそ"},{t:"んでいます。"}] },

  { id: 18, kanji: "中", reading: "ちゅう／なか", meaning: "Giữa / Trong", level: "N5",
    example: "箱の中に何がありますか？", exampleMeaning: "Trong hộp có gì vậy?",
    exampleFurigana: [{t:"箱",r:"はこ"},{t:"の"},{t:"中",r:"なか"},{t:"に"},{t:"何",r:"なに"},{t:"がありますか？"}] },

  { id: 19, kanji: "上", reading: "じょう／うえ", meaning: "Trên", level: "N5",
    example: "机の上に本があります。", exampleMeaning: "Có sách trên bàn.",
    exampleFurigana: [{t:"机",r:"つくえ"},{t:"の"},{t:"上",r:"うえ"},{t:"に"},{t:"本",r:"ほん"},{t:"があります。"}] },

  { id: 20, kanji: "下", reading: "か／した", meaning: "Dưới", level: "N5",
    example: "椅子の下に猫がいます。", exampleMeaning: "Có con mèo dưới ghế.",
    exampleFurigana: [{t:"椅子",r:"いす"},{t:"の"},{t:"下",r:"した"},{t:"に"},{t:"猫",r:"ねこ"},{t:"がいます。"}] },

  { id: 21, kanji: "一", reading: "いち／ひと", meaning: "Một", level: "N5",
    example: "一つだけください。", exampleMeaning: "Cho tôi một cái thôi.",
    exampleFurigana: [{t:"一",r:"ひと"},{t:"つだけください。"}] },

  { id: 22, kanji: "二", reading: "に／ふた", meaning: "Hai", level: "N5",
    example: "二人で行きます。", exampleMeaning: "Hai người cùng đi.",
    exampleFurigana: [{t:"二人",r:"ふたり"},{t:"で"},{t:"行",r:"い"},{t:"きます。"}] },

  { id: 23, kanji: "三", reading: "さん／み", meaning: "Ba", level: "N5",
    example: "三時に会いましょう。", exampleMeaning: "Hãy gặp nhau lúc 3 giờ.",
    exampleFurigana: [{t:"三時",r:"さんじ"},{t:"に"},{t:"会",r:"あ"},{t:"いましょう。"}] },

  { id: 24, kanji: "四", reading: "し／よん", meaning: "Bốn", level: "N5",
    example: "四月は春です。", exampleMeaning: "Tháng Tư là mùa xuân.",
    exampleFurigana: [{t:"四月",r:"しがつ"},{t:"は"},{t:"春",r:"はる"},{t:"です。"}] },

  { id: 25, kanji: "五", reading: "ご／いつ", meaning: "Năm", level: "N5",
    example: "五分待ってください。", exampleMeaning: "Hãy đợi năm phút.",
    exampleFurigana: [{t:"五分",r:"ごふん"},{t:"待",r:"ま"},{t:"ってください。"}] },

  { id: 26, kanji: "六", reading: "ろく／む", meaning: "Sáu", level: "N5",
    example: "六時に起きます。", exampleMeaning: "Tôi thức dậy lúc 6 giờ.",
    exampleFurigana: [{t:"六時",r:"ろくじ"},{t:"に"},{t:"起",r:"お"},{t:"きます。"}] },

  { id: 27, kanji: "七", reading: "しち／なな", meaning: "Bảy", level: "N5",
    example: "七月は暑いです。", exampleMeaning: "Tháng Bảy trời nóng.",
    exampleFurigana: [{t:"七月",r:"しちがつ"},{t:"は"},{t:"暑",r:"あつ"},{t:"いです。"}] },

  { id: 28, kanji: "八", reading: "はち／や", meaning: "Tám", level: "N5",
    example: "八時間寝ました。", exampleMeaning: "Tôi đã ngủ tám tiếng.",
    exampleFurigana: [{t:"八時間",r:"はちじかん"},{t:"寝",r:"ね"},{t:"ました。"}] },

  { id: 29, kanji: "九", reading: "く／きゅう", meaning: "Chín", level: "N5",
    example: "九月に日本へ行きます。", exampleMeaning: "Tháng Chín tôi đi Nhật.",
    exampleFurigana: [{t:"九月",r:"くがつ"},{t:"に"},{t:"日本",r:"にほん"},{t:"へ"},{t:"行",r:"い"},{t:"きます。"}] },

  { id: 30, kanji: "十", reading: "じゅう／とお", meaning: "Mười", level: "N5",
    example: "十人のクラスです。", exampleMeaning: "Lớp học có mười người.",
    exampleFurigana: [{t:"十人",r:"じゅうにん"},{t:"のクラスです。"}] },

  { id: 31, kanji: "花", reading: "か／はな", meaning: "Hoa", level: "N5",
    example: "庭に花が咲いています。", exampleMeaning: "Hoa đang nở trong sân.",
    exampleFurigana: [{t:"庭",r:"にわ"},{t:"に"},{t:"花",r:"はな"},{t:"が"},{t:"咲",r:"さ"},{t:"いています。"}] },

  { id: 32, kanji: "雨", reading: "う／あめ", meaning: "Mưa", level: "N5",
    example: "今日は雨が降っています。", exampleMeaning: "Hôm nay trời đang mưa.",
    exampleFurigana: [{t:"今日",r:"きょう"},{t:"は"},{t:"雨",r:"あめ"},{t:"が"},{t:"降",r:"ふ"},{t:"っています。"}] },

  { id: 33, kanji: "空", reading: "くう／そら", meaning: "Bầu trời / Trống", level: "N5",
    example: "空が青いです。", exampleMeaning: "Bầu trời xanh.",
    exampleFurigana: [{t:"空",r:"そら"},{t:"が"},{t:"青",r:"あお"},{t:"いです。"}] },

  { id: 34, kanji: "車", reading: "しゃ／くるま", meaning: "Xe / Ô tô", level: "N5",
    example: "車で学校へ行きます。", exampleMeaning: "Tôi đi học bằng xe.",
    exampleFurigana: [{t:"車",r:"くるま"},{t:"で"},{t:"学校",r:"がっこう"},{t:"へ"},{t:"行",r:"い"},{t:"きます。"}] },

  { id: 35, kanji: "電", reading: "でん", meaning: "Điện", level: "N5",
    example: "電車で会社へ行きます。", exampleMeaning: "Tôi đi làm bằng tàu điện.",
    exampleFurigana: [{t:"電車",r:"でんしゃ"},{t:"で"},{t:"会社",r:"かいしゃ"},{t:"へ"},{t:"行",r:"い"},{t:"きます。"}] },

  { id: 36, kanji: "気", reading: "き／け", meaning: "Khí / Tâm trạng", level: "N5",
    example: "元気ですか？", exampleMeaning: "Bạn khỏe không?",
    exampleFurigana: [{t:"元気",r:"げんき"},{t:"ですか？"}] },

  { id: 37, kanji: "食", reading: "しょく／た", meaning: "Ăn / Thức ăn", level: "N5",
    example: "朝ご飯を食べましたか？", exampleMeaning: "Bạn đã ăn sáng chưa?",
    exampleFurigana: [{t:"朝",r:"あさ"},{t:"ご"},{t:"飯",r:"はん"},{t:"を"},{t:"食",r:"た"},{t:"べましたか？"}] },

  { id: 38, kanji: "飲", reading: "いん／の", meaning: "Uống", level: "N5",
    example: "コーヒーを飲みます。", exampleMeaning: "Tôi uống cà phê.",
    exampleFurigana: [{t:"コーヒーを"},{t:"飲",r:"の"},{t:"みます。"}] },

  { id: 39, kanji: "見", reading: "けん／み", meaning: "Nhìn / Xem", level: "N5",
    example: "テレビを見ています。", exampleMeaning: "Tôi đang xem TV.",
    exampleFurigana: [{t:"テレビを"},{t:"見",r:"み"},{t:"ています。"}] },

  { id: 40, kanji: "聞", reading: "ぶん／き", meaning: "Nghe / Hỏi", level: "N5",
    example: "音楽を聞くのが好きです。", exampleMeaning: "Tôi thích nghe nhạc.",
    exampleFurigana: [{t:"音楽",r:"おんがく"},{t:"を"},{t:"聞",r:"き"},{t:"くのが"},{t:"好",r:"す"},{t:"きです。"}] },

  { id: 41, kanji: "行", reading: "こう／い", meaning: "Đi", level: "N5",
    example: "スーパーへ行きます。", exampleMeaning: "Tôi đi siêu thị.",
    exampleFurigana: [{t:"スーパーへ"},{t:"行",r:"い"},{t:"きます。"}] },

  { id: 42, kanji: "来", reading: "らい／く", meaning: "Đến / Lại", level: "N5",
    example: "友達が来ました。", exampleMeaning: "Bạn bè đã đến.",
    exampleFurigana: [{t:"友達",r:"ともだち"},{t:"が"},{t:"来",r:"き"},{t:"ました。"}] },

  { id: 43, kanji: "帰", reading: "き／かえ", meaning: "Về / Trở về", level: "N5",
    example: "家に帰ります。", exampleMeaning: "Tôi về nhà.",
    exampleFurigana: [{t:"家",r:"いえ"},{t:"に"},{t:"帰",r:"かえ"},{t:"ります。"}] },

  { id: 44, kanji: "学", reading: "がく／まな", meaning: "Học", level: "N5",
    example: "大学で日本語を学んでいます。", exampleMeaning: "Tôi học tiếng Nhật ở đại học.",
    exampleFurigana: [{t:"大学",r:"だいがく"},{t:"で"},{t:"日本語",r:"にほんご"},{t:"を"},{t:"学",r:"まな"},{t:"んでいます。"}] },

  { id: 45, kanji: "校", reading: "こう", meaning: "Trường học", level: "N5",
    example: "学校は楽しいです。", exampleMeaning: "Trường học rất vui.",
    exampleFurigana: [{t:"学校",r:"がっこう"},{t:"は"},{t:"楽",r:"たの"},{t:"しいです。"}] },

  { id: 46, kanji: "先", reading: "せん／さき", meaning: "Trước / Trước đây", level: "N5",
    example: "先生に質問します。", exampleMeaning: "Tôi hỏi giáo viên.",
    exampleFurigana: [{t:"先生",r:"せんせい"},{t:"に"},{t:"質問",r:"しつもん"},{t:"します。"}] },

  { id: 47, kanji: "生", reading: "せい／い", meaning: "Sống / Sinh", level: "N5",
    example: "学生は図書館で勉強します。", exampleMeaning: "Sinh viên học ở thư viện.",
    exampleFurigana: [{t:"学生",r:"がくせい"},{t:"は"},{t:"図書館",r:"としょかん"},{t:"で"},{t:"勉強",r:"べんきょう"},{t:"します。"}] },

  { id: 48, kanji: "本", reading: "ほん／もと", meaning: "Sách / Gốc / Nhật Bản", level: "N5",
    example: "本を読むのが好きです。", exampleMeaning: "Tôi thích đọc sách.",
    exampleFurigana: [{t:"本",r:"ほん"},{t:"を"},{t:"読",r:"よ"},{t:"むのが"},{t:"好",r:"す"},{t:"きです。"}] },

  { id: 49, kanji: "語", reading: "ご／かた", meaning: "Ngôn ngữ / Nói", level: "N5",
    example: "日本語は面白いです。", exampleMeaning: "Tiếng Nhật rất thú vị.",
    exampleFurigana: [{t:"日本語",r:"にほんご"},{t:"は"},{t:"面白",r:"おもしろ"},{t:"いです。"}] },

  { id: 50, kanji: "国", reading: "こく／くに", meaning: "Quốc gia / Nước", level: "N5",
    example: "どの国から来ましたか？", exampleMeaning: "Bạn đến từ nước nào?",
    exampleFurigana: [{t:"どの"},{t:"国",r:"くに"},{t:"から"},{t:"来",r:"き"},{t:"ましたか？"}] },
];

// ===== HELPERS =====
function getTodayKey() { return new Date().toISOString().split("T")[0]; }
function getDayIndex() {
  const start = new Date("2025-01-01");
  return Math.floor((new Date() - start) / 86400000);
}
function getDailyWords(dayIndex) {
  const start = (dayIndex * 5) % KANJI_N5.length;
  return Array.from({length:5}, (_,i) => KANJI_N5[(start+i)%KANJI_N5.length]);
}

async function loadState(key) {
  // PWA: dùng localStorage thay window.storage
  try { const r = await window.storage.get(key); return r ? JSON.parse(r.value) : null; }
  catch { return null; }
}
async function saveState(key, val) {
  try { await window.storage.set(key, JSON.stringify(val)); } catch {}
}

// ===== FURIGANA COMPONENT =====
function Furigana({ parts }) {
  if (!parts || parts.length === 0) return null;
  return (
    <span style={{ lineHeight: 2.2, fontSize: 15 }}>
      {parts.map((p, i) =>
        p.r ? (
          <ruby key={i} style={{ rubyAlign: "center" }}>
            {p.t}
            <rt style={{ fontSize: "0.55em", color: "#FFD700", letterSpacing: "0.05em" }}>{p.r}</rt>
          </ruby>
        ) : (
          <span key={i}>{p.t}</span>
        )
      )}
    </span>
  );
}

// ===== FLIP CARD =====
function FlipCard({ word, isFav, onToggleFav }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div onClick={() => setFlipped(f => !f)}
      style={{ perspective: "1000px", cursor: "pointer", width: "100%", marginBottom: 10 }}>
      <div style={{
        position: "relative", width: "100%", minHeight: 200,
        transition: "transform 0.5s", transformStyle: "preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}>
        {/* FRONT */}
        <div style={{
          position: "absolute", width: "100%", minHeight: 200, backfaceVisibility: "hidden",
          background: "linear-gradient(135deg,#1a1a2e,#16213e)",
          borderRadius: 16, border: "1px solid rgba(255,200,0,0.2)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: "20px 16px", boxSizing: "border-box",
        }}>
          <button onClick={e=>{e.stopPropagation();onToggleFav(word.id);}}
            style={{position:"absolute",top:12,right:14,background:"none",border:"none",cursor:"pointer",fontSize:20}}>
            {isFav?"★":"☆"}
          </button>
          <div style={{position:"absolute",top:12,left:14,background:"rgba(255,215,0,0.15)",borderRadius:6,padding:"2px 8px",fontSize:11,color:"#FFD700",fontWeight:700}}>{word.level}</div>
          <div style={{fontSize:68,fontWeight:900,color:"#FFD700",lineHeight:1,marginBottom:8,textShadow:"0 0 30px rgba(255,215,0,0.4)"}}>{word.kanji}</div>
          <div style={{fontSize:13,color:"rgba(255,255,255,0.35)"}}>Nhấn để xem nghĩa</div>
        </div>
        {/* BACK */}
        <div style={{
          position:"absolute",width:"100%",minHeight:200,backfaceVisibility:"hidden",
          transform:"rotateY(180deg)",
          background:"linear-gradient(135deg,#0f3460,#533483)",
          borderRadius:16,border:"1px solid rgba(255,200,0,0.3)",
          padding:"16px 18px",boxSizing:"border-box",display:"flex",flexDirection:"column",justifyContent:"center",
        }}>
          <div style={{fontSize:20,fontWeight:700,color:"#FFD700",marginBottom:2}}>
            {word.kanji} <span style={{fontSize:13,color:"rgba(255,255,255,0.6)",fontWeight:400}}>({word.reading})</span>
          </div>
          <div style={{fontSize:14,color:"#fff",marginBottom:10,fontWeight:500}}>🇻🇳 {word.meaning}</div>
          <div style={{background:"rgba(0,0,0,0.25)",borderRadius:10,padding:"10px 14px"}}>
            <div style={{fontSize:12,color:"#FFD700",marginBottom:6}}>📝 Ví dụ:</div>
            <div style={{marginBottom:4}}>
              <Furigana parts={word.exampleFurigana}/>
            </div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.55)",fontStyle:"italic"}}>{word.exampleMeaning}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== QUIZ =====
function QuizView({ words, onDone }) {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const questions = words.map(w => {
    const wrongs = KANJI_N5.filter(k=>k.id!==w.id).sort(()=>Math.random()-0.5).slice(0,3);
    return { word:w, options:[...wrongs,w].sort(()=>Math.random()-0.5) };
  });
  const q = questions[qIdx];

  function handleSelect(opt) {
    if(selected!==null) return;
    setSelected(opt.id);
    if(opt.id===q.word.id) setScore(s=>s+1);
    setTimeout(()=>{
      if(qIdx+1>=questions.length) setDone(true);
      else { setQIdx(i=>i+1); setSelected(null); }
    }, 900);
  }

  if(done) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16,padding:"32px 0"}}>
      <div style={{fontSize:64}}>{score===5?"🏆":score>=3?"🎯":"📚"}</div>
      <div style={{fontSize:28,fontWeight:800,color:"#FFD700"}}>{score}/5</div>
      <div style={{fontSize:14,color:"rgba(255,255,255,0.6)"}}>{score===5?"Hoàn hảo!":score>=3?"Tốt lắm! Cố lên!":"Hãy ôn lại nhé!"}</div>
      <button onClick={onDone} style={{background:"#FFD700",color:"#1a1a2e",border:"none",borderRadius:12,padding:"12px 32px",fontWeight:800,fontSize:15,cursor:"pointer"}}>Xong</button>
    </div>
  );

  return (
    <div style={{padding:"8px 0"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:16,alignItems:"center"}}>
        <div style={{color:"rgba(255,255,255,0.4)",fontSize:13}}>Câu {qIdx+1} / {questions.length}</div>
        <div style={{color:"#FFD700",fontWeight:700}}>★ {score}</div>
      </div>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:72,fontWeight:900,color:"#FFD700",textShadow:"0 0 40px rgba(255,215,0,0.5)",lineHeight:1,marginBottom:6}}>{q.word.kanji}</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.35)"}}>Nghĩa của kanji này là gì?</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {q.options.map(opt=>{
          let bg="rgba(255,255,255,0.05)", border="1px solid rgba(255,255,255,0.1)";
          if(selected!==null){
            if(opt.id===q.word.id){bg="rgba(80,200,120,0.25)";border="1px solid #50C878";}
            else if(opt.id===selected){bg="rgba(255,80,80,0.2)";border="1px solid #FF5050";}
          }
          return (
            <button key={opt.id} onClick={()=>handleSelect(opt)}
              style={{background:bg,border,borderRadius:12,padding:"14px 10px",cursor:"pointer",color:"#fff",fontSize:13,fontWeight:600,transition:"all 0.2s"}}>
              {opt.meaning}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ===== MAIN APP =====
export default function KanjiApp() {
  const [tab, setTab] = useState("today");
  const [favorites, setFavorites] = useState([]);
  const [learnedDays, setLearnedDays] = useState({});
  const [streak, setStreak] = useState(0);
  const [todayDone, setTodayDone] = useState(false);
  const [quizActive, setQuizActive] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const dayIdx = getDayIndex();
  const todayWords = getDailyWords(dayIdx);
  const totalLearned = Object.keys(learnedDays).length * 5;
  const favWords = KANJI_N5.filter(w => favorites.includes(w.id));

  useEffect(()=>{
    (async()=>{
      const favs = await loadState("kanji_favs") || [];
      const days = await loadState("kanji_days") || {};
      setFavorites(favs);
      setLearnedDays(days);
      setTodayDone(!!days[getTodayKey()]);
      let s=0, d=new Date();
      while(true){ const k=d.toISOString().split("T")[0]; if(days[k]){s++;d.setDate(d.getDate()-1);}else break; }
      setStreak(s);
      setLoaded(true);
    })();
  },[]);

  async function markTodayDone(){
    const today=getTodayKey();
    const newDays={...learnedDays,[today]:true};
    setLearnedDays(newDays); setTodayDone(true);
    await saveState("kanji_days",newDays);
    let s=0,d=new Date();
    while(true){const k=d.toISOString().split("T")[0];if(newDays[k]){s++;d.setDate(d.getDate()-1);}else break;}
    setStreak(s);
  }

  async function toggleFav(id){
    const nf=favorites.includes(id)?favorites.filter(f=>f!==id):[...favorites,id];
    setFavorites(nf); await saveState("kanji_favs",nf);
  }

  if(!loaded) return (
    <div style={{minHeight:"100vh",background:"#0d0d1a",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{color:"#FFD700",fontSize:40}}>漢</div>
    </div>
  );

  const TABS = [
    {key:"today",label:"Hôm nay",icon:"📅"},
    {key:"quiz",label:"Quiz",icon:"⚡"},
    {key:"favs",label:"Yêu thích",icon:"★"},
    {key:"progress",label:"Tiến độ",icon:"📊"},
  ];

  return (
    <div style={{minHeight:"100vh",background:"#0d0d1a",fontFamily:"'Noto Sans JP','Segoe UI',sans-serif",color:"#fff",maxWidth:480,margin:"0 auto",paddingBottom:80}}>
      {/* HEADER */}
      <div style={{background:"linear-gradient(135deg,#0f3460,#1a1a4e)",padding:"20px 20px 16px",borderBottom:"1px solid rgba(255,215,0,0.15)",position:"sticky",top:0,zIndex:10}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:22,fontWeight:900,color:"#FFD700",letterSpacing:1}}>漢字マスター</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:1}}>Kanji Master · N5 · {KANJI_N5.length} từ</div>
          </div>
          <div style={{display:"flex",gap:16}}>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:20,fontWeight:800,color:"#FF6B35"}}>🔥 {streak}</div>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.4)"}}>Streak</div>
            </div>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:20,fontWeight:800,color:"#50C878"}}>{totalLearned}</div>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.4)"}}>Đã học</div>
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={{display:"flex",borderBottom:"1px solid rgba(255,255,255,0.08)",background:"#0d0d1a",position:"sticky",top:74,zIndex:9}}>
        {TABS.map(t=>(
          <button key={t.key} onClick={()=>setTab(t.key)} style={{
            flex:1,padding:"12px 4px",background:"none",border:"none",
            borderBottom:tab===t.key?"2px solid #FFD700":"2px solid transparent",
            color:tab===t.key?"#FFD700":"rgba(255,255,255,0.4)",
            fontSize:11,fontWeight:600,cursor:"pointer",transition:"all 0.2s",
          }}>
            <div>{t.icon}</div><div>{t.label}</div>
          </button>
        ))}
      </div>

      <div style={{padding:"16px"}}>
        {/* TODAY */}
        {tab==="today" && (
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div>
                <div style={{fontWeight:700,fontSize:16}}>5 từ hôm nay</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,0.4)"}}>Ngày {dayIdx+1} · Nhấn thẻ để lật</div>
              </div>
              {!todayDone
                ? <button onClick={markTodayDone} style={{background:"#FFD700",color:"#1a1a2e",border:"none",borderRadius:10,padding:"8px 14px",fontWeight:800,fontSize:12,cursor:"pointer"}}>✓ Xong rồi!</button>
                : <div style={{background:"rgba(80,200,120,0.2)",border:"1px solid #50C878",borderRadius:10,padding:"8px 14px",fontSize:12,color:"#50C878",fontWeight:700}}>✓ Hoàn thành</div>
              }
            </div>
            {todayWords.map(w=><FlipCard key={w.id} word={w} isFav={favorites.includes(w.id)} onToggleFav={toggleFav}/>)}
          </div>
        )}

        {/* QUIZ */}
        {tab==="quiz" && (
          <div>
            {!quizActive
              ? <div style={{textAlign:"center",padding:"32px 0"}}>
                  <div style={{fontSize:56,marginBottom:12}}>⚡</div>
                  <div style={{fontSize:20,fontWeight:800,marginBottom:8}}>Quiz hôm nay</div>
                  <div style={{fontSize:13,color:"rgba(255,255,255,0.5)",marginBottom:28}}>Kiểm tra 5 từ bạn học hôm nay</div>
                  <button onClick={()=>setQuizActive(true)} style={{background:"linear-gradient(135deg,#FFD700,#FF6B35)",color:"#1a1a2e",border:"none",borderRadius:14,padding:"16px 48px",fontWeight:900,fontSize:16,cursor:"pointer",boxShadow:"0 4px 24px rgba(255,215,0,0.3)"}}>Bắt đầu!</button>
                </div>
              : <QuizView words={todayWords} onDone={()=>setQuizActive(false)}/>
            }
          </div>
        )}

        {/* FAVORITES */}
        {tab==="favs" && (
          <div>
            <div style={{fontWeight:700,fontSize:16,marginBottom:4}}>Từ yêu thích</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.4)",marginBottom:16}}>{favWords.length} từ đã lưu</div>
            {favWords.length===0
              ? <div style={{textAlign:"center",padding:"48px 0",color:"rgba(255,255,255,0.3)"}}>
                  <div style={{fontSize:48,marginBottom:12}}>☆</div>
                  <div>Chưa có từ yêu thích</div>
                  <div style={{fontSize:12,marginTop:4}}>Nhấn ☆ trên thẻ để lưu</div>
                </div>
              : favWords.map(w=><FlipCard key={w.id} word={w} isFav={true} onToggleFav={toggleFav}/>)
            }
          </div>
        )}

        {/* PROGRESS */}
        {tab==="progress" && (
          <div>
            <div style={{fontWeight:700,fontSize:16,marginBottom:16}}>Tiến độ học tập</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              {[
                {label:"🔥 Streak",value:`${streak} ngày`,color:"#FF6B35"},
                {label:"📚 Đã học",value:`${totalLearned} từ`,color:"#50C878"},
                {label:"📅 Ngày học",value:`${Object.keys(learnedDays).length} ngày`,color:"#64B5F6"},
                {label:"📈 N5",value:`${Math.min(Math.round(totalLearned/KANJI_N5.length*100),100)}%`,color:"#FFD700"},
              ].map(s=>(
                <div key={s.label} style={{background:"rgba(255,255,255,0.04)",borderRadius:14,padding:"14px 12px",border:"1px solid rgba(255,255,255,0.07)"}}>
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginBottom:6}}>{s.label}</div>
                  <div style={{fontSize:22,fontWeight:800,color:s.color}}>{s.value}</div>
                </div>
              ))}
            </div>
            <div style={{background:"rgba(255,255,255,0.04)",borderRadius:14,padding:16,border:"1px solid rgba(255,255,255,0.07)",marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:10,fontSize:13}}>
                <span style={{fontWeight:700}}>N5 Progress</span>
                <span style={{color:"#FFD700"}}>{totalLearned} / {KANJI_N5.length}</span>
              </div>
              <div style={{background:"rgba(255,255,255,0.1)",borderRadius:999,height:8,overflow:"hidden"}}>
                <div style={{height:"100%",borderRadius:999,background:"linear-gradient(90deg,#FFD700,#FF6B35)",width:`${Math.min(totalLearned/KANJI_N5.length*100,100)}%`,transition:"width 0.8s"}}/>
              </div>
            </div>
            <div style={{background:"rgba(255,255,255,0.04)",borderRadius:14,padding:16,border:"1px solid rgba(255,255,255,0.07)"}}>
              <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>📅 14 ngày gần nhất</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {Array.from({length:14}).map((_,i)=>{
                  const d=new Date(); d.setDate(d.getDate()-(13-i));
                  const k=d.toISOString().split("T")[0];
                  const done=!!learnedDays[k], isToday=k===getTodayKey();
                  return <div key={k} title={k} style={{width:28,height:28,borderRadius:8,background:done?"linear-gradient(135deg,#FFD700,#FF6B35)":"rgba(255,255,255,0.08)",border:isToday?"2px solid #FFD700":"2px solid transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:done?"#1a1a2e":"rgba(255,255,255,0.2)",fontWeight:700}}>{d.getDate()}</div>;
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&display=swap');
        ruby { display: inline-ruby; }
        rt { display: block; text-align: center; }
        * { -webkit-tap-highlight-color: transparent; }
        button { font-family: inherit; }
      `}</style>
    </div>
  );
}
