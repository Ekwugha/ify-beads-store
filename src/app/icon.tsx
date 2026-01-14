import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #683726 0%, #9c4a2c 100%)",
          borderRadius: "6px",
        }}
      >
        {/* Stylized "I" with bead dots */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2px",
          }}
        >
          {/* Top bead */}
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#D4AF37",
              boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
            }}
          />
          {/* Middle beads - main letter body */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#FAF7F2",
              }}
            />
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#FAF7F2",
              }}
            />
          </div>
          {/* Bottom bead */}
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#D4AF37",
              boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

