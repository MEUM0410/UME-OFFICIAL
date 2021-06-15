const express = require('express');
const app = express();


const { Discord, Client, Collection, MessageEmbed } = require('discord.js')
const client = new Client({ disableMentions: "everyone" });
const { readdirSync } = require("fs");
const { join } = require("path");
const axios = require("axios");
const cheerio = require("cheerio");
const fetch = require('node-fetch')

app.get("/", (req,res) => {
  res.send("Hello World!")
})

app.listen(3000, () => {
  console.log("Project is ready!")
})

client.on('ready', () => {
  console.log("READY!");
});

client.on("message", async (message) => { 
    
  if (message.content.startsWith("-코로나")) {
            //사이트 긁어오기

    const getHtml = async () => {
        try {
          return await axios.get('http://ncov.mohw.go.kr/')
      } catch (error) {
         console.error(error);
        }
      };

      getHtml()
      .then(html => {
        let ulList = [];
        const $ = cheerio.load(html.data);
        const $bodyList = $("ul.liveNum")//.children("ul.liveNum li")
    
        $bodyList.each(function(i, elem) {
          ulList = {
            //확진환자
              title: $(this).find('span.num').text().substr(4,100).substr(0,7), // 확진환자 (누적)
              title1: $(this).find('span.before').text().substr(4,100).substr(0,8), // 확진환자 ( + 추가환자 )
            //격리해제
              sub: $(this).find('span.num').text().substr(4,100).substr(7,7), // 격리해제 (누적)
              sub1: $(this).find('span.before').text().substr(4,100).substr(8,7), // 격리해제 ( + 추가환자 )
            //치료중(격리중)
              heal: $(this).find('span.num').text().substr(4,100).substr(14,5), // 격리해제 (누적)
              heal1: $(this).find('span.before').text().substr(4,100).substr(15,7), // 격리해제 ( + 추가환자 )
            //사망
              die: $(this).find('span.num').text().substr(4,100).substr(19,5), // 사망 (누적)
              die1: $(this).find('span.before').text().substr(4,100).substr(22,6), // 사망 ( + 추가환자 )
          };
        
        })
        console.log("[코로나 현황 정보 검색됨!]")
        console.log("확진환자", ulList.title, "추가 환자", ulList.title1)
        console.log("격리해제", ulList.sub, "추가환자", ulList.sub1)
        console.log("치료중 환자(격리중)", ulList.heal, "추가환자", ulList.heal1)
        console.log("사망자", ulList.die, "추가환자", ulList.die1)
        console.log("========================")

        let embed = new MessageEmbed()
        .setColor(`0x2F3136`)
        .setTitle(`**코로나 바이러스 한국 통계**`)
        .addField(`자료출처`, `**[보건복지부](http://ncov.mohw.go.kr/)**`)
        .addField("확진환자(누적)", `${ulList.title}${ulList.title1}`)
        .addField("완치환자(격리해제)", `${ulList.sub}${ulList.sub1}`)
        .addField("치료중(격리 중)", `${ulList.heal}${ulList.heal1}`)
        .addField("사망", `${ulList.die}${ulList.die1}`)
        message.channel.send(embed) 
    })
   }
    
    
    
})
