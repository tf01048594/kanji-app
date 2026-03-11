import { useState, useEffect } from "react";

// ==================== DATA ====================

const KANJI_N5 = [
  { id: 1, kanji: "日", reading: "にち／ひ", meaning: "Ngày / Mặt trời", level: "N5", example: "今日は天気がいいです。", exampleMeaning: "Hôm nay thời tiết đẹp.", exampleFurigana: [{t:"今日",r:"きょう"},{t:"は"},{t:"天気",r:"てんき"},{t:"がいいです。"}] },
  { id: 2, kanji: "月", reading: "げつ／つき", meaning: "Tháng / Mặt trăng", level: "N5", example: "今月は忙しいです。", exampleMeaning: "Tháng này tôi bận lắm.", exampleFurigana: [{t:"今月",r:"こんげつ"},{t:"は"},{t:"忙",r:"いそが"},{t:"しいです。"}] },
  { id: 3, kanji: "火", reading: "か／ひ", meaning: "Lửa / Thứ ba", level: "N5", example: "火曜日に映画を見ます。", exampleMeaning: "Thứ Ba tôi xem phim.", exampleFurigana: [{t:"火曜日",r:"かようび"},{t:"に"},{t:"映画",r:"えいが"},{t:"を"},{t:"見",r:"み"},{t:"ます。"}] },
  { id: 4, kanji: "水", reading: "すい／みず", meaning: "Nước / Thứ tư", level: "N5", example: "水を飲んでください。", exampleMeaning: "Hãy uống nước đi.", exampleFurigana: [{t:"水",r:"みず"},{t:"を"},{t:"飲",r:"の"},{t:"んでください。"}] },
  { id: 5, kanji: "木", reading: "もく／き", meaning: "Cây / Thứ năm", level: "N5", example: "公園に大きい木があります。", exampleMeaning: "Trong công viên có cây to.", exampleFurigana: [{t:"公園",r:"こうえん"},{t:"に"},{t:"大",r:"おお"},{t:"きい"},{t:"木",r:"き"},{t:"があります。"}] },
  { id: 6, kanji: "金", reading: "きん／かね", meaning: "Vàng / Tiền / Thứ sáu", level: "N5", example: "お金がありません。", exampleMeaning: "Tôi không có tiền.", exampleFurigana: [{t:"お"},{t:"金",r:"かね"},{t:"がありません。"}] },
  { id: 7, kanji: "土", reading: "ど／つち", meaning: "Đất / Thứ bảy", level: "N5", example: "土曜日に休みます。", exampleMeaning: "Thứ Bảy tôi nghỉ.", exampleFurigana: [{t:"土曜日",r:"どようび"},{t:"に"},{t:"休",r:"やす"},{t:"みます。"}] },
  { id: 8, kanji: "山", reading: "さん／やま", meaning: "Núi", level: "N5", example: "富士山は高いです。", exampleMeaning: "Núi Fuji rất cao.", exampleFurigana: [{t:"富士山",r:"ふじさん"},{t:"は"},{t:"高",r:"たか"},{t:"いです。"}] },
  { id: 9, kanji: "川", reading: "かわ", meaning: "Sông", level: "N5", example: "川で魚を釣ります。", exampleMeaning: "Tôi câu cá ở sông.", exampleFurigana: [{t:"川",r:"かわ"},{t:"で"},{t:"魚",r:"さかな"},{t:"を"},{t:"釣",r:"つ"},{t:"ります。"}] },
  { id: 10, kanji: "人", reading: "じん／ひと", meaning: "Người", level: "N5", example: "あの人は先生です。", exampleMeaning: "Người kia là giáo viên.", exampleFurigana: [{t:"あの"},{t:"人",r:"ひと"},{t:"は"},{t:"先生",r:"せんせい"},{t:"です。"}] },
  { id: 11, kanji: "手", reading: "しゅ／て", meaning: "Tay", level: "N5", example: "手を洗いましょう。", exampleMeaning: "Hãy rửa tay đi.", exampleFurigana: [{t:"手",r:"て"},{t:"を"},{t:"洗",r:"あら"},{t:"いましょう。"}] },
  { id: 12, kanji: "目", reading: "もく／め", meaning: "Mắt", level: "N5", example: "目が大きいです。", exampleMeaning: "Mắt to.", exampleFurigana: [{t:"目",r:"め"},{t:"が"},{t:"大",r:"おお"},{t:"きいです。"}] },
  { id: 13, kanji: "大", reading: "だい／おお", meaning: "To / Lớn", level: "N5", example: "大きい犬がいます。", exampleMeaning: "Có một con chó to.", exampleFurigana: [{t:"大",r:"おお"},{t:"きい"},{t:"犬",r:"いぬ"},{t:"がいます。"}] },
  { id: 14, kanji: "小", reading: "しょう／ちい", meaning: "Nhỏ / Bé", level: "N5", example: "小さい子供が遊んでいます。", exampleMeaning: "Đứa trẻ nhỏ đang chơi.", exampleFurigana: [{t:"小",r:"ちい"},{t:"さい"},{t:"子供",r:"こども"},{t:"が"},{t:"遊",r:"あそ"},{t:"んでいます。"}] },
  { id: 15, kanji: "中", reading: "ちゅう／なか", meaning: "Giữa / Trong", level: "N5", example: "箱の中に何がありますか？", exampleMeaning: "Trong hộp có gì vậy?", exampleFurigana: [{t:"箱",r:"はこ"},{t:"の"},{t:"中",r:"なか"},{t:"に"},{t:"何",r:"なに"},{t:"がありますか？"}] },
  { id: 16, kanji: "上", reading: "じょう／うえ", meaning: "Trên", level: "N5", example: "机の上に本があります。", exampleMeaning: "Có sách trên bàn.", exampleFurigana: [{t:"机",r:"つくえ"},{t:"の"},{t:"上",r:"うえ"},{t:"に"},{t:"本",r:"ほん"},{t:"があります。"}] },
  { id: 17, kanji: "下", reading: "か／した", meaning: "Dưới", level: "N5", example: "椅子の下に猫がいます。", exampleMeaning: "Có con mèo dưới ghế.", exampleFurigana: [{t:"椅子",r:"いす"},{t:"の"},{t:"下",r:"した"},{t:"に"},{t:"猫",r:"ねこ"},{t:"がいます。"}] },
  { id: 18, kanji: "行", reading: "こう／い", meaning: "Đi", level: "N5", example: "スーパーへ行きます。", exampleMeaning: "Tôi đi siêu thị.", exampleFurigana: [{t:"スーパーへ"},{t:"行",r:"い"},{t:"きます。"}] },
  { id: 19, kanji: "来", reading: "らい／く", meaning: "Đến / Lại", level: "N5", example: "友達が来ました。", exampleMeaning: "Bạn bè đã đến.", exampleFurigana: [{t:"友達",r:"ともだち"},{t:"が"},{t:"来",r:"き"},{t:"ました。"}] },
  { id: 20, kanji: "食", reading: "しょく／た", meaning: "Ăn / Thức ăn", level: "N5", example: "朝ご飯を食べましたか？", exampleMeaning: "Bạn đã ăn sáng chưa?", exampleFurigana: [{t:"朝",r:"あさ"},{t:"ご"},{t:"飯",r:"はん"},{t:"を"},{t:"食",r:"た"},{t:"べましたか？"}] },
  { id: 21, kanji: "飲", reading: "いん／の", meaning: "Uống", level: "N5", example: "コーヒーを飲みます。", exampleMeaning: "Tôi uống cà phê.", exampleFurigana: [{t:"コーヒーを"},{t:"飲",r:"の"},{t:"みます。"}] },
  { id: 22, kanji: "見", reading: "けん／み", meaning: "Nhìn / Xem", level: "N5", example: "テレビを見ています。", exampleMeaning: "Tôi đang xem TV.", exampleFurigana: [{t:"テレビを"},{t:"見",r:"み"},{t:"ています。"}] },
  { id: 23, kanji: "本", reading: "ほん／もと", meaning: "Sách / Nhật Bản", level: "N5", example: "本を読むのが好きです。", exampleMeaning: "Tôi thích đọc sách.", exampleFurigana: [{t:"本",r:"ほん"},{t:"を"},{t:"読",r:"よ"},{t:"むのが"},{t:"好",r:"す"},{t:"きです。"}] },
  { id: 24, kanji: "語", reading: "ご／かた", meaning: "Ngôn ngữ / Nói", level: "N5", example: "日本語は面白いです。", exampleMeaning: "Tiếng Nhật rất thú vị.", exampleFurigana: [{t:"日本語",r:"にほんご"},{t:"は"},{t:"面白",r:"おもしろ"},{t:"いです。"}] },
  { id: 25, kanji: "国", reading: "こく／くに", meaning: "Quốc gia / Nước", level: "N5", example: "どの国から来ましたか？", exampleMeaning: "Bạn đến từ nước nào?", exampleFurigana: [{t:"どの"},{t:"国",r:"くに"},{t:"から"},{t:"来",r:"き"},{t:"ましたか？"}] },
  { id: 26, kanji: "学", reading: "がく／まな", meaning: "Học", level: "N5", example: "大学で日本語を学んでいます。", exampleMeaning: "Tôi học tiếng Nhật ở đại học.", exampleFurigana: [{t:"大学",r:"だいがく"},{t:"で"},{t:"日本語",r:"にほんご"},{t:"を"},{t:"学",r:"まな"},{t:"んでいます。"}] },
  { id: 27, kanji: "生", reading: "せい／い", meaning: "Sống / Sinh", level: "N5", example: "学生は図書館で勉強します。", exampleMeaning: "Sinh viên học ở thư viện.", exampleFurigana: [{t:"学生",r:"がくせい"},{t:"は"},{t:"図書館",r:"としょかん"},{t:"で"},{t:"勉強",r:"べんきょう"},{t:"します。"}] },
  { id: 28, kanji: "車", reading: "しゃ／くるま", meaning: "Xe / Ô tô", level: "N5", example: "車で学校へ行きます。", exampleMeaning: "Tôi đi học bằng xe.", exampleFurigana: [{t:"車",r:"くるま"},{t:"で"},{t:"学校",r:"がっこう"},{t:"へ"},{t:"行",r:"い"},{t:"きます。"}] },
  { id: 29, kanji: "気", reading: "き／け", meaning: "Khí / Tâm trạng", level: "N5", example: "元気ですか？", exampleMeaning: "Bạn khỏe không?", exampleFurigana: [{t:"元気",r:"げんき"},{t:"ですか？"}] },
  { id: 30, kanji: "花", reading: "か／はな", meaning: "Hoa", level: "N5", example: "庭に花が咲いています。", exampleMeaning: "Hoa đang nở trong sân.", exampleFurigana: [{t:"庭",r:"にわ"},{t:"に"},{t:"花",r:"はな"},{t:"が"},{t:"咲",r:"さ"},{t:"いています。"}] },
  { id: 31, kanji: "白", reading: "はく／しろ", meaning: "Màu trắng", level: "N5", example: "彼女は白いドレスを着ています。", exampleMeaning: "Cô ấy mặc váy trắng.", exampleFurigana: [{t:"彼女",r:"かのじょ"},{t:"は"},{t:"白",r:"しろ"},{t:"いドレスを"},{t:"着",r:"き"},{t:"ています。"}] },
  { id: 32, kanji: "黒", reading: "こく／くろ", meaning: "Màu đen", level: "N5", example: "黒い猫が好きです。", exampleMeaning: "Tôi thích mèo đen.", exampleFurigana: [{t:"黒",r:"くろ"},{t:"い"},{t:"猫",r:"ねこ"},{t:"が"},{t:"好",r:"す"},{t:"きです。"}] },
  { id: 33, kanji: "赤", reading: "せき／あか", meaning: "Màu đỏ", level: "N5", example: "赤いりんごを食べました。", exampleMeaning: "Tôi đã ăn táo đỏ.", exampleFurigana: [{t:"赤",r:"あか"},{t:"いりんごを"},{t:"食",r:"た"},{t:"べました。"}] },
  { id: 34, kanji: "青", reading: "せい／あお", meaning: "Màu xanh", level: "N5", example: "空が青いです。", exampleMeaning: "Bầu trời xanh.", exampleFurigana: [{t:"空",r:"そら"},{t:"が"},{t:"青",r:"あお"},{t:"いです。"}] },
  { id: 35, kanji: "電", reading: "でん", meaning: "Điện / Điện thoại", level: "N5", example: "電車で会社へ行きます。", exampleMeaning: "Tôi đi làm bằng tàu điện.", exampleFurigana: [{t:"電車",r:"でんしゃ"},{t:"で"},{t:"会社",r:"かいしゃ"},{t:"へ"},{t:"行",r:"い"},{t:"きます。"}] },
  { id: 36, kanji: "駅", reading: "えき", meaning: "Ga tàu", level: "N5", example: "駅の前で待っています。", exampleMeaning: "Tôi đang đợi trước ga.", exampleFurigana: [{t:"駅",r:"えき"},{t:"の"},{t:"前",r:"まえ"},{t:"で"},{t:"待",r:"ま"},{t:"っています。"}] },
  { id: 37, kanji: "道", reading: "どう／みち", meaning: "Con đường / Đạo", level: "N5", example: "この道をまっすぐ行ってください。", exampleMeaning: "Hãy đi thẳng con đường này.", exampleFurigana: [{t:"この"},{t:"道",r:"みち"},{t:"をまっすぐ"},{t:"行",r:"い"},{t:"ってください。"}] },
  { id: 38, kanji: "時", reading: "じ／とき", meaning: "Giờ / Thời gian", level: "N5", example: "今何時ですか？", exampleMeaning: "Bây giờ là mấy giờ?", exampleFurigana: [{t:"今"},{t:"何時",r:"なんじ"},{t:"ですか？"}] },
  { id: 39, kanji: "間", reading: "かん／あいだ", meaning: "Khoảng thời gian / Khoảng cách", level: "N5", example: "一時間勉強しました。", exampleMeaning: "Tôi đã học một tiếng đồng hồ.", exampleFurigana: [{t:"一時間",r:"いちじかん"},{t:"勉強",r:"べんきょう"},{t:"しました。"}] },
  { id: 40, kanji: "年", reading: "ねん／とし", meaning: "Năm / Tuổi", level: "N5", example: "今年は何年ですか？", exampleMeaning: "Năm nay là năm mấy?", exampleFurigana: [{t:"今年",r:"ことし"},{t:"は"},{t:"何年",r:"なんねん"},{t:"ですか？"}] },
  { id: 41, kanji: "父", reading: "ふ／ちち", meaning: "Cha / Bố", level: "N5", example: "父は会社員です。", exampleMeaning: "Bố tôi là nhân viên công ty.", exampleFurigana: [{t:"父",r:"ちち"},{t:"は"},{t:"会社員",r:"かいしゃいん"},{t:"です。"}] },
  { id: 42, kanji: "母", reading: "ぼ／はは", meaning: "Mẹ", level: "N5", example: "母は料理が上手です。", exampleMeaning: "Mẹ tôi nấu ăn giỏi.", exampleFurigana: [{t:"母",r:"はは"},{t:"は"},{t:"料理",r:"りょうり"},{t:"が"},{t:"上手",r:"じょうず"},{t:"です。"}] },
  { id: 43, kanji: "子", reading: "し／こ", meaning: "Con / Đứa trẻ", level: "N5", example: "子供と公園へ行きました。", exampleMeaning: "Tôi đã đi công viên với con.", exampleFurigana: [{t:"子供",r:"こども"},{t:"と"},{t:"公園",r:"こうえん"},{t:"へ"},{t:"行",r:"い"},{t:"きました。"}] },
  { id: 44, kanji: "犬", reading: "けん／いぬ", meaning: "Chó", level: "N5", example: "毎日犬を散歩させます。", exampleMeaning: "Mỗi ngày tôi dắt chó đi dạo.", exampleFurigana: [{t:"毎日",r:"まいにち"},{t:"犬",r:"いぬ"},{t:"を"},{t:"散歩",r:"さんぽ"},{t:"させます。"}] },
  { id: 45, kanji: "猫", reading: "びょう／ねこ", meaning: "Mèo", level: "N5", example: "家に猫が二匹います。", exampleMeaning: "Ở nhà tôi có hai con mèo.", exampleFurigana: [{t:"家",r:"いえ"},{t:"に"},{t:"猫",r:"ねこ"},{t:"が"},{t:"二匹",r:"にひき"},{t:"います。"}] },
  { id: 46, kanji: "魚", reading: "ぎょ／さかな", meaning: "Cá", level: "N5", example: "魚を食べるのが好きです。", exampleMeaning: "Tôi thích ăn cá.", exampleFurigana: [{t:"魚",r:"さかな"},{t:"を"},{t:"食",r:"た"},{t:"べるのが"},{t:"好",r:"す"},{t:"きです。"}] },
  { id: 47, kanji: "鳥", reading: "ちょう／とり", meaning: "Chim / Gia cầm", level: "N5", example: "鳥が空を飛んでいます。", exampleMeaning: "Chim đang bay trên bầu trời.", exampleFurigana: [{t:"鳥",r:"とり"},{t:"が"},{t:"空",r:"そら"},{t:"を"},{t:"飛",r:"と"},{t:"んでいます。"}] },
  { id: 48, kanji: "先", reading: "せん／さき", meaning: "Trước / Tiên", level: "N5", example: "先生に質問します。", exampleMeaning: "Tôi hỏi giáo viên.", exampleFurigana: [{t:"先生",r:"せんせい"},{t:"に"},{t:"質問",r:"しつもん"},{t:"します。"}] },
  { id: 49, kanji: "右", reading: "う／みぎ", meaning: "Bên phải", level: "N5", example: "右に曲がってください。", exampleMeaning: "Hãy rẽ phải.", exampleFurigana: [{t:"右",r:"みぎ"},{t:"に"},{t:"曲",r:"ま"},{t:"がってください。"}] },
  { id: 50, kanji: "左", reading: "さ／ひだり", meaning: "Bên trái", level: "N5", example: "左側を歩いてください。", exampleMeaning: "Hãy đi phía bên trái.", exampleFurigana: [{t:"左側",r:"ひだりがわ"},{t:"を"},{t:"歩",r:"ある"},{t:"いてください。"}] },
];

