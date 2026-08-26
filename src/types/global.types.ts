export type TResponseCode =
  | "SUCCESS"
  | "VALIDATION_ERR"
  | "INTERNAL SERVER ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT FOUND";

export type TImage = {
  path: string;
  public_id: string;
};
