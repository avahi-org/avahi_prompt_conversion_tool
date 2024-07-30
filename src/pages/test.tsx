/* eslint-disable jsx-a11y/alt-text */
import {
  Document,
  Image,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

import { gptExamples } from '@/utils/constant';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    padding: '10 15px 10 15px',
  },
});

const App = () => {
  const [isClient, setIsClient] = useState(false);

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
          }}
        >
          <Text>Select a GPT example to convert:</Text>
          <Image
            style={{
              height: '20px',
              width: '20px',
            }}
            src={'./images/quationMarkImage.png'}
          />
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            marginTop: '20px',
          }}
        >
          {gptExamples?.map(({ image, label }, index) => (
            <View
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                width: '20%',
                border: '1px solid #D8E6FF',
                padding: '10px',
                borderRadius: '6px',
              }}
            >
              <Image
                src={image}
                style={{
                  height: '15px',
                  width: '15px',
                }}
              />
              <Text
                style={{
                  fontSize: '10px',
                  fontWeight: 'medium',
                }}
              >
                {label}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div>
      <h1>My PDF Document</h1>
      <PDFViewer className="h-[600px] w-full">
        <MyDocument />
      </PDFViewer>
      <PDFDownloadLink document={<MyDocument />} fileName="my-document.pdf">
        {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
      </PDFDownloadLink>
    </div>
  );
};

export default App;
