import dayjs from 'dayjs';

export function getDurationString(
  startDate: string | number | Date,
  endDate: string | number | Date,
  language: 'zh' | 'en' | 'tw' = 'zh'
) {
  const now = dayjs(startDate);
  const end = dayjs(endDate);
  let diff = end.diff(now, 'minute'); // 总剩余分钟数

  if (diff <= 0) return language === 'zh' ? '已结束' : language === 'tw' ? '已結束' : 'Ended';

  const days = Math.floor(diff / (60 * 24));
  diff -= days * 60 * 24;
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;

  return language === 'zh'
    ? `${days}天 ${hours.toString().padStart(2, '0')}小时 ${minutes.toString().padStart(2, '0')}分`
    : language === 'tw'
      ? `${days}天 ${hours.toString().padStart(2, '0')}小時 ${minutes.toString().padStart(2, '0')}分`
      : `${days}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m`;
}

export function numberWithCommas(value: number | string) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
