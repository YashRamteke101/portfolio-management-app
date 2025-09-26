import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { blogPosts } from "../data/blogPosts";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg">
        <h1 className="text-3xl font-bold">Professional Portfolio Management</h1>
        <p className="mt-2">Focused investing strategies for long-term returns.</p>
        <Button asChild variant="secondary" className="mt-4">
          <Link to="/portfolio">View Portfolio</Link>
        </Button>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Latest Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.map(post => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{post.excerpt}</p>
                <Button variant="secondary" className="mt-4">Read More</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