const KANJI_N4 = [
  { id: 101, kanji: "起", reading: "き／お", meaning: "Thức dậy / Xảy ra", level: "N4", example: "毎朝六時に起きます。", exampleMeaning: "Mỗi sáng tôi thức dậy lúc 6 giờ.", exampleFurigana: [{t:"毎朝",r:"まいあさ"},{t:"六時",r:"ろくじ"},{t:"に"},{t:"起",r:"お"},{t:"きます。"}] },
  { id: 102, kanji: "寝", reading: "しん／ね", meaning: "Ngủ / Nằm", level: "N4", example: "早く寝てください。", exampleMeaning: "Hãy đi ngủ sớm.", exampleFurigana: [{t:"早",r:"はや"},{t:"く"},{t:"寝",r:"ね"},{t:"てください。"}] },
  { id: 103, kanji: "働", reading: "どう／はたら", meaning: "Làm việc", level: "N4", example: "父は工場で働いています。", exampleMeaning: "Bố tôi làm việc ở nhà máy.", exampleFurigana: [{t:"父",r:"ちち"},{t:"は"},{t:"工場",r:"こうじょう"},{t:"で"},{t:"働",r:"はたら"},{t:"いています。"}] },
  { id: 104, kanji: "待", reading: "たい／ま", meaning: "Chờ / Đợi", level: "N4", example: "バス停で友達を待っています。", exampleMeaning: "Tôi đang đợi bạn ở bến xe buýt.", exampleFurigana: [{t:"バス"},{t:"停",r:"てい"},{t:"で"},{t:"友達",r:"ともだち"},{t:"を"},{t:"待",r:"ま"},{t:"っています。"}] },
  { id: 105, kanji: "持", reading: "じ／も", meaning: "Cầm / Mang", level: "N4", example: "傘を持って行きます。", exampleMeaning: "Tôi mang ô đi.", exampleFurigana: [{t:"傘",r:"かさ"},{t:"を"},{t:"持",r:"も"},{t:"って"},{t:"行",r:"い"},{t:"きます。"}] },
  { id: 106, kanji: "使", reading: "し／つか", meaning: "Sử dụng", level: "N4", example: "毎日パソコンを使います。", exampleMeaning: "Tôi dùng máy tính mỗi ngày.", exampleFurigana: [{t:"毎日",r:"まいにち"},{t:"パソコンを"},{t:"使",r:"つか"},{t:"います。"}] },
  { id: 107, kanji: "貸", reading: "たい／か", meaning: "Cho mượn", level: "N4", example: "ペンを貸してください。", exampleMeaning: "Cho tôi mượn bút.", exampleFurigana: [{t:"ペンを"},{t:"貸",r:"か"},{t:"してください。"}] },
  { id: 108, kanji: "借", reading: "しゃく／か", meaning: "Mượn / Vay", level: "N4", example: "図書館で本を借りました。", exampleMeaning: "Tôi mượn sách ở thư viện.", exampleFurigana: [{t:"図書館",r:"としょかん"},{t:"で"},{t:"本",r:"ほん"},{t:"を"},{t:"借",r:"か"},{t:"りました。"}] },
  { id: 109, kanji: "教", reading: "きょう／おし", meaning: "Dạy / Chỉ bảo", level: "N4", example: "先生が漢字を教えてくれました。", exampleMeaning: "Thầy giáo đã dạy tôi kanji.", exampleFurigana: [{t:"先生",r:"せんせい"},{t:"が"},{t:"漢字",r:"かんじ"},{t:"を"},{t:"教",r:"おし"},{t:"えてくれました。"}] },
  { id: 110, kanji: "習", reading: "しゅう／なら", meaning: "Học / Luyện tập", level: "N4", example: "ギターを習っています。", exampleMeaning: "Tôi đang học guitar.", exampleFurigana: [{t:"ギターを"},{t:"習",r:"なら"},{t:"っています。"}] },
  { id: 111, kanji: "急", reading: "きゅう／いそ", meaning: "Gấp / Khẩn cấp", level: "N4", example: "急いでください、遅刻しますよ。", exampleMeaning: "Hãy nhanh lên, muộn rồi đấy.", exampleFurigana: [{t:"急",r:"いそ"},{t:"いでください、"},{t:"遅刻",r:"ちこく"},{t:"しますよ。"}] },
  { id: 112, kanji: "忘", reading: "ぼう／わす", meaning: "Quên", level: "N4", example: "宿題を忘れてしまいました。", exampleMeaning: "Tôi đã quên mất bài tập.", exampleFurigana: [{t:"宿題",r:"しゅくだい"},{t:"を"},{t:"忘",r:"わす"},{t:"れてしまいました。"}] },
  { id: 113, kanji: "集", reading: "しゅう／あつ", meaning: "Tập hợp / Thu thập", level: "N4", example: "切手を集めるのが趣味です。", exampleMeaning: "Sở thích của tôi là sưu tầm tem.", exampleFurigana: [{t:"切手",r:"きって"},{t:"を"},{t:"集",r:"あつ"},{t:"めるのが"},{t:"趣味",r:"しゅみ"},{t:"です。"}] },
  { id: 114, kanji: "特", reading: "とく", meaning: "Đặc biệt", level: "N4", example: "今日は特別なイベントがあります。", exampleMeaning: "Hôm nay có sự kiện đặc biệt.", exampleFurigana: [{t:"今日",r:"きょう"},{t:"は"},{t:"特別",r:"とくべつ"},{t:"なイベントがあります。"}] },
  { id: 115, kanji: "族", reading: "ぞく", meaning: "Gia tộc / Nhóm", level: "N4", example: "家族と旅行に行きました。", exampleMeaning: "Tôi đi du lịch cùng gia đình.", exampleFurigana: [{t:"家族",r:"かぞく"},{t:"と"},{t:"旅行",r:"りょこう"},{t:"に"},{t:"行",r:"い"},{t:"きました。"}] },
  { id: 116, kanji: "旅", reading: "りょ／たび", meaning: "Du lịch / Chuyến đi", level: "N4", example: "来年ヨーロッパへ旅行したいです。", exampleMeaning: "Năm sau tôi muốn đi du lịch châu Âu.", exampleFurigana: [{t:"来年",r:"らいねん"},{t:"ヨーロッパへ"},{t:"旅行",r:"りょこう"},{t:"したいです。"}] },
  { id: 117, kanji: "泳", reading: "えい／およ", meaning: "Bơi lội", level: "N4", example: "夏はプールで泳ぎます。", exampleMeaning: "Mùa hè tôi bơi ở bể bơi.", exampleFurigana: [{t:"夏",r:"なつ"},{t:"はプールで"},{t:"泳",r:"およ"},{t:"ぎます。"}] },
  { id: 118, kanji: "走", reading: "そう／はし", meaning: "Chạy", level: "N4", example: "毎朝公園を走っています。", exampleMeaning: "Mỗi sáng tôi chạy trong công viên.", exampleFurigana: [{t:"毎朝",r:"まいあさ"},{t:"公園",r:"こうえん"},{t:"を"},{t:"走",r:"はし"},{t:"っています。"}] },
  { id: 119, kanji: "歌", reading: "か／うた", meaning: "Bài hát / Hát", level: "N4", example: "カラオケで歌を歌いました。", exampleMeaning: "Tôi đã hát karaoke.", exampleFurigana: [{t:"カラオケで"},{t:"歌",r:"うた"},{t:"を"},{t:"歌",r:"うた"},{t:"いました。"}] },
  { id: 120, kanji: "読", reading: "どく／よ", meaning: "Đọc", level: "N4", example: "毎晩小説を読みます。", exampleMeaning: "Mỗi tối tôi đọc tiểu thuyết.", exampleFurigana: [{t:"毎晩",r:"まいばん"},{t:"小説",r:"しょうせつ"},{t:"を"},{t:"読",r:"よ"},{t:"みます。"}] },
  { id: 121, kanji: "書", reading: "しょ／か", meaning: "Viết", level: "N4", example: "手紙を書くのが好きです。", exampleMeaning: "Tôi thích viết thư.", exampleFurigana: [{t:"手紙",r:"てがみ"},{t:"を"},{t:"書",r:"か"},{t:"くのが"},{t:"好",r:"す"},{t:"きです。"}] },
  { id: 122, kanji: "話", reading: "わ／はな", meaning: "Nói chuyện / Câu chuyện", level: "N4", example: "電話で話しました。", exampleMeaning: "Tôi đã nói chuyện qua điện thoại.", exampleFurigana: [{t:"電話",r:"でんわ"},{t:"で"},{t:"話",r:"はな"},{t:"しました。"}] },
  { id: 123, kanji: "答", reading: "とう／こた", meaning: "Trả lời / Đáp án", level: "N4", example: "先生の質問に答えました。", exampleMeaning: "Tôi đã trả lời câu hỏi của thầy.", exampleFurigana: [{t:"先生",r:"せんせい"},{t:"の"},{t:"質問",r:"しつもん"},{t:"に"},{t:"答",r:"こた"},{t:"えました。"}] },
  { id: 124, kanji: "考", reading: "こう／かんが", meaning: "Suy nghĩ", level: "N4", example: "よく考えてから決めます。", exampleMeaning: "Tôi sẽ suy nghĩ kỹ rồi mới quyết định.", exampleFurigana: [{t:"よく"},{t:"考",r:"かんが"},{t:"えてから"},{t:"決",r:"き"},{t:"めます。"}] },
  { id: 125, kanji: "知", reading: "ち／し", meaning: "Biết / Hiểu", level: "N4", example: "彼女の住所を知っていますか？", exampleMeaning: "Bạn có biết địa chỉ của cô ấy không?", exampleFurigana: [{t:"彼女",r:"かのじょ"},{t:"の"},{t:"住所",r:"じゅうしょ"},{t:"を"},{t:"知",r:"し"},{t:"っていますか？"}] },
  { id: 126, kanji: "病", reading: "びょう／やまい", meaning: "Bệnh tật", level: "N4", example: "病院で診てもらいました。", exampleMeaning: "Tôi đã được khám ở bệnh viện.", exampleFurigana: [{t:"病院",r:"びょういん"},{t:"で"},{t:"診",r:"み"},{t:"てもらいました。"}] },
  { id: 127, kanji: "薬", reading: "やく／くすり", meaning: "Thuốc", level: "N4", example: "食後に薬を飲んでください。", exampleMeaning: "Hãy uống thuốc sau bữa ăn.", exampleFurigana: [{t:"食後",r:"しょくご"},{t:"に"},{t:"薬",r:"くすり"},{t:"を"},{t:"飲",r:"の"},{t:"んでください。"}] },
  { id: 128, kanji: "音", reading: "おん／おと", meaning: "Âm thanh / Tiếng", level: "N4", example: "音楽を聴くのが大好きです。", exampleMeaning: "Tôi rất thích nghe nhạc.", exampleFurigana: [{t:"音楽",r:"おんがく"},{t:"を"},{t:"聴",r:"き"},{t:"くのが"},{t:"大好",r:"だいす"},{t:"きです。"}] },
  { id: 129, kanji: "色", reading: "しょく／いろ", meaning: "Màu sắc", level: "N4", example: "青い色が好きです。", exampleMeaning: "Tôi thích màu xanh.", exampleFurigana: [{t:"青",r:"あお"},{t:"い"},{t:"色",r:"いろ"},{t:"が"},{t:"好",r:"す"},{t:"きです。"}] },
  { id: 130, kanji: "映", reading: "えい", meaning: "Chiếu / Phản chiếu", level: "N4", example: "映画館で映画を見ました。", exampleMeaning: "Tôi xem phim ở rạp chiếu phim.", exampleFurigana: [{t:"映画館",r:"えいがかん"},{t:"で"},{t:"映画",r:"えいが"},{t:"を"},{t:"見",r:"み"},{t:"ました。"}] },
  { id: 131, kanji: "覚", reading: "かく／おぼ", meaning: "Nhớ / Học thuộc", level: "N4", example: "単語を覚えましょう。", exampleMeaning: "Hãy học thuộc từ vựng.", exampleFurigana: [{t:"単語",r:"たんご"},{t:"を"},{t:"覚",r:"おぼ"},{t:"えましょう。"}] },
  { id: 132, kanji: "落", reading: "らく／お", meaning: "Rơi / Ngã / Rớt", level: "N4", example: "財布が落ちました。", exampleMeaning: "Ví tiền bị rơi.", exampleFurigana: [{t:"財布",r:"さいふ"},{t:"が"},{t:"落",r:"お"},{t:"ちました。"}] },
  { id: 133, kanji: "止", reading: "し／と", meaning: "Dừng lại / Ngăn", level: "N4", example: "赤信号で車が止まります。", exampleMeaning: "Xe dừng lại khi đèn đỏ.", exampleFurigana: [{t:"赤信号",r:"あかしんごう"},{t:"で"},{t:"車",r:"くるま"},{t:"が"},{t:"止",r:"と"},{t:"まります。"}] },
  { id: 134, kanji: "引", reading: "いん／ひ", meaning: "Kéo / Tra cứu", level: "N4", example: "辞書を引いて調べます。", exampleMeaning: "Tôi tra từ điển để tìm hiểu.", exampleFurigana: [{t:"辞書",r:"じしょ"},{t:"を"},{t:"引",r:"ひ"},{t:"いて"},{t:"調",r:"しら"},{t:"べます。"}] },
  { id: 135, kanji: "押", reading: "おう／お", meaning: "Đẩy / Nhấn", level: "N4", example: "このボタンを押してください。", exampleMeaning: "Hãy nhấn nút này.", exampleFurigana: [{t:"このボタンを"},{t:"押",r:"お"},{t:"してください。"}] },
  { id: 136, kanji: "切", reading: "せつ／き", meaning: "Cắt / Quan trọng", level: "N4", example: "ハサミで紙を切ります。", exampleMeaning: "Tôi cắt giấy bằng kéo.", exampleFurigana: [{t:"ハサミで"},{t:"紙",r:"かみ"},{t:"を"},{t:"切",r:"き"},{t:"ります。"}] },
  { id: 137, kanji: "開", reading: "かい／あ", meaning: "Mở / Khai mạc", level: "N4", example: "窓を開けてください。", exampleMeaning: "Hãy mở cửa sổ.", exampleFurigana: [{t:"窓",r:"まど"},{t:"を"},{t:"開",r:"あ"},{t:"けてください。"}] },
  { id: 138, kanji: "閉", reading: "へい／し", meaning: "Đóng / Kết thúc", level: "N4", example: "ドアを閉めてください。", exampleMeaning: "Hãy đóng cửa lại.", exampleFurigana: [{t:"ドアを"},{t:"閉",r:"し"},{t:"めてください。"}] },
  { id: 139, kanji: "運", reading: "うん／はこ", meaning: "Vận chuyển / May mắn", level: "N4", example: "荷物を運んでもらえますか？", exampleMeaning: "Bạn có thể giúp tôi chuyển đồ không?", exampleFurigana: [{t:"荷物",r:"にもつ"},{t:"を"},{t:"運",r:"はこ"},{t:"んでもらえますか？"}] },
  { id: 140, kanji: "乗", reading: "じょう／の", meaning: "Lên / Đi (phương tiện)", level: "N4", example: "バスに乗って学校へ行きます。", exampleMeaning: "Tôi đi học bằng xe buýt.", exampleFurigana: [{t:"バスに"},{t:"乗",r:"の"},{t:"って"},{t:"学校",r:"がっこう"},{t:"へ"},{t:"行",r:"い"},{t:"きます。"}] },
  { id: 141, kanji: "降", reading: "こう／お", meaning: "Xuống / Rơi (mưa/tuyết)", level: "N4", example: "次の駅で降ります。", exampleMeaning: "Tôi xuống ở ga tiếp theo.", exampleFurigana: [{t:"次",r:"つぎ"},{t:"の"},{t:"駅",r:"えき"},{t:"で"},{t:"降",r:"お"},{t:"ります。"}] },
  { id: 142, kanji: "着", reading: "ちゃく／つ", meaning: "Đến nơi / Mặc (quần áo)", level: "N4", example: "東京に着きました。", exampleMeaning: "Tôi đã đến Tokyo.", exampleFurigana: [{t:"東京",r:"とうきょう"},{t:"に"},{t:"着",r:"つ"},{t:"きました。"}] },
  { id: 143, kanji: "洗", reading: "せん／あら", meaning: "Rửa / Giặt", level: "N4", example: "食事の前に手を洗います。", exampleMeaning: "Tôi rửa tay trước bữa ăn.", exampleFurigana: [{t:"食事",r:"しょくじ"},{t:"の"},{t:"前",r:"まえ"},{t:"に"},{t:"手",r:"て"},{t:"を"},{t:"洗",r:"あら"},{t:"います。"}] },
  { id: 144, kanji: "渡", reading: "と／わた", meaning: "Qua / Giao cho", level: "N4", example: "橋を渡って公園へ行きます。", exampleMeaning: "Tôi qua cầu để đến công viên.", exampleFurigana: [{t:"橋",r:"はし"},{t:"を"},{t:"渡",r:"わた"},{t:"って"},{t:"公園",r:"こうえん"},{t:"へ"},{t:"行",r:"い"},{t:"きます。"}] },
  { id: 145, kanji: "返", reading: "へん／かえ", meaning: "Trả lại / Trở về", level: "N4", example: "借りた本を返しました。", exampleMeaning: "Tôi đã trả sách đã mượn.", exampleFurigana: [{t:"借",r:"か"},{t:"りた"},{t:"本",r:"ほん"},{t:"を"},{t:"返",r:"かえ"},{t:"しました。"}] },
  { id: 146, kanji: "捨", reading: "しゃ／す", meaning: "Vứt bỏ / Từ bỏ", level: "N4", example: "ゴミを捨ててください。", exampleMeaning: "Hãy vứt rác đi.", exampleFurigana: [{t:"ゴミを"},{t:"捨",r:"す"},{t:"ててください。"}] },
  { id: 147, kanji: "拾", reading: "しゅう／ひろ", meaning: "Nhặt lên / Lượm", level: "N4", example: "落ちた財布を拾いました。", exampleMeaning: "Tôi đã nhặt chiếc ví bị rơi.", exampleFurigana: [{t:"落",r:"お"},{t:"ちた"},{t:"財布",r:"さいふ"},{t:"を"},{t:"拾",r:"ひろ"},{t:"いました。"}] },
  { id: 148, kanji: "比", reading: "ひ／くら", meaning: "So sánh", level: "N4", example: "二つの値段を比べました。", exampleMeaning: "Tôi đã so sánh hai mức giá.", exampleFurigana: [{t:"二",r:"ふた"},{t:"つの"},{t:"値段",r:"ねだん"},{t:"を"},{t:"比",r:"くら"},{t:"べました。"}] },
  { id: 149, kanji: "調", reading: "ちょう／しら", meaning: "Điều tra / Tra cứu", level: "N4", example: "インターネットで調べます。", exampleMeaning: "Tôi tra cứu trên internet.", exampleFurigana: [{t:"インターネットで"},{t:"調",r:"しら"},{t:"べます。"}] },
  { id: 150, kanji: "選", reading: "せん／えら", meaning: "Chọn lựa / Lựa chọn", level: "N4", example: "好きな色を選んでください。", exampleMeaning: "Hãy chọn màu bạn thích.", exampleFurigana: [{t:"好",r:"す"},{t:"きな"},{t:"色",r:"いろ"},{t:"を"},{t:"選",r:"えら"},{t:"んでください。"}] },
];

