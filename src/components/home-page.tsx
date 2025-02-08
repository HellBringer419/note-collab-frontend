import { Button } from "@/components/ui/button"; // Assuming you have the Shadcn Button component set up
import { useNavigate } from "react-router-dom";
import ModeToggle from "./mode-toggle";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="text-gray-800">
      {/* Header/Nav */}
      <header className="py-4">
        <div className="mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          <h2 className="font-bold text-xl dark:text-white">Collab Notes</h2>
          <nav className="space-x-6">
            <a href="#home" className="hover:text-blue-300">
              Home
            </a>
            <a href="#features" className="hover:text-blue-300">
              Features
            </a>
            <a href="#about" className="hover:text-blue-300">
              About
            </a>
            <a href="#contact" className="hover:text-blue-300">
              Contact
            </a>
            <ModeToggle />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-800 dark:to-purple-900 text-white dark:text-gray-100 py-20 text-center"
      >
        <h1 className="text-4xl font-bold mb-6">
          Real-Time Collaborative Note-Taking
        </h1>
        <p className="text-lg mb-8">
          Create, edit, and share notes with your team, live and in real-time.
        </p>
        <Button
          className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white dark:text-gray-800 rounded-lg"
          onClick={() => navigate("/login")}
        >
          Get Started
        </Button>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 dark:text-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <div className="text-center p-6 border rounded-lg shadow-lg">
            <h3 className="font-semibold text-xl mb-4">
              Real-Time Collaboration
            </h3>
            <p>Collaborate instantly with your team on shared notes.</p>
          </div>
          <div className="text-center p-6 border rounded-lg shadow-lg">
            <h3 className="font-semibold text-xl mb-4">Rich Text Editing</h3>
            <p>Format your notes with rich text, images, and links.</p>
          </div>
          <div className="text-center p-6 border rounded-lg shadow-lg">
            <h3 className="font-semibold text-xl mb-4">Instant Sharing</h3>
            <p>Share your notes with a link in seconds.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-100 dark:bg-gray-600 dark:text-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6">About Us</h2>
        <p className="text-lg text-center max-w-3xl mx-auto">
          Our mission is to make collaboration easier. With real-time editing
          and sharing, your team can work together efficiently on notes and
          ideas.
        </p>
      </section>

      {/* Footer Section */}
      <footer id="contact" className="bg-blue-600 text-white dark:bg-blue-800 dark:text-gray-100 py-8 text-center">
        <p>
          Contact Us:{" "}
          <a href="mailto:contact@collaborativenotes.com" className="underline">
            contact@collaborativenotes.com
          </a>
        </p>
        <p className="mt-4">&copy; 2025 Collab Notes. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
