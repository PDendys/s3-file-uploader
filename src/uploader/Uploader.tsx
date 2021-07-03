import React from 'react';
import S3 from 'react-aws-s3';

// components
import { Button } from '@chakra-ui/react';
import Input from './subcomponents/Input';

// types
import { IUploaderConfig } from './types';

type Props = {
    readonly config: IUploaderConfig;
    readonly btnLabel: string;
    readonly btnLoadingText?: string;
    readonly onSuccess?: () => void;
    readonly onError?: (e: Error) => void;
}

const Uploader: React.FC<Props> = ({ config, btnLabel, btnLoadingText = 'Uploading...', onSuccess, onError }: Props) => {
    const [file, setFile] = React.useState<null | any>(null);

    const [isProcessing, setIsProcessing] = React.useState<boolean>(false);

    const ReactS3Client = new S3(config);

    const handleUploadBtnClick = async (): Promise<void> => {
        try {
            setIsProcessing(true);
            const { name } = file;
            await ReactS3Client.uploadFile(file, name);
            if (onSuccess) {
                onSuccess();
            }
        } catch (e) {
            if (onError) {
                onError(e)
            }
            throw new Error(e);
        } finally {
            setIsProcessing(false);
        }
    }

    return (
        <div style={{ margin: '35px 0', display: 'flex', justifyContent: 'space-between' }}>
            <Input onChange={(file) => setFile(file)} />
            <Button
                onClick={handleUploadBtnClick}
                isLoading={isProcessing}
                loadingText={btnLoadingText}
                colorScheme="teal"
                variant="outline"
            >
                { btnLabel }
            </Button>
        </div>
    );
}

export default Uploader;
