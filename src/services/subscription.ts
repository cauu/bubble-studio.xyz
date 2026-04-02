import axios from 'axios';
import { GlobalConfig } from '@/constants';

interface VerifyRequest {
  stake_address: string;
  payload: string;
  signature: string;
  key: string;
}

interface VerifyResponse {
  token: string;
}

interface VerifyError {
  error: 'signature_invalid' | 'timestamp_expired' | 'not_delegating';
}

export async function verifyAndGetToken(params: VerifyRequest): Promise<VerifyResponse> {
  const res = await axios.post<VerifyResponse | VerifyError>(
    `${GlobalConfig.HUB_API_BASE_URL}/subscription/auth/verify`,
    params
  );

  if ('error' in res.data) {
    throw new SubscriptionError(res.data.error);
  }

  return res.data;
}

export class SubscriptionError extends Error {
  code: string;

  constructor(code: string) {
    super(code);
    this.code = code;
    this.name = 'SubscriptionError';
  }
}
