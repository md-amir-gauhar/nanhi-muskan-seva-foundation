async function createDummyCampaigns() {
  console.log("Creating dummy campaigns via API...");

  const campaigns = [
    {
      title: "Education Support for Rural Children",
      description:
        "Help us provide quality education, books, and school supplies to underprivileged children in rural areas. Your contribution will help bridge the educational gap and create opportunities for a brighter future.",
      goal: 100000,
      category: "education",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
      status: "active",
      endDate: "2026-06-30",
    },
    {
      title: "Nutritious Meals for Street Children",
      description:
        "Every child deserves nutritious food. Join us in our mission to provide healthy meals to street children. A small donation can make a big difference in a child's life and health.",
      goal: 50000,
      category: "food",
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
      status: "active",
      endDate: "2026-05-15",
    },
  ];

  console.log("Logging in as admin...");
  const loginResponse = await fetch("http://localhost:3000/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "admin@nanhimuskanseva.org",
      password: "Admin@12345",
    }),
  });

  if (!loginResponse.ok) {
    throw new Error(
      "Failed to login. Make sure the server is running on port 3000.",
    );
  }

  const cookies = loginResponse.headers.get("set-cookie");
  if (!cookies) {
    throw new Error("No cookie received from login");
  }

  console.log("✓ Logged in successfully\n");

  for (const campaign of campaigns) {
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/campaigns",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookies,
          },
          body: JSON.stringify(campaign),
        },
      );

      const data = await response.json();

      if (data.success) {
        console.log(`✓ Created campaign: ${campaign.title}`);
      } else {
        console.log(`✗ Failed to create campaign: ${campaign.title}`);
        console.log(`  Error: ${data.error || "Unknown error"}`);
      }
    } catch (error: any) {
      console.error(
        `Error creating campaign: ${campaign.title}`,
        error.message,
      );
    }
  }

  console.log("\nDone!");
}

createDummyCampaigns().catch((error) => {
  console.error("Error:", error.message);
  process.exit(1);
});
