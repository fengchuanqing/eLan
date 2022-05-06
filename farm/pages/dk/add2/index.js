// pages/farm/dk/add2/index.js
/*平面多边形面积*/
var earthRadiusMeters = 6371000.0;
var metersPerDegree = 2.0 * Math.PI * earthRadiusMeters / 360.0;
var radiansPerDegree = Math.PI / 180.0;
var degr

function PlanarPolygonAreaMeters2(points) {
    var a = 0;
    for (var i = 0; i < points.length; ++i) {
        var j = (i + 1) % points.length;
        var xi = points[i][0] * metersPerDegree * Math.cos(points[i][1] * radiansPerDegree);
        var yi = points[i][1] * metersPerDegree;
        var xj = points[j][0] * metersPerDegree * Math.cos(points[j][1] * radiansPerDegree);
        var yj = points[j][1] * metersPerDegree;
        a += xi * yj - xj * yi;
    }
    return Math.abs(a / 2);
}

function computeSignedArea(path) {
    //传入path：{
    //     [{lat:,lng:}],[{lat:,lng:}],[{lat:,lng:}]
    // }
    let radius = 6371009
    let len = path.length;
    if (len < 3) return 0;
    let total = 0;
    let prev = path[len - 1];
    let prevTanLat = Math.tan(((Math.PI / 2 - prev.lat / 180 * Math.PI) / 2));
    let prevLng = (prev.lng) / 180 * Math.PI;
    for (let i in path) {
        let tanLat = Math.tan((Math.PI / 2 -
            (path[i].lat) / 180 * Math.PI) / 2);
        let lng = (path[i].lng) / 180 * Math.PI;
        total += polarTriangleArea(tanLat, lng, prevTanLat, prevLng);
        prevTanLat = tanLat;
        prevLng = lng;
    }
    return Math.abs(total * (radius * radius));
}

function polarTriangleArea(tan1, lng1, tan2, lng2) {
    let deltaLng = lng1 - lng2;
    let t = tan1 * tan2;
    return 2 * Math.atan2(t * Math.sin(deltaLng), 1 + t * Math.cos(deltaLng));
}
Page({

    /**
     * 页面的初始数据
     */

    gogogo() {
        // console.log(this.data.polygon[0].points);
        if (this.data.address) {
            if (this.data.polygon[0].points.length < 3) {
                console.log('请至少选择3个点');
                wx.showToast({
                    icon: 'none',
                    title: "请至少选择3个点",
                })
            } else {
                wx.navigateTo({
                    url: "../add3/index" + "?points=" + JSON.stringify(this.data.polygon[0].points) + "&area=" + this.data.area + "&address=" + this.data.address,
                    // query: {
                    //     points: this.data.polygon[0].points,
                    //     area: this.data.area,
                    //     address: this.data.address
                    // }
                })
            }
        } else {
            wx.showToast({
                icon: 'none',
                title: "请先输入地址",
            })
        }


    },
    gogogo2() {
        wx.navigateTo({
            url: "../guanli/index",
        })
    },
    GetAddress(event) {
        this.setData({
            address: event.detail
        })
    },
    data: {
        dw: {
            lon: '119.4650987323588',
            lat: "29.21075487441193"
        },
        address: '',
        area: '', //面积
        longitude: '', //经度
        latitude: '', //纬度
        polygon: [{
            points: [
                // {
                //     latitude: 37.53088612588587,
                //     longitude: 114.75629613050262
                // },
                // {
                //     latitude: 38.44889836728831,
                //     longitude: 114.75629613050262
                // },
                // {
                //     latitude: 38.86127026913671,
                //     longitude: 114.4301404515661
                // }
            ],
            strokeWidth: 1,
            strokeColor: '#FF0000DD',
            fillColor: '#7cb5ec88'
        }],
        controls: [],
        markers: [
            // {
            //     iconPath: '../../../assets/16394458367603501470.png',
            //     id: 0,
            //     latitude: 37.946548705577804,
            //     longitude: 116.23922014556831,
            //     width: 40,
            //     height: 40,
            //     label: {
            //         content: "下城",
            //         color: "#fff",
            //         fontSize: 12,
            //         anchorX: -(0.5 * (3 * 24)) / 2,
            //         textAlign: "center"
            //     }
            // },
            // {
            //     iconPath: "../../../../assets/images/farm/16394526793398971974.png",
            //     id: 1,
            //     latitude: 40.380874,
            //     longitude: 116.852466,
            //     width: 40,
            //     height: 40,
            //     label: {
            //         content: "鄂尔多斯",
            //         color: "#fff",
            //         fontSize: 12,
            //         anchorX: -(0.5 * (5 * 24)) / 2,
            //         textAlign: "center"
            //     }
            // }
        ]
    },
    // 清除点位数据
    clear: function () {
        this.setData({
            polygon: [{

                area: "",
                longitude: '', //经度
                latitude: '', //纬度
                points: [],
                strokeWidth: 1,
                strokeColor: '#FF0000DD',
                fillColor: '#7cb5ec88'
            }]
        })
    },
    //删除最新一个点位 第一个
    back: function () {
        this.data.polygon[0].points.shift()
        this.setData({
            polygon: [{
                points: this.data.polygon[0].points,
                strokeWidth: 1,
                strokeColor: '#FF0000DD',
                fillColor: '#7cb5ec88'
            }]
        })
    },
    // 获取点位 添加数组
    bindmaptap: function (e) {
        console.log(e);
        var that = this;
        var point1 = [{
            longitude: e.detail.longitude,
            latitude: e.detail.latitude
        }, ...that.data.polygon[0].points]
        let path = []
        let path2 = []
        point1.forEach(item => {
            path.push({
                lat: item.latitude,
                lng: item.longitude,
            })
            path2.push([
                item.longitude,
                item.latitude,
            ])
        })
        console.log(path2);
        let area = computeSignedArea(path) * 0.0015
        let area2 = PlanarPolygonAreaMeters2(path2) * 0.0015
        console.log(computeSignedArea(path));
        console.log(area);
        console.log(area2);
        this.setData({
            area: area.toFixed(2),
            longitude: e.detail.longitude,
            latitude: e.detail.latitude
        })
        that.setData({
            polygon: [{
                points: point1,
                strokeWidth: 1,
                strokeColor: '#FF0000DD',
                fillColor: '#7cb5ec88'
            }]
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})