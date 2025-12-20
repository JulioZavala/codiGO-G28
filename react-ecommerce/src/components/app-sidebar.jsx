import * as React from "react";

import { SearchForm } from "@/components/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";

export function AppSidebar({ ...props }) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="p-4">
        <div>
          <h3 className="text-lg">Precio</h3>
          <div className="mt-4 space-y-2">
            <Label>Minimo</Label>
            <Input placeholder="10.0" />
          </div>
          <div className="mt-4 space-y-2">
            <Label>Maximo</Label>
            <Input placeholder="1000.0" />
          </div>
        </div>
        <div>
          <h3 className="text-lg">Marcas</h3>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox />
              <Label>Apple</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox />
              <Label>Samsung</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox />
              <Label>Lenovo</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox />
              <Label>ASUS</Label>
            </div>
          </div>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}