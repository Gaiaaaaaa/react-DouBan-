//1. 导入 react
import React from 'react'

import fetchJsonp from 'fetch-jsonp'

import { Card, Rate, Pagination, Spin } from 'antd';

// 羞羞的铁拳
const imgUrl = 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2499793218.jpg';

//2. 导出组件
export default class MovieList extends React.Component {

  constructor(props) {

    super(props)

    console.warn(props);

    this.movieType = props.match.params.movieType || 'in_theaters';
    this.page = props.match.params.page;

    console.log('page....', this.page)

    // 如果不参加渲染的话,不放在里面
    this.state = {
      movieList: {},
      isLoading: true
    }
  }

  //挂载之前
  componentWillMount() {

    this.ml_fetchMivieData();
  }

  // props 发生改变触发
  componentWillReceiveProps(nextProps) {

    console.warn('componentWillReceiveProps', nextProps.match.params.movieType)

    // 每次 props 更新拿到最新的
    this.movieType = nextProps.match.params.movieType;

    //因为在之前的页面点击了页数之后, page 已经赋值给了全局的 this.page 了
    // 切换页面的时候,拿到的还是全局的 page

    //切换--> movieType --> props --> 
    this.page = nextProps.match.params.page

    //请求数据
    this.ml_fetchMivieData();



  }

  /**
   * 公共方法
   */
  ml_fetchMivieData() {

    this.setState({
      isLoading: true
    })

    // 20个  4页  5个
    //this.page   start
    //1页 0 1 2 3 4
    //2页 5 6 7 8 9
    //3页 10 11 12 13 14
    //4页 15 16 17 18 19

    const count = 5;
    const start = (this.page - 1) * count;

    // 方法一:  代理
    //  字符串 静态  'XXX法法师'
    //  动态字符串  模板字符串  ` ${  } `
    fetch(`/api/movie/${this.movieType}?start=${start}&count=${count}`)
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          movieList: data,
          isLoading: false
        })
      })
  }

  //页数改变
  ml_pageChange(page, pageSize) {

    console.log('页数改变了', page)

    this.page = page; //3

    this.props.history.push(`/movie/${this.movieType}/${this.page}`);

    // 请求数据
    // this.ml_fetchMivieData()
  }

  //进入详情页
  ml_goMovieDetail(id) {

    console.log('进入详情页之前', id)

    this.props.history.push(`/movie/detail/${id}`)

  }


  render() {
    return (<div>
      {


        this.state.isLoading ?
          (<div style={styles.centerStyle}><Spin size="large" /></div>) :
          (
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {

                  this.state.movieList.subjects.map((item) => {
                    return (<Card onClick={() => { this.ml_goMovieDetail(item.id) }} key={item.id} style={styles.cardStyle} bodyStyle={{ padding: 0 }}>
                      <div className="custom-image">
                        <img style={styles.imgStyle} alt="example" width="100%" src={imgUrl} />
                      </div>
                      <div className="custom-card">
                        <h3 style={styles.h3Style}>{item.title}</h3>
                        <p>电影类型:{item.genres.join(',')}</p>
                        <Rate disabled defaultValue={item.rating.average / 2} />
                      </div>
                    </Card>)
                  })
                }
              </div>
              <Pagination current={this.page - 0} defaultCurrent={1} pageSize={5} total={20} onChange={(page, pageSize) => this.ml_pageChange(page, pageSize)} />
            </div>
          )
      }
    </div>)
  }
}

const styles = {
  h3Style: {
    maxWidth: '130px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  cardStyle: {   // 一定要把 card 上的 240给删除掉
    margin: '0 20px 20px 0',
    padding: 20,
    // width:170,
    textAlign: 'center'
  },
  imgStyle: {
    width: 100,
    height: 140
  },
  centerStyle: {
    textAlign: 'center'
  }
}