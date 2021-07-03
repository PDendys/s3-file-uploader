import React from 'react';
import { ChakraProvider, Container, createStandaloneToast } from "@chakra-ui/react";
import './App.css';

import Uploader from "./uploader";

function App() {
    const toast = createStandaloneToast();

    const onSuccess = () => {
        toast({
            title: "Huuurrrey!!!",
            description: "File was succesfully uploaded.",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
    }

    const config = {
        bucketName: process.env.BUCKET_NAME as string,
        // dirName: 'media', /* optional */
        region: process.env.REGION as string,
        accessKeyId: process.env.ACCESS_KEY_ID as string,
        secretAccessKey: process.env.SECRET_ACCESS_KEY as string,
        // s3Url: 'https:/your-custom-s3-url.com/', /* optional */
    };

    return (
        <ChakraProvider>
            <div className="App">
                <Container>
                    <Uploader
                        config={config}
                        btnLabel="Upload to S3"
                        onSuccess={onSuccess}
                    />
                </Container>
            </div>
        </ChakraProvider>
  );
}

export default App;
