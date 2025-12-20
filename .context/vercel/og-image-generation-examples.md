--------------------------------------------------------------------------------
title: "OG Image Generation Examples"
description: "Learn how to use the @vercel/og library with examples."
last_updated: "2025-12-20T01:45:32.460Z"
source: "https://vercel.com/docs/og-image-generation/examples"
---

---

# OG Image Generation Examples

## Dynamic title

Create an api route with `route.tsx` in `/app/api/og/` and paste the following code:

```ts
import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // ?title=<title>
    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'My default title';

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: 'black',
            backgroundSize: '150px 150px',
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              justifyItems: 'center',
            }}
          >
            <img
              alt="Vercel"
              height={200}
              src="data:image/svg+xml,%3Csvg width='116' height='100' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M57.5 0L115 100H0L57.5 0z' /%3E%3C/svg%3E"
              style={{ margin: '0 30px' }}
              width={232}
            />
          </div>
          <div
            style={{
              fontSize: 60,
              fontStyle: 'normal',
              letterSpacing: '-0.025em',
              color: 'white',
              marginTop: 30,
              padding: '0 120px',
              lineHeight: 1.4,
              whiteSpace: 'pre-wrap',
            }}
          >
            {title}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
```

## Dynamic external image

Create an api route with `route.tsx` in `/app/api/og/` and paste the following code:

```ts
import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  if (!username) {
    return new ImageResponse(<>Visit with &quot;?username=vercel&quot;</>, {
      width: 1200,
      height: 630,
    });
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 60,
          color: 'black',
          background: '#f6f6f6',
          width: '100%',
          height: '100%',
          paddingTop: 50,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          width="256"
          height="256"
          src={`https://github.com/${username}.png`}
          style={{
            borderRadius: 128,
          }}
        />
        <p>github.com/{username}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
```

## Emoji

Create an api route with `route.tsx` in `/app/api/og/` and paste the following code:

```ts
import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 100,
          color: 'black',
          background: 'white',
          width: '100%',
          height: '100%',
          padding: '50px 200px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        👋, 🌎
      </div>
    ),
    {
      width: 1200,
      height: 630,
      // Supported options: 'twemoji', 'blobmoji', 'noto', 'openmoji', 'fluent' and 'fluentFlat'
      // Default to 'twemoji'
      emoji: 'twemoji',
    },
  );
}
```

## SVG

Create an api route with `route.tsx` in `/app/api/og/` and paste the following code:

```ts
import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 40,
          color: 'black',
          background: 'white',
          width: '100%',
          height: '100%',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <svg fill="black" viewBox="0 0 284 65">
          <path d="M141.68 16.25c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zm117.14-14.5c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zm-39.03 3.5c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9v-46h9zM37.59.25l36.95 64H.64l36.95-64zm92.38 5l-27.71 48-27.71-48h10.39l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10v14.8h-9v-34h9v9.2c0-5.08 5.91-9.2 13.2-9.2z" />
        </svg>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
```

## Custom font

Create an api route with `route.tsx` in `/app/api/og/` and paste the following code:

```ts
import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.

async function loadGoogleFont (font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (resource) {
    const response = await fetch(resource[1])
    if (response.status == 200) {
      return await response.arrayBuffer()
    }
  }

  throw new Error('failed to load font data')
}

export async function GET() {
  const text = 'Hello world!'

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: 'white',
          height: '100%',
          width: '100%',
          fontSize: 100,
          fontFamily: 'Geist',
          paddingTop: '100px',
          paddingLeft: '50px',
        }}
      >
        {text}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Geist',
          data: await loadGoogleFont('Geist', text),
          style: 'normal',
        },
      ],
    },
  );
}
```

## Tailwind CSS

Create an api route with `route.tsx` in `/app/api/og/` and paste the following code:

```ts
import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.

export async function GET() {
  return new ImageResponse(
    (
      // Modified based on https://tailwindui.com/components/marketing/sections/cta-sections
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <div tw="bg-gray-50 flex">
          <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
            <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
              <span>Ready to dive in?</span>
              <span tw="text-indigo-600">Start your free trial today.</span>
            </h2>
            <div tw="mt-8 flex md:mt-0">
              <div tw="flex rounded-md shadow">
                <a
                  href="#"
                  tw="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white"
                >
                  Get started
                </a>
              </div>
              <div tw="ml-3 flex rounded-md shadow">
                <a
                  href="#"
                  tw="flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
```

## Internationalization

Create an api route with `route.tsx` in `/app/api/og/` and paste the following code:

```ts
import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: 'black',
          background: 'white',
          width: '100%',
          height: '100%',
          padding: '50px 200px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        👋 Hello 你好 नमस्ते こんにちは สวัสดีค่ะ 안녕 добрий день Hallá
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
```

## Secure URL

```ts
import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.

const key = crypto.subtle.importKey(
  'raw',
  new TextEncoder().encode('my_secret'),
  { name: 'HMAC', hash: { name: 'SHA-256' } },
  false,
  ['sign'],
);

function toHex(arrayBuffer: ArrayBuffer) {
  return Array.prototype.map
    .call(new Uint8Array(arrayBuffer), (n) => n.toString(16).padStart(2, '0'))
    .join('');
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get('id');
  const token = searchParams.get('token');

  const verifyToken = toHex(
    await crypto.subtle.sign(
      'HMAC',
      await key,
      new TextEncoder().encode(JSON.stringify({ id })),
    ),
  );

  if (token !== verifyToken) {
    return new Response('Invalid token.', { status: 401 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 40,
          color: 'black',
          background: 'white',
          width: '100%',
          height: '100%',
          padding: '50px 200px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1>Card generated, id={id}.</h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
```

Create the dynamic route `[id]/page` under `/app/encrypted` and paste the following code:

```ts
// This page generates the token to prevent generating OG images with random parameters (`id`).
import { createHmac } from 'node:crypto';

function getToken(id: string): string {
  const hmac = createHmac('sha256', 'my_secret');
  hmac.update(JSON.stringify({ id: id }));
  const token = hmac.digest('hex');
  return token;
}

interface PageParams {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageParams) {
  console.log(params);
  const { id } = params;
  const token = getToken(id);

  return (
    <div>
      <h1>Encrypted Open Graph Image.</h1>
      <p>Only /a, /b, /c with correct tokens are accessible:</p>
      <a
        href={`/api/encrypted?id=${id}&token=${token}`}
        target="_blank"
        rel="noreferrer"
      >
        <code>
          /api/encrypted?id={id}&token={token}
        </code>
      </a>
    </div>
  );
}
```
