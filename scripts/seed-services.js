import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "carehubdb";

const servicesData = [
  {
    id: "baby-care",
    title: "Baby Care",
    description:
      "Professional baby sitting services ensuring your child’s safety, comfort, and happiness at home. Certified caregivers follow your routines and provide playful engagement.",
    image: "/childcare.png",
    ratePerDay: 1200,
    ratePerHour: 250,
    link: "/service/baby-care",
    features: [
      "Trusted & Verified Caregivers",
      "Flexible Scheduling",
      "Child Development Activities",
      "Meal Preparation for Children",
      "Emergency Preparedness",
    ],
  },
  {
    id: "elderly-care",
    title: "Elderly Care",
    description:
      "Compassionate elderly care focused on companionship, mobility support, medication reminders, and daily assistance while keeping dignity first.",
    image: "/home-care.png",
    ratePerDay: 1500,
    ratePerHour: 300,
    link: "/service/elderly-care",
    features: [
      "Personalized Care Plans",
      "Companionship & Social Engagement",
      "Medication Reminders",
      "Light Housekeeping",
      "Assistance with Daily Living",
    ],
  },
  {
    id: "sick-care",
    title: "Sick People Care",
    description:
      "Dedicated care for sick and recovering individuals with vitals monitoring, meal prep, hygiene support, and coordination with your doctor’s plan.",
    image: "/medical-care.png",
    ratePerDay: 1800,
    ratePerHour: 350,
    link: "/service/sick-care",
    features: [
      "Vitals Monitoring & Reporting",
      "Post-operative Care",
      "Personal Hygiene Support",
      "Specialized Meal Preparation",
      "Coordination with Medical Professionals",
    ],
  },
];

async function seedServices() {
  if (!uri) {
    console.error('Error: MONGODB_URI is not defined in .env.local');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db(dbName);
    const servicesCollection = database.collection('services');

    // Clear existing services
    await servicesCollection.deleteMany({});
    console.log('Existing services cleared.');

    // Insert new services
    const result = await servicesCollection.insertMany(servicesData);
    console.log(`${result.insertedCount} services inserted successfully.`);
  } catch (error) {
    console.error('Error seeding services:', error);
  } finally {
    await client.close();
  }
}

seedServices();
