const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Eski/sahte sanatçıları temizle
  const fakeNames = ["Lena Ink", "Zeynep Sanat", "Kaan G."];
  for (const name of fakeNames) {
    const user = await prisma.user.findFirst({ where: { name } });
    if (user) {
      await prisma.user.delete({ where: { id: user.id } }).catch(() => {});
      console.log(`🗑️ ${name} temizlendi.`);
    }
  }

  // 6 Efsane Sanatçının Gerçek Dövme Sanatı Görselleri (Kapak Görselleri Olarak)
  const updates = [
    {
      email: "dr.woo@inkconnect.com",
      coverImage: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=1000&auto=format&fit=crop&q=80",
      avatarImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&crop=face"
    },
    {
      email: "nikko.hurtado@inkconnect.com",
      coverImage: "https://images.unsplash.com/photo-1562607998-cb586e927c32?w=1000&auto=format&fit=crop&q=80",
      avatarImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&crop=face"
    },
    {
      email: "kat.vond@inkconnect.com",
      coverImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1000&auto=format&fit=crop&q=80",
      avatarImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&crop=face"
    },
    {
      email: "sasha.unisex@inkconnect.com",
      coverImage: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1000&auto=format&fit=crop&q=80",
      avatarImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&crop=face"
    },
    {
      email: "chaim.machlev@inkconnect.com",
      coverImage: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1000&auto=format&fit=crop&q=80",
      avatarImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&crop=face"
    },
    {
      email: "shige.yellowblaze@inkconnect.com",
      coverImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1000&auto=format&fit=crop&q=80",
      avatarImage: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&crop=face"
    }
  ];

  for (const u of updates) {
    const user = await prisma.user.findUnique({
      where: { email: u.email },
      include: { artistProfile: true }
    });

    if (user && user.artistProfile) {
      // Birincil portfolyo öğesini dövme kapak görseli olarak en başa ayarla
      await prisma.portfolioItem.deleteMany({
        where: { artistProfileId: user.artistProfile.id, imageUrl: u.coverImage }
      });

      await prisma.portfolioItem.create({
        data: {
          title: `${user.name} Signature Masterpiece`,
          imageUrl: u.coverImage,
          artistProfileId: user.artistProfile.id,
          createdAt: new Date()
        }
      });

      console.log(`🖼️ ${user.name} kapak görseli gerçek imza dövmesi ile güncellendi.`);
    }
  }

  console.log("✨ Kartlardaki tüm dövme kapak görselleri başarıyla güncellendi!");
}

main().then(async () => {
  await prisma.$disconnect();
});
