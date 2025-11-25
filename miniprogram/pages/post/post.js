Page({
    data: {
        post: {}
    },

    onLoad: function (options) {
        const index = options.index;
        const posts = getApp().globalData.posts;
        if (posts && posts[index]) {
            this.setData({
                post: posts[index]
            });
            wx.setNavigationBarTitle({
                title: posts[index].title
            });
        }
    }
});
