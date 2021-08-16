export interface ApiResponse {
  success: boolean;
  data: any;
  error_code?: string;
  error_message?: string;
}