import "./App.css";
import Layout from "./components/Layout";

function App() {
  const handleNavigation = (path: string) => {
    console.log("Navigating to:", path);
    // Here you would integrate with your router (e.g., React Router)
  };

  const handleLogoClick = () => {
    console.log("Logo clicked");
  };

  const handleUserClick = () => {
    console.log("User profile clicked");
  };

  return (
    <Layout
      userName="John Doe"
      logoText="MyApp"
      userId={43}
      onNavigate={handleNavigation}
      onLogoClick={handleLogoClick}
      onUserClick={handleUserClick}
    >
      <div className="App">{/* Your content goes here */}</div>
    </Layout>
  );
}

export default App;
