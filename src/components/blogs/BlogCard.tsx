import { PostData } from '@/lib/posts';

export const BlogCard = (props: { post: PostData; onClick?: (post: PostData) => void }) => {
  const { post, onClick } = props;

  const { title, date, tags, abstract, author } = post;

  // 移动端只显示前2个tags
  const displayTags = tags.slice(0, 4);
  const hasMoreTags = tags.length > 4;

  return (
    <article
      className="post-card flex flex-col justify-between bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-3 md:p-6 shadow-lg md:shadow-xl metric-card cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick?.(post)}
    >
      <div className="flex flex-col flex-1">
        <img
          src={post.image}
          className="w-full h-32 md:h-48 object-cover rounded-xl md:rounded-2xl mb-2 md:mb-4"
          alt={title}
        />
        <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-3">
          {displayTags.map((tag) => (
            <span
              key={tag}
              className="bg-green-100 text-green-800 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium md:font-bold"
            >
              {tag}
            </span>
          ))}
          {hasMoreTags && (
            <span className="bg-gray-100 text-gray-600 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium">
              +{tags.length - 2}
            </span>
          )}
        </div>
        <h3 className="text-base md:text-xl font-bold text-gray-800 mb-1 md:mb-2 leading-tight line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-4 leading-relaxed flex-1 line-clamp-2 md:line-clamp-3">
          {abstract}
        </p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="flex items-center space-x-1.5 md:space-x-2">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-[10px] md:text-xs font-bold">
            {author.toUpperCase().slice(0, 1)}
          </div>
          <span className="text-xs md:text-sm font-medium md:font-bold text-gray-700">{author}</span>
        </div>
        <span className="text-[10px] md:text-sm text-gray-500">{date}</span>
      </div>
    </article>
  );
};
