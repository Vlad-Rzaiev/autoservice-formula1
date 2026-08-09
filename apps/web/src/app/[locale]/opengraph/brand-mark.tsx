export function BrandMark() {
  return (
    <div
      style={{
        display: "flex",
        height: "58px",
        alignItems: "center",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.18)",
        borderRadius: "14px",
        background: "rgba(8,10,15,0.88)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "6px",
          height: "100%",
          background: "#ef4444",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 18px",
          fontSize: "34px",
          fontWeight: 900,
          fontStyle: "italic",
          letterSpacing: "-0.08em",
          color: "#ffffff",
        }}
      >
        F
        <span
          style={{
            marginLeft: "5px",
            color: "#ef4444",
          }}
        >
          1
        </span>
        <div
          style={{
            display: "flex",
            marginLeft: "17px",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "32px",
              height: "4px",
              borderRadius: "999px",
              background: "#ef4444",
            }}
          />
          <div
            style={{
              display: "flex",
              width: "20px",
              height: "4px",
              borderRadius: "999px",
              background: "#ef4444",
            }}
          />
        </div>
      </div>
    </div>
  );
}
