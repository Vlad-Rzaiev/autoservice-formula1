export default function ImageBackground() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: 'flex',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: 'flex',
          background:
            'linear-gradient(90deg, rgba(4,6,10,0.98) 0%, rgba(4,6,10,0.94) 38%, rgba(4,6,10,0.68) 66%, rgba(4,6,10,0.18) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: 'flex',
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.58) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '-180px',
          right: '125px',
          display: 'flex',
          width: '105px',
          height: '980px',
          transform: 'rotate(18deg)',
          background:
            'linear-gradient(180deg, rgba(239,68,68,0) 0%, rgba(239,68,68,0.38) 50%, rgba(239,68,68,0) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '64px',
          right: '52px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '10px',
          opacity: 0.8,
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '126px',
            height: '5px',
            background: '#ef4444',
          }}
        />
        <div
          style={{
            display: 'flex',
            width: '86px',
            height: '5px',
            background: '#ef4444',
          }}
        />
        <div
          style={{
            display: 'flex',
            width: '48px',
            height: '5px',
            background: '#ef4444',
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          right: '-20px',
          bottom: '-70px',
          display: 'flex',
          fontSize: '245px',
          fontWeight: 900,
          fontStyle: 'italic',
          letterSpacing: '-0.12em',
          color: 'rgba(255,255,255,0.07)',
        }}
      >
        F1
      </div>
    </div>
  );
}
