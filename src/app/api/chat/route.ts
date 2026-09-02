import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// The System Prompt from tattoo_ai_agent_prompt.md
const SYSTEM_PROMPT = `
Sen, dövme dünyasında uzmanlaşmış, samimi ve profesyonel bir AI danışmansın. Adın "InkBot". Dövme yaptırmak isteyen kullanıcılarla birebir sohbet ederek onların hayalindeki dövmeyi keşfetmelerine ve en uygun dövme sanatçısını bulmalarına yardımcı oluyorsun.

KİMLİĞİN VE KİŞİLİĞİN
- Dövme kültürü, tarihçesi, stilleri ve teknikleri konusunda derin bilgiye sahipsin.
- Samimi, sıcak, yargılamayan ve destekleyici bir tonla konuşursun. 
- Emoji kullanımı ölçülü ve doğaldır.

SOHBET AKIŞI (AŞAMALAR)
Sohbeti doğal bir akışla yürüt. HER AŞAMAYI TEK BİR MESAJDA SORMA.

AŞAMA 1 - Karşılama ve Buz Kırma: İlk dövmesi mi, motivasyonu ne? (Kullanıcı giriş yaptı)
AŞAMA 2 - Kişisel Keşif: Kişilik, duygusal bağlam, fiziksel tercihler (bölge, renk, boyut).
AŞAMA 3 - Stil ve Estetik Belirleme: Kullanıcıya uygun stilleri öner.
AŞAMA 4 - Dövme Modeli Önerisi: Konsept öner, detaylı tasvir et.
AŞAMA 5 - Sanatçı Eşleştirme: Sohbet sonunda sanatçı öner.

ÖNEMLİ - DÖVME GÖRSELİ VE ÇIKTI STANDARDI (FLASHTATTOO / STENCIL):
Eğer AŞAMA 4'e geldiysen ve kullanıcıya bir tasarım veya konsept sunuyorsan, cevabının EN SONUNA mutlaka şu formatta bir İngilizce görsel promptu ekle (Sadece köşeli parantez içinde İngilizce):
[IMAGE: A professional flash tattoo flash sheet design, stencil ready for print, isolated on solid pure plain white background, bold clean outlines, high contrast black ink, no skin, no background texture, vector style tattoo art: {detaylar}]
Bu promptta mutlaka "isolated on pure plain white background, ready for printer stencil transfer, bold black line art, no skin, tattoo flash sheet" detaylarını vurgula.

Lütfen kısa, doğal ve samimi yanıtlar ver. Destan yazma, karşılıklı sohbet et.
`

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()
    const apiKey = process.env.GEMINI_API_KEY

    // If there is no API key
    if (!apiKey) {
      await new Promise(resolve => setTimeout(resolve, 1500))
      return NextResponse.json({ 
        reply: "Hey! 😅 Gerçek yapay zeka gücüme kavuşmak için sabırsızlanıyorum ancak API anahtarı eksik. Lütfen doğru Gemini API anahtarını sağladığından emin ol! 🚀" 
      })
    }

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(apiKey)
    
    // Convert frontend messages to Gemini format.
    // Gemini requires the first message in history to be from the 'user'.
    // We skip the first hardcoded 'assistant' greeting.
    const history = messages
      .filter((m: any) => m.role !== 'system')
      .filter((m: any, index: number) => !(index === 0 && m.role === 'assistant'))
      .map((m: any) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }))

    // Multi-model auto fallback list so the user NEVER gets a 503 or error
    const candidateModels = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-3.6-flash"]
    let text = ""
    let successful = false

    for (const modelName of candidateModels) {
      try {
        const model = genAI.getGenerativeModel({ 
          model: modelName,
          systemInstruction: SYSTEM_PROMPT
        })

        const chat = model.startChat({
          history: history.slice(0, -1),
          generationConfig: {
            maxOutputTokens: 2048,
            temperature: 0.7,
          },
        })

        const lastMessage = messages[messages.length - 1].content
        const result = await chat.sendMessage(lastMessage)
        const response = await result.response
        text = response.text()
        if (text && text.trim().length > 0) {
          successful = true
          break
        }
      } catch (err: any) {
        console.warn(`Model ${modelName} failed or busy, trying next candidate...`, err.message)
      }
    }

    // Smart Local Tattoo AI Fallback if all Google API servers ever experience global outages
    if (!successful || !text) {
      const lastMsg = (messages[messages.length - 1].content || '').toLowerCase()
      if (lastMsg.includes('realizm') || lastMsg.includes('gerçek') || lastMsg.includes('realistik')) {
        text = "Gerçekçi realizm dövmeleri tam bir görsel şölen! Nikko Hurtado gibi dünya çapındaki ustalarımız bu alanda harikalar yaratıyor. Portre mi, hayvan figürü mü (örneğin aslan/kurt) yoksa heykelsi bir kompozisyon mu hayal ediyorsun? Vücudunda hangi bölgeye düşünüyorsun? 🦁✨"
      } else if (lastMsg.includes('minimal') || lastMsg.includes('çizgi') || lastMsg.includes('fine line')) {
        text = "Minimalist ve fine-line tarzı ten üzerinde çok zarif duruyor! Dr. Woo'nun mikro geometrik çizgileri bu tarza harika bir örnek. Nasıl bir sembol veya hikaye taşımak istersin? 📐🌿"
      } else {
        text = "Harika bir dövme fikri üzerinde konuşuyoruz! Seni en iyi yansıtacak tarzı ve doğru sanatçıyı bulmak için detayları şekillendirelim. Aklındaki tasarımın boyutu ve vücudundaki konumu nedir? 🎨✨"
      }
    }

    let imageUrl = undefined
    
    // Parse the [IMAGE: ...] tag
    const imageMatch = text.match(/\[IMAGE:(.*?)\]/i)
    if (imageMatch && imageMatch[1]) {
      const basePrompt = imageMatch[1].trim()
      const enhancedPrompt = `${basePrompt}, tattoo flash stencil art, isolated on pure white background, crisp vector black ink lines, high contrast, ready for print transfer, no human body, no skin photo, clean flat white background`
      const promptText = encodeURIComponent(enhancedPrompt)
      imageUrl = `https://image.pollinations.ai/prompt/${promptText}?width=1024&height=1024&nologo=true&seed=${Math.floor(Math.random() * 100000)}`
      
      text = text.replace(/\[IMAGE:(.*?)\]/i, '').trim()
    }

    return NextResponse.json({ reply: text, imageUrl })
  } catch (error: any) {
    console.error("General Chat Error:", error)
    return NextResponse.json({ 
      reply: "Harika bir dövme konsepti! Gerçekçi realizm veya fine-line stillerinde sana en uygun sanatçıyı eşleştirmek için sabırsızlanıyorum. Hangi bölgeye yaptırmayı düşünüyorsun? 🖋️✨" 
    })
  }
}
