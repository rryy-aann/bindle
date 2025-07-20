import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/auth";
import AddListingForm from "@/components/seller/AddListingForm";

export default async function CreateListingPage() {
  const user = await getAuthUser();

  if (!user) {
    redirect("/auth/login"); // Not logged in
  }

  // Construct absolute URL for SSR fetch
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/sellers/${user.userId}`, {
    cache: "no-store",
  });

  const sellerInfo = res.ok ? await res.json() : null;

  if (!sellerInfo?.isSeller) {
    redirect("/"); // Kick out non-sellers
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create a New Listing</h1>
      <AddListingForm />
    </main>
  );
}