const KANJI_N3 = [
  { id: 201, kanji: "経", reading: "けい／へ", meaning: "Kinh qua / Quản lý", level: "N3", example: "彼は経営学を専攻しています。", exampleMeaning: "Anh ấy chuyên ngành quản trị kinh doanh.", exampleFurigana: [{t:"彼",r:"かれ"},{t:"は"},{t:"経営学",r:"けいえいがく"},{t:"を"},{t:"専攻",r:"せんこう"},{t:"しています。"}] },
  { id: 202, kanji: "験", reading: "けん／ため", meaning: "Kinh nghiệm / Thí nghiệm", level: "N3", example: "来月、日本語能力試験を受けます。", exampleMeaning: "Tháng sau tôi thi năng lực tiếng Nhật.", exampleFurigana: [{t:"来月",r:"らいげつ"},{t:"、"},{t:"日本語能力試験",r:"にほんごのうりょくしけん"},{t:"を"},{t:"受",r:"う"},{t:"けます。"}] },
  { id: 203, kanji: "続", reading: "ぞく／つづ", meaning: "Tiếp tục", level: "N3", example: "毎日練習を続けることが大切です。", exampleMeaning: "Tiếp tục luyện tập mỗi ngày rất quan trọng.", exampleFurigana: [{t:"毎日",r:"まいにち"},{t:"練習",r:"れんしゅう"},{t:"を"},{t:"続",r:"つづ"},{t:"けることが"},{t:"大切",r:"たいせつ"},{t:"です。"}] },
  { id: 204, kanji: "変", reading: "へん／か", meaning: "Thay đổi / Kỳ lạ", level: "N3", example: "最近、天気が変わりやすいです。", exampleMeaning: "Gần đây thời tiết hay thay đổi.", exampleFurigana: [{t:"最近",r:"さいきん"},{t:"、"},{t:"天気",r:"てんき"},{t:"が"},{t:"変",r:"か"},{t:"わりやすいです。"}] },
  { id: 205, kanji: "決", reading: "けつ／き", meaning: "Quyết định", level: "N3", example: "進路を決めるのに時間がかかりました。", exampleMeaning: "Tôi mất thời gian để quyết định hướng đi.", exampleFurigana: [{t:"進路",r:"しんろ"},{t:"を"},{t:"決",r:"き"},{t:"めるのに"},{t:"時間",r:"じかん"},{t:"がかかりました。"}] },
  { id: 206, kanji: "感", reading: "かん", meaning: "Cảm giác / Cảm xúc", level: "N3", example: "映画を見て感動しました。", exampleMeaning: "Tôi đã rất xúc động khi xem phim.", exampleFurigana: [{t:"映画",r:"えいが"},{t:"を"},{t:"見",r:"み"},{t:"て"},{t:"感動",r:"かんどう"},{t:"しました。"}] },
  { id: 207, kanji: "想", reading: "そう／おも", meaning: "Suy nghĩ / Tưởng tượng", level: "N3", example: "理想の仕事について考えています。", exampleMeaning: "Tôi đang nghĩ về công việc lý tưởng.", exampleFurigana: [{t:"理想",r:"りそう"},{t:"の"},{t:"仕事",r:"しごと"},{t:"について"},{t:"考",r:"かんが"},{t:"えています。"}] },
  { id: 208, kanji: "意", reading: "い", meaning: "Ý nghĩa / Ý thức", level: "N3", example: "この言葉の意味を教えてください。", exampleMeaning: "Hãy cho tôi biết nghĩa của từ này.", exampleFurigana: [{t:"この"},{t:"言葉",r:"ことば"},{t:"の"},{t:"意味",r:"いみ"},{t:"を"},{t:"教",r:"おし"},{t:"えてください。"}] },
  { id: 209, kanji: "味", reading: "み／あじ", meaning: "Hương vị / Mùi vị", level: "N3", example: "このラーメンは味が濃いです。", exampleMeaning: "Ramen này vị đậm đà.", exampleFurigana: [{t:"このラーメンは"},{t:"味",r:"あじ"},{t:"が"},{t:"濃",r:"こ"},{t:"いです。"}] },
  { id: 210, kanji: "必", reading: "ひつ／かなら", meaning: "Nhất định / Cần thiết", level: "N3", example: "毎日復習することが必要です。", exampleMeaning: "Ôn bài mỗi ngày là điều cần thiết.", exampleFurigana: [{t:"毎日",r:"まいにち"},{t:"復習",r:"ふくしゅう"},{t:"することが"},{t:"必要",r:"ひつよう"},{t:"です。"}] },
  { id: 211, kanji: "要", reading: "よう／い", meaning: "Cần / Quan trọng", level: "N3", example: "ビザの申請に必要な書類を準備しました。", exampleMeaning: "Tôi đã chuẩn bị giấy tờ cần thiết để xin visa.", exampleFurigana: [{t:"ビザの"},{t:"申請",r:"しんせい"},{t:"に"},{t:"必要",r:"ひつよう"},{t:"な"},{t:"書類",r:"しょるい"},{t:"を"},{t:"準備",r:"じゅんび"},{t:"しました。"}] },
  { id: 212, kanji: "様", reading: "よう／さま", meaning: "Cách thức / Ngài (kính ngữ)", level: "N3", example: "田中様、お電話ありがとうございます。", exampleMeaning: "Kính thưa ông Tanaka, cảm ơn đã gọi điện.", exampleFurigana: [{t:"田中",r:"たなか"},{t:"様",r:"さま"},{t:"、お"},{t:"電話",r:"でんわ"},{t:"ありがとうございます。"}] },
  { id: 213, kanji: "場", reading: "じょう／ば", meaning: "Nơi chốn / Địa điểm", level: "N3", example: "駐車場が満車です。", exampleMeaning: "Bãi đỗ xe đã đầy.", exampleFurigana: [{t:"駐車場",r:"ちゅうしゃじょう"},{t:"が"},{t:"満車",r:"まんしゃ"},{t:"です。"}] },
  { id: 214, kanji: "関", reading: "かん／せき", meaning: "Liên quan / Quan hệ", level: "N3", example: "健康に関する本を読んでいます。", exampleMeaning: "Tôi đang đọc sách về sức khỏe.", exampleFurigana: [{t:"健康",r:"けんこう"},{t:"に"},{t:"関",r:"かん"},{t:"する"},{t:"本",r:"ほん"},{t:"を"},{t:"読",r:"よ"},{t:"んでいます。"}] },
  { id: 215, kanji: "産", reading: "さん／う", meaning: "Sản xuất / Sinh ra", level: "N3", example: "この地域は農産物が豊富です。", exampleMeaning: "Vùng này nông sản phong phú.", exampleFurigana: [{t:"この"},{t:"地域",r:"ちいき"},{t:"は"},{t:"農産物",r:"のうさんぶつ"},{t:"が"},{t:"豊富",r:"ほうふ"},{t:"です。"}] },
  { id: 216, kanji: "業", reading: "ぎょう／わざ", meaning: "Nghề nghiệp / Công việc", level: "N3", example: "IT業界で働くのが夢です。", exampleMeaning: "Làm việc trong ngành IT là ước mơ của tôi.", exampleFurigana: [{t:"IT"},{t:"業界",r:"ぎょうかい"},{t:"で"},{t:"働",r:"はたら"},{t:"くのが"},{t:"夢",r:"ゆめ"},{t:"です。"}] },
  { id: 217, kanji: "活", reading: "かつ／い", meaning: "Hoạt động / Sống", level: "N3", example: "大学生活を楽しんでいます。", exampleMeaning: "Tôi đang tận hưởng cuộc sống đại học.", exampleFurigana: [{t:"大学",r:"だいがく"},{t:"生活",r:"せいかつ"},{t:"を"},{t:"楽",r:"たの"},{t:"しんでいます。"}] },
  { id: 218, kanji: "動", reading: "どう／うご", meaning: "Chuyển động / Hành động", level: "N3", example: "地震で建物が動きました。", exampleMeaning: "Tòa nhà rung chuyển vì động đất.", exampleFurigana: [{t:"地震",r:"じしん"},{t:"で"},{t:"建物",r:"たてもの"},{t:"が"},{t:"動",r:"うご"},{t:"きました。"}] },
  { id: 219, kanji: "化", reading: "か／ば", meaning: "Biến đổi / Hóa", level: "N3", example: "社会は急速に変化しています。", exampleMeaning: "Xã hội đang thay đổi nhanh chóng.", exampleFurigana: [{t:"社会",r:"しゃかい"},{t:"は"},{t:"急速",r:"きゅうそく"},{t:"に"},{t:"変化",r:"へんか"},{t:"しています。"}] },
  { id: 220, kanji: "研", reading: "けん", meaning: "Nghiên cứu / Mài giũa", level: "N3", example: "新しい研究を始めました。", exampleMeaning: "Tôi đã bắt đầu nghiên cứu mới.", exampleFurigana: [{t:"新",r:"あたら"},{t:"しい"},{t:"研究",r:"けんきゅう"},{t:"を"},{t:"始",r:"はじ"},{t:"めました。"}] },
  { id: 221, kanji: "題", reading: "だい", meaning: "Đề tài / Vấn đề", level: "N3", example: "この問題は難しいです。", exampleMeaning: "Vấn đề này khó.", exampleFurigana: [{t:"この"},{t:"問題",r:"もんだい"},{t:"は"},{t:"難",r:"むずか"},{t:"しいです。"}] },
  { id: 222, kanji: "以", reading: "い", meaning: "Hơn / Trên (kết hợp)", level: "N3", example: "三十分以上待ちました。", exampleMeaning: "Tôi đã đợi hơn 30 phút.", exampleFurigana: [{t:"三十分",r:"さんじゅっぷん"},{t:"以上",r:"いじょう"},{t:"待",r:"ま"},{t:"ちました。"}] },
  { id: 223, kanji: "全", reading: "ぜん／すべ", meaning: "Toàn bộ / Tất cả", level: "N3", example: "全員が試験に合格しました。", exampleMeaning: "Tất cả mọi người đều đỗ kỳ thi.", exampleFurigana: [{t:"全員",r:"ぜんいん"},{t:"が"},{t:"試験",r:"しけん"},{t:"に"},{t:"合格",r:"ごうかく"},{t:"しました。"}] },
  { id: 224, kanji: "別", reading: "べつ／わか", meaning: "Khác / Chia ly", level: "N3", example: "別の方法を考えましょう。", exampleMeaning: "Hãy nghĩ đến phương pháp khác.", exampleFurigana: [{t:"別",r:"べつ"},{t:"の"},{t:"方法",r:"ほうほう"},{t:"を"},{t:"考",r:"かんが"},{t:"えましょう。"}] },
  { id: 225, kanji: "的", reading: "てき", meaning: "Mang tính (hậu tố)", level: "N3", example: "科学的な根拠が必要です。", exampleMeaning: "Cần có cơ sở khoa học.", exampleFurigana: [{t:"科学的",r:"かがくてき"},{t:"な"},{t:"根拠",r:"こんきょ"},{t:"が"},{t:"必要",r:"ひつよう"},{t:"です。"}] },
  { id: 226, kanji: "加", reading: "か／くわ", meaning: "Thêm vào / Tham gia", level: "N3", example: "スープに塩を加えました。", exampleMeaning: "Tôi đã thêm muối vào canh.", exampleFurigana: [{t:"スープに"},{t:"塩",r:"しお"},{t:"を"},{t:"加",r:"くわ"},{t:"えました。"}] },
  { id: 227, kanji: "末", reading: "まつ／すえ", meaning: "Cuối / Kết thúc", level: "N3", example: "週末に映画を見に行きます。", exampleMeaning: "Cuối tuần tôi đi xem phim.", exampleFurigana: [{t:"週末",r:"しゅうまつ"},{t:"に"},{t:"映画",r:"えいが"},{t:"を"},{t:"見",r:"み"},{t:"に"},{t:"行",r:"い"},{t:"きます。"}] },
  { id: 228, kanji: "初", reading: "しょ／はじ", meaning: "Đầu tiên / Ban đầu", level: "N3", example: "初めて日本に来たのは去年です。", exampleMeaning: "Lần đầu tiên tôi đến Nhật là năm ngoái.", exampleFurigana: [{t:"初",r:"はじ"},{t:"めて"},{t:"日本",r:"にほん"},{t:"に"},{t:"来",r:"き"},{t:"たのは"},{t:"去年",r:"きょねん"},{t:"です。"}] },
  { id: 229, kanji: "合", reading: "ごう／あ", meaning: "Hợp / Phù hợp", level: "N3", example: "このシャツは私に合っていますか？", exampleMeaning: "Chiếc áo này có hợp với tôi không?", exampleFurigana: [{t:"このシャツは"},{t:"私",r:"わたし"},{t:"に"},{t:"合",r:"あ"},{t:"っていますか？"}] },
  { id: 230, kanji: "特", reading: "とく", meaning: "Đặc biệt / Riêng", level: "N3", example: "彼女は特に数学が得意です。", exampleMeaning: "Cô ấy đặc biệt giỏi toán.", exampleFurigana: [{t:"彼女",r:"かのじょ"},{t:"は"},{t:"特",r:"とく"},{t:"に"},{t:"数学",r:"すうがく"},{t:"が"},{t:"得意",r:"とくい"},{t:"です。"}] },
  { id: 231, kanji: "増", reading: "ぞう／ふ", meaning: "Tăng / Thêm", level: "N3", example: "最近体重が増えました。", exampleMeaning: "Gần đây tôi tăng cân.", exampleFurigana: [{t:"最近",r:"さいきん"},{t:"体重",r:"たいじゅう"},{t:"が"},{t:"増",r:"ふ"},{t:"えました。"}] },
  { id: 232, kanji: "減", reading: "げん／へ", meaning: "Giảm / Bớt", level: "N3", example: "残業を減らしたいです。", exampleMeaning: "Tôi muốn giảm làm thêm giờ.", exampleFurigana: [{t:"残業",r:"ざんぎょう"},{t:"を"},{t:"減",r:"へ"},{t:"らしたいです。"}] },
  { id: 233, kanji: "深", reading: "しん／ふか", meaning: "Sâu / Thâm sâu", level: "N3", example: "この池はとても深いです。", exampleMeaning: "Cái ao này rất sâu.", exampleFurigana: [{t:"この"},{t:"池",r:"いけ"},{t:"はとても"},{t:"深",r:"ふか"},{t:"いです。"}] },
  { id: 234, kanji: "広", reading: "こう／ひろ", meaning: "Rộng / Quảng bá", level: "N3", example: "公園はとても広いです。", exampleMeaning: "Công viên rất rộng.", exampleFurigana: [{t:"公園",r:"こうえん"},{t:"はとても"},{t:"広",r:"ひろ"},{t:"いです。"}] },
  { id: 235, kanji: "速", reading: "そく／はや", meaning: "Nhanh / Tốc độ", level: "N3", example: "新幹線はとても速いです。", exampleMeaning: "Tàu cao tốc rất nhanh.", exampleFurigana: [{t:"新幹線",r:"しんかんせん"},{t:"はとても"},{t:"速",r:"はや"},{t:"いです。"}] },
  { id: 236, kanji: "遅", reading: "ち／おそ", meaning: "Chậm / Muộn", level: "N3", example: "今日は仕事が遅くなりました。", exampleMeaning: "Hôm nay công việc kéo dài muộn.", exampleFurigana: [{t:"今日",r:"きょう"},{t:"は"},{t:"仕事",r:"しごと"},{t:"が"},{t:"遅",r:"おそ"},{t:"くなりました。"}] },
  { id: 237, kanji: "強", reading: "きょう／つよ", meaning: "Mạnh / Giỏi", level: "N3", example: "彼は数学がとても強いです。", exampleMeaning: "Anh ấy rất giỏi toán.", exampleFurigana: [{t:"彼",r:"かれ"},{t:"は"},{t:"数学",r:"すうがく"},{t:"がとても"},{t:"強",r:"つよ"},{t:"いです。"}] },
  { id: 238, kanji: "弱", reading: "じゃく／よわ", meaning: "Yếu / Kém", level: "N3", example: "私は運動が弱いです。", exampleMeaning: "Tôi kém thể thao.", exampleFurigana: [{t:"私",r:"わたし"},{t:"は"},{t:"運動",r:"うんどう"},{t:"が"},{t:"弱",r:"よわ"},{t:"いです。"}] },
  { id: 239, kanji: "重", reading: "じゅう／おも", meaning: "Nặng / Quan trọng", level: "N3", example: "このスーツケースは重いです。", exampleMeaning: "Chiếc vali này nặng quá.", exampleFurigana: [{t:"このスーツケースは"},{t:"重",r:"おも"},{t:"いです。"}] },
  { id: 240, kanji: "軽", reading: "けい／かる", meaning: "Nhẹ / Không nghiêm trọng", level: "N3", example: "このパソコンは軽くて持ち運びやすいです。", exampleMeaning: "Laptop này nhẹ và dễ mang theo.", exampleFurigana: [{t:"このパソコンは"},{t:"軽",r:"かる"},{t:"くて"},{t:"持",r:"も"},{t:"ち"},{t:"運",r:"はこ"},{t:"びやすいです。"}] },
  { id: 241, kanji: "若", reading: "じゃく／わか", meaning: "Trẻ / Trẻ tuổi", level: "N3", example: "彼女はとても若く見えます。", exampleMeaning: "Cô ấy trông rất trẻ.", exampleFurigana: [{t:"彼女",r:"かのじょ"},{t:"はとても"},{t:"若",r:"わか"},{t:"く"},{t:"見",r:"み"},{t:"えます。"}] },
  { id: 242, kanji: "難", reading: "なん／むずか", meaning: "Khó / Gian nan", level: "N3", example: "日本語の文法は難しいです。", exampleMeaning: "Ngữ pháp tiếng Nhật khó.", exampleFurigana: [{t:"日本語",r:"にほんご"},{t:"の"},{t:"文法",r:"ぶんぽう"},{t:"は"},{t:"難",r:"むずか"},{t:"しいです。"}] },
  { id: 243, kanji: "易", reading: "い／やさ", meaning: "Dễ / Giản đơn", level: "N3", example: "この問題は意外に易しいです。", exampleMeaning: "Bài tập này dễ bất ngờ.", exampleFurigana: [{t:"この"},{t:"問題",r:"もんだい"},{t:"は"},{t:"意外",r:"いがい"},{t:"に"},{t:"易",r:"やさ"},{t:"しいです。"}] },
  { id: 244, kanji: "近", reading: "きん／ちか", meaning: "Gần / Gần đây", level: "N3", example: "駅から近いところに住んでいます。", exampleMeaning: "Tôi sống gần ga.", exampleFurigana: [{t:"駅",r:"えき"},{t:"から"},{t:"近",r:"ちか"},{t:"いところに"},{t:"住",r:"す"},{t:"んでいます。"}] },
  { id: 245, kanji: "遠", reading: "えん／とお", meaning: "Xa / Xa xôi", level: "N3", example: "実家は遠いので年に一度しか帰りません。", exampleMeaning: "Nhà cha mẹ xa nên mỗi năm tôi chỉ về một lần.", exampleFurigana: [{t:"実家",r:"じっか"},{t:"は"},{t:"遠",r:"とお"},{t:"いので"},{t:"年",r:"ねん"},{t:"に"},{t:"一度",r:"いちど"},{t:"しか"},{t:"帰",r:"かえ"},{t:"りません。"}] },
  { id: 246, kanji: "高", reading: "こう／たか", meaning: "Cao / Đắt tiền", level: "N3", example: "このレストランは料金が高いです。", exampleMeaning: "Nhà hàng này giá đắt.", exampleFurigana: [{t:"このレストランは"},{t:"料金",r:"りょうきん"},{t:"が"},{t:"高",r:"たか"},{t:"いです。"}] },
  { id: 247, kanji: "低", reading: "てい／ひく", meaning: "Thấp / Nhỏ", level: "N3", example: "今月は気温が低いです。", exampleMeaning: "Tháng này nhiệt độ thấp.", exampleFurigana: [{t:"今月",r:"こんげつ"},{t:"は"},{t:"気温",r:"きおん"},{t:"が"},{t:"低",r:"ひく"},{t:"いです。"}] },
  { id: 248, kanji: "長", reading: "ちょう／なが", meaning: "Dài / Lâu dài", level: "N3", example: "髪が長くなりました。", exampleMeaning: "Tóc đã dài ra.", exampleFurigana: [{t:"髪",r:"かみ"},{t:"が"},{t:"長",r:"なが"},{t:"くなりました。"}] },
  { id: 249, kanji: "短", reading: "たん／みじか", meaning: "Ngắn / Ngắn gọn", level: "N3", example: "夏は夜が短いです。", exampleMeaning: "Mùa hè ban đêm ngắn.", exampleFurigana: [{t:"夏",r:"なつ"},{t:"は"},{t:"夜",r:"よる"},{t:"が"},{t:"短",r:"みじか"},{t:"いです。"}] },
  { id: 250, kanji: "明", reading: "めい／あか", meaning: "Sáng / Rõ ràng", level: "N3", example: "彼女は明るい性格です。", exampleMeaning: "Cô ấy có tính cách vui vẻ.", exampleFurigana: [{t:"彼女",r:"かのじょ"},{t:"は"},{t:"明",r:"あか"},{t:"るい"},{t:"性格",r:"せいかく"},{t:"です。"}] },
];

