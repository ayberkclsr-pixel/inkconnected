const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with tons of data...')

  const passwordHash = await bcrypt.hash('ayberk123', 10)

  // 1. Create multiple artists
  const artistsData = [
    {
      name: "Lena Ink",
      email: "lena@inkconnect.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
      studio: "Neon Noir Studio",
      city: "İstanbul",
      district: "Kadıköy",
      bio: "Minimalist çizgilerin karanlıkla dansı. Her eser, ruhun derinliklerinden gelen bir fısıltıdır.",
      minPrice: 1500,
      exp: 5
    },
    {
      name: "Kaan G.",
      email: "kaan@inkconnect.com",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
      studio: "Geleneksel Ink",
      city: "İzmir",
      district: "Alsancak",
      bio: "Geleneksel motifleri modern bir dokunuşla harmanlıyorum. Derinizdeki mürekkep, mirasımızın bir parçası olsun.",
      minPrice: 2000,
      exp: 8
    },
    {
      name: "Zeynep Sanat",
      email: "zeynep@inkconnect.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
      studio: "Aura Tattoo",
      city: "Ankara",
      district: "Çankaya",
      bio: "Suluboya ve renklerin büyülü dünyası. Hayallerinizi renklendirmek için buradayım.",
      minPrice: 1200,
      exp: 3
    }
  ]

  const createdArtists = []

  for (const a of artistsData) {
    const user = await prisma.user.create({
      data: {
        email: a.email,
        name: a.name,
        passwordHash,
        role: "ARTIST",
        avatar: a.avatar,
      }
    })

    const profile = await prisma.artistProfile.create({
      data: {
        userId: user.id,
        bio: a.bio,
        studioName: a.studio,
        city: a.city,
        district: a.district,
        minPrice: a.minPrice,
        experienceYears: a.exp,
        isActive: true,
      }
    })
    createdArtists.push(profile)
  }

  // 2. Create styles and link them
  const styles = await prisma.tattooStyle.findMany()
  if (styles.length > 0) {
    for (const artist of createdArtists) {
      await prisma.artistStyle.create({
        data: {
          artistProfileId: artist.id,
          tattooStyleId: styles[Math.floor(Math.random() * styles.length)].id
        }
      })
    }
  }

  // 3. Create portfolios, flash tattoos and posts for each artist
  const sampleImages = [
    "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800&q=80",
    "https://images.unsplash.com/photo-1568367571342-6e2716a410b0?w=800&q=80",
    "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&q=80",
    "https://images.unsplash.com/photo-1562607998-cb586e927c32?w=800&q=80",
    "https://images.unsplash.com/photo-1621285270275-6e938bf03046?w=800&q=80",
    "https://images.unsplash.com/photo-1563215286-9dc4e5058ec4?w=800&q=80"
  ]

  const bodyParts = ["kol", "sırt", "göğüs", "bacak", "boyun"]

  for (const artist of createdArtists) {
    // Portfolio
    for (let i = 0; i < 4; i++) {
      await prisma.portfolioItem.create({
        data: {
          artistProfileId: artist.id,
          imageUrl: sampleImages[Math.floor(Math.random() * sampleImages.length)],
          title: `Şaheser ${i + 1}`
        }
      })
    }

    // Flash Tattoos
    for (let i = 0; i < 3; i++) {
      await prisma.flashTattoo.create({
        data: {
          artistProfileId: artist.id,
          title: `Özel Flash ${i + 1}`,
          imageUrl: sampleImages[Math.floor(Math.random() * sampleImages.length)],
          price: Math.floor(Math.random() * 2000) + 1000,
          bodyPart: bodyParts[Math.floor(Math.random() * bodyParts.length)],
          isAvailable: true
        }
      })
    }

    // Feed Posts
    for (let i = 0; i < 2; i++) {
      await prisma.feedPost.create({
        data: {
          artistProfileId: artist.id,
          imageUrl: sampleImages[Math.floor(Math.random() * sampleImages.length)],
          caption: "Ruhun dışa vurumu, mürekkebin tenle dansı. Yeni şaheserimiz. #tattooart",
          bodyPart: bodyParts[Math.floor(Math.random() * bodyParts.length)],
          likes: Math.floor(Math.random() * 500)
        }
      })
    }
  }

  // 4. Create some customers and reviews
  for (let i = 0; i < 5; i++) {
    const customer = await prisma.user.create({
      data: {
        email: `customer${i}@inkconnect.com`,
        name: `Müşteri ${i + 1}`,
        passwordHash,
        role: "CUSTOMER",
      }
    })

    await prisma.review.create({
      data: {
        artistProfileId: createdArtists[Math.floor(Math.random() * createdArtists.length)].id,
        customerId: customer.id,
        rating: Math.floor(Math.random() * 2) + 4, // 4 or 5
        comment: "Muazzam bir iş çıkardı. Hijyen, kalite ve sanat harikaydı. Kesinlikle tavsiye ederim."
      }
    })
  }

  console.log('Seeding completed successfully!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
