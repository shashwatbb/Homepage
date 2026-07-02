import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BuyersMegaMenu } from "./components/BuyersMegaMenu";
import "./index.css";

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <div className="min-h-dvh bg-ds-warm-neutral-50 p-8 font-sans antialiased">
        <BuyersMegaMenu />
      </div>
    </StrictMode>
  );
}
