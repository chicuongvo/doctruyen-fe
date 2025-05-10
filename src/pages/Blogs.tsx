import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

type BlogPost = {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
};

type Novel = {
  id: number;
  title: string;
  image: string;
  views: string;
  completed: boolean;
  recommended: boolean;
  adult: boolean;
};

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [novels, setNovels] = useState<Novel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5; // Số lượng bài viết/trang

  useEffect(() => {
    setBlogs([
      {
        id: 1,
        title: "Why We Don't Accept AI-Generated Content",
        description: "Artificial intelligence has revolutionized many fields, from healthcare to entertainment, and yes, even storytelling. But when it comes to the art of writing, AI falls short of capturing what makes stories truly magical: the human touch. At FictionMe, we're committed to offering readers tales that resonate deeply, spark genuine emotions, and leave lasting impressions. That's why we don't accept AI-generated manuscripts. Let's dive...",
        image: "https://fictionme.net/_ipx/h_486&f_webp&q_80/https://d1januq98nfr6g.cloudfront.net/production/blog/xEmHNOK1ufwKLp12wdvz2ECQTjTiQ3MbvO9eMg6m.png",
        date: "Jan 27, 2025",
      },
      {
        id: 2,
        title: "Why Did My Book Get Rejected? Insights and Improvement Tips for Authors",
        description: "Below, we've outlined the most common reasons for rejections and practical tips to help you avoid these pitfalls. We've also included examples and resources to guide your improvement journey.",
        image: "https://fictionme.net/_ipx/h_486&f_webp&q_80/https://d1januq98nfr6g.cloudfront.net/production/blog/FOmXPX69yiim9dH0KY2PSAMEgbEv5ndYjpyBdcgE.png",
        date: "Jan 16, 2025",
      },
      {
        id: 3,
        title: "Don't Miss It: Wolves of Nightingale Coming This Week!",
        description:
          "What happens when a werewolf heiress exiled from her pack discovers her fated mate-a mysterious professor hiding his true identity-at a prestigious human university?",
        image: "https://fictionme.net/_ipx/h_486&f_webp&q_80/https://d1januq98nfr6g.cloudfront.net/production/blog/5t13IhT29dj24ypUMOMqtHpCUVPDJ8I9PrEwYIvD.webp",
        date: "Dec 02, 2024",
      },
      {
        id: 4,
        title: "Coming Soon: Wolves of Nightingale – A Dark Academia Werewolf Romance",
        description:
          "Are you ready to dive into your next shifter obsession? 'Wolves of Nightingale' is all about those dark academia vibes.",
        image: "https://fictionme.net/_ipx/h_486&f_webp&q_80/https://d1januq98nfr6g.cloudfront.net/production/blog/wWmaOtGLFUROCRXC2waNN5EsMS0UymEJbzS5zA1m.webp",
        date: "Nov 26, 2024",
      },
      {
        id: 5,
        title: "10 Best Books Like ACOTAR: Fantasy Romances That Rival Sarah J. Maas",
        description:
          "Discover 10 fantasy romances like A Court of Thorns and Roses with magical worlds, captivating love stories, and epic adventures that rival Sarah J.Maas's hit.",
        image: "https://fictionme.net/_ipx/h_486&f_webp&q_80/https://d1januq98nfr6g.cloudfront.net/production/blog/ck5M7XVT56TJZ5xHYejfz0SrJDgzodcMnMQLcEyl.webp",
        date: "Nov 20, 2024",
      },
      {
        id: 6,
        title: "Best 11 Books Like 'Verity' by Colleen Hoover To Read",
        description: "Discover 11 captivating novels like Verity by Colleen Hoover, packed with suspense, dark secrets, and unforgettable twists-perfect for fans of thrilling reads!",
        image: "https://fictionme.net/_ipx/h_486&f_webp&q_80/https://d1januq98nfr6g.cloudfront.net/production/blog/GFiqQ6TGMsW2VcWfT5bp8uKowVbRWbiA4K3HkwrU.webp",
        date: "Aug 28, 2024",
      },
      {
        id: 7,
        title: "10 Books Like 'Fourth Wing': Fantasy Lover's Guide",
        description: "Discover 10 captivating books like Fourth Wing that will whisk you into worlds of dragons, fierce battles, and epic romances.",
        image: "https://fictionme.net/_ipx/h_486&f_webp&q_80/https://d1januq98nfr6g.cloudfront.net/production/blog/xd6XM8QdBDpPBQFsu3iKmi5A7qXh1DGfbWnTRIPO.webp",
        date: "Aug 28, 2024",
      },
      {
        id: 8,
        title: "9 Books Like 'Twilight' to Read Once You've Devoured the Saga",
        description: "Explore nine captivating books like Twilight that will satisfy your craving for supernatural romance.",
        image: "https://fictionme.net/_ipx/h_486&f_webp&q_80/https://d1januq98nfr6g.cloudfront.net/production/blog/ercopjXQuewhzdqmh7KnqHr0GmK8e4lsak4iPsvY.webp",
        date: "Aug 27, 2024",
      },
      {
        id: 9,
        title: "The Best 10 Steamy Erotic Books and Novels to Read",
        description: "This article aims to present the top 10 steamy and erotic novels that tell stories of passion, power, and desire.",
        image: "https://fictionme.net/_ipx/h_486&f_webp&q_80/https://d1januq98nfr6g.cloudfront.net/production/blog/IhAGQGNMR3I5YuY2r7CKtzyP2kM4g6l5aEiLgXNI.webp",
        date: "Aug 23, 2024",
      },
      {
        id: 10,
        title: "Best 7 Book Series For Adults You Will Love to Read",
        description: "Discover the best 7 book series for adults that go beyond the ordinary. These hidden gems offer thrilling stories of love, power, and self-discovery that are guaranteed to captivate and inspire.",
        image: "https://fictionme.net/_ipx/h_486&f_webp&q_80/https://d1januq98nfr6g.cloudfront.net/production/blog/7jNsV7dgFUZ3XtVis9C86o2noShKoOEG36BxD7lP.webp",
        date: "Aug 22, 2024",
      },
    ]);

    setNovels([
      { id: 1, title: "Divided Amongst the Alpha Brothers", image: "https://fictionme.net/_ipx/f_webp&q_80&s_372x520/https://d1januq98nfr6g.cloudfront.net/production/books/195/op_erk0G4fGrkBtL8nL0gHc7UvCfCj0pcpv8n4R7u5M.jpeg", views: "4.6K", completed: false, recommended: true, adult: true },
      { id: 2, title: "Bounded by Fire", image: "https://fictionme.net/_ipx/f_webp&q_80&s_372x520/https://d1januq98nfr6g.cloudfront.net/production/books/5258/op_WSvkf3SyYbYWkiEKtJcwO0GAcMjdbZ8RkIrQ7GS4.jpeg", views: "10.0K", completed: true, recommended: true, adult: true },
      { id: 3, title: "I'm Just His Wife", image: "https://fictionme.net/_ipx/f_webp&q_80&s_372x520/https://d1januq98nfr6g.cloudfront.net/production/books/1182/op_ZFpotjHuUkdl61E4QXT7NtFlPTAi48Fti93VN9E0.jpeg", views: "3.3K", completed: true, recommended: true, adult: true },
      { id: 4, title: "Meet My Wife. Book 3", image: "https://fictionme.net/_ipx/f_webp&q_80&s_372x520/https://d1januq98nfr6g.cloudfront.net/production/books/4574/op_Zp0f5GK66bjCRisCSBCGZRtiW1tMFXbhofqwYJSR.jpeg", views: "7.8K", completed: true, recommended: true, adult: true },
      { id: 5, title: "My CEO Wife", image: "https://fictionme.net/_ipx/f_webp&q_80&s_372x520/https://d1januq98nfr6g.cloudfront.net/production/books/5/op_10b3a34ab25dd02c3fd16ca53fa3e9de.png", views: "10.1K", completed: true, recommended: true, adult: false },
      { id: 6, title: "The Carrero Heart: The Journey", image: "https://fictionme.net/_ipx/f_webp&q_80&s_372x520/https://d1januq98nfr6g.cloudfront.net/production/books/7740/op_P6FWpfEIxBVGEs02Cu8XwKjA4IHJ3PbDjmBZwEn8.jpeg", views: "3.9K", completed: true, recommended: false, adult: true }
    ]);
  }, []);

  // Xác định danh sách bài viết trên trang hiện tại
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-gray-900 text-white min-h-screen px-4 sm:px-6 md:px-12 py-6 sm:py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8">Blogs</h1>

      <div className="max-w-7xl mx-auto space-y-6">
        {currentBlogs.map((blog) => (
          <div 
            key={blog.id} 
            className="w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col sm:flex-row group hover:scale-100 sm:hover:scale-105 transition-transform duration-300"
          >
            {/* Thumbnail */}
            <div className="relative w-full sm:w-80 h-48 sm:h-56 overflow-hidden border-4 border-gray-700 rounded-md">
              <img 
                src={blog.image} 
                alt={`Cover image for ${blog.title}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <p className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                {blog.date}
              </p>
            </div>

            {/* Blog */}
            <div className="p-4 sm:p-6 flex flex-col justify-between w-full">
              <div>
                <p className="text-sm text-gray-400">By FictionMe Editors</p>
                <h2 className="text-xl sm:text-2xl font-bold line-clamp-2">{blog.title}</h2>
                <p className="text-gray-300 text-sm mt-2 line-clamp-3 sm:line-clamp-none">{blog.description}</p>
              </div>

              {/* Read Now */}
              <div className="flex justify-end mt-4">
                <Link
                  to={`/blog/${blog.id}`}
                  className="mt-2 sm:mt-4 px-4 sm:px-5 py-2 border border-purple-500 text-purple-500 font-semibold rounded-lg hover:bg-purple-600 hover:text-white transition duration-300 self-start"
                  >
                  Read Now →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Phân trang */}
      <div className="flex justify-center items-center space-x-1 sm:space-x-2 mt-8">
        <button
          className={`px-2 sm:px-3 py-1 sm:py-2 rounded-full bg-gray-700 hover:bg-gray-600 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          ←
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`px-2 sm:px-3 py-1 sm:py-2 rounded-full ${
              currentPage === index + 1 ? "bg-purple-600 text-white" : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => handlePageChange(index + 1)}
            aria-label={`Page ${index + 1}`}
          >
            {index + 1}
          </button>
        ))}

        <button
          className={`px-2 sm:px-3 py-1 sm:py-2 rounded-full bg-gray-700 hover:bg-gray-600 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          →
        </button>
      </div>

      {/* Popular Novels */}
      <div className="w-full max-w-7xl mx-auto bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 border border-gray-700 mt-8 sm:mt-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">Popular Novels You May Like</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {novels.map((novel) => (
            <div key={novel.id} className="w-full">
              {/* Image */}
              <div className="w-full aspect-[2/3] overflow-hidden rounded-lg">
                <img
                  src={novel.image}
                  alt={`Cover image for ${novel.title}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="mt-2 sm:mt-3 text-center">
                <h3 className="text-sm sm:text-lg font-bold text-white line-clamp-2">{novel.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm">{novel.views} views</p>
                {novel.adult && (
                  <span className="text-xs bg-red-600 px-1 sm:px-2 py-0.5 sm:py-1 rounded text-white mt-1 inline-block">
                    18+
                  </span>
                )}
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;