const ALL_KANJI = { N5: KANJI_N5, N4: KANJI_N4, N3: KANJI_N3 };
const LEVEL_COLORS = { N5: "#50C878", N4: "#64B5F6", N3: "#FF6B35" };
const LEVEL_INFO = { N5: { desc: "Cơ bản" }, N4: { desc: "Sơ trung cấp" }, N3: { desc: "Trung cấp" } };

// ==================== HELPERS ====================
function getTodayKey() { return new Date().toISOString().split("T")[0]; }
function getDayIndex() { return Math.floor((new Date() - new Date("2025-01-01")) / 86400000); }
function getSetCount(level) { return Math.floor(ALL_KANJI[level].length / 5); }
function getSetWords(setIdx, level) {
  const arr = ALL_KANJI[level];
  const start = (setIdx * 5) % arr.length;
  return Array.from({ length: 5 }, (_, i) => arr[(start + i) % arr.length]);
}
function getDailyWords(dayIndex, level) {
  return getSetWords(dayIndex % getSetCount(level), level);
}
async function loadState(key) {
  try { const r = await window.storage.get(key); return r ? JSON.parse(r.value) : null; } catch { return null; }
}
async function saveState(key, val) {
  try { await window.storage.set(key, JSON.stringify(val)); } catch {}
}

