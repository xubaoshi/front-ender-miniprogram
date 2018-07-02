Page({
  data: {
    isLoading: true,
    goodsId: '',
    goodsName: '',
    banners: [],
    price: 0,
    sold: 0,
    specification: [],
    showSpecs: false,
    images: [],
  },
  onLoad (option) {
    wx.showNavigationBarLoading()
    wx.request({
      url: 'http://localhost:3000/api/shop/v7/mall/goods/detail',
      method: 'POST',
      // data: { goodsId: option.id },
      data: { goodsId: '77c5508e9a034a959fe58a9ccaa4266a' },
      success: ({ statusCode, data }) => {
        if (statusCode === 200 && data.code === 0) {
          const detail = data.data
          wx.setNavigationBarTitle({
            title: detail.goodsName
          })
          this.setData({
            isLoading: false,
            goodsId: detail.goodsId,
            goodsName: detail.goodsName,
            banners: detail.banners,
            price: detail.price,
            sold: detail.alreadySale,
            specification: detail.specification,
            images: detail.images,
          })
        }
        wx.hideNavigationBarLoading()
      },
      complete: () => {
        wx.hideNavigationBarLoading()
      }
    })
  },
  _toggleSpecPopup () {
    this.setData({
      showSpecs: !this.data.showSpecs
    });
  },
  _handleSpecTap () {
    this._toggleSpecPopup()
  },
  onShareAppMessage () {
    return {
      title: '前端行知录',
      path: '/page/user?id=123'
    }
  }
})