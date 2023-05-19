import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

export default async function chat(req: NextApiRequest, res: NextApiResponse) {
  const { flag } = req.body.prompt;
  if (!flag) {
    // 식단 추천
    try {
      const { gender, age, height, weight, allergy, disease, buttonInput, menus } = req.body.prompt; // 구조분해 할당, chatgpt/index.js에서 보내온 prompt변수 구조분해할당 받음
      const config = new Configuration({
        apiKey: process.env.NEXT_PUBLIC_CHAT_GPT_API_KEY,
      });
      const openai = new OpenAIApi(config);
      // if (buttonInput === "button1") {
      let promptText = `나이 ${age}살, 키 ${height}cm, 몸무게 ${weight}kg인 ${gender}에게 알맞은 식단과 영양소를 알려주세요.`;
      if (allergy) {
        promptText += ` ${allergy}이(가) 없는 음식으로만 추천 부탁드립니다.`;
      }
      if (disease) {
        promptText += ` ${disease}환자가 피해야 할 음식은 제외해주세요.`; // 먹지 못하는 -> 피해야 할
      }
      promptText += `대답은 아침, 점심, 저녁 별로 각각 1. 식단, 2. 열량, 3. 3대 영양소 함량 순서로 해주세요.`;
      const response = await openai.createCompletion({
        // response 변수에 객체값 담김
        model: "text-davinci-003", // 사용할 GPT 모델
        prompt: promptText, // GPT 모델에 입력할 텍스트
        temperature: 0.2, // 다음에 생성될 단어를 무작위로 선택하는 정도. 0이면 항상 같은 단어, 값이 높으면 더 많은 무작위성 (0~2, 기본값 1)
        // 0.8과 같은 높은 값은 출력을 더 무작위로 만들고 0.2와 같은 낮은 값은 더 집중적이고 결정적으로 만듬
        max_tokens: 2048, // 생성할 최대 단어 수
        top_p: 0.2, // 다음에 선택될 단어의 확률 분포에서 상위 p%만 고려. 이 값이 1이면 모든 가능한 후보가 고려, 값이 작을수록 더 많은 무작위성
        // 생략시 frequency_penalty의 기본값은 0, presence_penalty의 기본값은 0.6
        frequency_penalty: 0.2, // 모델이 이전 대화에서 많이 사용된 단어를 덜 사용하도록 유도하는 속성. 이 값을 높일수록 이전 대화에서 자주 사용된 단어가 모델 출력에서 더욱 적게 나타남.
        presence_penalty: 0.4, // 모델이 이전 대화에서 나타나지 않았던 단어를 더 자주 사용하도록 유도하는 속성. 이 값을 높일수록 이전 대화에서 나타나지 않은 단어가 모델 출력에서 더욱 자주 나타남.
      });
      res.status(200).json({ response: response.data.choices[0] }); // HTTP 응답 상태 코드 반환(상태코드와 함께 전송), 200은 ok를 나타냄.
      // } else if (buttonInput === "button2") {
      //   // let promptText = menus+'에 대한 각각의 조리방법을 알려주세요. 중복된 메뉴가 있으면 한번만 대답해주세요. 과일과 밥, 김치류에 대한 레시피는 대답하지 마세요. 출력할 대답은 `음식명 : 조리방법` 식으로 대답해주세요.'
      //   let promptText = menus + "에 대한 각각의 조리방법을 알려주세요. 과일과 밥, 김치류에 대한 레시피는 대답하지 마세요.";
      //   const response = await openai.createCompletion({
      //     model: "text-davinci-003",
      //     prompt: promptText,
      //     temperature: 0.1,
      //     max_tokens: 2048,
      //     top_p: 0.1,
      //     // frequency_penalty: 0.2,
      //     // presence_penalty: 0.4,
      //   });
      //   res.status(200).json({ response: response.data.choices[0] });
      // }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  } else if (flag) {
    // 운동 추천
    const { buttonType } = req.body.prompt;
    console.log("버튼타입:", buttonType);
    if (!buttonType) {
      // 운동 추천
      console.log("운동 추천 chat.gpt");
      try {
        const { gender, age, height, weight, goalWeight, training } = req.body.prompt;
        const config = new Configuration({
          apiKey: process.env.NEXT_PUBLIC_CHAT_GPT_API_KEY,
        });
        const openai = new OpenAIApi(config);
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt:
            "나이 " +
            age +
            "살, 키 " +
            height +
            "cm, 몸무게 " +
            weight +
            "kg, 목표 몸무게 " +
            goalWeight +
            "kg인 " +
            gender +
            "에게 " +
            training +
            " 중에서 적합한 운동을 골라 운동 스케줄을 만들어주세요. 대답은 운동 스케줄만 해주세요.", // GPT 모델에 입력할 텍스트
          temperature: 0.2,
          max_tokens: 2048,
          top_p: 0.2,
        });
        res.status(200).json({ response: response.data.choices[0] }); // HTTP 응답 상태 코드 반환(상태코드와 함께 전송), 200은 ok를 나타냄.
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
      }
    } else if (buttonType) {
      // 추천된 운동을 계획에 반영.
      console.log("계획 반영 chat.gpt");
      try {
        const { data } = req.body;
        // console.log(data); data오는거 확인
        const config = new Configuration({
          apiKey: process.env.NEXT_PUBLIC_CHAT_GPT_API_KEY,
        });
        const openai = new OpenAIApi(config);
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt:
            data +
            "이 문장에서 운동스케줄을 MySQL에 입력하려 합니다. Json형태로 가공해주세요. 키값은 날짜(date), 운동명(exercise), 횟수(count), 셋트수(set)로 나뉘게 해주세요. 날짜의 경우 월요일을 0, 일요일을 6으로 해서 나타내주세요.",
          temperature: 0.2,
          max_tokens: 2048,
          top_p: 0.2,
        });
        res.status(200).json({ response: response.data.choices[0] }); // HTTP 응답 상태 코드 반환(상태코드와 함께 전송), 200은 ok를 나타냄.
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
      }
    }
  }
}
