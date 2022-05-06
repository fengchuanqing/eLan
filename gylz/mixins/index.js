import {
  qylb,
  tdlxlb
} from '../../apis/gylz'
let lx = Behavior({
  methods: {
    // 土地类型列表
    gettdlxlb() {
      tdlxlb().then(res => {
        if (res) {
          const data = res.data;
          let arr = []
          data.map(item => {
            arr.push({
              text: item.lxmc,
              value: item.id
            })
          })
          this.setData({
            option2: [...this.data.option2, ...arr]
          })
        }
      })
    },
    // 区域列表
    getqylb() {
      qylb().then(res => {
        if (res) {
          const data = res.data;
          let arr = []
          data.map(item => {
            arr.push({
              text: item.region_name,
              value: item.region_code
            })
          })
          this.setData({
            option1: [...this.data.option1, ...arr]
          })
        }
      })
    },
  }
})
export {lx}