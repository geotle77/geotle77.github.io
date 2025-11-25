Page({
    data: {
        post: {}
    },

    onLoad: function (options) {
        const slug = options.slug;
        const posts = getApp().globalData.posts;

        if (posts && posts.length > 0) {
            this.renderPost(posts, slug);
        } else {
            // Fetch posts if deep linked
            const that = this;
            wx.showLoading({ title: 'Loading...' });
            wx.request({
                url: 'https://geotle77.github.io/content.json',
                success(res) {
                    wx.hideLoading();
                    if (res.statusCode === 200) {
                        const fetchedPosts = Array.isArray(res.data) ? res.data : res.data.posts;
                        getApp().globalData.posts = fetchedPosts; // Cache it
                        that.renderPost(fetchedPosts, slug);
                    }
                },
                fail() {
                    wx.hideLoading();
                    wx.showToast({ title: 'Failed to load', icon: 'none' });
                }
            });
        }
    },

    renderPost: function (posts, slug) {
        const post = posts.find(p => p.slug === slug);
        if (post) {
            // Format date if needed (though usually done in index, raw data might have T)
            if (post.date && post.date.includes('T')) {
                post.date = post.date.split('T')[0];
            }
            
            // 处理内容：将相对路径转换为绝对路径
            if (post.content) {
                post.content = this.processContent(post.content);
            }
            
            this.setData({
                post: post
            });
            wx.setNavigationBarTitle({
                title: post.title
            });
        } else {
            wx.showToast({ title: 'Post not found', icon: 'none' });
        }
    },
    
    // 处理内容：修复图片路径
    processContent: function(content) {
        const baseUrl = 'https://geotle77.github.io';
        
        // 1. 修复图片的相对路径 (src="/img/..." -> src="https://geotle77.github.io/img/...")
        content = content.replace(/src="\/img\//g, `src="${baseUrl}/img/`);
        content = content.replace(/src='\/img\//g, `src='${baseUrl}/img/`);
        
        // 2. 修复其他以 / 开头的相对路径资源
        content = content.replace(/src="\/(?!\/)/g, `src="${baseUrl}/`);
        content = content.replace(/src='\/(?!\/)/g, `src='${baseUrl}/`);
        
        // 3. 修复 href 中的相对路径
        content = content.replace(/href="\/(?!\/)/g, `href="${baseUrl}/`);
        content = content.replace(/href='\/(?!\/)/g, `href='${baseUrl}/`);
        
        return content;
    },

    onShareAppMessage: function () {
        return {
            title: this.data.post.title,
            path: '/pages/post/post?slug=' + this.data.post.slug
        }
    },

    onShareTimeline: function () {
        return {
            title: this.data.post.title,
            query: 'slug=' + this.data.post.slug
        }
    }
});
