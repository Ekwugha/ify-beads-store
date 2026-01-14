import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Ifvy Beads - Handcrafted Bead Bags";

export const size = {
  width: 1200,
  height: 600,
};

export const contentType = "image/png";

export default function TwitterImage() {
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
            top: "30px",
            left: "30px",
            display: "flex",
            gap: "10px",
          }}
        >
          {[24, 18, 14].map((size, i) => (
            <div
              key={i}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: "50%",
                background: "#D4AF37",
                opacity: 0.5,
              }}
            />
          ))}
        </div>

        {/* Decorative bead pattern - bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            right: "30px",
            display: "flex",
            gap: "10px",
          }}
        >
          {[14, 18, 24].map((size, i) => (
            <div
              key={i}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: "50%",
                background: "#D4AF37",
                opacity: 0.5,
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
            gap: "20px",
          }}
        >
          {/* Logo beads */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#D4AF37",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
            />
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "#FAF7F2",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            />
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#D4AF37",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
            />
          </div>

          {/* Brand name */}
          <div
            style={{
              fontSize: "64px",
              fontWeight: 700,
              color: "#FAF7F2",
              letterSpacing: "-2px",
              fontFamily: "serif",
            }}
          >
            Ifvy Beads
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: "24px",
              color: "#D4AF37",
              fontWeight: 500,
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Handcrafted Bead Bags
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "18px",
              color: "#f3d9cc",
              marginTop: "8px",
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

