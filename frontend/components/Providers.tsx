"use client"; // 🔴 Read Quote below

import { Provider } from "react-redux";
import { store } from "@/redux_store/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export default Providers;