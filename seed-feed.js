const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Find an artist profile to attach the posts to
  let artist = await prisma.artistProfile.findFirst()
  
  if (!artist) {
    console.log("No artist found. Creating a dummy artist...")
    const user = await prisma.user.create({
      data: {
        email: "dummy_artist@inkconnect.com",
        name: "Gölge Sanatçısı",
        passwordHash: "dummy",
        role: "ARTIST",
        avatar: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=400&q=80",
      }
    })
    artist = await prisma.artistProfile.create({
      data: {
        userId: user.id,
        bio: "Karanlığın içindeki aydınlığı deriye işliyorum.",
        studioName: "Karakalem Studio",
        city: "İstanbul"
      }
    })
  }

  console.log("Creating feed posts...")

  await prisma.feedPost.createMany({
    data: [
      {
        artistProfileId: artist.id,
        imageUrl: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=800",
        caption: "Bedenin bir tuval, acı ise fırça darbesinin mürekkeple buluştuğu o eşsiz an. #tattooart #dotwork",
        bodyPart: "Sırt",
        likes: 124
      },
      {
        artistProfileId: artist.id,
        imageUrl: "https://images.unsplash.com/photo-1568367571342-6e2716a410b0?q=80&w=800",
        caption: "Her çizginin bir hikayesi, her gölgenin bir derinliği var. Sonsuzluğa kazınan anılar... #blackwork",
        bodyPart: "Kol",
        likes: 89
      },
      {
        artistProfileId: artist.id,
        imageUrl: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=800",
        caption: "Ruhun dışa vurumu, mürekkebin ciltle dansı. Yeni şaheserimiz tamamlandı. Sizce nasıl olmuş? #masterpiece",
        bodyPart: "Göğüs",
        likes: 256
      }
    ]
  })

  console.log("Feed posts created successfully!")
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
