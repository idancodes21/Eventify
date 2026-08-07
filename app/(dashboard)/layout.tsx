
import Navbar from "@/components/Navbar";


export default function DashboardLayout({ children }: LayoutProps<"/">) {
  return (
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
    </body>
  );
}
