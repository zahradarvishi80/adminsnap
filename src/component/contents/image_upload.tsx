import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Content } from "@taban/api";
import { useAppSelector, User } from "@taban/redux-config";
import { ReactComponent as PdfImage } from "@taban/assets/pdf.svg";
import { ReactComponent as AudioImage } from "../../assets/audio.svg";

import "./style.scss";

export const ImageUpload: FC<{
    imageFile: File;
    getDataFromServer: Function;
}> = ({ imageFile, getDataFromServer }) => {
    const [preview, setPreview] = useState<string>("");
    const [uploadLoader, setUploadLoader] = useState(true);
    const [uploadSending, setUploadSending] = useState(false);

    const { t } = useTranslation("content");

    const user = useAppSelector(User.selectUser);

    useEffect(() => {
        createPreviews();
        uploadToApi();
    }, []);

    const createPreviews = () => {
        if (!imageFile) {
            setPreview("");
            return;
        }
        const objectUrl = URL.createObjectURL(imageFile);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    };

    const uploadToApi = () => {
        if (!uploadSending) {
            setUploadSending(true);
            Content.Create(user, imageFile).then((data) => {
                getDataFromServer(data);
                setUploadLoader(false);
            });
        }
    };

    return (
        <div className="col-1 m-1 position-relative">
            {uploadLoader && (
                <div className="w-100 h-100 position-absolute text-white contents-upload-image d-flex justify-content-center align-items-center">
                    <small>{t("Uploading")}</small>
                </div>
            )}
            {imageFile.type == "application/pdf" ? (
                <div className=" col-12">
                    <PdfImage />
                </div>
            ) : imageFile.type == "audio/mp3" ? (
                <AudioImage />
            ) : (
                <img className="p-1 col-12" src={preview} />
            )}
        </div>
    );
};