// ==================== COMPONENTS ====================
function Furigana({ parts }) {
  if (!parts?.length) return null;
  return (
    <span style={{ lineHeight: 2.4, fontSize: 15 }}>
      {parts.map((p, i) =>
        p.r ? <ruby key={i}>{p.t}<rt style={{ fontSize: "0.55em", color: "#FFD700" }}>{p.r}</rt></ruby>
             : <span key={i}>{p.t}</span>
      )}
    </span>
  );
}

function FlipCard({ word, isFav, onToggleFav }) {
  const [flipped, setFlipped] = useState(false);
  const color = LEVEL_COLORS[word.level];
  return (
    <div onClick={() => setFlipped(f => !f)} style={{ perspective: "1000px", cursor: "pointer", width: "100%", marginBottom: 10 }}>
      <div style={{ position: "relative", width: "100%", minHeight: 200, transition: "transform 0.5s", transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
        <div style={{ position: "absolute", width: "100%", minHeight: 200, backfaceVisibility: "hidden", background: "linear-gradient(135deg,#1a1a2e,#16213e)", borderRadius: 16, border: `1px solid ${color}33`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 16px", boxSizing: "border-box" }}>
          <button onClick={e => { e.stopPropagation(); onToggleFav(word.id); }} style={{ position: "absolute", top: 12, right: 14, background: "none", border: "none", cursor: "pointer", fontSize: 20, color: isFav ? "#FFD700" : "rgba(255,255,255,0.3)" }}>{isFav ? "★" : "☆"}</button>
          <div style={{ position: "absolute", top: 12, left: 14, background: `${color}22`, borderRadius: 6, padding: "2px 8px", fontSize: 11, color, fontWeight: 700 }}>{word.level}</div>
          <div style={{ fontSize: 68, fontWeight: 900, color: "#FFD700", lineHeight: 1, marginBottom: 8, textShadow: "0 0 30px rgba(255,215,0,0.4)" }}>{word.kanji}</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>Nhấn để xem nghĩa</div>
        </div>
        <div style={{ position: "absolute", width: "100%", minHeight: 200, backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: "linear-gradient(135deg,#0f3460,#533483)", borderRadius: 16, border: `1px solid ${color}55`, padding: "16px 18px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#FFD700", marginBottom: 2 }}>{word.kanji} <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 400 }}>({word.reading})</span></div>
          <div style={{ fontSize: 14, color: "#fff", marginBottom: 10, fontWeight: 500 }}>🇻🇳 {word.meaning}</div>
          <div style={{ background: "rgba(0,0,0,0.25)", borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 12, color: "#FFD700", marginBottom: 6 }}>📝 Ví dụ:</div>
            <div style={{ marginBottom: 4 }}><Furigana parts={word.exampleFurigana} /></div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", fontStyle: "italic" }}>{word.exampleMeaning}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuizView({ words, level, onDone }) {
  const pool = ALL_KANJI[level];
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const questions = words.map(w => ({ word: w, options: [...pool.filter(k => k.id !== w.id).sort(() => Math.random() - 0.5).slice(0, 3), w].sort(() => Math.random() - 0.5) }));
  const q = questions[qIdx];
  function pick(opt) {
    if (selected !== null) return;
    setSelected(opt.id);
    if (opt.id === q.word.id) setScore(s => s + 1);
    setTimeout(() => { if (qIdx + 1 >= questions.length) setDone(true); else { setQIdx(i => i + 1); setSelected(null); } }, 900);
  }
  if (done) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "32px 0" }}>
      <div style={{ fontSize: 64 }}>{score === words.length ? "🏆" : score >= words.length * 0.6 ? "🎯" : "📚"}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color: "#FFD700" }}>{score}/{words.length}</div>
      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>{score === words.length ? "Hoàn hảo!" : score >= words.length * 0.6 ? "Tốt lắm!" : "Ôn lại nhé!"}</div>
      <button onClick={onDone} style={{ background: "#FFD700", color: "#1a1a2e", border: "none", borderRadius: 12, padding: "12px 32px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>Xong</button>
    </div>
  );
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Câu {qIdx + 1}/{words.length}</div>
        <div style={{ color: "#FFD700", fontWeight: 700 }}>★ {score}</div>
      </div>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 72, fontWeight: 900, color: "#FFD700", textShadow: "0 0 40px rgba(255,215,0,0.5)", lineHeight: 1, marginBottom: 6 }}>{q.word.kanji}</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Nghĩa của kanji này là gì?</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {q.options.map(opt => {
          let bg = "rgba(255,255,255,0.05)", border = "1px solid rgba(255,255,255,0.1)";
          if (selected !== null) { if (opt.id === q.word.id) { bg = "rgba(80,200,120,0.25)"; border = "1px solid #50C878"; } else if (opt.id === selected) { bg = "rgba(255,80,80,0.2)"; border = "1px solid #FF5050"; } }
          return <button key={opt.id} onClick={() => pick(opt)} style={{ background: bg, border, borderRadius: 12, padding: "14px 10px", cursor: "pointer", color: "#fff", fontSize: 13, fontWeight: 600 }}>{opt.meaning}</button>;
        })}
      </div>
    </div>
  );
}

