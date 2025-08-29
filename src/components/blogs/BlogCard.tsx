import { PostData } from '@/lib/posts';

export const BlogCard = (props: { post: PostData; onClick?: (post: PostData) => void }) => {
  const { post, onClick } = props;

  const { title, date, tags, abstract, author } = post;

  return (
    <article
      className="post-card bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl metric-card cursor-pointer hover:shadow-md"
      onClick={() => onClick?.(post)}
    >
      <img
        src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop"
        className="w-full h-48 object-cover rounded-2xl mb-4"
        alt={title}
      />
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag) => {
          return (
            <span key={tag} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
              {tag}
            </span>
          );
        })}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">{title}</h3>
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{abstract}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {author.toUpperCase().slice(0, 1)}
          </div>
          <span className="text-sm font-bold text-gray-700">{author}</span>
        </div>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
    </article>
  );
};
