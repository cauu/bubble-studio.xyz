// file: koios.api.ts

import axios, { AxiosInstance } from 'axios';
// 从类型定义文件中导入类型
import { PoolDelegatorsResponse, PoolInfoResponse, PoolStakeSnapshotResponse } from '../types/koios.types';

// 1. 创建一个可重用的 axios 实例
// 这样做的好处是可以集中管理基础 URL、超时时间和请求头等配置
const koiosApi: AxiosInstance = axios.create({
  baseURL: 'https://api.koios.rest/api/v1',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json'
  }
});

/**
 * @description 根据权益池 Bech32 ID 列表获取详细信息
 * @param {string[]} poolIds - 一个包含权益池 Bech32 ID 的数组
 * @returns {Promise<PoolInfoResponse>} - 返回一个解析为权益池信息数组的 Promise
 * @throws 如果 API 请求失败，将抛出错误
 */
export const getPoolInfo = async (poolIds: string[]): Promise<PoolInfoResponse> => {
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
    console.error('Failed to fetch pool info from Koios API:');
    // 增强错误处理，检查是否是 axios 错误以获取更多信息
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Data: ${JSON.stringify(error.response.data)}`);
    } else {
      console.error(error);
    }
    // 将错误向上抛出，以便调用者可以处理
    throw new Error('Koios API request failed.');
  }
};

/**
 * @description 获取给定权益池的纪元质押快照信息 (Mark, Set, Go)
 * @param {string} poolBech32 - 目标权益池的 Bech32 ID
 * @returns {Promise<PoolStakeSnapshotResponse>} - 返回一个解析为权益快照信息数组的 Promise
 * @throws 如果 API 请求失败，将抛出错误
 */
export const getPoolStakeSnapshot = async (poolBech32: string): Promise<PoolStakeSnapshotResponse> => {
  try {
    // 对于 GET 请求, 使用 `params` 对象来传递 URL 查询参数
    const response = await koiosApi.get<PoolStakeSnapshotResponse>('/pool_stake_snapshot', {
      params: {
        _pool_bech32: poolBech32
      }
    });

    return response.data;
  } catch (error) {
    console.error(`Failed to fetch stake snapshot for pool ${poolBech32}:`);
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Data: ${JSON.stringify(error.response.data)}`);
    } else {
      console.error(error);
    }
    throw new Error('Koios API request for pool stake snapshot failed.');
  }
};

/**
 * @description 获取指定权益池的所有委托人列表。
 * @param {string} poolBech32 - 目标权益池的 Bech32 ID.
 * @returns {Promise<PoolDelegatorsResponse>} - 返回一个解析为委托人信息数组的 Promise.
 * @throws 如果 API 请求失败，将抛出错误.
 */
export const getPoolDelegators = async (poolBech32: string): Promise<PoolDelegatorsResponse> => {
  try {
    const response = await koiosApi.get<PoolDelegatorsResponse>('/pool_delegators', {
      params: {
        _pool_bech32: poolBech32
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch delegators for pool ${poolBech32}:`);
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Data: ${JSON.stringify(error.response.data)}`);
    } else {
      console.error(error);
    }
    throw new Error('Koios API request for pool delegators failed.');
  }
};
