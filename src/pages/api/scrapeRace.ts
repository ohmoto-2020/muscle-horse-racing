import axios from "axios";
import iconv from "iconv-lite";
import cheerio from "cheerio"; // 'cheerio' をデフォルトインポートとして使用

export const scrapeRace = async (racecourseCode: number, raceNumber: number) => {
  const today = new Date();
  // URLの構築
  const url = `https://nar.netkeiba.com/race/shutuba.html?race_id=${today.getFullYear()}${racecourseCode}${today.getDate()}${raceNumber}`;

  try {
    // ページのHTMLを取得
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // スクレイピングしたデータを格納する配列
    const horses = [];

    // HTMLからデータを抽出
    $(".HorseList .HorseName").each((i, elem) => {
      const horseName = $(elem).text().trim();
      horses.push(horseName);
    });

    // 抽出したデータを返す
    return horses;
  } catch (error) {
    console.error("スクレイピング中にエラーが発生しました:", error);
    return null;
  }
};

export default async (req, res) => {
  if (req.method === "POST") {
    const { racecourseCode, raceNumber } = req.body;
    // TODO: new Date()にする
    const today = new Date("2024-3-6");
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    const formattedRaceNumber = raceNumber.toString().padStart(2, "0");

    try {
      // URLの構築
      const url = `https://nar.netkeiba.com/race/shutuba.html?race_id=${today.getFullYear()}${racecourseCode}${month}${day}${formattedRaceNumber}`;
      // ページのHTMLを取得（レスポンスタイプを arraybuffer に設定）
      const { data } = await axios.get(url, { responseType: "arraybuffer" });
      // 取得したデータを EUC-JP から UTF-8 に変換
      const html = iconv.decode(data, "EUC-JP");
      const $ = cheerio.load(html);

      // 馬の名前を抽出
      const horseNames = [];
      $("span.HorseName")
        .slice(1)
        .each((_, el) => {
          horseNames.push($(el).text());
        });

      // レースの基本情報を抽出
      const rawRaceInfo = $("div.RaceData01").text().trim();
      // 発走時刻、距離、馬場状態を抽出
      const startTimeMatch = rawRaceInfo.match(/(\d{1,2}:\d{2})発走/);
      const distanceMatch = rawRaceInfo.match(/ダ(\d+)m/);
      const conditionMatch = rawRaceInfo.match(/馬場:(\S+)/);

      const raceInfo = {
        startTime: startTimeMatch ? startTimeMatch[1] : "",
        distance: distanceMatch ? parseInt(distanceMatch[1], 10) : 0,
        condition: conditionMatch ? conditionMatch[1] : "",
      };

      // 馬の体重情報を抽出
      const rawHorseWeights = [];
      $("td.Weight").each((i, elem) => {
        let weightText = $(elem).text().trim();
        weightText = weightText.replace(/\(.*?\)/, "").trim();
        rawHorseWeights.push(weightText);
      });

      // 馬の名前と体重をオブジェクトにまとめる
      const horseDate = horseNames.map((name, i) => {
        return {
          name,
          entryNumber: i + 1,
          weight: Number(rawHorseWeights[i]),
        };
      });

      res.status(200).json({ raceInfo, horseDate });
      res.status(200).json({ message: "スクレイピング成功", data: "スクレイピング結果" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "スクレイピングに失敗しました" });
    }
  } else {
    // POSTメソッド以外は許可しない
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
