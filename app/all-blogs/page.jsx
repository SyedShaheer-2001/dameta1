'use client'
import Footer from '@/components/ui/Footer'
import Navbar from '@/components/ui/Navbar'
import React, { useEffect, useState } from "react";
import Link from "next/link";

function page() {

  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const BLOGS_PER_PAGE = 6;

  const imageBaseURL = "https://dameta1.com/dameta-backend/public/";

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  // Fetch all blogs for default view
  const fetchBlogs = async () => {
    try {
      const res = await fetch(
        "https://dameta1.com/dameta-backend/public/api/blogs"
      );
      const data = await res.json();

      setBlogs(data.blogs);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  // Fetch categories (static for now)
  const fetchCategories = async () => {
    try {
      const res = await fetch(
        "https://dameta1.com/dameta-backend/public/api/all/category",

        {
        method: "GET",
        headers: {
          "Accept": "application/json"
        }
      }
      );
      const data = await res.json();

      setCategories(data.categories);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching Categories:", error);
      setLoading(false);
    }
  };

  // Backend powered search
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setCurrentPage(1);

    if (value.trim() === "") {
      fetchBlogs();
      return;
    }

    try {
         const res = await fetch(
      `https://dameta1.com/dameta-backend/public/api/blogs/search?query=${encodeURIComponent(value)}`,
      {
        method: "GET",
        headers: {
          "Accept": "application/json"
        }
      }
    );

      const data = await res.json();
      setBlogs(data.blogs || []);
    } catch (error) {
      console.log("Error searching blogs:", error);
    }
  };

  console.log('searchQuery', searchQuery)

  // Helpers
  function stripHtml(html) {
    if (!html) return "";
    return html.replace(/<[^>]*>?/gm, "");
  }

  // Pagination logic
  const indexOfLastBlog = currentPage * BLOGS_PER_PAGE;
  const indexOfFirstBlog = indexOfLastBlog - BLOGS_PER_PAGE;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(blogs.length / BLOGS_PER_PAGE);

  if (loading) {
    return (
      <div className="w-full h-[300px] flex justify-center items-center">
        <p className="text-xl">Loading blogs...</p>
      </div>
    );
  }

  return (
    <>
      <div className='pb-[100px] pt-[150px] lg:pt-[220px] flex flex-col justify-center relative overflow-hidden'>
        <Navbar />

        <div className="w-full px-5 py-10">
          <h1 className="text-[32px] font-light tracking-[5px] text-center mb-10">
            All Blogs
          </h1>

          {/* 🔍 SEARCH BAR */}
          <div className="max-w-[600px] mx-auto mb-10">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#39C72C]"
            />
          </div>

          {/* BLOG GRID */}
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {currentBlogs.map((blog) => {
              const blogCategories = blog.category_ids
                .map((catId) => categories?.find((c) => c.id === Number(catId)))
                .filter(Boolean);

              return (
                <div
                  key={blog.id}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 relative"
                >
                  <Link href={`/${blog.slug}`}>
                    <div className="relative w-full h-[230px] overflow-hidden">
                      <img
                        src={imageBaseURL + blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500"></div>

                      <div className="absolute bottom-3 left-3 flex gap-2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        {blogCategories.map((cat) => (
                          <span
                            key={cat.id}
                            className="text-white text-xs px-3 py-1 bg-black/50 rounded-full backdrop-blur-md border border-white/20"
                          >
                            {cat.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>

                  <div className="px-5 py-5 lg:px-5 lg:py-8 flex flex-col">
                    <Link href={`/${blog.slug}`}>
                      <h2 className="text-[20px] font-semibold text-gray-900 mb-3">
                        <span className="group-hover:text-[#39C72C] transition-colors duration-300">
                          {blog.title}
                        </span>
                      </h2>
                    </Link>

                    <p className="text-[15px] text-gray-600 line-clamp-3 mb-4">
                      {stripHtml(blog.content)}
                    </p>

                    <div className="mt-auto flex justify-between items-center pt-2">
                      <p className="text-sm text-gray-500 absolute left-2 bottom-2">
                        {new Date(blog.created_at).toLocaleDateString("en-US")}
                      </p>

                      <Link href={`/${blog.slug}`}>
                        <span className="text-sm text-[#39C72C] font-medium hover:underline absolute right-2 bottom-2">
                          Read More →
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-4 py-2 border rounded-lg disabled:opacity-40 cursor-pointer"
              >
                Previous
              </button>

              <p className="text-gray-700">
                Page {currentPage} of {totalPages}
              </p>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 border rounded-lg disabled:opacity-40 cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default page;
