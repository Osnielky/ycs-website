import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? 'Your Cosmetic Surgery & SPA';

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0d1b3e',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#c9a46e' }} />
        <div
          style={{
            color: '#c9a46e',
            fontSize: 20,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: 32,
            fontFamily: 'serif',
          }}
        >
          Your Cosmetic Surgery & SPA
        </div>
        <div
          style={{
            color: 'white',
            fontSize: title.length > 35 ? 50 : 64,
            fontWeight: 300,
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.15,
            fontFamily: 'serif',
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: 20,
            marginTop: 40,
            letterSpacing: '0.15em',
          }}
        >
          Hialeah · Miami · South Florida
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: '#c9a46e' }} />
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            right: 60,
            color: 'rgba(255,255,255,0.25)',
            fontSize: 16,
          }}
        >
          ycosmeticsurgery.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
