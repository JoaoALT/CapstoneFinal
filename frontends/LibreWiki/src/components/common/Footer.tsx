import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center gap-2">
            <Logo className="h-6 w-auto text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} LibreWiki. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
