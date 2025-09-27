import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ExternalLink } from "lucide-react";

export default function Home() {
  // Quick links section data
  const quickLinks = [
    {
      title: "Get started",
      description: "Read our getting started guide to get the most out of your Capitalmind subscription.",
      icon: "📚"
    },
    {
      title: "Community",
      description: "Join the conversation on our exclusive community on Slack for Capitalmind Premium subscribers",
      icon: "👥"
    },
    {
      title: "Visit website",
      description: "Keep up with our latest content on our website",
      icon: "🌐"
    }
  ];

  // Latest posts data (matching CapitalMind content)
  const latestPosts = [
    {
      id: 1,
      date: "Apr 18, 2024",
      title: "CM Fixed Income: Exiting Banking & PSU to Add a New Gilt Fund",
      excerpt: "We are increasing the duration of our Fixed Income portfolio to reflect the current macro conditions. We want to take advantage of the current higher rates to further increase the duration of the Gilt funds we hold. Read more...",
    },
    {
      id: 2,
      date: "Apr 05, 2024",
      title: "Craftsman Automation: Poised for Growth Amid Temporary Headwinds",
      excerpt: "Unlock this post by trial. Craftsman Automation excels in making precise parts for cars and machines. Amidst temporary headwinds, looks resilient with a focus on growth and innovation....",
    },
    {
      id: 3,
      date: "Apr 03, 2024",
      title: "The Focused Way of Investing: Our Four-Quadrant Strategy and FY24 Review",
      excerpt: "FY24 brought us a 42% gain in our Capitalmind Focused portfolio, gently outperforming the Nifty's 29%. It's been a bit of a rollercoaster, especially these last few months, but that's part of the equity investing. It's like having a compass....",
    },
    {
      id: 4,
      date: "Mar 27, 2024",
      title: "A Small CAD for India, Yet Again",
      excerpt: "Yet again, India's Current Account Deficit is a mere 10 bp in the quarter (Dec 2023), less than levels more than a decade back, and less than 2017-18 too. Why net of gold? It's not really a current account import...",
    },
    {
      id: 5,
      date: "Mar 25, 2024",
      title: "Poonawalla Fincorp: One right step at a time",
      excerpt: "There are some winning patterns in investing that keep repeating. One such pattern is when a big company buys a struggling company, fixes old problems, and brings in new leaders to grow the business. This way has often led to...",
    },
    {
      id: 6,
      date: "Mar 18, 2024",
      title: "CM Focused: Reducing our allocation to smallcaps & increasing cash",
      excerpt: "In the last few days, we have seen increased volatility in the mid and small-cap markets as the recent outperformance continues, it often suggests that one should take some...",
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Quick Links Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickLinks.map((link, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{link.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    {link.title}
                    <ExternalLink className="w-4 h-4 ml-2 text-gray-400" />
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {link.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Latest Posts Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Latest Posts</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow border border-gray-200">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="text-sm text-gray-500">{post.date}</div>
                  <h3 className="font-semibold text-gray-900 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-green-600 hover:text-green-700 text-sm"
                  >
                    Read full post
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}