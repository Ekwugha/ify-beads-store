import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #683726 0%, #9c4a2c 50%, #683726 100%)",
          borderRadius: "38px",
        }}
      >
        {/* Stylized beaded pattern forming "I" */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {/* Top decorative beads row */}
          <div
            style={{
              display: "flex",
              gap: "6px",
            }}
          >
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: "#D4AF37",
                boxShadow: "0 2px 4px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)",
              }}
            />
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: "#D4AF37",
                boxShadow: "0 2px 4px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)",
              }}
            />
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: "#D4AF37",
                boxShadow: "0 2px 4px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)",
              }}
            />
          </div>

          {/* Main vertical beads - the "I" */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <div
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: "#FAF7F2",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            />
            <div
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: "#FAF7F2",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            />
            <div
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: "#FAF7F2",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            />
          </div>

          {/* Bottom decorative beads row */}
          <div
            style={{
              display: "flex",
              gap: "6px",
            }}
          >
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: "#D4AF37",
                boxShadow: "0 2px 4px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)",
              }}
            />
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: "#D4AF37",
                boxShadow: "0 2px 4px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)",
              }}
            />
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: "#D4AF37",
                boxShadow: "0 2px 4px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)",
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

