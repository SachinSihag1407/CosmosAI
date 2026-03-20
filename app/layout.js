import "./globals.css";

export const metadata = {
  title: "CosmosAI — Your AI Guide to the Universe",
  description:
    "Explore the cosmos with CosmosAI, an intelligent space and astronomy chatbot. Ask about planets, stars, galaxies, black holes, NASA missions, and more.",
  keywords: ["space", "astronomy", "AI", "chatbot", "cosmos", "planets", "stars", "NASA"],
  openGraph: {
    title: "CosmosAI — Your AI Guide to the Universe",
    description: "Explore the cosmos with an intelligent AI space guide.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
