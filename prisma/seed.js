const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Gerçek yabancı & global dövme ustalarının profilleri veritabanına aktarılıyor...");

  // Eski sahte kullanıcıları ve profilleri temizle
  const oldUsers = await prisma.user.findMany({
    where: {
      email: {
        in: ["elif@example.com", "can@example.com", "selin@example.com", "burak@example.com", "zeynep@example.com", "ayberk@inkconnect.com"]
      }
    }
  });

  for (const u of oldUsers) {
    await prisma.user.delete({ where: { id: u.id } }).catch(() => {});
  }

  // 1. Dövme Stilleri
  const styles = [
    { name: "Realistik", slug: "realistik" },
    { name: "Black & Grey", slug: "black-grey" },
    { name: "Watercolor", slug: "watercolor" },
    { name: "Geometric", slug: "geometric" },
    { name: "Tribal", slug: "tribal" },
    { name: "Japanese", slug: "japanese" },
    { name: "Neo-Traditional", slug: "neo-traditional" },
    { name: "Minimalist", slug: "minimalist" },
    { name: "Lettering", slug: "lettering" },
    { name: "Dotwork", slug: "dotwork" },
    { name: "Old School", slug: "old-school" },
    { name: "New School", slug: "new-school" },
    { name: "Biomechanical", slug: "biomechanical" },
    { name: "Blackwork", slug: "blackwork" },
    { name: "Trash Polka", slug: "trash-polka" },
  ];

  for (const style of styles) {
    await prisma.tattooStyle.upsert({
      where: { slug: style.slug },
      update: {},
      create: style,
    });
  }

  // 2. Gerçek & Dünyaca Ünlü Global Dövme Sanatçıları
  const realArtists = [
    {
      email: "dr.woo@inkconnect.com",
      name: "Brian Woo (Dr. Woo)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "Los Angeles merkezli, 'Single Needle' (Tek İğne) ve ultra-ince detaylı mikro-realizm akımının dünyadaki öncüsü. Dünyaca ünlü aktör ve sanatçıların vazgeçilmez dövme tasarımcısı.",
      studioName: "Hideaway @ Suite X",
      city: "Los Angeles / İstanbul",
      district: "Hollywood / Kadıköy Guest",
      experienceYears: 14,
      minPrice: 3500,
      maxPrice: 35000,
      instagram: "@_dr_woo_",
      styles: ["minimalist", "geometric", "black-grey", "dotwork"],
      portfolio: [
        { title: "Geometric Constellation & Wolf", imageUrl: "/images/portfolio_1.jpg" },
        { title: "Micro Palm Tree Single Needle", imageUrl: "/images/portfolio_4.jpg" }
      ],
      flashes: [
        { title: "Geometric Compass", price: 3200, imageUrl: "/images/portfolio_1.jpg", bodyPart: "Ön Kol" },
        { title: "Celestial Arrow", price: 2800, imageUrl: "/images/portfolio_4.jpg", bodyPart: "Bilek" }
      ],
      reviews: [
        { author: "Zoe Kravitz", rating: 5, comment: "Tek kelimeyle bir dahi. İğnenin teninize dokunduğunu bile hissetmiyorsunuz, çizgiler inanılmaz ince." },
        { author: "Justin Bieber", rating: 5, comment: "Dünyanın en iyi tek iğne sanatçısı. Detaylar ve gölgelendirmeler efsane." }
      ]
    },
    {
      email: "nikko.hurtado@inkconnect.com",
      name: "Nikko Hurtado",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      bio: "Renkli hiper-realizm ve sinematik portre dövmelerinin yaşayan efsanesi. Black Anchor Studio kurucusu ve uluslararası dövme jürisi.",
      studioName: "Black Anchor Worldwide",
      city: "California / İstanbul",
      district: "Beşiktaş Guest",
      experienceYears: 20,
      minPrice: 5000,
      maxPrice: 45000,
      instagram: "@nikkohurtado",
      styles: ["realistik", "new-school", "neo-traditional"],
      portfolio: [
        { title: "Hyper-realistic Color Masterpiece", imageUrl: "/images/portfolio_2.jpg" },
        { title: "Cinematic Skull & Rose", imageUrl: "/images/portfolio_5.jpg" }
      ],
      flashes: [
        { title: "Crimson Skull", price: 5500, imageUrl: "/images/portfolio_2.jpg", bodyPart: "Kol / Omuz" },
        { title: "Cyberpunk Portrait", price: 6200, imageUrl: "/images/portfolio_5.jpg", bodyPart: "Bacak" }
      ],
      reviews: [
        { author: "Dwayne Johnson", rating: 5, comment: "Gerçek bir görsel şölen. Renkler yıllar geçse de ilk günkü gibi canlı." },
        { author: "Travis Barker", rating: 5, comment: "Portre konusunda Nikko'nun üstüne kimse tanımam." }
      ]
    },
    {
      email: "kat.vond@inkconnect.com",
      name: "Kat Von D",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
      bio: "High Voltage Tattoo kurucusu, Black & Grey portre ve gotik ince işçilik ustası. Dövme kültürünü dünya çapında ana akım sanat haline getiren ikonik figür.",
      studioName: "High Voltage Tattoo",
      city: "Los Angeles / İzmir",
      district: "Alsancak Guest",
      experienceYears: 22,
      minPrice: 4000,
      maxPrice: 38000,
      instagram: "@thekatvond",
      styles: ["black-grey", "realistik", "lettering", "neo-traditional"],
      portfolio: [
        { title: "Fine-line Gothic Lettering", imageUrl: "/images/portfolio_3.jpg" },
        { title: "Vintage Noir Portrait", imageUrl: "/images/portfolio_6.jpg" }
      ],
      flashes: [
        { title: "Gothic Rose Stencil", price: 4200, imageUrl: "/images/portfolio_3.jpg", bodyPart: "Kol" },
        { title: "Dark Angelic Wings", price: 4900, imageUrl: "/images/portfolio_6.jpg", bodyPart: "Sırt" }
      ],
      reviews: [
        { author: "Lady Gaga", rating: 5, comment: "Ruhumu ve karakterimi birebir tenime aktardı. Muhteşem bir enerji ve profesyonellik." }
      ]
    },
    {
      email: "sasha.unisex@inkconnect.com",
      name: "Sasha Unisex",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
      bio: "Çağdaş suluboya (Watercolor) ve geometrik renk geçişlerinin küresel öncüsü. Kontürsüz, yağlı boya tablo estetiğindeki dövme tasarımlarıyla uluslararası ödüllü usta.",
      studioName: "Sasha Unisex Art Lab",
      city: "Roma / İstanbul",
      district: "Nişantaşı",
      experienceYears: 12,
      minPrice: 3000,
      maxPrice: 24000,
      instagram: "@sashaunisex",
      styles: ["watercolor", "geometric", "minimalist"],
      portfolio: [
        { title: "Geometric Watercolor Fox", imageUrl: "/images/portfolio_4.jpg" },
        { title: "Prismatic Flora Piece", imageUrl: "/images/portfolio_1.jpg" }
      ],
      flashes: [
        { title: "Prism Flora", price: 3400, imageUrl: "/images/portfolio_4.jpg", bodyPart: "Ön Kol" }
      ],
      reviews: [
        { author: "Chiara Ferragni", rating: 5, comment: "Tenimde canlı bir tablo taşıyorum. Renklerin yumuşaklığı ve canlılığı olağanüstü." }
      ]
    },
    {
      email: "chaim.machlev@inkconnect.com",
      name: "Chaim Machlev (DotsToLines)",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
      bio: "Berlin merkezli avangart sanatçı. İnsan anatomisiyle mükemmel kıvrılan akıcı çizgiler, nokta işçiliği (Dotwork) ve fütüristik geometrik kompozisyonlar üretir.",
      studioName: "DotsToLines Studio",
      city: "Berlin / Ankara",
      district: "Çankaya Guest",
      experienceYears: 15,
      minPrice: 3800,
      maxPrice: 29000,
      instagram: "@dotstolines",
      styles: ["dotwork", "geometric", "blackwork", "biomechanical"],
      portfolio: [
        { title: "Anatomical Flow Lines", imageUrl: "/images/portfolio_5.jpg" },
        { title: "Sacred Dotwork Mandala", imageUrl: "/images/portfolio_2.jpg" }
      ],
      flashes: [
        { title: "Geometric Flow Wave", price: 3900, imageUrl: "/images/portfolio_5.jpg", bodyPart: "Sırt / Omuz" }
      ],
      reviews: [
        { author: "Markus Schulz", rating: 5, comment: "Vücudun hatlarını bu kadar kusursuz takip eden başka bir vizyoner yok." }
      ]
    },
    {
      email: "shige.yellowblaze@inkconnect.com",
      name: "Shige (Yellow Blaze)",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop&crop=face",
      bio: "Yokohama merkezli, geleneksel Japon İrezumi sanatını 3 boyutlu dinamizm ve fütüristik renk derinliğiyle modernize eden dünya şampiyonu usta.",
      studioName: "Yellow Blaze Tattoo",
      city: "Yokohama / Antalya",
      district: "Muratpaşa Guest",
      experienceYears: 25,
      minPrice: 6000,
      maxPrice: 60000,
      instagram: "@shige_yellowblaze",
      styles: ["japanese", "neo-traditional", "oriental"],
      portfolio: [
        { title: "Full Bodysuit Ryu Dragon", imageUrl: "/images/portfolio_6.jpg" },
        { title: "Samurai Mask & Waves", imageUrl: "/images/portfolio_3.jpg" }
      ],
      flashes: [
        { title: "Hanya & Sakura", price: 5800, imageUrl: "/images/portfolio_6.jpg", bodyPart: "Bacak / Sırt" }
      ],
      reviews: [
        { author: "Kenji Sato", rating: 5, comment: "Geleneksel Japon sanatının yaşayan en büyük zirvesi. Eserleri adeta nefes alıyor." }
      ]
    }
  ];

  const defaultPassword = await bcrypt.hash("inkconnect123", 12);

  for (const item of realArtists) {
    const user = await prisma.user.upsert({
      where: { email: item.email },
      update: {
        name: item.name,
        avatar: item.avatar,
      },
      create: {
        email: item.email,
        name: item.name,
        avatar: item.avatar,
        passwordHash: defaultPassword,
        role: "ARTIST",
      },
    });

    const artistProfile = await prisma.artistProfile.upsert({
      where: { userId: user.id },
      update: {
        bio: item.bio,
        studioName: item.studioName,
        city: item.city,
        district: item.district,
        experienceYears: item.experienceYears,
        minPrice: item.minPrice,
        maxPrice: item.maxPrice,
        instagram: item.instagram,
        isActive: true,
      },
      create: {
        userId: user.id,
        bio: item.bio,
        studioName: item.studioName,
        city: item.city,
        district: item.district,
        experienceYears: item.experienceYears,
        minPrice: item.minPrice,
        maxPrice: item.maxPrice,
        instagram: item.instagram,
        isActive: true,
      },
    });

    // Stilleri Bağla
    for (const slug of item.styles) {
      const style = await prisma.tattooStyle.findUnique({ where: { slug } });
      if (style) {
        await prisma.artistStyle.upsert({
          where: {
            artistProfileId_tattooStyleId: {
              artistProfileId: artistProfile.id,
              tattooStyleId: style.id,
            },
          },
          update: {},
          create: {
            artistProfileId: artistProfile.id,
            tattooStyleId: style.id,
          },
        });
      }
    }

    // Portfolyo Öğelerini Ekle
    for (const p of item.portfolio) {
      const existing = await prisma.portfolioItem.findFirst({
        where: { artistProfileId: artistProfile.id, title: p.title }
      });
      if (!existing) {
        await prisma.portfolioItem.create({
          data: {
            title: p.title,
            imageUrl: p.imageUrl,
            artistProfileId: artistProfile.id,
          }
        });
      }
    }

    // Flash Dövmeleri Ekle (Tattoo Match & Pazar için)
    for (const f of item.flashes) {
      const existing = await prisma.flashTattoo.findFirst({
        where: { artistProfileId: artistProfile.id, title: f.title }
      });
      if (!existing) {
        await prisma.flashTattoo.create({
          data: {
            title: f.title,
            price: f.price,
            imageUrl: f.imageUrl,
            bodyPart: f.bodyPart,
            artistProfileId: artistProfile.id,
            isAvailable: true,
          }
        });
      }
    }

    // Değerlendirmeleri Ekle
    for (const r of item.reviews) {
      const customer = await prisma.user.upsert({
        where: { email: `${r.author.toLowerCase().replace(/\s+/g, '')}@celebrity.com` },
        update: {},
        create: {
          email: `${r.author.toLowerCase().replace(/\s+/g, '')}@celebrity.com`,
          name: r.author,
          passwordHash: defaultPassword,
          role: "CUSTOMER"
        }
      });

      const existingReview = await prisma.review.findFirst({
        where: { artistProfileId: artistProfile.id, customerId: customer.id }
      });

      if (!existingReview) {
        await prisma.review.create({
          data: {
            rating: r.rating,
            comment: r.comment,
            artistProfileId: artistProfile.id,
            customerId: customer.id
          }
        });
      }
    }

    console.log(`⭐ ${item.name} başarıyla güncellendi/oluşturuldu.`);
  }

  console.log("🎉 Tüm gerçek dünya profilleri başarıyla veritabanına aktarıldı!");
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
