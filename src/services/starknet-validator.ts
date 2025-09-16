import axios, { AxiosInstance } from 'axios';
import { ValidatorApiResponse } from '@/types/voyager.types';

const voyagerApi: AxiosInstance = axios.create({
  baseURL: 'https://api-mainnet.upstark.net'
});

export const getValidatorInfo = async (validator: string) => {
  try {
    // 发送 POST 请求。通过泛型 <PoolInfoResponse> 为 axios 指定期望的响应数据类型
    const response = await voyagerApi.get<ValidatorApiResponse>(`/validators/address/${validator}`);

    // axios 返回的数据位于 response.data 属性中
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch pool info from Upstark API:');
    // 增强错误处理，检查是否是 axios 错误以获取更多信息
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Data: ${JSON.stringify(error.response.data)}`);
    } else {
      console.error(error);
    }
    // 将错误向上抛出，以便调用者可以处理
    throw new Error('Upstark API request failed.');
  }
};
