export interface ModificationNote {
  modified_on: Date;
  modified_by: String;
  modification_note: String;
}

export const ModificationNote = {
  modified_on: Date,
  modified_by: String,
  modification_note: String
};

export enum response_status_codes  {
  success = 200,
  bad_request = 400,
  unauthorized = 401,
  not_found = 404,
  internal_server_error = 500
}
