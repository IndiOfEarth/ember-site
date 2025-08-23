import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="py-10 border-t border-white/5">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-neutral-400">
        <p>© {new Date().getFullYear()} ember. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#vision" className="hover:text-white">
            Vision
          </a>
          <a href="#features" className="hover:text-white">
            Services
          </a>
          <a href="#process" className="hover:text-white">
            Process
          </a>
          <a href="#contact" className="hover:text-white">
            Contact
          </a>
        </div>
      </Container>
    </footer>
  );
}
