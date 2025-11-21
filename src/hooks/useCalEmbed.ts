import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export function useCalEmbed() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "discovery-call-initial" });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { "cal-brand": "#c75a3a" },
        } as Record<string, Record<string, string>>,
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);
}
