import { BrandMark } from '@/app/[locale]/opengraph/brand-mark';

interface ImageContentProps {
  brandTitle: string;
  title: string;
  description: string;
  address: string;
  titleFontSize: number;
}

export default function ImageContent({
  brandTitle,
  title,
  description,
  address,
  titleFontSize,
}: ImageContentProps) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        padding: '50px 64px 44px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '22px',
        }}
      >
        <BrandMark />

        <div
          style={{
            display: 'flex',
            maxWidth: '480px',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: '21px',
              fontWeight: 700,
              lineHeight: 1.2,
              color: 'rgba(255,255,255,0.94)',
            }}
          >
            {brandTitle}
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: '6px',
              alignItems: 'center',
              gap: '9px',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.58)',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '8px',
                height: '8px',
                borderRadius: '999px',
                background: '#ef4444',
              }}
            />

            {address}
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          maxWidth: '780px',
          marginTop: '62px',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '72px',
            height: '7px',
            marginBottom: '24px',
            borderRadius: '999px',
            background: '#ef4444',
          }}
        />

        <div
          style={{
            display: 'flex',
            paddingLeft: '24px',
            borderLeft: '7px solid #ef4444',
            fontSize: `${titleFontSize}px`,
            fontWeight: 900,
            lineHeight: 1.06,
            letterSpacing: '-0.045em',
            color: '#ffffff',
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: 'flex',
            maxWidth: '690px',
            marginTop: '24px',
            fontSize: '23px',
            fontWeight: 500,
            lineHeight: 1.42,
            color: 'rgba(255,255,255,0.78)',
          }}
        >
          {description}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          marginTop: 'auto',
          alignItems: 'center',
          gap: '14px',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '58px',
            height: '4px',
            background: '#ef4444',
          }}
        />
        <div
          style={{
            display: 'flex',
            width: '25px',
            height: '4px',
            background: 'rgba(255,255,255,0.7)',
          }}
        />
        <div
          style={{
            display: 'flex',
            width: '12px',
            height: '4px',
            background: 'rgba(255,255,255,0.35)',
          }}
        />
      </div>
    </div>
  );
}
