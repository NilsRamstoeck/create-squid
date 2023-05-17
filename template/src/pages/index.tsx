import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Document } from '@/components/Document';
import { Head } from '@/components/Head';

export default function App() {
  const [count, setCount] = useState<number>(0);

  console.log(1);

  return <>
    <Document>
      <Head>
        <title>My first Squid!</title>
      </Head>
      <div>Hello World {count}</div>
      <button onClick={() => setCount(count + 1)}>Count</button>
    </Document>
  </>;

}
