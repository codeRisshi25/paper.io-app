import blogService from "../services/blogService.js";

class BlogController {
  async saveDraft(req, res) {
    try {
      const blog = await blogService.saveDraft(req.body, req.user.id);
      res.status(200).json({
        success: true,
        message: "Draft saved successfully",
        blog,
      });
    } catch (error) {
      console.error("Error saving draft:", error);
      res.status(400).json({
        success: false,
        message: error.message || "Failed to save draft",
      });
    }
  }

  async publishBlog(req, res) {
    try {
      const { blogId } = req.params;
      const blog = await blogService.publishBlog(blogId, req.user.id);
      res.status(200).json({
        success: true,
        message: "Blog published successfully",
        blog,
      });
    } catch (error) {
      console.error("Error publishing blog:", error);
      res.status(400).json({
        success: false,
        message: error.message || "Failed to publish blog",
      });
    }
  }

  async getAllPublishedBlogs(req, res) {
    try {
      const options = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
        tag: req.query.tag,
      };

      const result = await blogService.getAllPublishedBlogs(options);
      res.status(200).json({
        success: true,
        blogs: result.blogs,
        pagination: result.pagination,
      });
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch blogs",
      });
    }
  }

  async getBlogById(req, res) {
    try {
      const { blogId } = req.params;
      const blog = await blogService.getBlogById(blogId);
      res.status(200).json({
        success: true,
        blog,
      });
    } catch (error) {
      console.error("Error fetching blog:", error);
      const status = error.message === "Blog not found" ? 404 : 400;
      res.status(status).json({
        success: false,
        message: error.message || "Failed to fetch blog",
      });
    }
  }
  async getUserBlogs(req, res) {
    try {
      const options = {
        status: req.query.status,
      };

      const result = await blogService.getUserBlogs(req.user.id, options);
      res.status(200).json({
        success: true,
        blogs: result.blogs,
      });
    } catch (error) {
      console.error("Error fetching user blogs:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch blogs",
      });
    }
  }

  async deleteBlog(req, res) {
    try {
      const { blogId } = req.params;
      await blogService.deleteBlog(blogId, req.user.id);
      res.status(200).json({
        success: true,
        message: "Blog deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting blog:", error);
      res.status(400).json({
        success: false,
        message: error.message || "Failed to delete blog",
      });
    }
  }
}

export default new BlogController();
