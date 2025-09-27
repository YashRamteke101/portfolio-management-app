import { Link, useLocation } from "react-router-dom";
import { Home, PieChart, Briefcase, Archive, Users, Gift, User } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  
  const navItems = [
    { 
      path: "/", 
      label: "Home", 
      icon: Home 
    },
    { 
      path: "/portfolio", 
      label: "Portfolios", 
      icon: PieChart 
    },
    { 
      path: "/experimentals", 
      label: "Experimentals", 
      icon: Briefcase 
    },
    { 
      path: "/slack-archives", 
      label: "Slack Archives", 
      icon: Archive 
    },
    { 
      path: "/refer", 
      label: "Refer a friend", 
      icon: Users 
    },
    { 
      path: "/gift", 
      label: "Gift a subscription", 
      icon: Gift 
    },
    { 
      path: "/account", 
      label: "Account", 
      icon: User 
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-500 rounded-sm flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <div>
            <div className="font-semibold text-gray-900">capitalmind</div>
            <div className="text-xs text-green-600 font-medium">premium</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-gray-100 text-gray-900 font-medium"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}