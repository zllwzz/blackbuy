<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a>&gt;
                <a href="/goods.html">购物商城</a>&gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <!-- 上方产品信息 -->
                        <div class="goods-box clearfix">
                            <div class="pic-box"></div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em
                                                id="commoditySellPrice"
                                                class="price"
                                            >¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number
                                                    v-model="buyNum"
                                                    :min="1"
                                                    :max="goodsinfo.stock_quantity"
                                                    label="描述文字"
                                                ></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em
                                                    id="commodityStockNum"
                                                >{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button
                                                    onclick="cartAdd(this,'/',1,'/shopping.html');"
                                                    class="buy"
                                                >立即购买</button>
                                                <button
                                                    onclick="cartAdd(this,'/',0,'/cart.html');"
                                                    class="add"
                                                >加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <!-- 下方产品详情和评论 -->
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <!-- tab栏 -->
                            <Affix>
                                <div
                                    id="tabHead"
                                    class="tab-head"
                                    style="position: static; top: 517px; width: 925px;"
                                >
                                    <ul>
                                        <li>
                                            <a
                                                href="javascript:;"
                                                :class="{selected:indexNum==0}"
                                                @click="indexNum=0"
                                            >商品介绍</a>
                                        </li>
                                        <li>
                                            <a
                                                href="javascript:;"
                                                :class="{selected:indexNum==1}"
                                                @click="indexNum=1"
                                            >商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <!-- 详情 -->
                            <div
                                class="tab-content entry"
                                v-show="indexNum==0"
                                v-html="goodsinfo.content"
                            ></div>
                            <!-- 评论 -->
                            <div class="tab-content" v-show="indexNum==1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea
                                                    id="txtContent"
                                                    name="txtContent"
                                                    sucmsg=" "
                                                    data-type="*10-1000"
                                                    nullmsg="请填写评论内容！"
                                                ></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input
                                                    id="btnSubmit"
                                                    name="submit"
                                                    type="submit"
                                                    value="提交评论"
                                                    class="submit"
                                                >
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p
                                            v-show="totalcount==0"
                                            style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);"
                                        >暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in commentArr" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | shortTimePlus}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <Page
                                                :total="totalcount"
                                                show-sizer
                                                show-elevator
                                                placement="top"
                                                :page-size="pageSize"
                                                @on-change="change"
                                                :page-size-opts="[6, 12, 18, 24]"
                                                @on-page-size-change="changePageSize"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 右侧 -->
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                            <!-- </a> -->
                                        </div>
                                        <div class="txt-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/detail/'+item.id">{{item.title}}</router-link>
                                            <!-- </a> -->
                                            <span>{{item.add_time | shortTime}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BackTop></BackTop>
    </div>
</template>
<script>
// import moment from 'moment'
// import axios from 'axios';
export default {
  name: 'detai',
  data: function() {
    return {
      artID: '',
      goodsinfo: {},
      hotgoodslist: [],
      imglist: [],
      buyNum: 1,
      indexNum: 0,
      commentArr: [],
      pageIndex: 1,
      pageSize: 6,
      totalcount:0
    };
  },
  methods: {
    initData() {
      this.artID = this.$route.params.artID;
      this.$axios
        .get(
          `http://111.230.232.110:8899/site/goods/getgoodsinfo/${this.artID}`
        )
        .then(result => {
          this.goodsinfo = result.data.message.goodsinfo;
          this.hotgoodslist = result.data.message.hotgoodslist;
          this.imglist = result.data.message.imglist;
        });
      this.getComment();
      this.buyNum = 1;
      this.pageIndex=1;
    },
    getComment(){
        this.pageIndex=1;
        this.$axios
        .get(
          `http://111.230.232.110:8899/site/comment/getbypage/goods/${
            this.artID
          }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        )
        .then(result => {
          this.totalcount = result.data.totalcount;
          this.commentArr = result.data.message;
        });
    },
    change(page){
        this.pageIndex = page;
        this.getComment();

    },
    changePageSize(pageSize){
        this.pageSize=pageSize;
        this.getComment();
    }
  },
  created() {
    this.initData();
  },
  watch: {
    $route: function(val) {
      this.initData();
    }
  }
  //   filters: {
  //     shortTime: function(value) {
  //       return moment(value).format('YYYY年MM月DD');
  //     }
  //   }
};
</script>
<style>
.tab-content img {
  display: block;
}
</style>

