export declare const uploadFileToCloudinary: (file: Express.Multer.File, dir?: string) => Promise<{
    path: string;
    public_id: string;
}>;
export declare const deleteFileFromCloudinary: (public_id: string) => Promise<boolean>;
//# sourceMappingURL=cloudinary.utils.d.ts.map