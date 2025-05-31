export function AppFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-muted-foreground">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Yuma Hearth. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Baked with love in Yuma, Arizona.
        </p>
      </div>
    </footer>
  );
}
