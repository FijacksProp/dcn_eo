import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import { MemorialContentProvider } from "./contexts/MemorialContentContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Biography from "./pages/Biography";
import FamilyMessage from "./pages/FamilyMessage";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Legacy from "./pages/Legacy";
import ServiceDetails from "./pages/ServiceDetails";
import Tributes from "./pages/Tributes";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/biography"} component={Biography} />
      <Route path={"/tributes"} component={Tributes} />
      <Route path={"/gallery"} component={Gallery} />
      <Route path={"/service-details"} component={ServiceDetails} />
      <Route path={"/legacy"} component={Legacy} />
      <Route path={"/family-message"} component={FamilyMessage} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <MemorialContentProvider>
          <TooltipProvider>
            <Toaster />
            <Layout>
              <Router />
            </Layout>
          </TooltipProvider>
        </MemorialContentProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
