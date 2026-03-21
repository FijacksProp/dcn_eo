import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Biography from "./pages/Biography";
import Tributes from "./pages/Tributes";
import Gallery from "./pages/Gallery";
import ServiceDetails from "./pages/ServiceDetails";
import Legacy from "./pages/Legacy";
import FamilyMessage from "./pages/FamilyMessage";
import Layout from "./components/Layout";

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
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Layout>
            <Router />
          </Layout>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
