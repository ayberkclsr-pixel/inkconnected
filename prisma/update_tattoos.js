const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🎨 Sanatçıların gerçek imza dövme fotoğrafları portfolyolarına ve flash pazarına yükleniyor...");

  // Sanatçı bazlı gerçek imza dövme portfolyoları & flash çalışmaları
  const artistPortfolios = {
    "dr.woo@inkconnect.com": {
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
      items: [
        {
          title: "Micro Compass & Geometric Solar System",
          imageUrl: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800&auto=format&fit=crop&q=80"
        },
        {
          title: "Single-Needle Minimalist Mountain & Constellation",
          imageUrl: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&auto=format&fit=crop&q=80"
        },
        {
          title: "Fine-Line Anatomy & Sacred Geometry",
          imageUrl: "https://images.unsplash.com/photo-1568367571342-6e2716a410b0?w=800&auto=format&fit=crop&q=80"
        }
      ],
      flashes: [
        {
          title: "Dr. Woo Signature Compass",
          price: 3500,
          bodyPart: "Ön Kol",
          size: "8x8 cm",
          imageUrl: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=600&auto=format&fit=crop&q=80"
        },
        {
          title: "Celestial Arrow & Moon Phase",
          price: 2900,
          bodyPart: "Bilek",
          size: "6x4 cm",
          imageUrl: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=600&auto=format&fit=crop&q=80"
        }
      ]
    },
    "nikko.hurtado@inkconnect.com": {
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
      items: [
        {
          title: "Cinematic Dark Realism Skull & Peony",
          imageUrl: "https://images.unsplash.com/photo-1562607998-cb586e927c32?w=800&auto=format&fit=crop&q=80"
        },
        {
          title: "Hyper-Realistic Color Character Portrait",
          imageUrl: "https://images.unsplash.com/photo-1590246814883-578336ff9341?w=800&auto=format&fit=crop&q=80"
        },
        {
          title: "Full Sleeve Hyper-Realism Masterpiece",
          imageUrl: "https://images.unsplash.com/photo-1565058376510-44910cf94e9f?w=800&auto=format&fit=crop&q=80"
        }
      ],
      flashes: [
        {
          title: "Crimson Skull Realism",
          price: 5500,
          bodyPart: "Omuz / Kol",
          size: "15x12 cm",
          imageUrl: "https://images.unsplash.com/photo-1562607998-cb586e927c32?w=600&auto=format&fit=crop&q=80"
        },
        {
          title: "Sinematic Neo-Realist Rose",
          price: 4800,
          bodyPart: "Bacak",
          size: "12x10 cm",
          imageUrl: "https://images.unsplash.com/photo-1590246814883-578336ff9341?w=600&auto=format&fit=crop&q=80"
        }
      ]
    },
    "kat.vond@inkconnect.com": {
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
      items: [
        {
          title: "Vintage Victorian Gothic Rose & Chandelier",
          imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80"
        },
        {
          title: "Fine-Line Gothic Calligraphy & Wings",
          imageUrl: "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=800&auto=format&fit=crop&q=80"
        },
        {
          title: "Noir Shadow Portrait & Velvet Texture",
          imageUrl: "https://images.unsplash.com/photo-1542385151-efd9000785a0?w=800&auto=format&fit=crop&q=80"
        }
      ],
      flashes: [
        {
          title: "Gothic Noir Rose",
          price: 4200,
          bodyPart: "Ön Kol",
          size: "10x8 cm",
          imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80"
        },
        {
          title: "Victorian Key & Lettering",
          price: 3800,
          bodyPart: "Sırt / Boyun",
          size: "9x6 cm",
          imageUrl: "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=600&auto=format&fit=crop&q=80"
        }
      ]
    },
    "sasha.unisex@inkconnect.com": {
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
      items: [
        {
          title: "Prismatic Geometric Watercolor Fox",
          imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&auto=format&fit=crop&q=80"
        },
        {
          title: "Contemporary Pastel Botanical Gradient",
          imageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80"
        },
        {
          title: "No-Outline Watercolor Peony Bloom",
          imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=80"
        }
      ],
      flashes: [
        {
          title: "Origami Watercolor Bird",
          price: 3400,
          bodyPart: "Kürek Kemiği",
          size: "8x8 cm",
          imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&auto=format&fit=crop&q=80"
        },
        {
          title: "Pastel Lavender Geometry",
          price: 3100,
          bodyPart: "Bilek",
          size: "7x5 cm",
          imageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80"
        }
      ]
    },
    "chaim.machlev@inkconnect.com": {
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80",
      items: [
        {
          title: "Full Back Flowing Wave Lines & Spine Dynamic",
          imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80"
        },
        {
          title: "Sacred Dotwork Torus & Optical Illusion",
          imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=80"
        },
        {
          title: "Futuristic Biomechanical Dot Architecture",
          imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80"
        }
      ],
      flashes: [
        {
          title: "Sacred Geometric Matrix",
          price: 4100,
          bodyPart: "Sırt / Omuz",
          size: "14x14 cm",
          imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80"
        },
        {
          title: "Minimalist Flow Wave",
          price: 3600,
          bodyPart: "Ön Kol",
          size: "12x6 cm",
          imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&auto=format&fit=crop&q=80"
        }
      ]
    },
    "shige.yellowblaze@inkconnect.com": {
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&auto=format&fit=crop&q=80",
      items: [
        {
          title: "Traditional 3D Japanese Ryu Dragon Bodysuit",
          imageUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80"
        },
        {
          title: "Dynamic Samurai & Cherry Blossom Wind",
          imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80"
        },
        {
          title: "Koi Fish Swimming Upstream with Water Waves",
          imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80"
        }
      ],
      flashes: [
        {
          title: "Hanya Mask & Sakura Flames",
          price: 6200,
          bodyPart: "Bacak / Sırt",
          size: "16x14 cm",
          imageUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80"
        },
        {
          title: "Golden Koi & Wave Splash",
          price: 5400,
          bodyPart: "Kol / Biceps",
          size: "14x10 cm",
          imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80"
        }
      ]
    }
  };

  for (const [email, data] of Object.entries(artistPortfolios)) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { artistProfile: true }
    });

    if (!user || !user.artistProfile) continue;

    const artistProfileId = user.artistProfile.id;

    // Avatarı güncelle
    await prisma.user.update({
      where: { id: user.id },
      data: { avatar: data.avatar }
    });

    // Eski portfolyo & flashları temizle ve taze görsel setini ekle
    await prisma.portfolioItem.deleteMany({ where: { artistProfileId } });
    await prisma.flashTattoo.deleteMany({ where: { artistProfileId } });

    for (const item of data.items) {
      await prisma.portfolioItem.create({
        data: {
          title: item.title,
          imageUrl: item.imageUrl,
          artistProfileId
        }
      });
    }

    for (const flash of data.flashes) {
      await prisma.flashTattoo.create({
        data: {
          title: flash.title,
          price: flash.price,
          bodyPart: flash.bodyPart,
          size: flash.size,
          imageUrl: flash.imageUrl,
          isAvailable: true,
          artistProfileId
        }
      });
    }

    console.log(`📸 ${user.name} için yüksek çözünürlüklü imza dövme portfolyosu yüklendi.`);
  }

  console.log("✨ Tüm sanatçıların portfolyoları ve dövme fotoğrafları eksiksiz güncellendi!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
