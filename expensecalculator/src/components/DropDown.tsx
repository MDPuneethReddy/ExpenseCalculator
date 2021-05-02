import { Divider, Input, Select } from "antd";
import React, { useState } from "react"
import { PlusOutlined} from '@ant-design/icons';
interface Iprops {
  categories:any,
  setCategories:any,
  setCategory:any,
}
export const DropDown:React.FC<Iprops>=(props:Iprops)=>{
  const [name,setName]=useState<string>("")
    const { Option } = Select;
    let index = 0;
    const onNameChange = (e:any) => {
        setName(e.target.value)
      }
    
      const addItem = () => {
        console.log('addItem');
        props.setCategories([...props.categories, name || `New item ${index++}`])
        setName("")
      };
      const chooseCategory=(value:any)=>{
        props.setCategory(props.categories[value])
      }
    return(
        <Select
        style={{ width: 240 }}
        placeholder="custom dropdown render"
        onChange={chooseCategory}
        dropdownRender={menu => (
          <div>
            {menu}
            <Divider style={{ margin: '4px 0' }} />
            <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
              <Input style={{ flex: 'auto' }} value={name} onChange={onNameChange} />
              <a
                style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                onClick={addItem}
              >
                <PlusOutlined /> Add item
              </a>
            </div>
          </div>
        )}
      >
        {props.categories.map((item:any,index:any) => (    
          <Option value={index} key={item}>{item}</Option>
        ))}
      </Select>
    )
}