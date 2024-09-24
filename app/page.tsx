import Pic from "@/components/Pic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Vconsole from "@/components/Vconsole";

export default function Home() {
  return (
    <>
      <Vconsole />
      <div className="flex-1">
        <Pic />
      </div>
      <Footer />
    </>
  );
}
