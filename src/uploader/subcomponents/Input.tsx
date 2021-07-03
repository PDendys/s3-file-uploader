import React from "react";

type Props = {
    readonly onChange: (e: any) => void;
}

const Input: React.FC<Props> = ({ onChange }: Props) => {
    const [file, setFile] = React.useState<null | any>(null);
    const inputRef = React.useRef(null);

    React.useEffect(() => {
        onChange(file);
    }, [file, onChange]);

    const handleFileInput = (e: any): void => {
        const [file] = e.target.files;
        setFile(file);
    };

    const { name } = file || {};

    const btnStyles = {
        width: '75%',
        background: '#eee',
        border: 'solid 1px #333',
        borderRadius: '3px',
    }

    return (
        <React.Fragment>
            <input
                onChange={handleFileInput}
                style={{ visibility: 'hidden', position: 'absolute' }}
                ref={inputRef}
                type="file"
            />
            {/*@ts-ignore*/}
            <button style={btnStyles} onClick={() => inputRef.current.click()}>
                <span style={{ fontWeight: 700, fontSize: '14px' }}>{ file ? name : 'Wybierz plik...' }</span>
            </button>
        </React.Fragment>
    )
}

export default Input;
