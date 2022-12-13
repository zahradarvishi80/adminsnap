import { FormikErrors } from "formik";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { Badge, Form } from "react-bootstrap";
import { ContentType } from "@taban/dto/content";
import { ImageUpload } from "@taban/component/contents/image_upload";
import { ReactComponent as PdfImage } from "@taban/assets/pdf.svg";
import { ReactComponent as AudioImage } from "../../assets/audio.svg";

export const Contents = (props: {
    formPrefix: string;
    setContents: Function;
    yupError:
        | string
        | string[]
        | FormikErrors<ContentType>[]
        | FormikErrors<ContentType>
        | undefined;
    defaultValue: ContentType[] | ContentType;
    inputValue: string;
}) => {
    const { setContents, yupError, defaultValue, inputValue, formPrefix } =
        props;

    const isSingleContent = !Array.isArray(defaultValue);

    const [selectedFile, setSelectedFile] = useState<File[]>([]);
    const [uploadImage, setUploadImage] = useState<ContentType>({
        hash: "",
        id: 0,
        link: "",
        path: "",
        status: "",
        type: "",
    });
    const [uploadImagesList, setUploadImageList] = useState<ContentType[]>([]);
    const [error, setError] = useState<string>("");

    const { t } = useTranslation("content");

    useEffect(() => {
        if (Array.isArray(defaultValue)) {
            if (defaultValue[0]?.hash.length > 0) {
                setUploadImageList(defaultValue);
            }
        } else {
            if (defaultValue.hash.length > 0) {
                setUploadImage(defaultValue);
            }
        }
    }, []);

    useEffect(() => {
        //when edit content
        if (
            uploadImagesList.length > 0 &&
            uploadImagesList[uploadImagesList.length - 1].id !=
                uploadImage.id &&
            uploadImage.link != ""
        ) {
            setUploadImageList([...uploadImagesList, uploadImage]);
        } // when create new content
        else if (uploadImagesList.length == 0 && uploadImage.link != "") {
            setUploadImageList([uploadImage]);
        }
    }, [uploadImage]);

    useEffect(() => {
        //add uploaded image to form
        if (isSingleContent) {
            setContents(uploadImagesList[0]);
        } else {
            setContents(uploadImagesList);
        }
        //when image upload select file empty
        setSelectedFile([]);
    }, [uploadImagesList]);

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        //set max size for image upload
        if (e.target.files[0].size < 2076672) {
            setError("");
            const imageFile = e.target.files[0];
            if (selectedFile.length > 0) {
                setSelectedFile([...selectedFile, imageFile]);
            } else {
                setSelectedFile([imageFile]);
            }
        } else {
            setError(t("contentSizeError"));
        }
    };

    const handleDeletedImage = (number: number) => {
        const filteredImage: ContentType[] = [];
        uploadImagesList.forEach((element: ContentType, key: number) => {
            if (key != number) {
                filteredImage.push(element);
            }
        });
        setUploadImageList(filteredImage);
    };

    return (
        <div>
            <div className="d-flex flex-column flex-wrap">
                <Form.Group className="col-12 ">
                    <Form.Label>
                        <span>{t("contents")}</span>
                    </Form.Label>
                    <Form.Control
                        id={`inputImages${formPrefix}`}
                        className="d-none"
                        aria-label="Images"
                        type="file"
                        name={`Images${formPrefix}`}
                        title=" "
                        accept={inputValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onSelectFile(e)
                        }
                        isInvalid={error != "" || !!yupError}
                        disabled={
                            isSingleContent &&
                            uploadImagesList.length === 1 &&
                            uploadImage.hash.length > 0 &&
                            true
                        }
                    ></Form.Control>

                    <div className="border border-1 rounded p-1">
                        <Form.Label
                            style={{ cursor: "pointer" }}
                            htmlFor={`inputImages${formPrefix}`}
                            className=" border border-1 bg-light rounded p-1 col-12  d-flex flex-column justify-content-center align-items-center contents-upload"
                        >
                            <div className="border rounded px-2 d-flex justify-content-center align-items-center">
                                <span>+</span>
                            </div>
                            <small>{inputValue}</small>
                        </Form.Label>

                        <div className="d-flex flex-row flex-wrap">
                            {uploadImagesList.map((content, key) =>
                                contentItem({
                                    content,
                                    key,
                                    handleDeletedImage,
                                    inputValue,
                                }),
                            )}
                            {selectedFile.map((file, key) => (
                                <ImageUpload
                                    imageFile={file}
                                    getDataFromServer={setUploadImage}
                                    key={key}
                                />
                            ))}
                        </div>
                    </div>
                    <Form.Control.Feedback type="invalid">
                        {error + yupError}
                    </Form.Control.Feedback>
                </Form.Group>
            </div>
        </div>
    );
};

const contentItem: React.FC<{
    content: ContentType;
    key: number;
    handleDeletedImage: Function;
    inputValue: string;
}> = ({ content, key, handleDeletedImage, inputValue }) => {
    return (
        <div
            key={key}
            className="position-relative bg-light col-2 d-flex align-items-center rounded m-1"
        >
            <span
                onClick={() => handleDeletedImage(key)}
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    cursor: "pointer",
                }}
            >
                <Badge pill bg="danger">
                    ×
                </Badge>
            </span>
            {inputValue == "application/pdf" ? (
                <PdfImage />
            ) : inputValue == "audio/mp3" ? (
                <AudioImage />
            ) : (
                <img className="col-12 rounded" src={content.link} />
            )}
        </div>
    );
};
