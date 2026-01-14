import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Ify Beads - Handcrafted Bead Bags";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #683726 0%, #9c4a2c 40%, #683726 100%)",
          position: "relative",
        }}
      >
        {/* Decorative bead pattern - top left */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "40px",
            display: "flex",
            gap: "12px",
          }}
        >
          {[28, 22, 18].map((size, i) => (
            <div
              key={i}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: "50%",
                background: "#D4AF37",
                opacity: 0.6,
              }}
            />
          ))}
        </div>

        {/* Decorative bead pattern - bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "40px",
            display: "flex",
            gap: "12px",
          }}
        >
          {[18, 22, 28].map((size, i) => (
            <div
              key={i}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: "50%",
                background: "#D4AF37",
                opacity: 0.6,
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          {/* Logo beads */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#D4AF37",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
            />
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "#FAF7F2",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            />
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#D4AF37",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
            />
          </div>

          {/* Brand name */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "#FAF7F2",
              letterSpacing: "-2px",
              fontFamily: "serif",
            }}
          >
            Ify Beads
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: "28px",
              color: "#D4AF37",
              fontWeight: 500,
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            Handcrafted Bead Bags
          </div>

          {/* Decorative line */}
          <div
            style={{
              width: "120px",
              height: "3px",
              background: "#D4AF37",
              borderRadius: "2px",
              marginTop: "8px",
            }}
          />

          {/* Subtitle */}
          <div
            style={{
              fontSize: "22px",
              color: "#f3d9cc",
              marginTop: "16px",
              textAlign: "center",
              maxWidth: "600px",
            }}
          >
            Each piece is unique and tells a story
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

