import React, { useState } from 'react'
import { Select, Typography, Row, Avatar, Card, Col } from 'antd'
import moment from 'moment';
import noImage from '../images/noImage.jpg'

import { useGetCryptoNewsQuery } from '../services/cryptonewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Text, Title } = Typography;
const { Option } = Select;


const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });
    const { data } = useGetCryptosQuery(100);


    console.log(cryptoNews?.data);

    if (!cryptoNews) return 'Loading ...';
    //if (!cryptoNews?.value) return 'Loading ...';
    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className='select-news'
                        placeholder='Select a Crypto'
                        optionFilterProp='children'
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {data?.data?.coins.map((currency) => <Option key={currency.uuid} value={currency.name}>{currency.name}</Option>)}
                    </Select>
                </Col>
            )}
            {cryptoNews?.data.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className='news-card'>
                        <a href={news.link} target='_blank' rel="noreferrer">
                            <div className='news-image-container'>
                                <Title className='news-title' level={4}>{news.title}</Title>
                                <img style={{ maxHeight: '100px' }} src={news?.source_favicon_url || noImage} alt="news" />
                            </div>
                            <div className='provider-container' style={{ bottom: '0' }}>
                                <p>{moment(news.published_datetime_utc).startOf('ss').fromNow()}</p>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News