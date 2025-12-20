import Router from "./router/Router";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Toaster position="top-center" richColors={true} />
      <Router />
    </>
  )
}

export default App
