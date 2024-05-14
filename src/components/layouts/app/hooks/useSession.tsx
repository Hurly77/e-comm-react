import React from "react";

import { SessionContext } from "../context/SessionContext";

export default function useSession() {
  const ctx = React.useContext(SessionContext);
  return { ...ctx };
}
