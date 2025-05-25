import { Blog } from "../models/Models.js";
import mongoose from "mongoose";

class BlogService {
  async saveDraft(blogData, userId) {
    try {
      const { title, content, tags } = blogData;
      if (blogData._id) {
        const blog = await Blog.findOne({
          _id: blogData._id,
          author: userId,
          status: "draft", // Only drafts can be edited
        });

        if (!blog) {
          throw new Error("Draft not found or not editable");
        }

        blog.title = title || "Untitled Draft";
        blog.content = content || "";
        blog.tags = tags || [];

        await blog.save();
        return blog;
      }

      //* create a new draft blog if already does not exist
      const newBlog = new Blog({
        title: title || "Untitled Draft",
        content: content || "",
        tags: tags || [],
        status: "draft",
        author: userId,
      });

      await newBlog.save();
      return newBlog;
    } catch (error) {
      console.error("Error saving draft:", error);
      throw error;
    }
  }

  async publishBlog(blogId, userId) {
    try {
      const blog = await Blog.findOne({
        _id: blogId,
        author: userId,
        status: "draft", // Only drafts can be published
      });

      if (!blog) {
        throw new Error("Blog not found or already published");
      }

      // Ensure blog has required content before publishing
      if (!blog.title || !blog.content) {
        throw new Error("Blog must have title and content to publish");
      }

      // Update status to published
      blog.status = "published";
      await blog.save();
      return blog;
    } catch (error) {
      console.error("Error publishing blog:", error);
      throw error;
    }
  }

  async getAllPublishedBlogs(options = {}) {
    try {
      const { page = 1, limit = 10, tag } = options;
      const skip = (page - 1) * limit;

      // Build query
      const query = { status: "published" };
      if (tag) query.tags = tag;

      // Get total count
      const total = await Blog.countDocuments(query);

      // Get blogs with pagination and populate author info
      const blogs = await Blog.find(query)
        .populate("author", "name email")
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit);

      return {
        blogs,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error("Error fetching published blogs:", error);
      throw error;
    }
  }

  async getBlogById(blogId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(blogId)) {
        throw new Error("Invalid blog ID");
      }

      const blog = await Blog.findOne({
        _id: blogId,
        status: "published", // Only published blogs are publicly viewable
      }).populate("author", "name email");

      if (!blog) {
        throw new Error("Blog not found");
      }

      return blog;
    } catch (error) {
      console.error("Error fetching blog by ID:", error);
      throw error;
    }
  }

  async getUserBlogs(userId) {
    try {

      const query = { author: userId };
      // Get all blogs without pagination
      const blogs = await Blog.find(query)
        .select('-content')
        .sort({ created_at: -1 });
      return { blogs };
    } catch (error) {
      console.error("Error fetching user blogs:", error);
      throw error;
    }
  }
  async getUserBlogById(blogId, userId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(blogId)) {
        throw new Error("Invalid blog ID");
      }

      const blog = await Blog.findOne({
        _id: blogId,
        author: userId
      }).populate("author", "name email");

      if (!blog) {
        throw new Error("Blog not found or not authorized to access");
      }

      return blog;
    } catch (error) {
      console.error("Error fetching user blog by ID:", error);
      throw error;
    }
  }

  async deleteBlog(blogId, userId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(blogId)) {
        throw new Error("Invalid blog ID");
      }

      const result = await Blog.deleteOne({
        _id: blogId,
        author: userId,
      });

      if (result.deletedCount === 0) {
        throw new Error("Blog not found or not authorized to delete");
      }

      return true;
    } catch (error) {
      console.error("Error deleting blog:", error);
      throw error;
    }
  }
}

export default new BlogService();
