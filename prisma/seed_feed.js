const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.feedPost.deleteMany({});

  const artists = await prisma.artistProfile.findMany({
    include: { user: true }
  });

  const postsData = [
    {
      email: "dr.woo@inkconnect.com",
      imageUrl: "/images/studio-1.jpg",
      caption: "Single needle fine-line geometrik pusula ve takımyıldız çalışması. 4 saatlik hassas seansın ardından tamamlandı. ✨ #singleline #fineline #drwoo #tattooart",
      likes: 1240
    },
    {
      email: "nikko.hurtado@inkconnect.com",
      imageUrl: "/images/studio-2.jpg",
      caption: "Hiper-realistik renkli kafatası ve gölgelendirme projesi. Canlı renkler ve derin kontrastlar. 💀🌹 #colorrealism #nikkohurtado #inked",
      likes: 2180
    },
    {
      email: "kat.vond@inkconnect.com",
      imageUrl: "/images/studio-4.jpg",
      caption: "Viktoryen gotik stil gül ve ince hatlı melek kanatları. Siyah & gri noir gölgelendirme zarafeti. 🖤🥀 #gothictattoo #katvond #blackandgrey",
      likes: 1890
    },
    {
      email: "sasha.unisex@inkconnect.com",
      imageUrl: "/images/studio-3.jpg",
      caption: "Kontursuz prizmatik geometrik suluboya tasarımı. Ten üzerinde canlı renk cümbüşü. 🦊🎨 #watercolortattoo #sashaunisex #colortattoo",
      likes: 1650
    },
    {
      email: "chaim.machlev@inkconnect.com",
      imageUrl: "/images/studio-5.jpg",
      caption: "Vücut anatomisiyle dans eden akış çizgileri ve nokta işi (dotwork) mandala. Minimalist sonsuzluk. 🌊📐 #dotwork #chaimmachlev #dotstolines",
      likes: 1420
    },
    {
      email: "shige.yellowblaze@inkconnect.com",
      imageUrl: "/images/studio-6.jpg",
      caption: "Geleneksel Japon Irezumi 3D Ryu (Ejderha) bodysuit çalışması. 30 saatlik emeğin görkemli sonucu. 🐉⚡ #irezumi #shige #japanesetattoo",
      likes: 3100
    }
  ];

  for (const p of postsData) {
    const artist = artists.find(a => a.user.email === p.email);
    if (artist) {
      await prisma.feedPost.create({
        data: {
          imageUrl: p.imageUrl,
          caption: p.caption,
          likes: p.likes,
          artistProfileId: artist.id,
          createdAt: new Date()
        }
      });
      console.log(`✅ ${artist.user.name} için yerel hızlı görselle ilham gönderisi yüklendi.`);
    }
  }
}

main().then(async () => {
  await prisma.$disconnect();
});
