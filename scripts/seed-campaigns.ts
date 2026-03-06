import { prisma } from "../db/prisma";

async function createDummyCampaigns() {
  console.log("Creating dummy campaigns...");

  const campaigns = [
    {
      title: "Education Support for Rural Children",
      description:
        "Help us provide quality education, books, and school supplies to underprivileged children in rural areas. Your contribution will help bridge the educational gap and create opportunities for a brighter future.",
      goal: 10000000, // ₹100,000 in paise
      raised: 3500000, // ₹35,000 in paise
      category: "education",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
      status: "active",
      endDate: new Date("2026-06-30"),
    },
    {
      title: "Nutritious Meals for Street Children",
      description:
        "Every child deserves nutritious food. Join us in our mission to provide healthy meals to street children. A small donation can make a big difference in a child's life and health.",
      goal: 5000000, // ₹50,000 in paise
      raised: 4200000, // ₹42,000 in paise
      category: "food",
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
      status: "active",
      endDate: new Date("2026-05-15"),
    },
  ];

  for (const campaign of campaigns) {
    // Generate slug from title
    const slug = campaign.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    try {
      const created = await prisma.campaign.create({
        data: {
          ...campaign,
          slug,
        },
      });
      console.log(`✓ Created campaign: ${created.title}`);
    } catch (error: any) {
      if (error.code === "P2002") {
        console.log(`✗ Campaign already exists: ${campaign.title}`);
      } else {
        console.error(`Error creating campaign: ${campaign.title}`, error);
      }
    }
  }

  console.log("\nDone!");
}

createDummyCampaigns()
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
