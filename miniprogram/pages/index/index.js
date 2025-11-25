Page({
    data: {
        posts: []
    },

    onLoad: function (options) {
        const that = this;
        wx.request({
            url: 'https://geotle77.github.io/content.json',
            success(res) {
                if (res.statusCode === 200) {
                    const posts = Array.isArray(res.data) ? res.data : res.data.posts;
                    // Format dates
                    posts.forEach(post => {
                        if (post.date) {
                            post.date = post.date.split('T')[0];
                        }
                    });
                    that.setData({
                        posts: posts
                    });
                }
            },
            fail(err) {
                console.error('Failed to load posts', err);
                wx.showToast({
                    title: 'Failed to load',
                    icon: 'none'
                });
            }
        });
    },

    onPostTap: function (e) {
        const post = e.currentTarget.dataset.post;
        getApp().globalData.posts = this.data.posts;
        const index = e.currentTarget.dataset.index;

        wx.navigateTo({
            url: `../post/post?index=${index}`
        });
    },

    onPullDownRefresh: function () {
        this.onLoad();
        wx.stopPullDownRefresh();
    }
});
