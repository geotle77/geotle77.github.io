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
