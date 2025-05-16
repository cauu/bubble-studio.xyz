import React, { useEffect, useRef } from 'react';
import styles from './BubbleBackground.module.css';

interface BubbleBackgroundProps {
  count?: number; // 气泡数量
  minSize?: number; // 最小气泡尺寸(px)
  maxSize?: number; // 最大气泡尺寸(px)
  minDuration?: number; // 最小上升时间(秒)
  maxDuration?: number; // 最大上升时间(秒)
  swayDuration?: number; // 摇摆动画时间(秒)
  glassEffect?: boolean; // 是否启用玻璃效果
  zIndex?: number; // z-index值
  className?: string; // 额外的CSS类名
}

const BubbleBackground: React.FC<BubbleBackgroundProps> = ({
  count = 30,
  minSize = 20,
  maxSize = 80,
  minDuration = 15,
  maxDuration = 30,
  swayDuration = 6,
  glassEffect = true,
  zIndex = -1,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 清除现有的气泡
    container.innerHTML = '';

    // 创建气泡
    for (let i = 0; i < count; i++) {
      const bubble = document.createElement('div');
      bubble.className = styles.bubble;

      // 随机大小
      const size = Math.random() * (maxSize - minSize) + minSize;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;

      // 随机水平位置
      bubble.style.left = `${Math.random() * 100}%`;

      // 提高透明度，让气泡更明显
      const opacity = Math.random() * 0.5 + 0.2; // 0.2 - 0.7
      bubble.style.opacity = opacity.toString();

      // 随机上升时间
      const riseDuration = Math.random() * (maxDuration - minDuration) + minDuration;

      // 增加摇摆幅度和旋转角度
      const swayX = Math.random() * 70 + 20; // 20-90px
      const rotate = Math.random() * 15 + 5; // 5-20deg

      // 设置CSS变量
      bubble.style.setProperty('--sway-x', `${swayX}px`);
      bubble.style.setProperty('--rotate', `${rotate}deg`);

      // 设置动画
      bubble.style.animationDuration = `${riseDuration}s, ${swayDuration}s`;

      // 随机动画延迟
      const delay = Math.random() * 10;
      bubble.style.animationDelay = `${delay}s, ${delay}s`;

      // 添加边框效果，增强气泡可见性
      bubble.style.border = '1px solid rgba(255, 255, 255, 0.3)';

      // 添加阴影效果
      bubble.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.2)';

      // 玻璃效果
      if (glassEffect) {
        // 随机光泽位置
        const glareX = Math.random() * 80 + 10; // 10-90%
        const glareY = Math.random() * 80 + 10; // 10-90%

        // 添加第二个高光点，模拟阳光反射
        const secondGlareX = Math.random() * 80 + 10; // 10-90%
        const secondGlareY = Math.random() * 80 + 10; // 10-90%

        // 随机高光大小
        const glareSize = Math.random() * 30 + 10; // 10-40%
        const secondGlareSize = Math.random() * 20 + 5; // 5-25%

        bubble.style.background = `
          radial-gradient(
            circle at ${glareX}% ${glareY}%, 
            rgba(255, 255, 255, 0.8) 0%, 
            rgba(255, 255, 255, 0.5) ${glareSize}%, 
            rgba(255, 255, 255, 0.2) ${glareSize * 2}%,
            rgba(255, 255, 255, 0) ${glareSize * 3}%
          ),
          radial-gradient(
            circle at ${secondGlareX}% ${secondGlareY}%, 
            rgba(255, 255, 255, 0.6) 0%, 
            rgba(255, 255, 255, 0.3) ${secondGlareSize}%, 
            rgba(255, 255, 255, 0.1) ${secondGlareSize * 2}%,
            rgba(255, 255, 255, 0) ${secondGlareSize * 3}%
          ),
          linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.2) 0%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0.05) 100%
          ),
          rgba(255, 255, 255, 0.15)
        `;

        // 添加彩虹色散效果（模拟光线折射）
        bubble.style.boxShadow = `
          0 0 10px rgba(255, 255, 255, 0.3),
          inset 2px 2px 4px rgba(255, 255, 255, 0.4),
          inset -2px -2px 4px rgba(255, 255, 255, 0.1)
        `;
      }

      container.appendChild(bubble);
    }
  }, [count, minSize, maxSize, minDuration, maxDuration, swayDuration, glassEffect]);

  return <div ref={containerRef} className={`${styles.container} ${className}`} style={{ zIndex }} />;
};

export default BubbleBackground;
