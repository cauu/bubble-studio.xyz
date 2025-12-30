// file: koios.api.ts

import axios, { AxiosInstance } from 'axios';
// 从类型定义文件中导入类型
import { PoolDelegatorsResponse, PoolInfoResponse, PoolStakeSnapshotResponse } from '../types/koios.types';

const KOIOS_API_TOKEN = process.env.KOIOS_API_TOKEN;

// 1. 创建一个可重用的 axios 实例
// 这样做的好处是可以集中管理基础 URL、超时时间和请求头等配置
const koiosApi: AxiosInstance = axios.create({
  baseURL: 'https://api.koios.rest/api/v1',
  timeout: 5000, // 5秒超时
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: `Bearer ${KOIOS_API_TOKEN}`
  }
});

/**
 * @description 根据权益池 Bech32 ID 列表获取详细信息
 * @param {string[]} poolIds - 一个包含权益池 Bech32 ID 的数组
 * @returns {Promise<PoolInfoResponse | null>} - 返回一个解析为权益池信息数组的 Promise，超时或错误时返回 null
 */
export const getPoolInfo = async (poolIds: string[]): Promise<PoolInfoResponse | null> => {
  // 构造请求体
  const requestBody = {
    _pool_bech32_ids: poolIds
  };

  try {
    // 发送 POST 请求。通过泛型 <PoolInfoResponse> 为 axios 指定期望的响应数据类型
    const response = await koiosApi.post<PoolInfoResponse>('/pool_info', requestBody);

    // axios 返回的数据位于 response.data 属性中
    return response.data;
  } catch (error) {
    // 检查是否为超时错误
    if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
      console.error('Koios API request timed out (5s)');
      return null;
    }
    console.error('Failed to fetch pool info from Koios API:');
    // 增强错误处理，检查是否是 axios 错误以获取更多信息
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Data: ${JSON.stringify(error.response.data)}`);
    } else {
      console.error(error);
    }
    // 返回 null 而不是抛出错误
    return null;
  }
};

/**
 * @description 获取给定权益池的纪元质押快照信息 (Mark, Set, Go)
 * @param {string} poolBech32 - 目标权益池的 Bech32 ID
 * @returns {Promise<PoolStakeSnapshotResponse | null>} - 返回一个解析为权益快照信息数组的 Promise，超时或错误时返回 null
 */
export const getPoolStakeSnapshot = async (poolBech32: string): Promise<PoolStakeSnapshotResponse | null> => {
  try {
    // 对于 GET 请求, 使用 `params` 对象来传递 URL 查询参数
    const response = await koiosApi.get<PoolStakeSnapshotResponse>('/pool_stake_snapshot', {
      params: {
        _pool_bech32: poolBech32
      }
    });

    return response.data;
  } catch (error) {
    // 检查是否为超时错误
    if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
      console.error(`Koios API request timed out (5s) for pool ${poolBech32}`);
      return null;
    }
    console.error(`Failed to fetch stake snapshot for pool ${poolBech32}:`);
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Data: ${JSON.stringify(error.response.data)}`);
    } else {
      console.error(error);
    }
    return null;
  }
};

/**
 * @description 获取指定权益池的所有委托人列表。
 * @param {string} poolBech32 - 目标权益池的 Bech32 ID.
 * @returns {Promise<PoolDelegatorsResponse | null>} - 返回一个解析为委托人信息数组的 Promise，超时或错误时返回 null.
 */
export const getPoolDelegators = async (poolBech32: string): Promise<PoolDelegatorsResponse | null> => {
  try {
    const response = await koiosApi.get<PoolDelegatorsResponse>('/pool_delegators', {
      params: {
        _pool_bech32: poolBech32
      }
    });
    return response.data;
  } catch (error) {
    // 检查是否为超时错误
    if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
      console.error(`Koios API request timed out (5s) for pool delegators ${poolBech32}`);
      return null;
    }
    console.error(`Failed to fetch delegators for pool ${poolBech32}:`);
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Data: ${JSON.stringify(error.response.data)}`);
    } else {
      console.error(error);
    }
    return null;
  }
};
