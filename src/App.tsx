import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import 'antd/dist/antd.css';
import { Table, Input, Button, Tooltip, Typography, Form, Switch, Space, List, Layout, Menu, Image, Pagination, Spin, Popover } from 'antd';
import monsInfoStaticData from './static-data/mons-info.json';
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons';
import { getEnabledCategories } from 'trace_events';
import { ColumnsType } from 'antd/lib/table';
import { useState } from 'react';
import { type } from 'os';
import { text } from 'stream/consumers';

let monsInfoData = monsInfoStaticData;

const { Header, Footer, Content } = Layout;
const { Text, Link, Title } = Typography;

const getMonsInfo = () => {

  const monInfoDataNormalized = monsInfoData.map((monInfo) => {

    const ancestorsNormalized = monInfo.ancestors.map((monID) => {
      const ancestor = monsInfoData.find((monInfoFind) => {

        //converte string para interger:
        const monIDNumber = +monID

        return monInfoFind.id === monIDNumber
      })
      return ancestor
    })

    return {
      key: monInfo.id,
      id: monInfo.id,
      name: monInfo.name,
      generation: monInfo.generation,
      ancestors: ancestorsNormalized,
      types: monInfo.types
    }
  })
  return monInfoDataNormalized

}

const App: React.FC = () => {



  const filterMonsElement = [
    {
      text: 'Lightning',
      value: 'Lightning',
    },
    {
      text: 'Water',
      value: 'Water',
    },
    {
      text: 'Fire',
      value: 'Fire',
    },
    {
      text: 'Iron',
      value: 'Iron',
    },
    {
      text: 'Ice',
      value: 'Ice',
    },
    {
      text: 'Flyer',
      value: 'Flyer',
    },
    {
      text: 'Earth',
      value: 'Earth',
    },
    {
      text: 'Leaf',
      value: 'Leaf',
    },
    {
      text: 'Rock',
      value: 'Rock',
    },
    {
      text: 'Insect',
      value: 'Insect',
    },
    {
      text: 'Combat',
      value: 'Combat',
    },
    {
      text: 'Neutral',
      value: 'Neutral',
    },
    {
      text: 'Mystic',
      value: 'Mystic',
    },
    {
      text: 'Telepath',
      value: 'Telepath',
    },
    {
      text: 'Phantom',
      value: 'Phantom',
    },
    {
      text: 'Dragon',
      value: 'Dragon',
    },
    {
      text: 'Toxin',
      value: 'Toxin',
    },
  ]

  const columns: ColumnsType<any> = [
    {
      title: 'ID',
      dataIndex: 'id',
      showSorterTooltip: true,
      width: 100,
      align: 'center',
      sorter: (a: any, b: any) => a.id - b.id,
      sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
      title: 'Mon',
      dataIndex: 'name', 
      width: 100,
      align: 'center',     
      filterDropdown: (event: any) => {
        const {
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        } = event

        return (
          <>
            <Space direction='horizontal'>
              <Input
                autoFocus
                placeholder='Search Mon Name'
                value={selectedKeys[0]}
                onChange={(e) => {
                  setSelectedKeys(e.target.value ? [e.target.value] : []);
                  confirm({ closeDropdown: false });
                }}
                onPressEnter={() => {
                  confirm();
                }}
                onBlur={() => {
                  confirm();
                }}>
              </Input>
              <Tooltip
                title="search">
                <Button
                  onClick={() => {
                    confirm();
                  }}
                  type="link"
                  shape="circle"
                  icon={<SearchOutlined />} />
              </Tooltip>
              <Button
                onClick={() => {
                  clearFilters();
                  confirm();
                }}
                type="link">
                Clear
              </Button>
            </Space>
          </>)
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value: string | number | boolean, record: any) => {
        return record.name.toLowerCase().includes(value);
      },
    },
    {
      title: 'Gen',
      dataIndex: 'generation',
      width: 100,
      align: 'center',
      sorter: (a: any, b: any) => a.generation - b.generation,
      sortDirections: ['ascend', 'descend', 'ascend'],
      filters: [
        {
          text: 'Gen 0',
          value: 0,
        },
        {
          text: 'Gen 1',
          value: 1,
        },
        {
          text: 'Gen 2',
          value: 2,
        },
        {
          text: 'Gen 3',
          value: 3,
        },
        {
          text: 'Gen 4',
          value: 4,
        },
        {
          text: 'Gen 5',
          value: 5,
        },
        {
          text: 'Gen 6',
          value: 6,
        },
        {
          text: 'Gen 7',
          value: 7,
        },
      ],
      onFilter: (value: string | number | boolean, record: any) => {
        return value === record.generation
      },
    },
    {
      title: 'Ancestors',
      dataIndex: 'ancestors',
      width: 100,
      align: 'center',
      showSorterTooltip: true,
      render: (ancestors: []) => {
        const ancestorsWithKey = ancestors.map((ancestor: any) => {

          return {
            ...ancestor,
            key: ancestor?.id
          }
        })
        return (<List
          size='small'
          dataSource={ancestorsWithKey}
          renderItem={ancestor => (<List.Item>
            {ancestor?.name}
          </List.Item>)} />)
      },
      filterDropdown: (event: any) => {
        const {
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        } = event

        return (
          <>
            <Space direction='horizontal'>
              <Input
                autoFocus
                placeholder='Search Ancestor Name'
                value={selectedKeys[0]}
                onChange={(e) => {
                  setSelectedKeys(e.target.value ? [e.target.value] : []);
                  confirm({ closeDropdown: false });
                }}
                onPressEnter={() => {
                  confirm();
                }}
                onBlur={() => {
                  confirm();
                }}>
              </Input>
              <Tooltip
                title="search">
                <Button
                  onClick={() => {
                    confirm();
                  }}
                  type="link"
                  shape="circle"
                  icon={<SearchOutlined />} />
              </Tooltip>
              <Button
                onClick={() => {
                  clearFilters();
                  confirm();
                }}
                type="link">
                Clear
              </Button>
            </Space>
          </>)
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value: string | number | boolean, mon: any) => {
        const hasAncestor = mon.ancestors.find((ancestor: any) => {
          return ancestor?.name.toLowerCase().includes(value);
        })
        console.log('hasAncestor >>>>>>>', hasAncestor)
        return hasAncestor;
      },
    },
    {
      title: 'Element',
      dataIndex: 'types',
      width: 100,
      align: 'center',
      showSorterTooltip: true,
      render: (types: []) => {
        const typesWithKey = types?.map((type: string) => {
          return {
            type,
            key: type
          }
        })

        return (<List
          size='small'
          dataSource={typesWithKey}
          renderItem={typeWithKey => (<List.Item>
            {typeWithKey?.type}
          </List.Item>)} />)
      },

      filters: filterMonsElement,
      onFilter: (value: string | number | boolean, record: any) => {
        return record?.types?.includes(value)
      },
    }
  ]
  
  const typesAdvantages = (
    <div>
      <Image
        width={700}
        src='https://guide.ethermon.io/wp-content/uploads/2021/05/intro_type_3.png'
      />
    </div>
  );


  return (
    <Layout className="Layout">
      <Header style={{ height: 70 }}>
        <div className='header' >
          <Space style={{ marginBottom: 20 }}>
            <Image
              width={200}
              src="https://miro.medium.com/max/1400/1*hrIlTqz5NMO9GhOZ9RifKA.png"
            />
            <Menu className='menu' theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
              <a 
              href="https://ethermon.io/store"               
              rel="noopener noreferrer" 
              style={{ backgroundColor: 'transparent', fontSize: 18, marginLeft: 220, color: 'goldenrod' }}>
                Starter Store
              </a>              
              <Popover content={typesAdvantages} title="Types Advantages" >
                <Button type='link' style={{ width: 20, backgroundColor: 'transparent', fontSize: 18, marginTop: 15, marginLeft: 80, color: 'goldenrod' }}>Types Advantages</Button>
              </Popover>

            </Menu>
          </Space>
        </div>
      </Header>
      <Content>
        <div>
          <Table
            scroll={{ y: 520 }}
            columns={columns}
            dataSource={getMonsInfo()}
            size='small'
            pagination={{ position: ['topRight'] }}            
          >
          </Table>
        </div>
      </Content>
      <Footer>
      </Footer>
    </Layout>
  )
}

export default App;
