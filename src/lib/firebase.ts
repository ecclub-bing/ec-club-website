// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, limit, Firestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "ec-club-bing-website",
  appId: "1:681859925462:web:f4ca8eb152b1a1991ad077",
  storageBucket: "ec-club-bing-website.firebasestorage.app",
  apiKey: "AIzaSyDZ_XQSIEMPHRZn7z2ge4NNbpzhze87qtQ",
  authDomain: "ec-club-bing-website.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "681859925462"
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

auth = getAuth(app);
db = getFirestore(app);

// Function to add sample data, defined to be called once.
const addSampleArticles = async () => {
    const articlesCollection = collection(db, "articles");
    const q = query(articlesCollection, limit(1));
    const articlesSnapshot = await getDocs(q);

    if (articlesSnapshot.empty) {
        console.log("No articles found, adding sample data...");
        const sampleArticles = [
            {
                title: "Welcome Back: Reflecting on Our Recent GIM Sessions",
                date: "2024-09-25",
                paragraph: "The fall semester is in full swing, and we've had some amazing General Interest Meetings. Here's a quick recap of what we've covered and a look at what's to come.",
                linkedinUrl: "https://www.linkedin.com/",
                imageUrl: "https://res.cloudinary.com/drrm2qz39/image/upload/v1721860098/ec-bing/GIM2_u8qjkg.png",
                imageHint: "presentation business",
            },
            {
                title: "Having a Great Idea Is Only Brushing the Surface",
                date: "2024-04-15",
                paragraph: "A great idea is the first step, but execution is everything. We dive into what it takes to turn your vision into a viable business.",
                linkedinUrl: "https://www.linkedin.com/",
                imageUrl: "https://res.cloudinary.com/drrm2qz39/image/upload/v1721860099/ec-bing/klaws_y7cmzl.png",
                imageHint: "portrait speaker",
            },
            {
                title: "The Art of the Pitch: Key Takeaways from our Workshop",
                date: "2024-03-01",
                paragraph: "We recently hosted a pitch workshop to help students refine their ideas and presentation skills. Here are the key takeaways from our expert panel.",
                linkedinUrl: "https://www.linkedin.com/",
                imageUrl: "https://res.cloudinary.com/drrm2qz39/image/upload/v1721860098/ec-bing/gim-showcase_j7xwdp.png",
                imageHint: "group discussion",
            },
        ];

        try {
            for (const article of sampleArticles) {
                await addDoc(articlesCollection, article);
                console.log(`Added sample article: ${article.title}`);
            }
        } catch (error) {
            console.error("Error adding sample articles:", error);
        }
    } else {
        console.log("Articles collection is not empty, skipping sample data.");
    }
};

// Call the function to populate data if needed.
addSampleArticles();

export { app, auth, db };
