import Navbar from "@/components/nav/Navbar";
import Hero from "@/components/sections/Hero";
import Vision from "@/components/sections/Vision";
import Features from "@/components/sections/Features";
import SectionBreak from "@/components/sections/SectionBreak";
import Process from "@/components/sections/Process";
import ProductsPackages from "@/components/sections/ProductsPackages";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Vision />
      <Features />
      <SectionBreak />
      <Process />
      <ProductsPackages />
      <Contact />
      <Footer />
    </main>
  );
}

// export default function Page() {
//   return (
//     <main className="min-h-screen grid place-items-center">
//       <div className="text-center">
//         <h1 className="text-5xl font-semibold">
//           <span className="bg-clip-text text-transparent bg-gradient-to-r from-ember-500 to-ember-300">
//             powered by ember.
//           </span>
//         </h1>
//         <p className="mt-3 text-neutral-400">If this is styled, you’re good.</p>
//       </div>
//     </main>
//   );
// }
