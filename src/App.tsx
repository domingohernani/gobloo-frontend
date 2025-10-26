import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle />
      <section className="h-screen flex items-center justify-center">
        <Button variant={"outline"}>Record</Button>
      </section>
    </ThemeProvider>
  );
}

export default App;
