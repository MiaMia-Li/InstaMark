import Pic from "@/components/Pic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen space-y-4 flex flex-col py-6 px-8 sm:pl-20 sm:px-12 sm:py-10">
      <div>
        <Header />
      </div>
      <div className="flex-1">
        <Pic />
      </div>
      <Footer />
    </div>
  );
}
