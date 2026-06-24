import { redirect } from "next/navigation";

// Paint correction is now folded into the Ceramic Coating service page,
// since the two are sold together and Serghei's pricing model (which we
// match) doesn't differentiate. 308 redirect preserves any inbound links
// or search-indexed URLs.
export default function PaintCorrectionRedirect() {
  redirect("/services/ceramic-coating");
}
