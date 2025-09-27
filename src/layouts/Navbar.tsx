import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  
  // Get page title based on current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Home";
      case "/portfolio":
        return "Portfolios";
      case "/experimentals":
        return "Experimentals";
      case "/slack-archives":
        return "Slack Archives";
      case "/refer":
        return "Refer a friend";
      case "/gift":
        return "Gift a subscription";
      case "/account":
        return "Account";
      default:
        return "Home";
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Page Title */}
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{getPageTitle()}</h1>
        </div>

        {/* Desktop Navigation - Hidden for clean look like CapitalMind */}
        <NavigationMenu className="hidden">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/" className="px-3 py-2 text-gray-600 hover:text-gray-900">
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/portfolio" className="px-3 py-2 text-gray-600 hover:text-gray-900">
                Portfolio
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col space-y-4 mt-4">
                <Link to="/" className="hover:text-green-600">
                  Home
                </Link>
                <Link to="/portfolio" className="hover:text-green-600">
                  Portfolio
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}