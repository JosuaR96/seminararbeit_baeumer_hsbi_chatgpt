import {config} from "dotenv"
config()

import {Configuration, OpenAIApi} from "openai"
import { data1,data2,data3 } from "./data.js"

const openAi = new OpenAIApi(
    new Configuration({
      apiKey: process.env.KEY,
    })
  )

  const analyzeProfile = async (profile) => {
    const messageArray = [
      { role: "user", content: `Analysiere folgenden Datensatz von einem Xing Profil:\n${JSON.stringify(profile)}\n\nFinde folgendes heraus: Welchem Unternehmen gehört die Person an? Welche Hobbys und Interessen hat die Person? Woran ist die Person interessiert? Stelle die Antwort tabellarisch dar und nenne immer auch den Namen und die Funktion im Melitta Unternehmen. Halte dich dabei an folgendes Format: Antwort für Profil:, Funktion bei Melitta:, Hobbys und Interessen, vorherige Arbeitgeber und dortige Funktion` }
    ];
  
    try {
      const response = await openAi.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messageArray
      });
  
      const answer = response.data.choices[0].message.content;
  
      console.log(`Antwort für Profil ${profile.name}:`);
      console.log(answer);
    } catch (error) {
      console.error("Fehler beim Abrufen der Antwort von ChatGPT:", error);
    }
  };
  
  const analyzeProfiles = async (profiles) => {
    for (const profile of profiles) {
      await analyzeProfile(profile);
    }
  };
  
analyzeProfiles(data1);
  






