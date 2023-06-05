import {config} from "dotenv"
config()

import {Configuration, OpenAIApi} from "openai"
import { data1,data2,data3 } from "./data.js"
import { appendFile } from 'fs/promises';



const stringFormatierung = "Antwort für Profil Peter Aufdemkamp:Antwort für Profil: Peter Aufdemkamp Funktion bei Melitta: Marketingdirektor / Leiter Strategisches Geschäftsfeld (GL-MitgliedHobbys und Interessen: Keine Informationen vorhanden.Woran ist die Person interessiert? Marketing, internationales Marketing, strategisches und operatives Marketing, Innovation Management, Marktforschung, Markenverantwortung, Food und Non-Food, Consumer goods.Vorherige Arbeitgeber und dortige Funktion:- Melitta Haushaltsprodukte GmbH & Co. KG: Leiter Marketing Deutschland; Group Product Manager- Cofresco Frischhalteprodukte GmbH & Co. KG: Leiter Marketing Zentraleuropa- Wasa GmbH: Produktmanager- Coca-Cola GmbH: Brandmanager- Deutsche Granini GmbH & Co. KG: Produktmanager; Marketingassistent"

const openAi = new OpenAIApi(
    new Configuration({
      apiKey: process.env.KEY,
    })
  )

  const analyzeProfile = async (profile) => {
    const messageArray = [
      { role: "user", content: `Analysiere folgenden Datensatz von einem Xing Profil:\n${JSON.stringify(profile)}\n\nFinde folgendes heraus: Welchem Unternehmen gehört die Person an? Welche Hobbys und Interessen hat die Person? Woran ist die Person interessiert? 
      Stelle die Antwort tabellarisch dar und nenne immer auch den Namen und die Funktion im Melitta Unternehmen. Halte dich dabei an folgendes Format: ` + stringFormatierung }
    ];
  
    try {
      const response = await openAi.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messageArray
      });
  
      const answer = response.data.choices[0].message.content;

      const result = `Antwort für Profil ${profile.name}:\n${answer}`;

      await appendFile('ergebnisse.txt', result + "\n");
  
      console.log(`Antwort für Profil ${profile.name}:`);
      console.log(answer + "\n");
    } catch (error) {
      console.error("Fehler beim Abrufen der Antwort von ChatGPT:", error);
    }
  };
  
  const analyzeProfiles = async (profiles) => {
    for (const profile of profiles) {
      await analyzeProfile(profile);
    }
  };


  const datawrapper = [data1, data2, data3];

  async function processArrays() {
    for (const dataArray of datawrapper) {
      await analyzeProfiles(dataArray);
      await new Promise(resolve => setTimeout(resolve, 60000)); // Wait for 60 seconds
    }
  }
  
  processArrays();
  






 