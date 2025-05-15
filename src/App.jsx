import Footer from "./Footer";
import Header from "./Header";
import HeroSection from "./HeroSection";
import TaskBoard from "./Task/TaskBoard";

export default function App() {
  return (
    <>
      <Header />
      <div className="w-11/12 mx-auto flex flex-col items-center justify-center">
        <HeroSection />
        <TaskBoard />
      </div>
      <Footer />
    </>
  );
}
