/* eslint-disable no-console */

// PUBLIC_INTERFACE
export default function reportWebVitals(onPerfEntry) {
  /** Report Web Vitals metrics (optional). */
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals")
      .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      })
      .catch((err) => {
        console.warn("web-vitals failed to load", err);
      });
  }
}
