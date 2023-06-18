import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

export default async function chat(req: NextApiRequest, res: NextApiResponse) {
  const { prompt, prompt: { flag } } = req.body;
  try {
    const config = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_CHAT_GPT_API_KEY,
    });
    const openai = new OpenAIApi(config);
    if (!flag) {
      // 食事のおすすめ
      const { buttonType } = prompt;
      if(!buttonType){
        console.log("식단 추천 chat.gpt");
        const { gender, age, height, weight, allergy, disease, dateString } = prompt;
        let promptText = `나이 ${age}살, 키 ${height}cm, 몸무게 ${weight}kg인 ${gender}에게 알맞은 식단을 구성해주세요.`;
        if (allergy !== "정보 없음") {
          promptText += ` ${allergy}이(가) 없는 음식으로만 구성해주세요.`;
        }
        if (disease !== "정보 없음") {
          promptText += ` ${disease}환자가 피해야 할 음식은 제외해주세요.`;
        }
        promptText += ` 대답은 반드시 '년 월 일 (요일) -시간 별로: 밥(200kcal ,지방 1g,단백질 4g, 탄수화물 40g) + 닭가슴살 볶음(200kcal, 지방 8g, 단백질 16g, 탄수화물 4g)'와 같이 나타내며 ${dateString}을 기준으로 7일치 식단을 구성해주세요. 간식은 제외해주세요.`;
        const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "you are a Registered Dietitian" },
            { role: "user", content: promptText },
          ],
          temperature:0.2,
        });
        res.status(200).json({ response: response.data.choices[0].message.content });
      }else if(buttonType){
        console.log("식단 계획 반영 chat.gpt");
        const { data } = req.body;
        const promptText = `${data} 이 문장에서 식단 스케줄을 MySQL에 입력하려 합니다. [{key:value}]형태의 Json문자열로 가공해주세요. 키값은 6개로만 이루어지며 date타입인 날짜(createdAt) 아침이면 08:00:00 점심이면 12:00:00 저녁이면 19:00:00추가, 음식명(name), 칼로리(calorie), 단백질(protein), 지방(fat), 탄수화물(cho)로 나뉘게 해주세요. 그릇,컵,무게와 같은 단위는 무시해도 됩니다.`;
        const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            // {"role": "system", "content":"you are a Database Manager"},
            { role: "user", content: promptText },
          ],
        });
        res.status(200).json({ response: response.data.choices[0].message.content });
      }
    } else if (flag) {
      // 運動のおすすめ
      const { buttonType } = prompt;
      if (!buttonType) {
        console.log("운동 추천 chat.gpt");
        const { gender, age, height, weight, goalWeight, training, dateString } = prompt;
        const promptText = `나이 ${age}살, 키 ${height}cm, 몸무게 ${weight}kg, 목표 몸무게 ${goalWeight}kg인 ${gender}에게 ${training} 중에서만 적합한 운동을 골라서, ${dateString}을 시작으로 7일치 스케줄을 만들어주세요. 대답은 년 월 일(요일) : 추천 운동들(횟수, 셋트가 있다면 셋트 수 없다면 안 나타내도 됨) 형태로 해주세요.`;
        const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "you are a personal trainer" },
            { role: "user", content: promptText },
          ],
          temperature:0.2,
        });
        res.status(200).json({ response: response.data.choices[0].message.content });
      } else if (buttonType) {
        console.log("운동 계획 반영 chat.gpt");
        const { data } = req.body;
        const promptText = `${data} 이 문장에서 운동 스케줄을 MySQL에 입력하려 합니다. Json형태로 가공해주세요. [{key:value}]형태로 대답해주세요. 키값은 date타입인 날짜(createdAt), string타입인 운동명(type), INTERGER타입인 횟수(count), 셋트(set)로 나뉘게 해주세요. 셋트수가 1이상이면 횟수(count)에 곱해주세요.`;
        const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            // {"role": "system", "content":"you are a Database Manager"},
            { role: "user", content: promptText },
          ],
        });
        res.status(200).json({ response: response.data.choices[0].message.content });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
