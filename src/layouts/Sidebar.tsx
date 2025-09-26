import { Link, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";

export default function Sidebar() {
  const location = useLocation();
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/portfolio", label: "Portfolio" },
  ];

  return (
    <aside className="hidden lg:block w-64 bg-gray-50 border-r">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Card
            key={item.path}
            className={`p-3 cursor-pointer transition ${
              location.pathname === item.path ? "bg-blue-100 border-blue-400" : "hover:bg-gray-100"
            }`}
          >
            <Link to={item.path} className="block w-full">{item.label}</Link>
          </Card>
        ))}
      </nav>
    </aside>
  );
}