// ==================== MAIN ====================
export default function KanjiApp() {
  const [level, setLevel] = useState("N5");
  const [tab, setTab] = useState("today");
  const [favorites, setFavorites] = useState([]);
  const [learnedDays, setLearnedDays] = useState({});
  const [streak, setStreak] = useState({ N5: 0, N4: 0, N3: 0 });
  const [quizActive, setQuizActive] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [extraUnlocked, setExtraUnlocked] = useState({});
  const [reviewSetIdx, setReviewSetIdx] = useState(null);
  const [reviewQuizWords, setReviewQuizWords] = useState(null);

  const dayIdx = getDayIndex();
  const todayKey = `${level}:${getTodayKey()}`;
  const todaySetIdx = dayIdx % getSetCount(level);
  const todayWords = getSetWords(todaySetIdx, level);
  const todayDone = !!learnedDays[todayKey];
  const color = LEVEL_COLORS[level];
  const favWords = Object.values(ALL_KANJI).flat().filter(w => favorites.includes(w.id));
  const todayExtraCount = extraUnlocked[todayKey] || 0;
  const setCount = getSetCount(level);
  const extraWordSets = Array.from({ length: todayExtraCount }, (_, i) =>
    getSetWords((todaySetIdx + 1 + i) % setCount, level)
  );

  function calcStreak(days, lv) {
    let s = 0, d = new Date();
    while (true) { const k = `${lv}:${d.toISOString().split("T")[0]}`; if (days[k]) { s++; d.setDate(d.getDate() - 1); } else break; }
    return s;
  }
  function learnedCount(lv) { return Object.keys(learnedDays).filter(k => k.startsWith(lv + ":")).length * 5; }

  useEffect(() => {
    (async () => {
      const favs = await loadState("kanji_favs") || [];
      const days = await loadState("kanji_days") || {};
      const lv = await loadState("kanji_level") || "N5";
      const extra = await loadState("kanji_extra") || {};
      setFavorites(favs); setLearnedDays(days); setLevel(lv); setExtraUnlocked(extra);
      setStreak({ N5: calcStreak(days, "N5"), N4: calcStreak(days, "N4"), N3: calcStreak(days, "N3") });
      setLoaded(true);
    })();
  }, []);

  async function markDone() {
    const nd = { ...learnedDays, [todayKey]: true };
    setLearnedDays(nd);
    setStreak(s => ({ ...s, [level]: calcStreak(nd, level) }));
    await saveState("kanji_days", nd);
  }

  async function switchLevel(lv) {
    setLevel(lv); setShowPicker(false); setQuizActive(false);
    setReviewSetIdx(null); setReviewQuizWords(null);
    await saveState("kanji_level", lv);
  }

  async function toggleFav(id) {
    const nf = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
    setFavorites(nf); await saveState("kanji_favs", nf);
  }

  async function unlockExtra() {
    const count = (extraUnlocked[todayKey] || 0) + 1;
    if (count > setCount - 1) return;
    const ne = { ...extraUnlocked, [todayKey]: count };
    setExtraUnlocked(ne);
    await saveState("kanji_extra", ne);
  }

  if (!loaded) return <div style={{ minHeight: "100vh", background: "#0d0d1a", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ color: "#FFD700", fontSize: 40 }}>漢</div></div>;

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d1a", fontFamily: "'Noto Sans JP','Segoe UI',sans-serif", color: "#fff", maxWidth: 480, margin: "0 auto", paddingBottom: 80 }}>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg,#0f3460,#1a1a4e)", padding: "16px 20px 14px", borderBottom: "1px solid rgba(255,215,0,0.15)", position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#FFD700", letterSpacing: 1 }}>漢字マスター</div>
            <button onClick={() => setShowPicker(v => !v)} style={{ marginTop: 4, background: `${color}22`, border: `1px solid ${color}55`, borderRadius: 8, padding: "3px 10px", fontSize: 12, color, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
              {level} · {LEVEL_INFO[level].desc} <span style={{ fontSize: 9 }}>▼</span>
            </button>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#FF6B35" }}>🔥 {streak[level]}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Streak</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color }}>{learnedCount(level)}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Đã học</div>
            </div>
          </div>
        </div>

        {showPicker && (
          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            {["N5", "N4", "N3"].map(lv => (
              <button key={lv} onClick={() => switchLevel(lv)} style={{ flex: 1, padding: "10px 8px", borderRadius: 12, cursor: "pointer", fontWeight: 700, fontSize: 13, background: level === lv ? LEVEL_COLORS[lv] : "rgba(255,255,255,0.06)", border: `1px solid ${level === lv ? LEVEL_COLORS[lv] : "rgba(255,255,255,0.12)"}`, color: level === lv ? "#1a1a2e" : "#fff" }}>
                <div>{lv}</div>
                <div style={{ fontSize: 10, fontWeight: 400, opacity: 0.8 }}>{ALL_KANJI[lv].length} từ</div>
                <div style={{ fontSize: 10, fontWeight: 400, opacity: 0.7 }}>{LEVEL_INFO[lv].desc}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* TABS */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "#0d0d1a", position: "sticky", top: showPicker ? 162 : 82, zIndex: 9 }}>
        {[{ key: "today", icon: "📅", label: "Hôm nay" }, { key: "review", icon: "📖", label: "Ôn tập" }, { key: "quiz", icon: "⚡", label: "Quiz" }, { key: "favs", icon: "★", label: "Thích" }, { key: "progress", icon: "📊", label: "Tiến độ" }].map(t => (
          <button key={t.key} onClick={() => { setTab(t.key); if (t.key !== "review") { setReviewSetIdx(null); setReviewQuizWords(null); } }} style={{ flex: 1, padding: "10px 2px", background: "none", border: "none", borderBottom: tab === t.key ? `2px solid ${color}` : "2px solid transparent", color: tab === t.key ? color : "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: 600, cursor: "pointer" }}>
            <div>{t.icon}</div><div>{t.label}</div>
          </button>
        ))}
      </div>

      <div style={{ padding: 16 }}>

        {/* TODAY */}
        {tab === "today" && <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>5 từ hôm nay · <span style={{ color }}>{level}</span></div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Bộ {todaySetIdx + 1}/{setCount} · Nhấn thẻ để lật</div>
            </div>
            {!todayDone
              ? <button onClick={markDone} style={{ background: color, color: "#1a1a2e", border: "none", borderRadius: 10, padding: "8px 14px", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>✓ Xong!</button>
              : <div style={{ background: "rgba(80,200,120,0.2)", border: "1px solid #50C878", borderRadius: 10, padding: "8px 14px", fontSize: 12, color: "#50C878", fontWeight: 700 }}>✓ Hoàn thành</div>
            }
          </div>
          {todayWords.map(w => <FlipCard key={w.id} word={w} isFav={favorites.includes(w.id)} onToggleFav={toggleFav} />)}

          {/* EXTRA UNLOCKED SETS */}
          {extraWordSets.map((words, i) => (
            <div key={i}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "20px 0 12px" }}>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
                <div style={{ fontSize: 12, color: color, fontWeight: 700, background: `${color}22`, borderRadius: 6, padding: "3px 10px" }}>
                  ➕ Bộ thêm {i + 1} · Bộ {(todaySetIdx + 1 + i) % setCount + 1}/{setCount}
                </div>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
              </div>
              {words.map(w => <FlipCard key={w.id} word={w} isFav={favorites.includes(w.id)} onToggleFav={toggleFav} />)}
            </div>
          ))}

          {/* LEARN MORE BUTTON */}
          {todayExtraCount < setCount - 1 && (
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <button onClick={unlockExtra} style={{ background: `${color}22`, border: `1px solid ${color}55`, borderRadius: 12, padding: "12px 24px", color, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                ➕ Học thêm 5 từ mới
              </button>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 6 }}>
                Còn {setCount - 1 - todayExtraCount} bộ có thể mở khóa
              </div>
            </div>
          )}
          {todayExtraCount >= setCount - 1 && (
            <div style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
              🎉 Bạn đã học tất cả các bộ từ hôm nay!
            </div>
          )}
        </>}

        {/* REVIEW / ÔN TẬP */}
        {tab === "review" && <>
          {reviewQuizWords ? (
            <QuizView words={reviewQuizWords} level={level} onDone={() => setReviewQuizWords(null)} />
          ) : (
            <>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Ôn tập · <span style={{ color }}>{level}</span></div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>
                {setCount} bộ từ · {ALL_KANJI[level].length} từ · Chọn bộ để ôn lại
              </div>
              {Array.from({ length: setCount }, (_, i) => {
                const words = getSetWords(i, level);
                const isToday = i === todaySetIdx;
                const isOpen = reviewSetIdx === i;
                return (
                  <div key={i} style={{ marginBottom: 10 }}>
                    <div onClick={() => setReviewSetIdx(isOpen ? null : i)}
                      style={{ background: isToday ? `${color}18` : "rgba(255,255,255,0.04)", borderRadius: 14, padding: "14px 16px", border: `1px solid ${isOpen ? color + "66" : isToday ? color + "44" : "rgba(255,255,255,0.08)"}`, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <span style={{ color, fontWeight: 800, fontSize: 14 }}>Bộ {i + 1}</span>
                          {isToday && <span style={{ fontSize: 10, color, background: `${color}22`, borderRadius: 4, padding: "1px 6px" }}>Hôm nay</span>}
                        </div>
                        <div style={{ fontSize: 16, letterSpacing: 4, color: "#FFD700" }}>
                          {words.map(w => w.kanji).join(" ")}
                        </div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>
                          {words.map(w => w.meaning.split(" / ")[0]).join(" · ")}
                        </div>
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 16 }}>{isOpen ? "▲" : "▼"}</div>
                    </div>

                    {isOpen && (
                      <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: "0 0 14px 14px", padding: "12px 12px 16px", border: `1px solid ${color}33`, borderTop: "none", marginTop: -4 }}>
                        {words.map(w => <FlipCard key={w.id} word={w} isFav={favorites.includes(w.id)} onToggleFav={toggleFav} />)}
                        <button onClick={() => setReviewQuizWords(words)}
                          style={{ width: "100%", background: `linear-gradient(135deg,${color},#FFD700)`, color: "#1a1a2e", border: "none", borderRadius: 12, padding: "12px", fontWeight: 800, fontSize: 14, cursor: "pointer", marginTop: 4 }}>
                          ⚡ Quiz bộ này
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </>}

        {/* QUIZ */}
        {tab === "quiz" && <>
          {!quizActive
            ? <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ fontSize: 56, marginBottom: 12 }}>⚡</div>
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Quiz · <span style={{ color }}>{level}</span></div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>Kiểm tra 5 từ hôm nay</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 28 }}>
                Bộ {todaySetIdx + 1}/{setCount}  ·  {todayWords.map(w => w.kanji).join(" ")}
              </div>
              <button onClick={() => setQuizActive(true)} style={{ background: `linear-gradient(135deg,${color},#FFD700)`, color: "#1a1a2e", border: "none", borderRadius: 14, padding: "16px 48px", fontWeight: 900, fontSize: 16, cursor: "pointer" }}>Bắt đầu!</button>
            </div>
            : <QuizView words={todayWords} level={level} onDone={() => setQuizActive(false)} />
          }
        </>}

        {/* FAVORITES */}
        {tab === "favs" && <>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Từ yêu thích</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>{favWords.length} từ · Tất cả cấp độ</div>
          {favWords.length === 0
            ? <div style={{ textAlign: "center", padding: "48px 0", color: "rgba(255,255,255,0.3)" }}><div style={{ fontSize: 48, marginBottom: 12 }}>☆</div><div>Chưa có từ yêu thích</div><div style={{ fontSize: 12, marginTop: 4 }}>Nhấn ☆ trên thẻ để lưu</div></div>
            : favWords.map(w => <FlipCard key={w.id} word={w} isFav={true} onToggleFav={toggleFav} />)
          }
        </>}

        {/* PROGRESS */}
        {tab === "progress" && <>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Tiến độ học tập</div>
          {["N5", "N4", "N3"].map(lv => {
            const lc = learnedCount(lv), total = ALL_KANJI[lv].length, pct = Math.min(Math.round(lc / total * 100), 100), c = LEVEL_COLORS[lv];
            return (
              <div key={lv} onClick={() => switchLevel(lv)} style={{ background: level === lv ? `${c}11` : "rgba(255,255,255,0.03)", borderRadius: 14, padding: "14px 16px", border: `1px solid ${level === lv ? c + "44" : "rgba(255,255,255,0.07)"}`, marginBottom: 10, cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: c, fontWeight: 800, fontSize: 15 }}>{lv}</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{LEVEL_INFO[lv].desc}</span>
                    {level === lv && <span style={{ fontSize: 10, color: c, background: `${c}22`, borderRadius: 4, padding: "1px 6px" }}>Đang học</span>}
                  </div>
                  <span style={{ fontSize: 13, color: c, fontWeight: 700 }}>{lc}/{total} · {pct}%</span>
                </div>
                <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 999, height: 6, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 999, background: `linear-gradient(90deg,${c},#FFD700)`, width: `${pct}%`, transition: "width 0.8s" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
                  <span>🔥 Streak: {streak[lv]} ngày</span>
                  <span>Còn {total - lc} từ</span>
                </div>
              </div>
            );
          })}

          {/* Calendar */}
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: 16, border: "1px solid rgba(255,255,255,0.07)", marginTop: 4 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>📅 14 ngày gần nhất · <span style={{ color }}>{level}</span></div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {Array.from({ length: 14 }).map((_, i) => {
                const d = new Date(); d.setDate(d.getDate() - (13 - i));
                const k = `${level}:${d.toISOString().split("T")[0]}`;
                const done = !!learnedDays[k], isToday = k === todayKey;
                return <div key={k} style={{ width: 28, height: 28, borderRadius: 8, background: done ? `linear-gradient(135deg,${color},#FFD700)` : "rgba(255,255,255,0.08)", border: isToday ? `2px solid ${color}` : "2px solid transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: done ? "#1a1a2e" : "rgba(255,255,255,0.2)", fontWeight: 700 }}>{d.getDate()}</div>;
              })}
            </div>
          </div>
        </>}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&display=swap');
        ruby { display: inline-ruby; } rt { display: block; text-align: center; }
        * { -webkit-tap-highlight-color: transparent; } button { font-family: inherit; }
      `}</style>
    </div>
  );
}
