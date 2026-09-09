interface IMailOption {
    to: string | string[];
    subject: string;
    html: string;
    cc?: string | string[];
    bcc?: string | string[];
    attachments?: any;
}
export declare const sendEmail: ({ to, subject, html, cc, bcc, attachments, }: IMailOption) => Promise<void>;
export {};
//# sourceMappingURL=sendEmail.utils.d.ts.map