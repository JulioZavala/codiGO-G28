import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";
import { Home, ShoppingCart } from "lucide-react";
import useUserStore from "@/stores/useStore";
import useCartStore from "@/stores/useCartStore";

function AppContent({ children, showFilter = true }) {
  const { getTotalItem } = useCartStore((state) => state);

  const { user } = useUserStore();

  return (
    <SidebarProvider>
      {showFilter && <AppSidebar />}
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
          <div className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            {showFilter ? (
              <SidebarTrigger className="-ml-1" />
            ) : (
              <Link to={"/"}>
                <Home />
              </Link>
            )}
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
          <div className="pr-5 lg:pr-20 flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex items-center cursor-pointer">
                  <img src={user?.avatar} width={40} />
                  <div>
                    <p className="text-xs text-gray-400">
                      {user?.name} {user?.lastname}
                    </p>
                    <p className="text-xs text-gray-400">{user?.email}</p>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to={"/summary"} className="block relative">
              <ShoppingCart />
              <span className="absolute -top-1 -right-1 w-4 h-4 text-center bg-red-500 text-white rounded-full text-xs">
                {getTotalItem()}
              </span>
            </Link>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AppContent;