import { useEffect } from "react";

export default function InstagramReel({ permalink }) {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, []);

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={permalink}
      data-instgrm-version="14"
      style={{ width: "100%", maxWidth: "540px", margin: "0" }}
    />
  );
}
